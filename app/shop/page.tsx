"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import ShopPage from '@/components/pages/Shop'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <ShopPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page