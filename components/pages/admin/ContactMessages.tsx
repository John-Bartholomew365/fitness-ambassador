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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Messages</h2>
      <div className="space-y-4">
        {mockContacts.map((contact) => (
          <Card key={contact.id} className={contact.status === 'Unread' ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {contact.name}
                    {contact.status === 'Unread' && (
                      <Badge className="bg-tertiary/20 text-tertiary">New</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{contact.email} • {contact.date}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive cursor-pointer self-start sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">{contact.subject}</p>
              <p className="text-muted-foreground">{contact.message}</p>
              <Button variant="outline" className="mt-4 cursor-pointer">
                Reply via Email
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}