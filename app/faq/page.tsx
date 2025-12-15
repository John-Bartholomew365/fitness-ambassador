"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import FAQ from '@/components/pages/Faq'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <FAQ />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page