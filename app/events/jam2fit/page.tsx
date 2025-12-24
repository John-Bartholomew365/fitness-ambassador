"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import Jam2FitPage from '@/components/pages/Jam2FitPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <Jam2FitPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page