import { motion, useReducedMotion, Easing } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import Image from 'next/image';

// Import your event images
import eventImage1 from '../../public/walk.jpg';
import eventImage2 from '../../public/afro.jpeg';
import eventImage3 from '../../public/ice.jpeg'; 
import eventImage4 from '../../public/jamfit.jpg'; 

const events = [
  {
    id: 1,
    title: 'Walk2Fitness',
    subtitle: '1.0 - 4.0',
    description: 'A signature fitness walk event promoting active lifestyles through community engagement.',
    participants: '200+',
    image: eventImage1,
  },
  {
    id: 2,
    title: 'Afro Groove',
    subtitle: 'Unilorin Sports Council',
    description: 'A dynamic fitness collaboration blending African dance moves with intense cardio workouts.',
    participants: '150+',
    image: eventImage2,
  },
  {
    id: 3,
    title: 'Aerobics + Icebath',
    subtitle: 'Massage Alchemy',
    description: 'Combining high-energy aerobics with the rejuvenating power of ice bath therapy.',
    participants: '80+',
    image: eventImage3,
  },
  {
    id: 4,
    title: 'Jam2Fit',
    subtitle: 'Nighttime Fitness Party',
    description: "Ilorin's first-ever nighttime fitness party — dancing, sweating, and celebrating health!",
    participants: '400+',
    image: eventImage4, 
  },
];

const FeaturedEventsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            Events Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            FEATURED{' '}
            <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#008020] via-[#ffde00] to-[#ff8a00]">
              EVENTS
            </span>
          </h2>
          <p className="text-[16px] text-muted-foreground lg:w-[470px] leading-tight w-auto mx-auto">
            From sunrise walks to nighttime fitness parties, we bring the community together through movement and energy.
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Always use Image component for all events */}
              <div className="relative h-80 md:h-96">
                {event.image ? (
                  <>
                    <Image
                      src={event.image}
                      alt={`${event.title} event`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      placeholder="blur"
                      priority={event.id === 1} // Only first image gets priority loading
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />
                  </>
                ) : (
                  // Fallback if image is missing
                  <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center">
                    <div className="text-background text-center p-8">
                      <h3 className="font-display text-3xl mb-2">{event.title}</h3>
                      <p className="text-background/80">{event.subtitle}</p>
                    </div>
                  </div>
                )}
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <p className="text-white font-semibold text-sm mb-2">{event.subtitle}</p>
                  <h3 className="font-display text-3xl md:text-4xl text-background mb-2">
                    {event.title}
                  </h3>
                  <p className="text-background/80 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-background/70">
                      <Users size={16} />
                      <span className="text-sm">{event.participants} Participants</span>
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      View Gallery <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/events" className="btn-primary inline-flex items-center gap-2">
            View All Events <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;