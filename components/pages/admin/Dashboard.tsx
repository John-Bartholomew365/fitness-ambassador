"use client"

import { motion } from 'framer-motion'
import { Package, DollarSign, UserPlus, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'

const mockStats = [
  { title: 'Total Orders', value: '156', change: '+12%', icon: Package },
  { title: 'Revenue', value: '₦2.4M', change: '+8%', icon: DollarSign },
  { title: 'Subscribers', value: '1,234', change: '+23%', icon: UserPlus },
  { title: 'Page Views', value: '45.2K', change: '+15%', icon: TrendingUp },
]

const mockOrders = [
  { id: '#001', customer: 'John Doe', product: 'Tank Top - Black', amount: '₦8,500', status: 'Delivered', date: '2024-12-14' },
  { id: '#002', customer: 'Jane Smith', product: 'Training Shorts', amount: '₦12,000', status: 'Pending', date: '2024-12-14' },
  { id: '#003', customer: 'Mike Johnson', product: 'Workout Compass', amount: '₦5,000', status: 'Processing', date: '2024-12-13' },
  { id: '#004', customer: 'Sarah Williams', product: 'Sports Bra - Green', amount: '₦10,500', status: 'Delivered', date: '2024-12-13' },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered': return 'bg-primary/10 text-primary'
    case 'pending': return 'bg-secondary/50 text-foreground'
    case 'processing': return 'bg-tertiary/20 text-tertiary'
    default: return 'bg-muted text-muted-foreground'
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-primary mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your shop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
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