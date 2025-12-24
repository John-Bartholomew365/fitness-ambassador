"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import EverySundayCyclingPage from '@/components/pages/EverySundayCycling'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <EverySundayCyclingPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page