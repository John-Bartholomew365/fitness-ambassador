"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import TrainingPage from '@/components/pages/TrainingPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <TrainingPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page