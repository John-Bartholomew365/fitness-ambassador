"use client";
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader';
import CertificationPage from '@/components/pages/CertificationPage'
import React from 'react'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <CertificationPage />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page