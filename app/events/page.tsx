"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import EventsPage from '@/components/pages/EventsPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar/>
            <EventsPage />
            <Footer/>
        </div>
    )
}

export default page