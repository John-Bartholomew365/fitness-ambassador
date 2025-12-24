"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import AboutInnovatorPage from '@/components/pages/AboutInnovator'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <AboutInnovatorPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page