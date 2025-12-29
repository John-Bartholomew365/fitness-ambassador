import PageLoader from '@/components/loaders/PageLoader'
import BioDataPage from '@/components/pages/Vest/BioDataPage'

const page = () => {
    return (
        <PageLoader>
            <div>
                {/* <Navbar /> */}
                <BioDataPage />
                {/* <Footer /> */}
            </div>
        </PageLoader>
    )
}

export default page