'use client';

import { useState } from 'react';
import { motion, useReducedMotion, Easing } from 'framer-motion';
import { Copy, Check, Upload, FileText, Shield, Truck, AlertCircle, Banknote, CreditCard, Smartphone, ShoppingBag, ArrowLeft, CheckCircle, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useCart } from '../loaders/CartContext';

interface BankAccount {
  name: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  type: string;
  icon: React.ReactNode;
}

const CheckoutPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('access');
  const [paymentMethod, setPaymentMethod] = useState<string>('bank-transfer');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    additionalNotes: '',
  });

  // Get cart from context
  const { cart, cartTotal, clearCart } = useCart();
  
  const shippingFee = 1500;
  const totalAmount = cartTotal + shippingFee;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

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
      type: 'bank-transfer',
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      name: 'First Bank',
      bank: 'First Bank',
      accountNumber: '0987654321',
      accountName: 'FITNESS AMBASSADOR LTD',
      type: 'bank-transfer',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      name: 'OPay',
      bank: 'OPay',
      accountNumber: '07012345678',
      accountName: 'FITNESS AMBASSADOR',
      type: 'mobile-transfer',
      icon: <Smartphone className="w-6 h-6" />,
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
    
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
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
      
      // Generate order number
      const generatedOrderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setOrderNumber(generatedOrderNumber);
      
      // Create order data
      const orderData = {
        orderNumber: generatedOrderNumber,
        customerDetails,
        paymentDetails: {
          method: paymentMethod,
          account: selectedAccountDetails,
          receiptFile: receiptFile.name,
        },
        orderItems: cart,
        totals: {
          subtotal: cartTotal,
          shippingFee,
          totalAmount,
        },
      };

      console.log('Order submitted:', orderData);
      
      // Clear cart and show success
      clearCart();
      setOrderSubmitted(true);
      
      toast.success('Order submitted successfully! We will review your receipt and contact you shortly.');
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
      <div className="min-h-screen bg-background">
        <header className="py-6 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40">
          <div className="container-max">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-display text-lg font-bold">Order Confirmed</span>
              </div>
            </div>
          </div>
        </header>

        <main className="py-8 md:py-12">
          <div className="container-max">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  Order Submitted Successfully!
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6 leading-tight">
                  Thank you for your purchase. <br /> Your order has been received and is being processed.
                </p>
                
                <div className="bg-muted/50 rounded-2xl p-6 mb-8">
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    Order Number: {orderNumber}
                  </div>
                  
                  <p className="font-display text-2xl text-primary mb-4">{formatPrice(totalAmount)}</p>
                  
                  <p className="text-muted-foreground mb-2">
                    We have received your payment receipt and will review it within 24 hours.
                  </p>
                  <p className="text-muted-foreground">
                    We will contact you at <strong>{customerDetails.phoneNumber}</strong> to confirm your order details.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      What Happens Next?
                    </h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">1</span>
                        <span>We review your payment receipt (within 24 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">2</span>
                        <span>We contact you to confirm delivery address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">3</span>
                        <span>Your order is prepared and shipped</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">4</span>
                        <span>You receive tracking information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">5</span>
                        <span>Delivery within 3-7 business days</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/shop">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                        Continue Shopping
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="cursor-pointer">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-8 text-sm text-muted-foreground">
                    <p>Need immediate assistance?</p>
                    <a 
                      href="https://wa.me/2348163702286" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold inline-flex items-center gap-2 mt-1"
                    >
                      Contact us on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Empty Cart Screen
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your cart before checkout</p>
          <Link href="/shop">
            <Button className="bg-primary text-primary-foreground">
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main Checkout Form
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="container-max">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Shop</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-bold">Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="container-max">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:max-w-6xl max-w-full mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Complete Your Purchase
              </h1>
              <p className="text-muted-foreground">
                Follow these steps to complete your order
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Customer Details Form */}
                <motion.div variants={itemVariants} className="card-elevated p-6">
                  <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Customer Details
                  </h2>
                  
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                </motion.div>

                {/* Payment Methods */}
                <motion.div variants={itemVariants} className="card-elevated p-6">
                  <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={paymentMethod === 'bank-transfer' ? 'default' : 'outline'}
                        className={`flex-1 cursor-pointer ${paymentMethod === 'bank-transfer' ? 'bg-primary' : ''}`}
                        onClick={() => setPaymentMethod('bank-transfer')}
                      >
                        <Banknote className="w-4 h-4 mr-2" />
                        Bank Transfer
                      </Button>
                      <Button
                        variant={paymentMethod === 'mobile-transfer' ? 'default' : 'outline'}
                        className={`flex-1 cursor-pointer ${paymentMethod === 'mobile-transfer' ? 'bg-primary' : ''}`}
                        onClick={() => setPaymentMethod('mobile-transfer')}
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Mobile Transfer
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Make payment to one of our accounts and upload the receipt
                    </div>
                  </div>
                </motion.div>

                {/* Bank Accounts */}
                <motion.div variants={itemVariants} className="card-elevated p-6">
                  <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Bank Account Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bankAccounts.map((account) => (
                        <Button
                          key={account.name}
                          variant={selectedAccount === account.name.toLowerCase() ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedAccount(account.name.toLowerCase())}
                          className={selectedAccount === account.name.toLowerCase() ? 'bg-primary cursor-pointer' : 'cursor-pointer'}
                        >
                          {account.name}
                        </Button>
                      ))}
                    </div>
                    
                    {selectedAccountDetails && (
                      <div className="space-y-4 p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                            {selectedAccountDetails.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{selectedAccountDetails.bank}</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedAccountDetails.type === 'bank-transfer' ? 'Bank Account' : 'Mobile Wallet'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                            <div className="flex items-center justify-between bg-background p-3 rounded-lg">
                              <code className="text-lg font-mono">{selectedAccountDetails.accountNumber}</code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(selectedAccountDetails.accountNumber, 'accountNumber')}
                                className="ml-2 cursor-pointer"
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
                                className="ml-2 cursor-pointer"
                              >
                                {copiedAccount === 'accountName' ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 " />
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
                </motion.div>

                {/* Receipt Upload */}
                <motion.div variants={itemVariants} className="card-elevated p-6">
                  <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Payment Receipt
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Upload a clear screenshot/photo of your payment receipt.</p>
                      <p className="mt-1">Formats: JPG, PNG, PDF (Max 5MB)</p>
                    </div>
                    
                    <div
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                        receiptFile
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
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
                          <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
                          <p className="font-semibold text-foreground">{receiptFile.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(receiptFile.size / 1024 / 1024).toFixed(2)} MB • Click to change
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                          <p className="font-semibold text-foreground">Click to upload receipt</p>
                          <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
                        </div>
                      )}
                    </div>
                    
                    {receiptFile && (
                      <div className="text-sm text-green-600 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Receipt uploaded successfully
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Order Summary */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="card-elevated p-6 sticky top-24">
                  <h2 className="font-display text-2xl text-foreground mb-6">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                          <p className="text-primary font-semibold mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Totals */}
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-display border-t border-border pt-3 mt-3">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    className="w-full mt-6 bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={!receiptFile || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Submit Order'
                    )}
                  </Button>
                  
                  {/* Security Note */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Secure Order Process</p>
                        <p className="text-xs text-muted-foreground">
                          We&apos;ll review your payment and contact you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Support Info */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Need help?{' '}
                      <a 
                        href="https://wa.me/2348163702286" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        WhatsApp us
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Delivery Info */}
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Delivery Information</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>Delivery within 3-7 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>Nationwide delivery available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>Free delivery on orders above ₦50,000</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Important Notes */}
            <motion.div variants={itemVariants} className="mt-12">
              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Important Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Payment Process:</p>
                    <ul className="space-y-1">
                      <li>1. Make payment to our account details above</li>
                      <li>2. Upload clear receipt screenshot</li>
                      <li>3. Submit your order</li>
                      <li>4. We verify payment and contact you</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">What Happens Next:</p>
                    <ul className="space-y-1">
                      <li>• Order confirmation via SMS/Email</li>
                      <li>• Payment review within 24 hours</li>
                      <li>• Delivery details confirmed</li>
                      <li>• Tracking number provided</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;