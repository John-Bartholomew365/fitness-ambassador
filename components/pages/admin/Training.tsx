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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Training Bookings</h2>
        <Button variant="outline" className="cursor-pointer w-full sm:w-auto">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Export
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="cursor-pointer text-xs sm:text-sm">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="cursor-pointer text-xs sm:text-sm">
            Confirmed ({confirmedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="cursor-pointer text-xs sm:text-sm">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg sm:text-xl">Booking Details</CardTitle>
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {selectedBooking.status}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDetailsOpen(false)}
                className="absolute right-2 top-2 cursor-pointer"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Personal Information</h3>
                  <p className="text-sm"><strong>Name:</strong> {selectedBooking.fullName}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedBooking.email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {selectedBooking.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Service Details</h3>
                  <p className="text-sm"><strong>Service:</strong> {selectedBooking.service}</p>
                  <p className="text-sm"><strong>Preferred Time:</strong> {selectedBooking.preferredTime}</p>
                  <p className="text-sm"><strong>Booking Date:</strong> {selectedBooking.date}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Fitness Profile</h3>
                <p className="text-sm"><strong>Experience Level:</strong> {selectedBooking.fitnessExperience}</p>
                <p className="text-sm"><strong>Goals:</strong></p>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  {selectedBooking.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <Button variant="outline" className="cursor-pointer w-full sm:w-auto">
                  Confirm Booking
                </Button>
                <Button className="cursor-pointer w-full sm:w-auto">
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
      <CardContent className="pt-4 sm:pt-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Contact</TableHead>
                    <TableHead className="hidden xs:table-cell">Service</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden lg:table-cell">Goals</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="px-4 font-medium max-w-[120px] truncate">
                        {booking.fullName}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="text-xs sm:text-sm">
                          <div>{booking.email}</div>
                          <div className="text-muted-foreground">{booking.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xs:table-cell max-w-[100px] truncate">
                        {booking.service}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={`text-xs ${booking.fitnessExperience === 'Beginner' ? 'bg-green-100 text-green-800' :
                          booking.fitnessExperience === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {booking.fitnessExperience}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-xs truncate max-w-[120px]">
                          {booking.goals.join(', ')}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{booking.date}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewDetails(booking)}
                          className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
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
  )
}