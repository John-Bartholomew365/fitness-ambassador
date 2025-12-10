import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../../utils/animation';

export default function FeaturedEventsSection() {
  const events = [
    {
      id: 'walk2fitness',
      title: 'Walk2Fitness',
      version: '1.0 - 4.0',
      description: 'A revolutionary walking fitness series that has evolved through 4 successful editions, bringing communities together for health and wellness.',
      participants: '200+',
      location: 'Ilorin',
      color: 'primary',
    },
    {
      id: 'jam2fit',
      title: 'Jam2Fit',
      version: 'Nighttime Fitness Party',
      description: "Ilorin's first-ever nighttime fitness party! An electrifying fusion of music, dance, and high-energy workouts under the stars.",
      participants: '400+',
      location: 'Ilorin',
      color: 'secondary',
    },
    {
      id: 'afro-groove',
      title: 'Afro Groove',
      version: 'University Collaboration',
      description: 'A dynamic fitness event created in collaboration with University of Ilorin Sports Council, celebrating African fitness culture.',
      participants: '150+',
      location: 'University of Ilorin',
      color: 'accent',
    },
    {
      id: 'aerobics-icebath',
      title: 'Aerobics + Icebath',
      version: 'Wellness Fusion',
      description: 'An innovative collaboration with Massage Alchemy, combining high-intensity aerobics with the rejuvenating experience of ice bath therapy.',
      participants: '100+',
      location: 'Ilorin',
      color: 'primary',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-6 py-2 bg-primary/10 border border-primary rounded-full">
              <span className="text-primary font-bold text-sm">SIGNATURE EVENTS</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              TRANSFORMATIVE
              <br />
              <span className="text-primary">FITNESS EXPERIENCES</span>
            </h2>
            
            <p className="text-xl text-foreground/70">
              Join thousands who have experienced Nigeria&apos;s most innovative and energetic fitness events
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                className="group"
              >
                <Link href={`/events/${event.id}`}>
                  <div className={`relative p-8 bg-background rounded-3xl border-2 border-border hover:border-${event.color} transition-all duration-300 hover:shadow-2xl overflow-hidden`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${event.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 space-y-6">
                      {/* Badge */}
                      <div className={`inline-flex items-center px-4 py-2 bg-${event.color}/10 border border-${event.color} rounded-full`}>
                        <span className={`text-${event.color} font-bold text-xs uppercase`}>
                          {event.version}
                        </span>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-2 font-display group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6 pt-4">
                        <div className="flex items-center space-x-2 text-foreground/60">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-semibold">{event.participants}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-foreground/60">
                          <MapPin className="w-5 h-5 text-accent" />
                          <span className="font-semibold">{event.location}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform duration-300">
                        <span>View Gallery</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div variants={fadeUp} className="text-center pt-8">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>EXPLORE ALL EVENTS</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
