import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Users, BookOpen, Music } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'WALK2FITNESS',
    subtitle: 'Community Fitness Movement',
    description: 'Join thousands who have discovered the joy of fitness through our signature walking events. Fresh air, great company, and a healthier you.',
    image: '/walk.jpg',
    icon: Users,
    ctas: [
      { label: 'Explore Past Event', href: '/events/walk2fitness', variant: 'primary' },
      { label: 'Register Now', href: 'https://www.tixtango.com/spotlight/walk2fitness-50', variant: 'secondary' }
    ],
    accentColor: 'primary',
  },
  {
    id: 2,
    title: 'JAM2FIT',
    subtitle: "Ilorin's First Nighttime Fitness Party",
    description: 'Where fitness meets the night! Dance, sweat, and celebrate health under the stars with live DJs and an electric atmosphere.',
    image: '/jamfit.jpg',
    icon: Music,
    ctas: [
      { label: 'Explore Past Event', href: '/events/jam2fit', variant: 'primary' },
      { label: 'View Gallery', href: '/gallery', variant: 'secondary' }
    ],
    accentColor: 'secondary',
  },
  {
    id: 3,
    title: 'WORKOUT COMPASS',
    subtitle: 'Your Ultimate Fitness Guide',
    description: 'Stop guessing, start progressing. The practical guide that transforms beginners into confident gym-goers with clear, actionable routines.',
    image: '/book2.jpeg',
    icon: BookOpen,
    ctas: [
      { label: 'Get the Book', href: '/innovator/workout-compass', variant: 'primary' },
      { label: 'Meet the Author', href: '/innovator', variant: 'secondary' }
    ],
    accentColor: 'accent',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  // Get border color based on accent color
  const getBorderColor = (accentColor: string) => {
    switch (accentColor) {
      case 'primary':
        return 'border-primary/50 hover:border-primary';
      case 'secondary':
        return 'border-secondary/50 hover:border-secondary';
      case 'accent':
        return 'border-accent/50 hover:border-accent';
      default:
        return 'border-primary/50 hover:border-primary';
    }
  };

  // Get background color based on accent color
  const getBgColor = (accentColor: string) => {
    switch (accentColor) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:shadow-glow-primary';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:shadow-glow-secondary';
      case 'accent':
        return 'bg-accent text-accent-foreground hover:shadow-glow-accent';
      default:
        return 'bg-primary text-primary-foreground hover:shadow-glow-primary';
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full container-max flex items-center">
        <div className="max-w-2xl w-full lg:pt-20 pt-6">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6 flex justify-center lg:justify-start"
              >
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${slide.accentColor === 'primary'
                      ? 'bg-primary text-primary-foreground'
                      : slide.accentColor === 'accent'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                >
                  <IconComponent size={16} />
                  {slide.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 lg:text-start text-center leading-tight"
              >
                {slide.title.split('').map((char, i) => (
                  <span
                    key={i}
                    className={char === '2' ? 'text-gradient' : ''}
                  >
                    {char}
                  </span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg md:text-xl text-white/90 mb-8 max-w-lg lg:text-start text-center lg:px-0 px-3"
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full"
              >
                {/* Primary CTA - Full width on mobile, auto on larger screens */}
                <a
                  href={slide.ctas[0].href}
                  className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-[90%] sm:w-auto ${getBgColor(slide.accentColor)}`}
                >
                  {slide.ctas[0].label}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>

                {/* Secondary CTA - Full width on mobile, auto on larger screens with matching border */}
                <a
                  href={slide.ctas[1].href}
                  className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-transparent text-white border-2 ${getBorderColor(slide.accentColor)} hover:bg-white/10 w-[90%] sm:w-auto`}
                >
                  {slide.ctas[1].label}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-4 sm:px-6">
        <div className="container-max flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'w-8 bg-primary'
                    : 'w-3 bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Counter - Responsive and always visible */}
      <div className="absolute top-17 right-4 sm:top-8 sm:right-8 lg:top-1/2 lg:right-8 lg:-translate-y-1/2 z-20 flex flex-col items-center gap-1 sm:gap-2">
        <span className="font-display text-2xl sm:text-3xl lg:text-3xl text-white drop-shadow-lg">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <div className="w-px h-6 sm:h-8 lg:h-12 bg-white/50" />
        <span className="text-xs sm:text-sm text-white/80 drop-shadow-lg">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default HeroCarousel;