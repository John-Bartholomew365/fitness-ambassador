'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import EverySundayCyclingPage from '@/components/pages/EverySundayCycling';
import Head from 'next/head';
import React from 'react';

const EverySundayCycling = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Every Sunday Cycling | Fitness Community Ride | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Join Every Sunday Cycling, a community fitness ride organized by The Fitness Ambassador. Stay active, socialize, and enjoy cycling every Sunday."
          />
          <meta name="keywords" content="Every Sunday Cycling, Sunday cycling Ilorin, weekend cycling group, cycling fitness Nigeria, Sunday morning cycling, bicycle workout Nigeria, cycling club Ilorin, group cycling events, cycling exercise Nigeria, weekend cycling workout, cycling for fitness, Sunday bike ride, cycling community Nigeria, outdoor cycling workout, cycling events Ilorin, bike fitness group, cycling program Nigeria, recreational cycling, cycling for health, Sunday cycling schedule, cycling routes Ilorin" />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Every Sunday Cycling | Fitness Community Ride | The Fitness Ambassador" />
          <meta property="og:description" content="Join Every Sunday Cycling, a community fitness ride organized by The Fitness Ambassador. Stay active, socialize, and enjoy cycling every Sunday." />
          <meta property="og:type" content="event" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/events/every-sunday-cycling" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Every Sunday Cycling | Fitness Community Ride | The Fitness Ambassador" />
          <meta name="twitter:description" content="Join Every Sunday Cycling, a community fitness ride organized by The Fitness Ambassador. Stay active, socialize, and enjoy cycling every Sunday." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Every Sunday Cycling",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "Ilorin Community Route",
                  "address": "Ilorin, Nigeria"
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                },
                "description": "Join Every Sunday Cycling, a community fitness ride organized by The Fitness Ambassador. Stay active, socialize, and enjoy cycling every Sunday."
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <EverySundayCyclingPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default EverySundayCycling;
