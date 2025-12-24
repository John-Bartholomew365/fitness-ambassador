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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Newsletter Subscribers</h2>
        <Button variant="outline" className="cursor-pointer w-full sm:w-auto">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Export CSV
        </Button>
      </div>
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubscribers.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="px-4 font-medium">{sub.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{sub.email}</TableCell>
                        <TableCell>{sub.date}</TableCell>
                        <TableCell>
                          <Badge className="bg-primary/10 text-primary text-xs">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive cursor-pointer h-8 w-8">
                            <Trash2 className="w-3 h-3" />
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
    </div>
  )
}