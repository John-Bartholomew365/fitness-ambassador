"use client"

import { Mail, Bell, } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  activeSection: string
}

export default function Header({ activeSection }: HeaderProps) {
  const formatSectionName = (section: string) => {
    return section
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <header className="bg-card border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold capitalize">
          {formatSectionName(activeSection)}
        </h1>
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Mail className="w-4 h-4" />
          </Button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold cursor-pointer">
            FA
          </div>
        </div>
      </div>
    </header>
  )
}