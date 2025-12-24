"use client"

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import AdminBlogDashboard from '@/components/pages/admin/AdminBlogPage'
import BookManagement from '@/components/pages/admin/BookManagement'
import ContactMessages from '@/components/pages/admin/ContactMessages'
import Dashboard from '@/components/pages/admin/Dashboard'
import Events from '@/components/pages/admin/Events'
import MediaLibrary from '@/components/pages/admin/MediaLibrary'
import Shop from '@/components/pages/admin/Shop'
import Subscribers from '@/components/pages/admin/Subscribers'
import Training from '@/components/pages/admin/Training'
import { useState } from 'react'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'events':
        return <Events />
      case 'shop':
        return <Shop />
      case 'book':
        return <BookManagement />
      case 'training':
        return <Training />
      case 'subscribers':
        return <Subscribers />
      case 'contacts':
        return <ContactMessages />
      case 'blog':
        return <AdminBlogDashboard />
      case 'media':
        return <MediaLibrary />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header activeSection={activeSection} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}