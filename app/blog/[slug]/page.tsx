// app/blog/[slug]/page.tsx
// import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/loaders/PageLoader'
import BlogPostContent from '@/components/pages/blog/BlogPostPage';

// Disable source maps in development if needed
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <PageLoader>
      <div>
        <Navbar />
        <BlogPostContent slug={slug} />
        {/* <Footer /> */}
      </div>
    </PageLoader>
  )
}