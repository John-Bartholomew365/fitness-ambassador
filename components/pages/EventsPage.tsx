"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';

export default function EventsPage() {
  const events = [
    {
      id: 'walk2fitness',
      title: 'Walk2Fitness',
      versions: ['1.0', '2.0', '3.0', '4.0'],
      description: 'A revolutionary walking fitness series that has evolved through multiple successful editions, bringing communities together for health and wellness through the power of walking.',
      participants: '200+',
      location: 'Ilorin',
      image: null,
    },
    {
      id: 'jam2fit',
      title: 'Jam2Fit',
      subtitle: "Ilorin's First Nighttime Fitness Party",
      description: 'An electrifying fusion of music, dance, and high-energy workouts under the stars. Jam2Fit broke records with over 400 participants, creating an unforgettable nighttime fitness experience.',
      participants: '400+',
      location: 'Ilorin',
      image: null,
    },
    {
      id: 'afro-groove',
      title: 'Afro Groove',
      subtitle: 'University of Ilorin Collaboration',
      description: 'A dynamic fitness event celebrating African culture through movement. Created in partnership with University of Ilorin Sports Council, combining traditional and modern fitness techniques.',
      participants: '150+',
      location: 'University of Ilorin',
      image: null,
    },
    {
      id: 'aerobics-icebath',
      title: 'Aerobics + Icebath',
      subtitle: 'Massage Alchemy Collaboration',
      description: 'An innovative wellness fusion combining high-intensity aerobics with the rejuvenating power of ice bath therapy. Experience the perfect balance of exertion and relaxation.',
      participants: '100+',
      location: 'Ilorin',
      image: null,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-6 py-2 bg-primary/10 border border-primary rounded-full">
              <span className="text-primary font-bold text-sm">SIGNATURE EVENTS</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-foreground">
              TRANSFORMATIVE
              <br />
              <span className="text-primary">FITNESS EXPERIENCES</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-foreground/70">
              Discover Nigeria&apos;s most innovative fitness events designed to energize, motivate, and transform communities
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-12"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                className="group"
              >
                <Link href={`/events/${event.id}`}>
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 border-4 border-border group-hover:border-primary transition-all duration-300 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto">
                            <span className="text-6xl font-bold text-primary-foreground">FA</span>
                          </div>
                          <p className="text-2xl font-bold text-foreground font-display">{event.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-display group-hover:text-primary transition-colors">
                          {event.title}
                        </h2>
                        {event.subtitle && (
                          <p className="text-xl text-accent font-semibold mb-4">{event.subtitle}</p>
                        )}
                        {event.versions && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.versions.map((version) => (
                              <span key={version} className="px-4 py-1 bg-primary/10 border border-primary rounded-full text-primary text-sm font-bold">
                                Version {version}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-lg text-foreground/80 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center space-x-2 text-foreground/60">
                          <Users className="w-6 h-6 text-primary" />
                          <span className="font-semibold text-lg">{event.participants} Participants</span>
                        </div>
                        <div className="flex items-center space-x-2 text-foreground/60">
                          <MapPin className="w-6 h-6 text-accent" />
                          <span className="font-semibold text-lg">{event.location}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-primary font-bold text-lg group-hover:translate-x-2 transition-transform duration-300">
                        <span>View Full Gallery</span>
                        <ArrowRight className="w-6 h-6 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              READY TO JOIN THE NEXT EVENT?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Be part of Nigeria&apos;s most energetic fitness community. Follow us on social media to stay updated on upcoming events.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-xl space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>GET NOTIFIED</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
