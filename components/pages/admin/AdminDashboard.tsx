"use client"
import { motion } from 'framer-motion';
import { Calendar, ShoppingBag, Image, MessageSquare, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../../utils/animation';

export default function AdminDashboard() {
  const stats = [
    { icon: Calendar, label: 'Total Events', value: '10+', color: 'primary' },
    { icon: Users, label: 'Total Participants', value: '850+', color: 'accent' },
    { icon: ShoppingBag, label: 'Products', value: '12', color: 'secondary' },
    { icon: MessageSquare, label: 'Messages', value: '24', color: 'primary' },
  ];

  const recentActivities = [
    { type: 'event', message: 'New booking for Personal Training', time: '2 hours ago' },
    { type: 'order', message: 'New order for FA Classic Tee', time: '5 hours ago' },
    { type: 'message', message: 'New contact form submission', time: '1 day ago' },
    { type: 'subscriber', message: 'New newsletter subscriber', time: '2 days ago' },
  ];

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
          <motion.div variants={fadeUp} className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              ADMIN <span className="text-primary">DASHBOARD</span>
            </h1>
            <p className="text-xl text-foreground/70">Manage your fitness empire</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`p-6 bg-background rounded-2xl border-2 border-border hover:border-${stat.color} transition-all duration-300`}>
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} className="bg-background rounded-2xl border-2 border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-display">QUICK ACTIONS</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="p-4 bg-primary/10 border-2 border-primary rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center space-x-3">
                <Calendar className="w-6 h-6" />
                <span className="font-semibold">Manage Events</span>
              </button>
              <button className="p-4 bg-secondary/10 border-2 border-secondary rounded-2xl hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6" />
                <span className="font-semibold">Manage Shop</span>
              </button>
              <button className="p-4 bg-accent/10 border-2 border-accent rounded-2xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center space-x-3">
                <Image className="w-6 h-6" aria-label="Media Library" />
                <span className="font-semibold">Media Library</span>
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeUp} className="bg-background rounded-2xl border-2 border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 font-display">RECENT ACTIVITY</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{activity.message}</p>
                    <p className="text-sm text-foreground/60 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
