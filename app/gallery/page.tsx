import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import GalleryPage from '@/components/pages/GalleryPage'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar/>
            <GalleryPage />
            <Footer/>
        </div>
    )
}

export default page