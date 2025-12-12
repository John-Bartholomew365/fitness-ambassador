"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import GalleryPage from '@/components/pages/GalleryPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <GalleryPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page