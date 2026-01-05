'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/loaders/PageLoader';
import AerobicsIceBathPage from '@/components/pages/AerobicsIcebathPage';
import Head from 'next/head';
import React from 'react';

const AerobicsIceBath = () => {
    return (
        <PageLoader>
            <>
                <Head>
                    <title>Aerobics + IceBath | Fitness & Relaxation Event | The Fitness Ambassador</title>
                    <meta
                        name="description"
                        content="Join Aerobics + IceBath, a unique fitness event by The Fitness Ambassador in collaboration with Massage Alchemy. Combine energetic workouts with relaxing ice bath sessions."
                    />
                    <meta name="keywords" content="Aerobics and Icebath, Aerobics Icebath Massage Alchemy, fitness recovery event, workout with cold therapy, aerobics ice bath Nigeria, post-exercise recovery, cold plunge after workout, relaxation fitness event, recovery techniques Nigeria, Massage Alchemy collaboration, wellness and fitness event, cryotherapy fitness, ice bath benefits Nigeria, aerobics class with ice bath, recovery workshop Ilorin, fitness and wellness combo, cold water therapy workout, stress relief fitness, holistic fitness event, recovery day fitness Nigeria" />
                    <link rel="icon" href="/favicon.ico" />

                    <meta property="og:title" content="Aerobics + IceBath | Fitness & Relaxation Event | The Fitness Ambassador" />
                    <meta property="og:description" content="Join Aerobics + IceBath, a unique fitness event by The Fitness Ambassador in collaboration with Massage Alchemy. Combine energetic workouts with relaxing ice bath sessions." />
                    <meta property="og:type" content="event" />
                    <meta property="og:url" content="https://www.thefitnessambassador.com/events/aerobics-icebath" />
                    <meta property="og:image" content="https://www.thefitnessambassador.com/favicon.ico" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Aerobics + IceBath | Fitness & Relaxation Event | The Fitness Ambassador" />
                    <meta name="twitter:description" content="Join Aerobics + IceBath, a unique fitness event by The Fitness Ambassador in collaboration with Massage Alchemy. Combine energetic workouts with relaxing ice bath sessions." />
                    <meta name="twitter:image" content="https://www.thefitnessambassador.com/favicon.ico" />

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Event",
                                "name": "Aerobics + IceBath",
                                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                                "eventStatus": "https://schema.org/EventScheduled",
                                "location": {
                                    "@type": "Place",
                                    "name": "Ilorin Fitness & Wellness Venue",
                                    "address": "Ilorin, Nigeria"
                                },
                                "organizer": {
                                    "@type": "Organization",
                                    "name": "The Fitness Ambassador",
                                    "url": "https://www.thefitnessambassador.com"
                                },
                                "description": "Join Aerobics + IceBath, a unique fitness event by The Fitness Ambassador in collaboration with Massage Alchemy. Combine energetic workouts with relaxing ice bath sessions."
                            })
                        }}
                    />
                </Head>

                <div>
                    <Navbar />
                    <AerobicsIceBathPage />
                    <Footer />
                </div>
            </>
        </PageLoader>
    );
};

export default AerobicsIceBath;
