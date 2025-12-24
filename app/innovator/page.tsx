"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import InnovatorPage from '@/components/pages/InnovatorPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <InnovatorPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page