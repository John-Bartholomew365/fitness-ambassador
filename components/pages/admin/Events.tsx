"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Event = {
  id: number
  name: string
  date: string
  description: string
  location: string
  registrations: number
  maxCapacity: number
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
}

const initialEvents: Event[] = [
  { id: 1, name: 'Walk2Fitness 5.0', date: '2025-01-15', description: 'Flagship walking fitness event', location: 'Ilorin City', registrations: 234, maxCapacity: 300, status: 'Upcoming' },
  { id: 2, name: 'Jam2Fit Night', date: '2025-02-10', description: 'Nighttime fitness party', location: 'Ilorin Arena', registrations: 156, maxCapacity: 400, status: 'Upcoming' },
  { id: 3, name: 'Afro Groove', date: '2024-11-20', description: 'African dance fitness event', location: 'UNILORIN Sports Complex', registrations: 312, maxCapacity: 350, status: 'Completed' },
  { id: 4, name: 'Aerobics + Icebath', date: '2024-12-05', description: 'Aerobics with recovery session', location: 'Massage Alchemy Center', registrations: 189, maxCapacity: 200, status: 'Completed' },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming': return 'bg-blue-100 text-blue-800'
    case 'ongoing': return 'bg-green-100 text-green-800'
    case 'completed': return 'bg-gray-100 text-gray-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    name: '',
    date: '',
    description: '',
    location: '',
    registrations: 0,
    maxCapacity: 0,
    status: 'Upcoming'
  })

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date) {
      const event: Event = {
        ...newEvent,
        id: events.length + 1
      }
      setEvents([...events, event])
      setNewEvent({
        name: '',
        date: '',
        description: '',
        location: '',
        registrations: 0,
        maxCapacity: 0,
        status: 'Upcoming'
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditEvent = () => {
    if (selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? selectedEvent : e))
      setIsEditDialogOpen(false)
      setSelectedEvent(null)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id))
      setIsDeleteAlertOpen(false)
      setSelectedEvent(null)
    }
  }

  const openEditDialog = (event: Event) => {
    setSelectedEvent({ ...event })
    setIsEditDialogOpen(true)
  }

  const openDeleteAlert = (event: Event) => {
    setSelectedEvent(event)
    setIsDeleteAlertOpen(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Events Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer w-full sm:w-auto">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[200px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new fitness event
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:gap-4 py-4">
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Event Name</label>
                <Input
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  placeholder="e.g., Walk2Fitness 6.0"
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event venue"
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full min-h-[80px] sm:min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="grid gap-1 sm:gap-2">
                  <label className="text-sm font-medium">Max Capacity</label>
                  <Input
                    type="number"
                    value={newEvent.maxCapacity}
                    onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: parseInt(e.target.value) || 0 })}
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="grid gap-1 sm:gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as Event['status'] })}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEvent} className="cursor-pointer w-full sm:w-auto">
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
          <Input
            placeholder="Search events..."
            className="pl-8 sm:pl-10 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="cursor-pointer w-full sm:w-auto">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4 sm:pt-6 p-0 sm:p-6">
          <div className="overflow-x-auto">
            <div className="min-w-max w-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap px-4">Event Name</TableHead>
                    <TableHead className="whitespace-nowrap px-4 hidden sm:table-cell">Date</TableHead>
                    <TableHead className="whitespace-nowrap px-4">Location</TableHead>
                    <TableHead className="whitespace-nowrap px-4 hidden xs:table-cell">Registrations</TableHead>
                    <TableHead className="whitespace-nowrap px-4">Status</TableHead>
                    <TableHead className="whitespace-nowrap px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="whitespace-nowrap px-4 font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 hidden sm:table-cell">
                        {event.date}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4">
                        {event.location}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 hidden xs:table-cell">
                        {event.registrations}/{event.maxCapacity}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4">
                        <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4">
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(event)}
                            className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer"
                          >
                            <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteAlert(event)}
                            className="h-7 w-7 sm:h-8 sm:w-8 text-destructive cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[200px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-3 sm:gap-4 py-4">
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Event Name</label>
                <Input
                  value={selectedEvent.name}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, name: e.target.value })}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={selectedEvent.date}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-1 sm:gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full min-h-[80px] sm:min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditEvent} className="cursor-pointer w-full sm:w-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              &quot;{selectedEvent?.name}&quot; and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer mt-2 sm:mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}