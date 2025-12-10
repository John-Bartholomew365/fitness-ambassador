"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../../utils/animation';
import { toast } from 'sonner';

export default function EventsManager() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Walk2Fitness 4.0', date: '2024-03-15', participants: 200, status: 'completed' },
    { id: 2, title: 'Jam2Fit', date: '2024-02-20', participants: 400, status: 'completed' },
    { id: 3, title: 'Afro Groove', date: '2024-01-10', participants: 150, status: 'completed' },
  ]);

  const handleDelete = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };

  return (
    <div className="min-h-screen bg-muted py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                MANAGE <span className="text-primary">EVENTS</span>
              </h1>
              <p className="text-xl text-foreground/70 mt-2">Create and manage fitness events</p>
            </div>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </motion.div>

          {/* Events Table */}
          <motion.div variants={fadeUp} className="bg-background rounded-2xl border-2 border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Event Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Participants</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t border-border">
                      <td className="px-6 py-4 text-foreground font-medium">{event.title}</td>
                      <td className="px-6 py-4 text-foreground/70">{event.date}</td>
                      <td className="px-6 py-4 text-foreground/70">{event.participants}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <ImageIcon className="w-5 h-5 text-foreground/60" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Edit className="w-5 h-5 text-foreground/60" />
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
