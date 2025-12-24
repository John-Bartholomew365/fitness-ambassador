"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import Walk2FitnessVestPage from '@/components/pages/VestPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <Walk2FitnessVestPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page