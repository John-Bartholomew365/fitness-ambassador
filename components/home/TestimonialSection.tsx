import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Adebayo Olumide',
    role: 'Walk2Fitness 3.0 Participant',
    content: "Walk2Fitness changed my perspective on exercise. It's not just about the workout — it's about the community, the energy, and realizing that fitness can actually be enjoyable!",
    rating: 5,
    event: 'Walk2Fitness',
  },
  {
    id: 2,
    name: 'Fatimah Abdullahi',
    role: 'Jam2Fit Attendee',
    content: "I never thought I'd enjoy working out until Jam2Fit. Dancing under the lights with 400 other people? That's not exercise, that's a celebration of life!",
    rating: 5,
    event: 'Jam2Fit',
  },
  {
    id: 3,
    name: 'Chukwuemeka David',
    role: 'Workout Compass Reader',
    content: "Before Workout Compass, I was lost in the gym. Now I walk in with a plan, hit my targets, and actually see results. This book should be mandatory for every beginner.",
    rating: 5,
    event: 'Workout Compass',
  },
  {
    id: 4,
    name: 'Aisha Mohammed',
    role: 'Walk2Fitness 4.0 Participant',
    content: "Four editions later and I haven't missed one! Walk2Fitness is more than an event — it's become a lifestyle. The friendships I've made here are priceless.",
    rating: 5,
    event: 'Walk2Fitness',
  },
  {
    id: 5,
    name: 'Tunde Bakare',
    role: 'Jam2Fit First Timer',
    content: "I came skeptical, left converted. Who knew you could burn so many calories while having the time of your life? Can't wait for the next one!",
    rating: 5,
    event: 'Jam2Fit',
  },
  {
    id: 6,
    name: 'Grace Okonkwo',
    role: 'Fitness Enthusiast',
    content: "Workout Compass gave me the structure I desperately needed. The workout templates alone are worth it — I've gained more in 3 months than in 2 years of random gym sessions.",
    rating: 5,
    event: 'Workout Compass',
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const testimonial = testimonials[currentIndex];

  const getEventColor = (event: string) => {
    switch (event) {
      case 'Walk2Fitness':
        return 'bg-primary text-primary-foreground';
      case 'Jam2Fit':
        return 'bg-accent text-accent-foreground';
      case 'Workout Compass':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="reviews" className="section-padding bg-muted relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-display lg:text-[42px] text-[30px] text-foreground mb-4">
            WHAT PEOPLE ARE{' '}
            <span className="text-gradient">SAYING</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto lg:w-[350px] w-auto leading-tight">
            Real stories from real people who&apos;ve experienced the transformation.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative bg-background rounded-3xl p-5 md:p-12 shadow-medium min-h-[320px]">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Quote size={48} className="text-primary/20" />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="pt-8"
              >
                {/* Event Badge */}
                <div className="flex justify-center mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getEventColor(testimonial.event)}`}>
                    {testimonial.event}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-secondary fill-secondary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[18px] lg:text-2xl text-center text-foreground font-medium leading-normal mb-8 max-w-2xl  italic mx-auto">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <p className="font-display text-xl text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted lg:flex hidden items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted lg:flex hidden items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-primary'
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;