"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import Privacy from '@/components/pages/Privacy'

const page = () => {
    return (
        <PageLoader>
            <div>
                <Navbar />
                <Privacy />
                <Footer />
            </div>
        </PageLoader>
    )
}

export default page