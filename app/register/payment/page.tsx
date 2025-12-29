import PageLoader from '@/components/loaders/PageLoader'
import PaymentPage from '@/components/pages/Vest/PaymentPage'

const page = () => {
    return (
        <PageLoader>
            <div>
                {/* <Navbar /> */}
                <PaymentPage />
                {/* <Footer /> */}
            </div>
        </PageLoader>
    )
}

export default page