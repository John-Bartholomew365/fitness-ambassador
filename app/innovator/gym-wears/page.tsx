'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import ShopPage from '@/components/pages/Shop';
import Head from 'next/head';
import React from 'react';

const FAGymWears = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>FA Gym Wears | Fitness Apparel | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Explore FA Gym Wears by The Fitness Ambassador. Premium fitness apparel designed for comfort, style, and performance during workouts."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="FA Gym Wears | Fitness Apparel | The Fitness Ambassador" />
          <meta property="og:description" content="Explore FA Gym Wears by The Fitness Ambassador. Premium fitness apparel designed for comfort, style, and performance during workouts." />
          <meta property="og:type" content="product" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/innovator/gym-wears" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="FA Gym Wears | Fitness Apparel | The Fitness Ambassador" />
          <meta name="twitter:description" content="Explore FA Gym Wears by The Fitness Ambassador. Premium fitness apparel designed for comfort, style, and performance during workouts." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "FA Gym Wears",
                "description": "Explore FA Gym Wears by The Fitness Ambassador. Premium fitness apparel designed for comfort, style, and performance during workouts.",
                "brand": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                }
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <ShopPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default FAGymWears;
