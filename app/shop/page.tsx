"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ShopPage from '@/components/pages/Shop'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <ShopPage />
            <Footer />
        </div>
    )
}

export default page