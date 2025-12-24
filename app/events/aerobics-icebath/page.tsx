"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import AerobicsIceBathPage from '@/components/pages/AerobicsIcebathPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <AerobicsIceBathPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page