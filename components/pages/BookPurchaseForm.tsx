'use client';

import { useState } from 'react';
import { Copy, Check, Upload, FileText, Shield, Book, CreditCard, AlertCircle, Calendar, Package, Truck, CreditCard as CreditCardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

interface BankAccount {
  name: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  icon: React.ReactNode;
}

interface OrderData {
  fullName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  additionalNotes: string;
  product: string;
  productPrice: number;
  shippingFee: number;
  totalAmount: number;
  paymentReceipt: string;
  paymentStatus: 'pending' | 'approved' | 'rejected';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderResponse {
  success?: boolean;
  message: string;
  order: OrderData;
}

const BookPurchaseForm = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('GT Bank');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    additionalNotes: '',
  });

  const bookPrice = 10000;
  const shippingFee = 1000;
  const totalAmount = bookPrice + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const bankAccounts: BankAccount[] = [
    {
      name: 'GT Bank',
      bank: 'GT Bank',
      accountNumber: '3002385769',
      accountName: 'The Fitness Ambassador Ltd',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      name: 'Jaiz Bank',
      bank: 'Jaiz Bank',
      accountNumber: '0019155788',
      accountName: 'Ajisafe Sulaiman',
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];

  const selectedAccountDetails = bankAccounts.find(acc => acc.name === selectedAccount);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(fieldName);
      toast.success(`${fieldName === 'accountNumber' ? 'Account number' : 'Account name'} copied!`);
      
      setTimeout(() => {
        setCopiedAccount(null);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large. Maximum size is 5MB.');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type)) {
        toast.error('Invalid file type. Please upload JPG, PNG, or PDF files.');
        return;
      }
      setReceiptFile(file);
      toast.success('Receipt uploaded successfully!');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!customerDetails.fullName || !customerDetails.phoneNumber || !customerDetails.deliveryAddress) {
      toast.error('Please fill in all required customer details');
      return;
    }

    if (!receiptFile) {
      toast.error('Please upload your payment receipt');
      return;
    }

    setIsUploading(true);

    try {
      const loadingToast = toast.loading('Submitting your order...');
      
      const formData = new FormData();
      formData.append("fullName", customerDetails.fullName);
      formData.append("phoneNumber", customerDetails.phoneNumber);
      formData.append("email", customerDetails.email);
      formData.append("deliveryAddress", customerDetails.deliveryAddress);
      formData.append("additionalNotes", customerDetails.additionalNotes || "");
      formData.append("paymentReceipt", receiptFile);


      const response = await fetch('/api/order-book', {
        method: 'POST',
        body: formData,
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', {
          status: response.status,
          statusText: response.statusText,
          contentType: contentType,
          textPreview: text.substring(0, 500)
        });
        
        toast.dismiss(loadingToast);
        
        if (response.status === 404) {
          toast.error('Order endpoint not found (404). Please check the API route.');
        } else if (response.status === 500) {
          toast.error('Server error (500). Please try again later.');
        } else {
          toast.error(`Server error: ${response.status}`);
        }
        throw new Error(`Failed to place order`);
      }

      const result: OrderResponse = await response.json();

      if (!response.ok) {
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Failed to submit order');
        throw new Error(result.message || `Failed to place order`);
      }

      // Success
      toast.dismiss(loadingToast);
      toast.success('Order submitted successfully! We will review your receipt and contact you shortly.');
      
      // Store order data
      if (result.order) {
        setOrderData(result.order);
      }
      
      // Reset form
      setReceiptFile(null);
      setCustomerDetails({
        fullName: '',
        phoneNumber: '',
        email: '',
        deliveryAddress: '',
        additionalNotes: '',
      });
      
      setOrderSubmitted(true);
      
    } catch (error) {
      console.error('❌ Error submitting order:', error);
      
      let errorMessage = 'Failed to submit order. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Success Screen
  if (orderSubmitted && orderData) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Book Order Confirmed! 📚
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Thank you for purchasing <span className="font-semibold text-[#008020]">Workout Compass</span>!
          </p>
          <p className="text-muted-foreground">
            Your order has been received and is being processed, You will receive an email once it has been confirmed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-2">Order Status</h3>
                  <p className="text-sm text-muted-foreground">Order ID: {orderData._id}</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(orderData.orderStatus)}`}>
                  {orderData.orderStatus.charAt(0).toUpperCase() + orderData.orderStatus.slice(1)}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#008020]" />
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{formatDate(orderData.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCardIcon className="w-5 h-5 text-[#008020]" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.paymentStatus)}`}>
                        {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">(Under review)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-display text-2xl text-foreground mb-6">Order Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-medium">{orderData.product}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">1</p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product Price</span>
                    <span className="font-medium">{formatPrice(orderData.productPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className="font-medium">{formatPrice(orderData.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-display border-t border-gray-100 pt-4 mt-2">
                    <span className="text-foreground font-bold">Total Amount</span>
                    <span className="text-[#008020] font-bold">{formatPrice(orderData.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer & Shipping Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#008020]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#008020]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground">Customer Information</h3>
                  <p className="text-sm text-muted-foreground">Your details for delivery</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-lg">{orderData.fullName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{orderData.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium truncate">{orderData.email}</p>
                  </div>
                </div>
                
                {orderData.additionalNotes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Additional Notes</p>
                    <p className="font-medium italic">{orderData.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#ff8a00]/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#ff8a00]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground">Delivery Information</h3>
                  <p className="text-sm text-muted-foreground">Where your book will be shipped</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium whitespace-pre-line">{orderData.deliveryAddress}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Delivery typically takes 5-7 business days after payment verification
                </p>
              </div>
            </div>

            {/* Payment Receipt */}
            {/* {orderData.paymentReceipt && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-display text-xl text-foreground mb-4">Payment Receipt</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#008020]" />
                    <div>
                      <p className="font-medium">Receipt uploaded</p>
                      <p className="text-sm text-muted-foreground">Click to view</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(orderData.paymentReceipt, '_blank')}
                    className="cursor-pointer"
                  >
                    View Receipt
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-[#008020]/5 to-[#ff8a00]/5 rounded-2xl p-8 mb-10 border border-gray-100">
          <h3 className="font-display text-2xl text-foreground mb-6 text-center">What Happens Next?</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#008020]/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">1️⃣</div>
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">Payment Verification</h4>
              <p className="text-sm text-muted-foreground">
                We&apos;ll review your payment receipt within 24 hours and update your payment status.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#ff8a00]/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">2️⃣</div>
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">Processing Order</h4>
              <p className="text-sm text-muted-foreground">
                Once payment is verified, we&apos;ll prepare your book for shipping and update you via email.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">3️⃣</div>
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">Shipping & Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Your book will be shipped to your address. You&apos;ll receive tracking information via SMS.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Button
              onClick={() => setOrderSubmitted(false)}
              className="bg-[#008020] cursor-pointer text-white hover:bg-[#008020]/90 px-8 py-6 text-lg"
            >
              Place Another Order
            </Button>
            
            <div>
              <p className="text-muted-foreground mb-2">Need help with your order?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/2348123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
                >
                  📱 WhatsApp Support
                </a>
                <a 
                  href="mailto:fitnessambassador84@gmail.com" 
                  className="px-6 py-3 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  📧 Email Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground pt-6 border-t border-gray-200">
            <p>Your order reference: <code className="bg-gray-100 px-2 py-1 rounded">{orderData._id}</code></p>
            <p className="mt-2">Keep this reference for any inquiries about your order.</p>
          </div>
        </div>
      </div>
    );
  }

  // Original Form (Your working code)
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Order Form */}
        <div>
          <h3 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
            <Book className="w-5 h-5" />
            Order Details
          </h3>
          
          <form className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <Input
                name="fullName"
                value={customerDetails.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                disabled={isUploading}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <Input
                name="phoneNumber"
                value={customerDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="08012345678"
                required
                disabled={isUploading}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                name="email"
                type="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                disabled={isUploading}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Delivery Address *</label>
              <Textarea
                name="deliveryAddress"
                value={customerDetails.deliveryAddress}
                onChange={handleInputChange}
                placeholder="Full delivery address including city and state"
                rows={3}
                required
                disabled={isUploading}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                name="additionalNotes"
                value={customerDetails.additionalNotes}
                onChange={handleInputChange}
                placeholder="Special instructions or requests"
                rows={2}
                disabled={isUploading}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </form>

          {/* Bank Accounts */}
          <div className="mb-8">
            <h4 className="font-display text-xl text-foreground mb-4">Payment Details</h4>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {bankAccounts.map((account) => (
                <Button
                  key={account.name}
                  variant={selectedAccount === account.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAccount(account.name)}
                  disabled={isUploading}
                  className={`${selectedAccount === account.name ? 'bg-[#008020] hover:bg-[#008020]/90' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {account.name}
                </Button>
              ))}
            </div>
            
            {selectedAccountDetails && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                    <div className="flex items-center justify-between bg-background p-3 rounded-lg">
                      <code className="text-lg font-mono">{selectedAccountDetails.accountNumber}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedAccountDetails.accountNumber, 'accountNumber')}
                        className="ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUploading}
                      >
                        {copiedAccount === 'accountNumber' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                    <div className="flex items-center justify-between bg-background p-3 rounded-lg">
                      <span className="text-lg font-semibold">{selectedAccountDetails.accountName}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedAccountDetails.accountName, 'accountName')}
                        className="ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUploading}
                      >
                        {copiedAccount === 'accountName' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Use your name as payment reference
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary & Upload */}
        <div>
          <div className="sticky top-24">
            {/* Order Summary */}
            <div className="card-elevated p-6 mb-6">
              <h4 className="font-display text-xl text-foreground mb-4">Order Summary</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Workout Compass Book</span>
                  <span className="font-semibold">{formatPrice(bookPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Fee</span>
                  <span className="font-semibold">{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-lg font-display border-t border-border pt-3 mt-3">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-[#008020]">{formatPrice(totalAmount)}</span>
                </div>
              </div>
              
              {/* Receipt Upload */}
              <div className="mb-6">
                <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Payment Receipt *
                </h5>
                
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                    isUploading 
                      ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-300' 
                      : receiptFile
                      ? 'border-[#008020] bg-[#008020]/5 cursor-pointer hover:bg-[#008020]/10'
                      : 'border-border hover:border-[#008020]/50 hover:bg-muted/50 cursor-pointer'
                  }`}
                  onClick={() => !isUploading && document.getElementById('receipt-upload')?.click()}
                >
                  <input
                    id="receipt-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  
                  {receiptFile ? (
                    <div>
                      <FileText className="w-12 h-12 text-[#008020] mx-auto mb-3" />
                      <p className="font-semibold text-foreground truncate">{receiptFile.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(receiptFile.size / 1024 / 1024).toFixed(2)} MB • {!isUploading && 'Click to change'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="font-semibold text-foreground">
                        {isUploading ? 'Uploading...' : 'Click to upload receipt'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">JPG, PNG, PDF (Max 5MB)</p>
                    </div>
                  )}
                </div>
                
                {receiptFile && (
                  <div className="text-sm text-green-600 flex items-center gap-2 mt-3">
                    <Check className="w-4 h-4" />
                    Receipt uploaded successfully
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <Button
                className="w-full bg-[#008020] cursor-pointer text-white hover:bg-[#008020]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={!receiptFile || isUploading || !customerDetails.fullName || !customerDetails.phoneNumber || !customerDetails.deliveryAddress}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing Order...
                  </>
                ) : (
                  'Complete Order'
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-3">
                * Required fields must be filled
              </p>
            </div>
            
            {/* Important Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-2">How It Works:</p>
                  <ol className="space-y-1 text-sm text-muted-foreground">
                    <li>1. Make payment to our account</li>
                    <li>2. Upload payment receipt</li>
                    <li>3. Submit your order</li>
                    <li>4. We verify payment (within 24 hours)</li>
                    <li>5. Book is shipped to your address</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-3">
                    Need help?{' '}
                    <a 
                      href="https://wa.me/2348123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#008020] hover:underline font-semibold"
                    >
                      WhatsApp us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPurchaseForm;