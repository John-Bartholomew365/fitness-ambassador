"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import BookPage from '@/components/pages/BookPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <BookPage />
            <Footer />
        </div>
    )
}

export default page