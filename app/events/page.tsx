"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import EventsPage from '@/components/pages/EventsPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <EventsPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page