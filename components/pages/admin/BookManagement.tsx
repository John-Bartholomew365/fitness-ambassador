"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Eye, CheckCircle, XCircle, RefreshCw, User, FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import { authService } from '@/lib/auth'

// Types
interface BookOrder {
  _id: string
  fullName: string
  phoneNumber: string
  email: string
  deliveryAddress: string
  additionalNotes: string
  product: string
  productPrice: number
  shippingFee: number
  totalAmount: number
  paymentReceipt: string
  paymentStatus: 'pending' | 'confirmed' | 'failed'
  orderStatus: string
  adminMessage: string
  createdAt: string
  updatedAt: string
}

interface BookManagementOrder {
  id: string
  customer: string
  email: string
  phone: string
  format: 'Digital' | 'Physical'
  quantity: number
  amount: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
  deliveryAddress?: string
  _id: string
  paymentStatus: 'pending' | 'confirmed' | 'failed'
  adminMessage?: string
  productPrice: number
  shippingFee: number
  totalAmount: number
  paymentReceipt: string
  additionalNotes: string
  fullName: string
}

interface ApiResponse {
  success: boolean
  count: number
  data?: BookOrder[]
  message?: string
}

// Rejection Modal Component
interface RejectionModalProps {
  isOpen: boolean
  order: BookManagementOrder | null
  onClose: () => void
  onSubmit: (reason: string) => Promise<void>
  isLoading: boolean
}

const RejectionModal: React.FC<RejectionModalProps> = ({ isOpen, order, onClose, onSubmit, isLoading }) => {
  const [reason, setReason] = useState('')

  useEffect(() => {
    let mounted = true
    if (isOpen) {
      // Schedule the state update to avoid synchronous setState within the effect
      const id = setTimeout(() => {
        if (!mounted) return
        if (order?.adminMessage) {
          setReason(order.adminMessage)
        } else {
          setReason('')
        }
      }, 0)

      return () => {
        mounted = false
        clearTimeout(id)
      }
    }
    return () => {
      mounted = false
    }
  }, [isOpen, order])

  if (!isOpen || !order) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (reason.trim()) {
      await onSubmit(reason.trim())
    } else {
      toast.error('Please provide a reason for rejection')
    }
  }

  return (
    <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">Reject Payment</h3>
          <p className="text-sm text-gray-600 mt-1">
            Please provide a reason for rejecting payment for order: <strong>{order.id}</strong>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Reason for Rejection *</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Payment receipt is unclear, please re-upload."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This message will be sent to the customer.
            </p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Reject Payment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Order Details Modal Component
interface OrderDetailsModalProps {
  isOpen: boolean
  order: BookManagementOrder | null
  onClose: () => void
  onStatusUpdate: (orderId: string, status: 'confirmed' | 'failed', adminMessage?: string) => Promise<void>
  isUpdating: boolean
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, order, onClose, onStatusUpdate, isUpdating }) => {
  const [selectedStatus, setSelectedStatus] = useState<'confirmed' | 'failed'>(() => order ? (order.paymentStatus === 'failed' ? 'failed' : 'confirmed') : 'confirmed')
  const [rejectionReason, setRejectionReason] = useState(() => order?.adminMessage || '')
  const [showRejectionInput, setShowRejectionInput] = useState(() => !!order && order.paymentStatus === 'failed')

  if (!isOpen || !order) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStatus === 'failed' && !rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection')
      return
    }
    
    await onStatusUpdate(
      order._id, 
      selectedStatus, 
      selectedStatus === 'failed' ? rejectionReason.trim() : undefined
    )
  }

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 lg:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg lg:rounded-2xl w-full max-w-[95vw] lg:max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">Order Details</h2>
              <p className="text-gray-600 text-sm lg:text-base truncate">ID: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Customer Info */}
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Full Name</label>
                    <div className="font-medium text-sm lg:text-base">{order.fullName}</div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Email Address</label>
                    <div className="font-medium text-sm lg:text-base truncate">{order.email}</div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Phone Number</label>
                    <div className="font-medium text-sm lg:text-base">{order.phone}</div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Delivery Address</label>
                    <div className="font-medium text-sm lg:text-base">
                      {order.deliveryAddress || 'Digital Delivery'}
                    </div>
                  </div>
                  {order.additionalNotes && (
                    <div>
                      <label className="text-xs lg:text-sm text-gray-500">Additional Notes</label>
                      <div className="font-medium text-sm lg:text-base bg-gray-50 p-3 rounded-lg">
                        {order.additionalNotes}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Order Timeline
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Order Date</label>
                    <div className="font-medium text-sm lg:text-base">{order.date}</div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Order Status</label>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order & Payment Info */}
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Order Information
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Product</label>
                    <div className="font-medium text-sm lg:text-base">Workout Compass Book</div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Format</label>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.format === 'Digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {order.format}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500">Quantity</label>
                    <div className="font-medium text-sm lg:text-base">{order.quantity}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Book Price:</span>
                      <span className="font-medium">{formatCurrency(order.productPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Shipping Fee:</span>
                      <span className="font-medium">{formatCurrency(order.shippingFee)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-base font-semibold">Total Amount:</span>
                      <span className="text-lg font-bold text-[#ff8a00]">{order.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Payment Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs lg:text-sm text-gray-500 mb-2 block">Current Status</label>
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      order.paymentStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus === 'confirmed' ? '✓ Confirmed' :
                       order.paymentStatus === 'failed' ? '✗ Failed' : '⏳ Pending'}
                    </div>
                    {order.adminMessage && order.paymentStatus === 'failed' && (
                      <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                        {order.adminMessage}
                      </div>
                    )}
                  </div>

                  {order.paymentStatus === 'pending' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Update Payment Status</h4>
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStatus('confirmed')
                              setShowRejectionInput(false)
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedStatus === 'confirmed'
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ✓ Confirm Payment
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStatus('failed')
                              setShowRejectionInput(true)
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedStatus === 'failed'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ✗ Reject Payment
                          </button>
                        </div>

                        {showRejectionInput && (
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Reason for Rejection *</label>
                            <textarea
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="e.g., Payment receipt is unclear, please re-upload."
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              rows={3}
                              required
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isUpdating || (selectedStatus === 'failed' && !rejectionReason.trim())}
                          className={`w-full py-2.5 bg-[#008020] text-white font-semibold rounded-lg hover:bg-[#006a1a] transition-colors text-sm flex items-center justify-center gap-2 ${
                            isUpdating || (selectedStatus === 'failed' && !rejectionReason.trim())
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {isUpdating ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                            </>
                          ) : (
                            'Update Payment Status'
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {order.paymentReceipt && (
                    <div>
                      <button
                        onClick={() => window.open(order.paymentReceipt, '_blank')}
                        className="w-full py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Payment Receipt
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 border-t border-gray-100 bg-gray-50 rounded-b-lg lg:rounded-b-2xl">
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 lg:px-6 py-2 lg:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg lg:rounded-xl hover:border-gray-400 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Status Badge Component
const StatusBadge: React.FC<{ status: string; type?: 'payment' | 'order' }> = ({ status, type = 'order' }) => {
  const getStatusConfig = () => {
    if (type === 'payment') {
      switch (status.toLowerCase()) {
        case 'confirmed':
          return { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' }
        case 'failed':
          return { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' }
        case 'pending':
        default:
          return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }
      }
    } else {
      switch (status.toLowerCase()) {
        case 'delivered':
          return { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' }
        case 'shipped':
          return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shipped' }
        case 'processing':
          return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' }
        case 'cancelled':
          return { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
        case 'pending':
        default:
          return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }
      }
    }
  }

  const config = getStatusConfig()

  return (
    <span className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className="mr-1">
        {type === 'payment' ? (
          status === 'confirmed' ? '✓' :
          status === 'failed' ? '✗' : '⏳'
        ) : (
          status === 'delivered' ? '✓' :
          status === 'cancelled' ? '✗' : '⏳'
        )}
      </span>
      <span>{config.label}</span>
    </span>
  )
}

export default function BookManagement() {
  const [orders, setOrders] = useState<BookManagementOrder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFormat, setSelectedFormat] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<BookManagementOrder | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [orderToReject, setOrderToReject] = useState<BookManagementOrder | null>(null)

  // Transform API data to match component format
  const transformOrder = useCallback((order: BookOrder): BookManagementOrder => {
    const safeTotalAmount = order.totalAmount || 0
    const safeProductPrice = order.productPrice || 0
    const safeShippingFee = order.shippingFee || 0
    
    const format = order.deliveryAddress && 
                   order.deliveryAddress.toLowerCase() !== 'digital delivery' &&
                   order.deliveryAddress.trim() !== ''
      ? 'Physical' 
      : 'Digital'
    
    let status: BookManagementOrder['status'] = 'Pending'
    if (order.paymentStatus === 'confirmed') {
      status = 'Processing'
    } else if (order.paymentStatus === 'failed') {
      status = 'Cancelled'
    }

    const shortId = `#${order._id.slice(-4).toUpperCase()}`

    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return {
      id: shortId,
      customer: order.fullName || 'Unknown Customer',
      email: order.email || '',
      phone: order.phoneNumber || '',
      format,
      quantity: 1,
      amount: `₦${safeTotalAmount.toLocaleString()}`,
      status,
      date: formattedDate,
      deliveryAddress: order.deliveryAddress || 'Digital Delivery',
      _id: order._id,
      paymentStatus: order.paymentStatus || 'pending',
      adminMessage: order.adminMessage,
      productPrice: safeProductPrice,
      shippingFee: safeShippingFee,
      totalAmount: safeTotalAmount,
      paymentReceipt: order.paymentReceipt || '',
      additionalNotes: order.additionalNotes || '',
      fullName: order.fullName || ''
    }
  }, [])

  // Fetch orders from API
  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = authService.getToken()
      if (!token) {
        toast.error('Please login to view orders')
        setOrders([])
        return
      }

      const response = await fetch('/api/get-book-order', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      if (data.success && data.data) {
        const transformedOrders = data.data.map(transformOrder)
        setOrders(transformedOrders)
      } else {
        toast.error(data.message || 'Failed to fetch orders')
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders. Please try again.')
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }, [transformOrder])

  // Update order status
  const updateOrderStatus = useCallback(async (orderId: string, status: 'confirmed' | 'failed', adminMessage?: string) => {
    setIsUpdating(true)
    try {
      const token = authService.getToken()
      if (!token) {
        toast.error('Please login to update orders')
        return
      }

      const payload: { id: string; paymentStatus: 'confirmed' | 'failed'; adminMessage?: string } = { 
        id: orderId, 
        paymentStatus: status 
      }
      if (adminMessage) {
        payload.adminMessage = adminMessage
      }

      const response = await fetch('/api/update-order', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message || 'Order updated successfully')
        fetchOrders()
        setShowRejectionModal(false)
        setOrderToReject(null)
      } else {
        toast.error(data.message || 'Failed to update order')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order')
    } finally {
      setIsUpdating(false)
    }
  }, [fetchOrders])

  // Handle order click
  const handleOrderClick = (order: BookManagementOrder) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  // Handle status update from modal
  const handleStatusUpdate = async (orderId: string, status: 'confirmed' | 'failed', adminMessage?: string) => {
    await updateOrderStatus(orderId, status, adminMessage)
  }

  // Handle rejection from modal
  const handleRejectionSubmit = async (reason: string) => {
    if (orderToReject) {
      await updateOrderStatus(orderToReject._id, 'failed', reason)
    }
  }

  // Handle reject button click
  const handleRejectClick = (order: BookManagementOrder) => {
    setOrderToReject(order)
    setShowRejectionModal(true)
  }

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFormat = selectedFormat === 'all' || order.format === selectedFormat
    
    return matchesSearch && matchesFormat
  })

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.paymentStatus === 'pending').length
  const confirmedOrders = orders.filter(o => o.paymentStatus === 'confirmed').length

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div className="min-h-screen p-0 md:p-4 lg:p-8 w-[95%]">
      <div className="max-w-[100vw] lg:max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 lg:mb-8 px-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Workout Compass Orders</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">View and manage all book orders</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8 px-1">
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-gray-900">{totalOrders}</div>
            <div className="text-xs lg:text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-yellow-600">{pendingOrders}</div>
            <div className="text-xs lg:text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-green-600">{confirmedOrders}</div>
            <div className="text-xs lg:text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100 col-span-2 lg:col-span-1">
            <div className="text-xl lg:text-3xl font-bold text-[#ff8a00]">
              ₦{orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs lg:text-sm text-gray-500">Total Revenue</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008020] focus:border-transparent outline-none"
                />
              </div>

              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008020] focus:border-transparent outline-none"
              >
                <option value="all">All Formats</option>
                <option value="Digital">Digital</option>
                <option value="Physical">Physical</option>
              </select>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              <Button 
                variant="outline" 
                className="cursor-pointer flex-1 lg:flex-none"
                onClick={fetchOrders}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> 
                {isLoading ? 'Loading...' : 'Refresh'}
              </Button>
              <Button 
                variant="outline" 
                className="cursor-pointer flex-1 lg:flex-none"
                onClick={() => {
                  toast.success('Export functionality coming soon')
                }}
              >
                <Download className="w-4 h-4 mr-2" /> 
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full lg:min-w-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Contact
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Format
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Payment Status
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Order Status
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <code className="text-xs lg:text-sm font-mono text-gray-900">{order.id}</code>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div 
                        className="font-medium text-gray-900 text-sm lg:text-base cursor-pointer hover:text-[#008020] transition-colors"
                        onClick={() => handleOrderClick(order)}
                      >
                        {order.customer}
                      </div>
                      {order.additionalNotes && (
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                          Note: {order.additionalNotes}
                        </div>
                      )}
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap min-w-[150px]">
                      <div className="text-xs lg:text-sm truncate">{order.email}</div>
                      <div className="text-xs text-gray-500 truncate">{order.phone}</div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <Badge className={`text-xs ${order.format === 'Digital' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                      }`}>
                        {order.format}
                      </Badge>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="font-medium text-sm lg:text-base">{order.amount}</div>
                      <div className="text-xs text-gray-500">
                        (₦{order.productPrice?.toLocaleString() || '0'} + ₦{order.shippingFee?.toLocaleString() || '0'} shipping)
                      </div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <StatusBadge status={order.paymentStatus} type="payment" />
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} type="order" />
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm">{order.date}</div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={() => handleOrderClick(order)}
                          className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        {order.paymentStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'confirmed')}
                              disabled={isUpdating}
                              className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
                              title="Confirm Payment"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Confirm
                            </button>
                            <button
                              onClick={() => handleRejectClick(order)}
                              disabled={isUpdating}
                              className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
                              title="Reject Payment"
                            >
                              <XCircle className="w-3 h-3" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8 lg:py-12 px-4">
                <div className="text-gray-400 mb-2 lg:mb-4">
                  {orders.length === 0 ? 'No orders found' : 'No orders match your search criteria'}
                </div>
                <div className="text-gray-500 text-xs lg:text-sm">
                  {orders.length === 0 ? 'Try refreshing or check your internet connection' : 'Try adjusting your search or filter'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          isOpen={showDetailsModal}
          order={selectedOrder}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedOrder(null)
          }}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isUpdating}
        />
      )}

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={showRejectionModal}
        order={orderToReject}
        onClose={() => {
          setShowRejectionModal(false)
          setOrderToReject(null)
        }}
        onSubmit={handleRejectionSubmit}
        isLoading={isUpdating}
      />
    </div>
  )
}