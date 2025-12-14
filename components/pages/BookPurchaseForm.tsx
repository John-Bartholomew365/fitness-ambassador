'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';
import { Copy, Check, Upload, FileText, Shield, Book, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface BankAccount {
  name: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  icon: React.ReactNode;
}

const BookPurchaseForm = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('access');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    additionalNotes: '',
  });

  const bookPrice = 5000; // ₦5,000
  const shippingFee = 500; // ₦500
  const totalAmount = bookPrice + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const bankAccounts: BankAccount[] = [
    {
      name: 'Access Bank',
      bank: 'Access Bank',
      accountNumber: '1234567890',
      accountName: 'FITNESS AMBASSADOR LTD',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      name: 'First Bank',
      bank: 'First Bank',
      accountNumber: '0987654321',
      accountName: 'FITNESS AMBASSADOR LTD',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      name: 'OPay',
      bank: 'OPay',
      accountNumber: '07012345678',
      accountName: 'FITNESS AMBASSADOR',
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];

  const selectedAccountDetails = bankAccounts.find(acc => acc.name.toLowerCase() === selectedAccount);

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
    
    if (!receiptFile) {
      toast.error('Please upload your payment receipt');
      return;
    }

    if (!customerDetails.fullName || !customerDetails.phoneNumber || !customerDetails.deliveryAddress) {
      toast.error('Please fill in all required customer details');
      return;
    }

    setIsUploading(true);

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      
      // Create order data
      const orderData = {
        product: 'Workout Compass Book',
        price: bookPrice,
        shippingFee,
        totalAmount,
        customerDetails,
        paymentDetails: {
          account: selectedAccountDetails,
          receiptFile: receiptFile.name,
        },
      };

      console.log('Book order submitted:', orderData);
      
      toast.success('Order submitted successfully! We will review your receipt and contact you shortly.');
      
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
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Success Screen
  if (orderSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        
        <h3 className="font-display text-3xl text-foreground mb-4">
          Book Order Submitted!
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Thank you for purchasing Workout Compass! Your order has been received and is being processed.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <p className="font-display text-2xl text-[#008020] mb-4">{formatPrice(totalAmount)}</p>
          <p className="text-muted-foreground">
            We have received your payment receipt and will review it within 24 hours.
          </p>
          <p className="text-muted-foreground mt-2">
            We will contact you at <strong>{customerDetails.phoneNumber}</strong> to confirm delivery details.
          </p>
        </div>
        
        <Button
          onClick={() => setOrderSubmitted(false)}
          className="bg-[#008020] cursor-pointer text-white hover:bg-[#008020]/90"
        >
          Place Another Order
        </Button>
      </div>
    );
  }

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
                  variant={selectedAccount === account.name.toLowerCase() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAccount(account.name.toLowerCase())}
                  className={selectedAccount === account.name.toLowerCase() ? 'bg-[#008020]' : ''}
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
                        className="ml-2"
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
                        className="ml-2"
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
                  <span className="text-foreground">Total</span>
                  <span className="text-[#008020]">{formatPrice(totalAmount)}</span>
                </div>
              </div>
              
              {/* Receipt Upload */}
              <div className="mb-6">
                <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Payment Receipt
                </h5>
                
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                    receiptFile
                      ? 'border-[#008020] bg-[#008020]/5'
                      : 'border-border hover:border-[#008020]/50 hover:bg-muted/50'
                  }`}
                  onClick={() => document.getElementById('receipt-upload')?.click()}
                >
                  <input
                    id="receipt-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  
                  {receiptFile ? (
                    <div>
                      <FileText className="w-12 h-12 text-[#008020] mx-auto mb-3" />
                      <p className="font-semibold text-foreground">{receiptFile.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(receiptFile.size / 1024 / 1024).toFixed(2)} MB • Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="font-semibold text-foreground">Click to upload receipt</p>
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
                className="w-full bg-[#008020] cursor-pointer text-white hover:bg-[#008020]/90"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={!receiptFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Complete Order'
                )}
              </Button>
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