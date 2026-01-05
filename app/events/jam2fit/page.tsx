'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import Jam2FitPage from '@/components/pages/Jam2FitPage';
import Head from 'next/head';
import React from 'react';

const Jam2Fit = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Jam2Fit | Nighttime Fitness Party | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Experience Jam2Fit, Ilorin's first nighttime fitness party hosted by The Fitness Ambassador. Join over 400+ participants for an energetic fitness celebration."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Jam2Fit | Nighttime Fitness Party | The Fitness Ambassador" />
          <meta property="og:description" content="Experience Jam2Fit, Ilorin's first nighttime fitness party hosted by The Fitness Ambassador. Join over 400+ participants for an energetic fitness celebration." />
          <meta property="og:type" content="event" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/events/jam2fit" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Jam2Fit | Nighttime Fitness Party | The Fitness Ambassador" />
          <meta name="twitter:description" content="Experience Jam2Fit, Ilorin's first nighttime fitness party hosted by The Fitness Ambassador. Join over 400+ participants for an energetic fitness celebration." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Jam2Fit",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "TBD",
                  "address": "Ilorin, Nigeria"
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                },
                "description": "Experience Jam2Fit, Ilorin's first nighttime fitness party hosted by The Fitness Ambassador. Join over 400+ participants for an energetic fitness celebration."
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <Jam2FitPage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default Jam2Fit;
