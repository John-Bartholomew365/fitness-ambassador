'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import Walk2FitnessPage from '@/components/pages/Walk2FitnessPage';
import Head from 'next/head';
import React from 'react';

const Walk2Fitness = () => {
  return (
    <PageLoader>
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Walk2Fitness | Fitness Event | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Join Walk2Fitness, the exciting fitness event by The Fitness Ambassador. Participate in charity walks, fitness challenges, and connect with the community."
          />
          <meta name="keywords" content="Walk2Fitness, Walk2Fitness Ilorin, Walk2Fitness 1.0 2.0 3.0 4.0, group walking fitness, walking exercise program Nigeria, fitness walking events, community walking Ilorin, health walk program, walking for weight loss, outdoor fitness walking, morning walk exercise, walking group Nigeria, Walk2Fitness registration, walking challenge Ilorin, fitness community walking, walking workout schedule, walking events Kwara, walking for health Nigeria, group exercise walking, walking fitness program, walking clubs Ilorin" />
          <link rel="icon" href="/favicon.ico" />

          {/* Open Graph / Twitter */}
          <meta property="og:title" content="Walk2Fitness | Fitness Event | The Fitness Ambassador" />
          <meta property="og:description" content="Join Walk2Fitness, the exciting fitness event by The Fitness Ambassador. Participate in charity walks, fitness challenges, and connect with the community." />
          <meta property="og:type" content="event" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/events/walk2fitness" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Walk2Fitness | Fitness Event | The Fitness Ambassador" />
          <meta name="twitter:description" content="Join Walk2Fitness, the exciting fitness event by The Fitness Ambassador. Participate in charity walks, fitness challenges, and connect with the community." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Walk2Fitness",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "Gaa Akanbi Junction, Ajase Ipo Road",
                  "address": "Ilorin, Nigeria"
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                },
                "description": "Join Walk2Fitness, the exciting fitness event by The Fitness Ambassador. Participate in charity walks, fitness challenges, and connect with the community."
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <Walk2FitnessPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default Walk2Fitness;
