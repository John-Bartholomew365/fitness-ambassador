'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import InnovatorPage from '@/components/pages/InnovatorPage';
import Head from 'next/head';
import React from 'react';

const Innovator = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Ajisafe Sulaiman | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Learn about Ajisafe Sulaiman, also known as The Fitness Ambassador. Discover his journey, achievements, and passion for transforming lives through fitness."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Ajisafe Sulaiman | The Fitness Ambassador" />
          <meta property="og:description" content="Learn about Ajisafe Sulaiman, also known as The Fitness Ambassador. Discover his journey, achievements, and passion for transforming lives through fitness." />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/innovator" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ajisafe Sulaiman | The Fitness Ambassador" />
          <meta name="twitter:description" content="Learn about Ajisafe Sulaiman, also known as The Fitness Ambassador. Discover his journey, achievements, and passion for transforming lives through fitness." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Ajisafe Sulaiman",
                "url": "https://www.thefitnessambassador.com/innovator",
                "sameAs": [
                  "https://www.instagram.com/fitness_ambassadorr?igsh=MXdleGcxNTY2a2Jiaw%3D%3D&utm_source=qr",
                  "https://www.linkedin.com/in/sulaiman-ajisafe-30061b16a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                  "https://x.com/ajisafe_akorede?s=21"
                ],
                "jobTitle": "Fitness Coach & Founder",
                "affiliation": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador"
                }
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <InnovatorPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default Innovator;
