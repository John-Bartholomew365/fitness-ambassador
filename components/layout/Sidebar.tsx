"use client"

import { useState } from 'react'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Book, 
  Dumbbell, 
  Users, 
  MessageSquare,
  Menu,
  X,
  ChevronLeft,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBlog, FaUserPlus } from 'react-icons/fa6'
import { useAuth } from '@/components/contexts/AuthContext'
import { authService } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: ShoppingBag, label: 'Shop / Products', key: 'shop' },
  { icon: Book, label: 'Book Management', key: 'book' },
  { icon: Dumbbell, label: 'Training', key: 'training' },
  { icon: FaUserPlus, label: 'Subscribers', key: 'subscribers' },
  { icon: Users, label: 'Registrations', key: 'registration' },
  { icon: MessageSquare, label: 'Contact Messages', key: 'contacts' },
  { icon: FaBlog, label: 'Blog Article', key: 'blog' },
]

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative h-screen bg-card border-r border-border flex flex-col z-40
        transition-all duration-300
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/fa-logo3.png"
                alt="Fitness Ambassador Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            {isOpen && <span className="font-bold text-lg">Admin Panel</span>}
          </div>
          
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Close button for mobile */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => {
                    setActiveSection(item.key)
                    setIsMobileOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-pointer
                    ${activeSection === item.key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            {isOpen && <span className="font-medium text-sm">Back to Site</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}