"use client"
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import RegisterPage from '@/components/pages/RegisterPage'

const page = () => {
    return (
        <PageLoader>
            <div>
                {/* <Navbar /> */}
                <RegisterPage />
                {/* <Footer /> */}
            </div>
        </PageLoader>
    )
}

export default page