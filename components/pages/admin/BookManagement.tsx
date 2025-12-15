"use client"

import { useState } from 'react'
import { Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'

type BookOrder = {
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
}

const initialOrders: BookOrder[] = [
  {
    id: '#B001',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '08012345678',
    format: 'Digital',
    quantity: 1,
    amount: '₦5,000',
    status: 'Processing',
    date: '2024-12-14',
  },
  {
    id: '#B002',
    customer: 'David Wilson',
    email: 'david@example.com',
    phone: '08023456789',
    format: 'Physical',
    quantity: 1,
    amount: '₦5,000',
    status: 'Shipped',
    date: '2024-12-13',
    deliveryAddress: '123 Book St, Lagos'
  },
  {
    id: '#B003',
    customer: 'Emma Thompson',
    email: 'emma@example.com',
    phone: '08034567890',
    format: 'Digital',
    quantity: 1,
    amount: '₦5,000',
    status: 'Delivered',
    date: '2024-12-12',
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

export default function BookManagement() {
  const [orders, setOrders] = useState<BookOrder[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFormat, setSelectedFormat] = useState<string>('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFormat = selectedFormat === 'all' || order.format === selectedFormat
    
    return matchesSearch && matchesFormat
  })

  const updateOrderStatus = (orderId: string, newStatus: BookOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + parseInt(order.amount.replace(/[^0-9]/g, ''))
  }, 0)

  const digitalSales = orders.filter(o => o.format === 'Digital').length
  const physicalSales = orders.filter(o => o.format === 'Physical').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Workout Compass Orders</h2>
        <Button variant="outline" className="cursor-pointer">
          <Download className="w-4 h-4 mr-2" /> Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{digitalSales}</div>
            <p className="text-sm text-muted-foreground">Digital Sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{physicalSales}</div>
            <p className="text-sm text-muted-foreground">Physical Sales</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search book orders..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <option value="all">All Formats</option>
          <option value="Digital">Digital</option>
          <option value="Physical">Physical</option>
        </select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{order.email}</div>
                        <div className="text-muted-foreground">{order.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        order.format === 'Digital' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }>
                        {order.format}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <select
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusColor(order.status)}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as BookOrder['status'])}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                        {order.deliveryAddress || 'Digital Delivery'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}