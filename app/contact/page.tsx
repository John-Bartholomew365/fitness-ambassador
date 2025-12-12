"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import ContactPage from '@/components/pages/ContactPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <ContactPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page