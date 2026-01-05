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

                    
          {/* Keywords Meta Tag */}
          <meta 
            name="keywords" 
            content="Jam2Fit, Jam2Fit Ilorin, Jam2Fit 2024, Jam2Fit Nigeria, Jam2Fit tickets, Jam2Fit registration, fitness party Ilorin, nighttime fitness party, fitness concert Nigeria, Ilorin fitness event, dance workout event, workout concert, fitness rave, night workout event, fitness events in Ilorin, Ilorin workout parties, fitness activities Ilorin, exercise events Kwara, Nigeria fitness festivals, Kwara fitness events, what is Jam2Fit, when is Jam2Fit 2024, where is Jam2Fit held, how to register for Jam2Fit, Jam2Fit ticket price, Jam2Fit date and venue, Jam2Fit reviews, Jam2Fit past events, who organizes Jam2Fit, The Fitness Ambassador Jam2Fit, Jam2Fit nighttime fitness, Jam2Fit dance workout, Jam2Fit live DJ workout, Jam2Fit group fitness, Jam2Fit fitness celebration" 
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
