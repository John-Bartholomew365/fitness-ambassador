'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import AfroGroovePage from '@/components/pages/AfroGroovePage';
import Head from 'next/head';
import React from 'react';

const AfroGroove = () => {
  return (
    <PageLoader>
      <>
        <Head>
          <title>Afro Groove | Fitness Dance Event | The Fitness Ambassador</title>
          <meta
            name="description"
            content="Join Afro Groove, a fitness dance event in collaboration with University of Ilorin Sports Council. Move, groove, and stay fit with The Fitness Ambassador."
          />
          <meta name="keywords" content="Afro Groove fitness, Afro Groove University of Ilorin, Afrobeat dance workout, African fitness class, Unilorin sports council event, Afro dance exercise Nigeria, cultural fitness program, Afro Groove collaboration, Afro fitness event Ilorin, traditional dance workout, Nigerian dance fitness, Afro Groove registration, University fitness events, Afro workout class, dance fitness Nigeria, African rhythm exercise, cultural dance fitness, Unilorin fitness programs, Afro Groove schedule, group dance workout Ilorin" />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content="Afro Groove | Fitness Dance Event | The Fitness Ambassador" />
          <meta property="og:description" content="Join Afro Groove, a fitness dance event in collaboration with University of Ilorin Sports Council. Move, groove, and stay fit with The Fitness Ambassador." />
          <meta property="og:type" content="event" />
          <meta property="og:url" content="https://www.thefitnessambassador.com/events/afro-groove" />
          <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Afro Groove | Fitness Dance Event | The Fitness Ambassador" />
          <meta name="twitter:description" content="Join Afro Groove, a fitness dance event in collaboration with University of Ilorin Sports Council. Move, groove, and stay fit with The Fitness Ambassador." />
          <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Afro Groove",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "University of Ilorin Sports Complex",
                  "address": "Ilorin, Nigeria"
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "The Fitness Ambassador",
                  "url": "https://www.thefitnessambassador.com"
                },
                "description": "Join Afro Groove, a fitness dance event in collaboration with University of Ilorin Sports Council. Move, groove, and stay fit with The Fitness Ambassador."
              })
            }}
          />
        </Head>

        <div>
          <Navbar />
          <AfroGroovePage />
          <Footer />
        </div>
      </>
    </PageLoader>
  );
};

export default AfroGroove;
