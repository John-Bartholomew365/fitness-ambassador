"use client"

import { Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'

const mockSubscribers = [
  { id: 1, email: 'john@example.com', name: 'John Doe', date: '2024-12-14', status: 'Active' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith', date: '2024-12-13', status: 'Active' },
  { id: 3, email: 'mike@example.com', name: 'Mike Johnson', date: '2024-12-12', status: 'Active' },
]

export default function Subscribers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
        <Button variant="outline" className="cursor-pointer">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSubscribers.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-primary/10 text-primary">{sub.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-destructive cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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