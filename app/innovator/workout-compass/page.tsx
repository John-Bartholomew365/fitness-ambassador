'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import BookPage from '@/components/pages/BookPage';
import Head from 'next/head';
import React from 'react';

const WorkoutCompass = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Workout Compass | Fitness Guide Book | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Workout Compass is your ultimate fitness guide book by The Fitness Ambassador. Learn to create structured workout plans, improve form, and achieve results."
          />
          <meta name="keywords" content="Workout Compass book, Workout Compass Ajisafe Sulaiman, fitness guide Nigeria, gym workout manual, structured workout plans, progressive overload guide, muscle gain book, fat loss guide Nigeria, fitness roadmap, beginner fitness guide, workout templates, exercise program book, fitness education Nigeria, training guide PDF, workout strategies, fitness mindset book, gym training manual, fitness book purchase, Nigerian fitness author, exercise science guide, fitness principles book" />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Workout Compass | Fitness Guide Book | The Fitness Ambassador" />
          <meta property="og:description" content="Workout Compass is your ultimate fitness guide book by The Fitness Ambassador. Learn to create structured workout plans, improve form, and achieve results." />
          <meta property="og:type" content="product" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/innovator/workout-compass" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Workout Compass | Fitness Guide Book | The Fitness Ambassador" />
          <meta name="twitter:description" content="Workout Compass is your ultimate fitness guide book by The Fitness Ambassador. Learn to create structured workout plans, improve form, and achieve results." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Workout Compass",
                "description": "Workout Compass is your ultimate fitness guide book by The Fitness Ambassador. Learn to create structured workout plans, improve form, and achieve results.",
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
          <BookPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default WorkoutCompass;
