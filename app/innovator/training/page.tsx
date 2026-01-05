'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import TrainingPage from '@/components/pages/TrainingPage';
import Head from 'next/head';
import React from 'react';

const Training = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Fitness Training & Consultation | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Book personalized fitness training and consultation sessions with The Fitness Ambassador. Achieve your fitness goals with expert guidance."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Fitness Training & Consultation | The Fitness Ambassador" />
          <meta property="og:description" content="Book personalized fitness training and consultation sessions with The Fitness Ambassador. Achieve your fitness goals with expert guidance." />
          <meta property="og:type" content="service" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/innovator/training" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Fitness Training & Consultation | The Fitness Ambassador" />
          <meta name="twitter:description" content="Book personalized fitness training and consultation sessions with The Fitness Ambassador. Achieve your fitness goals with expert guidance." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Fitness Training & Consultation",
                "provider": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                },
                "description": "Book personalized fitness training and consultation sessions with The Fitness Ambassador. Achieve your fitness goals with expert guidance."
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <TrainingPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default Training;
