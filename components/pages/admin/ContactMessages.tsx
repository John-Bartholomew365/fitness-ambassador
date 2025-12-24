"use client"

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'

const mockContacts = [
  { id: 1, name: 'David Brown', email: 'david@example.com', subject: 'Training Inquiry', message: 'I would like to know more about personal training...', date: '2024-12-14', status: 'Unread' },
  { id: 2, name: 'Lisa Chen', email: 'lisa@example.com', subject: 'Event Registration', message: 'How can I register for Walk2Fitness 5.0?', date: '2024-12-13', status: 'Read' },
]

export default function ContactMessages() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">Contact Messages</h2>
      <div className="space-y-3 sm:space-y-4">
        {mockContacts.map((contact) => (
          <Card key={contact.id} className={contact.status === 'Unread' ? 'border-primary' : ''}>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                <div className="flex-1">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    {contact.name}
                    {contact.status === 'Unread' && (
                      <Badge className="bg-tertiary/20 text-tertiary text-xs">New</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {contact.email} • {contact.date}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive cursor-pointer self-start sm:self-center h-8 w-8"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="font-medium mb-2 text-sm sm:text-base">{contact.subject}</p>
              <p className="text-muted-foreground text-sm sm:text-base">{contact.message}</p>
              <Button variant="outline" className="mt-3 sm:mt-4 cursor-pointer text-sm">
                Reply via Email
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}