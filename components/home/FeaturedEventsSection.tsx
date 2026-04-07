'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedEventsSection = () => {
  const events = [
    {
      title: 'Walk2Fitness',
      description: 'Community walking fitness series with 5 progressive editions',
      image: '/walk.jpg',
      participants: '1000+',
      color: '#008020',
      link: '/events/walk2fitness'
    },
    {
      title: 'Jam2Fit',
      description: "Ilorin's first nighttime fitness party with 400+ participants",
      image: '/jamfit.jpg',
      participants: '400+',
      color: '#ffde00',
      link: '/events/jam2fit'
    },
    {
      title: 'Afro Groove',
      description: 'Cultural fitness collaboration with University of Ilorin',
      image: '/afro.jpeg',
      participants: '100+',
      color: '#ff8a00',
      link: '/events/afro-groove'
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008020]/10 mb-6">
            <span className="text-[#008020] font-semibold text-sm">Community Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Successful <span className="text-gradient">Events</span>
          </h2>
          <p className="text-gray-600 text-[16px] lg:w-[450px] w-auto mx-auto leading-tight">
            Proven track record of creating transformative community fitness experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => window.location.href = event.link}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.participants} Participants
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <Link href={event.link}>
                    <span
                      className="text-sm font-semibold hover:underline"
                      style={{ color: event.color }}
                    >
                      View Event →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-[#008020] font-semibold rounded-xl border-2 border-[#008020] hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              View All Events
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;