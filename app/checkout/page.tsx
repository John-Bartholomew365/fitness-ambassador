"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import CheckoutPage from '@/components/pages/CheckoutPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <CheckoutPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page