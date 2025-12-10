import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ContactPage from '@/components/pages/ContactPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <ContactPage />
            <Footer />
        </div>
    )
}

export default page