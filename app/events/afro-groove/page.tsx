"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import AfroGroovePage from '@/components/pages/AfroGroovePage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <AfroGroovePage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page