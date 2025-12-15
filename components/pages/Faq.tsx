import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: "Walk2Fitness Events",
    questions: [
      {
        question: "What is Walk2Fitness?",
        answer: "Walk2Fitness is our flagship fitness event series that combines outdoor walking with structured exercises. It's designed for all fitness levels and promotes community wellness through fun, accessible workouts. We've successfully hosted multiple editions including Walk2Fitness 1.0, 2.0, 3.0, and 4.0."
      },
      {
        question: "What makes Walk2Fitness different from regular workouts?",
        answer: "Walk2Fitness uniquely blends cardio, strength training, and community bonding in outdoor settings. Each edition introduces new workout formats, guest trainers, and wellness activities to keep participants engaged and motivated."
      },
      {
        question: "How can I register for upcoming Walk2Fitness events?",
        answer: "Registration is available through our Events page. Select the Walk2Fitness edition you're interested in and complete the registration form. We offer early bird discounts and group packages for multiple participants."
      },
      {
        question: "What should I bring to a Walk2Fitness event?",
        answer: "We recommend comfortable workout clothes, proper athletic shoes, a water bottle, towel, and sun protection. All exercise equipment is provided. First-timers receive a welcome pack with essential items."
      },
      {
        question: "Are Walk2Fitness events suitable for beginners?",
        answer: "Absolutely! All our events are designed to accommodate participants of all fitness levels. Our certified trainers provide modifications, alternative exercises, and personal attention to ensure everyone participates safely and effectively."
      }
    ]
  },
  {
    category: "Specialty Events",
    questions: [
      {
        question: "What is Afro Groove?",
        answer: "Afro Groove is a vibrant fitness event done in collaboration with the University of Ilorin Sport Council. It combines African dance rhythms with fitness movements, creating a unique cultural workout experience that celebrates African heritage while promoting physical wellness."
      },
      {
        question: "What is Aerobics + Icebath event?",
        answer: "This innovative event is done in collaboration with Massage Alchemy. It combines high-energy aerobics with post-workout recovery through ice baths. The aim is to provide a complete wellness experience — intense workout followed by therapeutic recovery for muscle rejuvenation."
      },
      {
        question: "What is Jam2Fit?",
        answer: "Jam2Fit is Ilorin's first nighttime fitness party, featuring over 400+ participants. It's an electrifying combination of fitness, music, and socializing under the stars. This event transforms traditional workouts into an unforgettable party atmosphere with DJs, light shows, and high-energy group exercises."
      },
      {
        question: "How often are these specialty events held?",
        answer: "We organize specialty events quarterly, with each event having a unique theme and focus. Follow our social media and subscribe to our newsletter to stay updated on upcoming events and early registration opportunities."
      },
      {
        question: "Can I participate in multiple events?",
        answer: "Yes! Many participants join multiple events throughout the year. We offer package deals for those interested in attending several events. Each event is designed to complement others, providing varied fitness experiences."
      }
    ]
  },
  {
    category: "Workout Compass Book",
    questions: [
      {
        question: "What is Workout Compass about?",
        answer: "Workout Compass is a practical fitness guide designed to help beginners and experienced gym-goers train with clarity, confidence, and purpose. Written by Ajisafe Sulaiman — 'The Fitness Ambassador', with 7+ years of experience, it provides a structured roadmap to build effective routines, stay consistent, and achieve real results."
      },
      {
        question: "What specific topics does Workout Compass cover?",
        answer: "The book covers: creating personalized workout plans, understanding training splits, proper exercise form, progressive overload principles, stretching routines, dietary tips, program templates, mindset development, and practical tools for tracking progress."
      },
      {
        question: "Who is the author and what are his qualifications?",
        answer: "Workout Compass is written by Ajisafe Sulaiman (The Fitness Ambassador), a certified fitness coach with 7+ years of experience training individuals and groups. His expertise combines scientific principles with practical, real-world application."
      },
      {
        question: "Is the book available in digital format?",
        answer: "Yes, Workout Compass is available in both digital (PDF) and physical formats. The digital version can be purchased and downloaded immediately from our Book page, accessible on any device."
      },
      {
        question: "Can I get a sample before purchasing?",
        answer: "Absolutely! We offer a free sample chapter that includes the introduction and one complete workout template. This allows you to preview the writing style, content quality, and practical value before making a purchase decision."
      },
      {
        question: "Is this book suitable for complete beginners?",
        answer: "Yes! Workout Compass is specifically designed to be accessible to complete beginners while still providing value for experienced gym-goers. It starts with fundamentals and gradually progresses to more advanced concepts."
      }
    ]
  },
  {
    category: "FA Gym Wears",
    questions: [
      {
        question: "What sizes are available for FA Gym Wears?",
        answer: "Our gym wear collection is available in sizes XS to 3XL, ensuring inclusivity for all body types. Each product page includes a detailed size guide with measurements to help you find your perfect fit."
      },
      {
        question: "What materials are used in FA Gym Wears?",
        answer: "We use premium, breathable, moisture-wicking fabrics that provide comfort, flexibility, and durability. Our materials are specifically chosen for intense workouts, offering four-way stretch and quick-dry properties."
      },
      {
        question: "What is your return and exchange policy?",
        answer: "We offer a 14-day return policy for unworn items with original tags and packaging. Exchanges are available for size issues. Please refer to our Terms & Conditions page for complete details on the return process."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within Nigeria with various delivery options. International shipping is being planned for the future. Join our mailing list to be notified when international shipping becomes available."
      },
      {
        question: "How do I care for my FA Gym Wears?",
        answer: "We recommend washing in cold water, avoiding bleach, and air drying or tumble drying on low heat. Detailed care instructions are included with each purchase to ensure longevity of your gym wear."
      },
      {
        question: "Are new designs regularly added to the collection?",
        answer: "Yes! We release new designs and collections seasonally. Follow us on social media and subscribe to our newsletter to be the first to know about new arrivals and exclusive launches."
      }
    ]
  },
  {
    category: "Fitness Training & Consultation",
    questions: [
      {
        question: "What types of training programs do you offer?",
        answer: "We offer comprehensive fitness solutions including: personal training (1-on-1), group fitness sessions, online coaching, specialized programs for weight loss, muscle building, athletic performance, and general fitness improvement."
      },
      {
        question: "How do I book a consultation?",
        answer: "Visit our Training page and fill out the booking form, or contact us directly via WhatsApp, phone, or email. We offer a free initial consultation to discuss your goals, assess your current fitness level, and recommend the best program for you."
      },
      {
        question: "What happens during the initial consultation?",
        answer: "The initial consultation includes: goal assessment, fitness evaluation, discussion of medical history and limitations, introduction to our training philosophy, and creating a personalized roadmap for your fitness journey."
      },
      {
        question: "Do you offer online training programs?",
        answer: "Yes! We provide comprehensive online coaching including personalized workout plans, nutrition guidance, progress tracking, weekly check-ins, exercise video demonstrations, and 24/7 support via our dedicated app."
      },
      {
        question: "What qualifications do your trainers have?",
        answer: "All our trainers are certified fitness professionals with specialized training in various disciplines. They undergo continuous education and are trained in first aid and CPR for your safety."
      },
      {
        question: "Can I switch between different training programs?",
        answer: "Absolutely! We understand that goals and circumstances change. You can switch between programs with proper notice, and we'll help you transition smoothly while maintaining progress."
      }
    ]
  },
  {
    category: "Certification Program",
    questions: [
      {
        question: "When will the fitness professional certification program launch?",
        answer: "Our Certified Fitness Professional program is coming soon! We're currently finalizing the curriculum and accreditation. Join our waitlist to be the first to know when registrations open and receive early enrollment benefits."
      },
      {
        question: "What will the certification program cover?",
        answer: "The comprehensive program will cover: exercise science fundamentals, anatomy and physiology, program design principles, nutrition basics, client assessment techniques, coaching psychology, injury prevention, and practical training methodologies."
      },
      {
        question: "Who is this certification program designed for?",
        answer: "This program is ideal for: aspiring fitness trainers, gym instructors looking to upgrade their skills, fitness enthusiasts wanting to turn passion into profession, and healthcare professionals seeking to integrate fitness into their practice."
      },
      {
        question: "Will the certification be recognized?",
        answer: "Yes, we're working with accredited fitness education bodies to ensure our certification meets industry standards and is recognized within the fitness profession."
      },
      {
        question: "What are the prerequisites for joining?",
        answer: "While formal prerequisites are minimal, we recommend: passion for fitness, basic understanding of exercise, good communication skills, and commitment to completing the program. Details will be announced upon launch."
      },
      {
        question: "How can I stay updated about the certification launch?",
        answer: "Join our dedicated certification waitlist on our website, follow our social media channels, and subscribe to our newsletter. Waitlist members will receive exclusive updates and early registration opportunities."
      }
    ]
  },
  {
    category: "General Information",
    questions: [
      {
        question: "What is The Fitness Ambassador's mission?",
        answer: "Our mission is to make quality fitness education, training, and experiences accessible to everyone. We believe in transforming lives through movement, community, and practical fitness solutions that work in real life."
      },
      {
        question: "How long has The Fitness Ambassador been operating?",
        answer: "Founded by Ajisafe Sulaiman, we've been serving the fitness community for over 7 years, growing from individual training to hosting large-scale events, publishing educational materials, and developing fitness products."
      },
      {
        question: "Where are you located?",
        answer: "We're based in Ilorin, Nigeria, but serve clients nationwide through our online programs and events. Our physical events are primarily held in Ilorin with plans to expand to other cities."
      },
      {
        question: "How can I stay updated on new offerings?",
        answer: "Follow us on all social media platforms (@TheFitnessAmbassador), subscribe to our newsletter on our website, and join our WhatsApp community for real-time updates, tips, and exclusive offers."
      },
      {
        question: "Do you offer corporate wellness programs?",
        answer: "Yes! We provide customized corporate wellness packages including workplace fitness sessions, wellness workshops, ergonomic assessments, and team-building fitness events. Contact us for a corporate proposal."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, online payments via debit/credit cards, and popular digital payment platforms. Payment options are clearly displayed during checkout for all products and services."
      }
    ]
  }
];

// FAQItem component remains exactly the same
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-border"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors cursor-pointer"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-primary shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// FAQ component remains the same structure
const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">      
      {/* Hero Section - unchanged */}
      <section className="pt-32 pb-16 px-4 bg-linear-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold">Got Questions?</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className='text-gradient'>Questions</span>
            </h1>
            <p className="text-[16px] text-muted-foreground lg:w-[450px] w-auto leading-tight mx-auto">
              Find answers to common questions about our events, training programs, products, and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content - now with more categories */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                {category.category}
              </h2>
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                {category.questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA - unchanged */}
      <section className="py-16 px-4 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? <br /> Our team is here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-background text-foreground font-bold py-4 px-8 rounded-2xl hover:bg-background/90 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;