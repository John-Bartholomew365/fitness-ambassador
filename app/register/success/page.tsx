import PageLoader from '@/components/loaders/PageLoader'
import SuccessPage from '@/components/pages/Vest/SuccessPage'

const page = () => {
    return (
        <PageLoader>
            <div>
                {/* <Navbar /> */}
                <SuccessPage />
                {/* <Footer /> */}
            </div>
        </PageLoader>
    )
}

export default page