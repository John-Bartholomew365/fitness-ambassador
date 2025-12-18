import { motion, Easing } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Walk2Fitness',
    editions: '1.0 - 4.0',
    description: 'A signature fitness walk event promoting active lifestyles through community engagement. Walk2Fitness brings together fitness enthusiasts of all levels for an energizing morning walk combined with group exercises.',
    participants: '2000+',
    location: 'Ilorin, Kwara State',
    image: '/walk.jpg',
    upcoming: true,
  },
  {
    id: 2,
    title: 'Afro Groove',
    editions: 'x Unilorin Sports Council',
    description: 'A dynamic fitness collaboration blending African dance moves with intense cardio workouts. Experience the fusion of culture and fitness in this high-energy event.',
    participants: '150+',
    location: 'University of Ilorin',
    image: '/groove1.jpeg',
  },
  {
    id: 3,
    title: 'Aerobics + Icebath',
    editions: 'x Massage Alchemy',
    description: 'Combining high-energy aerobics with the rejuvenating power of ice bath therapy. This unique event offers the perfect balance of exertion and recovery.',
    participants: '80+',
    location: 'Ilorin, Kwara State',
    image: '/ice1.jpeg',
  },
  {
    id: 4,
    title: 'Jam2Fit',
    editions: 'Nighttime Fitness Party',
    description: "Ilorin's first-ever nighttime fitness party — dancing, sweating, and celebrating health! Experience fitness like never before under the stars with pumping music and electrifying energy.",
    participants: '400+',
    location: 'Ilorin, Kwara State',
    image: '/jamfit.jpg',
    featured: true,
  },
  {
    id: 5,
    title: 'Every Sunday Cycling',
    editions: 'Weekly Fitness Ride',
    description: 'Join our weekly cycling sessions every Sunday morning! Build endurance, improve cardiovascular health, and enjoy scenic routes with fellow fitness enthusiasts. Perfect for all cycling levels.',
    participants: '100+ weekly',
    location: 'Various Routes in Ilorin',
    image: '/cycling1.jpeg',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
  },
};

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-6 px-4 md:px-8 bg-linear-to-b from-muted to-background">
        <div className="container-max text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6"
          >
            Events Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
          >
            FITNESS <span className="text-gradient">EVENTS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-muted-foreground lg:w-[490px] w-auto mx-auto"
          >
            From sunrise walks to nighttime fitness parties, we bring the community together through movement, music, and energy.
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-20">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className={`grid md:grid-cols-2 gap-6 lg:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Image/Color Block */}
                <div className={`relative h-64 md:h-96 rounded-3xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold">
                      Featured Event
                    </div>
                  )}
                  {event.upcoming && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                      Next Edition Coming Soon
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="text-primary font-semibold text-sm mb-2">{event.editions}</p>
                  <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                    {event.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-tight">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={18} className="text-primary" />
                      <span className="text-sm">{event.participants} Participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/gallery`}
                    // href={`/gallery?event=${event.id}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Gallery <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              WANT TO JOIN THE NEXT EVENT?
            </h2>
            <p className="text-muted-foreground mb-8">
              Follow us on social media to stay updated on upcoming events and be the first to register.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/gallery" className="btn-outline">
                View Full Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;