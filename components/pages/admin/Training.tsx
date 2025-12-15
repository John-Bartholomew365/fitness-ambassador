"use client"

import { useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TrainingBooking = {
  id: number
  fullName: string
  email: string
  phone: string
  service: 'Personal Training' | 'Group Training' | 'Online Coaching'
  fitnessExperience: 'Beginner' | 'Intermediate' | 'Advanced'
  goals: string[]
  preferredTime: string
  date: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
}

const initialBookings: TrainingBooking[] = [
  {
    id: 1,
    fullName: 'John Adewale',
    email: 'john@example.com',
    phone: '08012345678',
    service: 'Personal Training',
    fitnessExperience: 'Intermediate',
    goals: ['Weight Loss', 'Muscle Building'],
    preferredTime: 'Morning',
    date: '2024-12-14',
    status: 'Pending'
  },
  {
    id: 2,
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '08023456789',
    service: 'Online Coaching',
    fitnessExperience: 'Beginner',
    goals: ['General Fitness', 'Nutrition Guidance'],
    preferredTime: 'Evening',
    date: '2024-12-13',
    status: 'Confirmed'
  },
  {
    id: 3,
    fullName: 'Michael Chen',
    email: 'michael@example.com',
    phone: '08034567890',
    service: 'Group Training',
    fitnessExperience: 'Advanced',
    goals: ['Athletic Performance', 'Flexibility'],
    preferredTime: 'Afternoon',
    date: '2024-12-12',
    status: 'Completed'
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'confirmed': return 'bg-blue-100 text-blue-800'
    case 'completed': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function Training() {
  const [selectedBooking, setSelectedBooking] = useState<TrainingBooking | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const pendingBookings = initialBookings.filter(b => b.status === 'Pending')
  const confirmedBookings = initialBookings.filter(b => b.status === 'Confirmed')
  const completedBookings = initialBookings.filter(b => b.status === 'Completed')

  const viewDetails = (booking: TrainingBooking) => {
    setSelectedBooking(booking)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Training Bookings</h2>
        <Button variant="outline" className="cursor-pointer">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="cursor-pointer">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="cursor-pointer">
            Confirmed ({confirmedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="cursor-pointer">
            Completed ({completedBookings.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          <BookingsTable 
            bookings={pendingBookings} 
            onViewDetails={viewDetails}
          />
        </TabsContent>
        
        <TabsContent value="confirmed" className="mt-4">
          <BookingsTable 
            bookings={confirmedBookings} 
            onViewDetails={viewDetails}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <BookingsTable 
            bookings={completedBookings} 
            onViewDetails={viewDetails}
          />
        </TabsContent>
      </Tabs>

      {/* Booking Details Modal */}
      {selectedBooking && isDetailsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <div className="flex justify-between items-center">
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {selectedBooking.status}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsDetailsOpen(false)}
                  className="cursor-pointer"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p><strong>Name:</strong> {selectedBooking.fullName}</p>
                  <p><strong>Email:</strong> {selectedBooking.email}</p>
                  <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Service Details</h3>
                  <p><strong>Service:</strong> {selectedBooking.service}</p>
                  <p><strong>Preferred Time:</strong> {selectedBooking.preferredTime}</p>
                  <p><strong>Booking Date:</strong> {selectedBooking.date}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Fitness Profile</h3>
                <p><strong>Experience Level:</strong> {selectedBooking.fitnessExperience}</p>
                <p><strong>Goals:</strong></p>
                <ul className="list-disc pl-5 mt-1">
                  {selectedBooking.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" className="cursor-pointer">
                  Confirm Booking
                </Button>
                <Button className="cursor-pointer">
                  Contact Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function BookingsTable({ bookings, onViewDetails }: { 
  bookings: TrainingBooking[], 
  onViewDetails: (booking: TrainingBooking) => void 
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Goals</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.fullName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{booking.email}</div>
                      <div className="text-muted-foreground">{booking.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>
                    <Badge className={
                      booking.fitnessExperience === 'Beginner' ? 'bg-green-100 text-green-800' :
                      booking.fitnessExperience === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {booking.fitnessExperience}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-[150px] truncate">
                      {booking.goals.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(booking)}
                      className="cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}