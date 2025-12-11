"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import TrainingPage from '@/components/pages/TrainingPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <TrainingPage />
            <Footer />
        </div>
    )
}

export default page