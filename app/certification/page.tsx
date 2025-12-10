import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import CertificationPage from '@/components/pages/CertificationPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar/>
            <CertificationPage />
            <Footer/>
        </div>
    )
}

export default page