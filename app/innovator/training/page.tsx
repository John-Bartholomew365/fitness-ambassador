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
          <meta name="keywords" content="personal trainer Ilorin, fitness coach Nigeria, online fitness consultation, personalized workout plans, weight loss coaching Nigeria, muscle building training, virtual fitness training, nutrition coaching Ilorin, body transformation coaching, fitness accountability partner, one-on-one fitness training, home workout coaching, fitness assessment Nigeria, customized training programs, fitness goal setting, exercise form correction, workout routine design, fitness progress tracking, personal fitness coaching, training session booking Ilorin" />
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
