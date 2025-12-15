"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import Terms from '@/components/pages/Terms'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <Terms />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page