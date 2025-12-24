"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import BlogPage from '@/components/pages/blog/BlogPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <BlogPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page