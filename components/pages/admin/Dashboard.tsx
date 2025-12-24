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
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-primary mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Latest orders from your shop</CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6 pb-4 sm:pb-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4">Order ID</TableHead>
                      <TableHead className="hidden sm:table-cell">Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden xs:table-cell">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-4 font-medium">{order.id}</TableCell>
                        <TableCell className="hidden sm:table-cell">{order.customer}</TableCell>
                        <TableCell className="max-w-[120px] sm:max-w-none truncate">{order.product}</TableCell>
                        <TableCell className="hidden xs:table-cell">{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
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