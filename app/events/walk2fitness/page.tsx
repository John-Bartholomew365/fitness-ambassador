"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import Walk2FitnessPage from '@/components/pages/Walk2FitnessPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <Walk2FitnessPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page