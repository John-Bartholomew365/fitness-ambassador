"use client"

import { useState } from 'react'
import { Trash2, Search, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Order = {
  id: string
  customer: string
  email: string
  phone: string
  product: string
  productImage: string
  size: string
  color: string
  quantity: number
  amount: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
  address: string
}

const initialOrders: Order[] = [
  {
    id: '#001',
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '08012345678',
    product: 'FA Power Leggings',
    productImage: '/api/placeholder/50/50',
    size: 'M',
    color: 'Black',
    quantity: 2,
    amount: '₦36,000',
    status: 'Processing',
    date: '2024-12-14',
    address: '123 Main St, Lagos'
  },
  {
    id: '#002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    phone: '08023456789',
    product: 'Performance Tank Top',
    productImage: '/api/placeholder/50/50',
    size: 'L',
    color: 'Blue',
    quantity: 1,
    amount: '₦8,500',
    status: 'Pending',
    date: '2024-12-14',
    address: '456 Oak Ave, Abuja'
  },
  {
    id: '#003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '08034567890',
    product: 'Training Shorts',
    productImage: '/api/placeholder/50/50',
    size: 'XL',
    color: 'Gray',
    quantity: 1,
    amount: '₦12,000',
    status: 'Delivered',
    date: '2024-12-13',
    address: '789 Pine Rd, Ilorin'
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'processing': return 'bg-blue-100 text-blue-800'
    case 'shipped': return 'bg-purple-100 text-purple-800'
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function Shop() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Orders Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="cursor-pointer w-full sm:w-auto">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
          <Input
            placeholder="Search orders..."
            className="pl-8 sm:pl-10 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4">Order</TableHead>
                      <TableHead className="hidden lg:table-cell">Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Product</TableHead>
                      <TableHead className="hidden sm:table-cell">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden xs:table-cell">Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-4 font-medium">{order.id}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-xs text-muted-foreground">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-muted rounded-md flex items-center justify-center shrink-0">
                              <div className="text-xs text-center">Img</div>
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate max-w-[120px]">{order.product}</div>
                              <div className="text-xs text-muted-foreground">
                                {order.size} | {order.color}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{order.amount}</TableCell>
                        <TableCell>
                          <select
                            className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusColor(order.status)}`}
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </TableCell>
                        <TableCell className="hidden xs:table-cell">{order.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 sm:gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer"
                              onClick={() => {/* View details */}}
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 sm:h-9 sm:w-9 text-destructive cursor-pointer"
                              onClick={() => deleteOrder(order.id)}
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}