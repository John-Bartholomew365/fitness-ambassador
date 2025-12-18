'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion, Easing, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Play, Users, Heart, Trophy, Calendar, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  videoUrl?: string;
  description: string;
  date?: string;
  participants?: string;
}

const galleryItems: GalleryItem[] = [
  // Walk2Fitness 4.0
  {
    id: 1,
    src: '/four1.jpeg',
    title: 'Walk2Fitness 4.0 Kickoff',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'The grand opening ceremony of Walk2Fitness 4.0 with hundreds of fitness enthusiasts.',
    date: '2024',
    participants: '500+'
  },
  {
    id: 2,
    src: '/four2.jpeg',
    title: 'Group Warm-up Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Massive group warm-up session led by The Fitness Ambassador.',
    date: '2024',
    participants: '500+'
  },
  {
    id: 3,
    src: '/walk.jpg',
    title: 'Walk2Fitness 4.0 Aerobics',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'High-energy aerobics session with enthusiastic participants.',
    date: '2024',
    participants: '500+'
  },
  {
    id: 4,
    src: '/four3.jpeg',
    title: 'Community Engagement',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Engaging with community members during Walk2Fitness 4.0.',
    date: '2024',
    participants: '500+'
  },
  {
    id: 5,
    src: '/four4.jpeg',
    title: 'Fitness Challenge',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Participants taking on fitness challenges during the event.',
    date: '2024',
    participants: '500+'
  },
  {
    id: 6,
    src: '/walkvid.mp4',
    title: 'Walk2Fitness 4.0 Highlights',
    category: 'Walk2Fitness',
    type: 'video',
    videoUrl: '/walkvid.mp4',
    description: 'Highlights reel from the most successful Walk2Fitness edition yet.',
    date: '2024',
    participants: '500+'
  },

  // Walk2Fitness 3.0
  {
    id: 7,
    src: '/three2.jpeg',
    title: 'Walk2Fitness 3.0 Morning Walk',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Early morning fitness walk through the city with enthusiastic participants.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 8,
    src: '/three1.jpeg',
    title: 'Group Exercise Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Guided group exercises during Walk2Fitness 3.0.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 9,
    src: '/three3.jpeg',
    title: 'Wellness Activities',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Health and wellness activities for all age groups.',
    date: '2023',
    participants: '400+'
  },

  // Walk2Fitness 2.0
  {
    id: 10,
    src: '/two1.jpeg',
    title: 'Walk2Fitness 2.0 Aerobics',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'High-energy aerobics session during Walk2Fitness 2.0.',
    date: '2022',
    participants: '300+'
  },
  {
    id: 11,
    src: '/two2.jpeg',
    title: 'Group Photo Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Official group photo of all Walk2Fitness 2.0 participants.',
    date: '2022',
    participants: '300+'
  },
  {
    id: 12,
    src: '/two3.jpeg',
    title: 'Fitness Demonstrations',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Fitness experts demonstrating proper exercise techniques.',
    date: '2022',
    participants: '300+'
  },

  // Walk2Fitness 1.0
  {
    id: 13,
    src: '/one2.jpeg',
    title: 'Walk2Fitness 1.0 Launch',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'The very first Walk2Fitness event that started it all.',
    date: '2021',
    participants: '2000+'
  },
  {
    id: 14,
    src: '/one1.jpeg',
    title: 'Inaugural Aerobics',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'First aerobics session of the inaugural Walk2Fitness event.',
    date: '2021',
    participants: '2000+'
  },
  {
    id: 15,
    src: '/one3.jpeg',
    title: 'Community Building',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Building fitness community from the ground up.',
    date: '2021',
    participants: '2000+'
  },

  // Jam2Fit
  {
    id: 16,
    src: '/jamfit.jpg',
    title: 'Jam2Fit Night Party',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Ilorin\'s first nighttime fitness party with energetic dance workouts.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 17,
    src: '/jam2fit2.jpg',
    title: 'DJ Fitness Session',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Live DJ mixing tracks for high-intensity workout sessions.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 18,
    src: '/jam2fit3.jpg',
    title: 'Nighttime Workout',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Participants enjoying fitness under the night sky.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 19,
    src: '/jam2fit4.jpg',
    title: 'Group Dance Fitness',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Synchronized dance fitness routines with the crowd.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 20,
    src: '/jam2fit5.jpg',
    title: 'Fitness Entertainment',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Combining entertainment with effective workout sessions.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 21,
    src: '/jam2fit6.jpg',
    title: 'Energy & Enthusiasm',
    category: 'Jam2Fit',
    type: 'image',
    description: 'High-energy atmosphere with enthusiastic participants.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 22,
    src: '/jam2fit8.jpg',
    title: 'Light Show Workout',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Workout session enhanced with spectacular light shows.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 23,
    src: '/jam2fit9.jpg',
    title: 'Finale Celebration',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Grand finale celebration of Jam2Fit event.',
    date: '2023',
    participants: '400+'
  },
  {
    id: 24,
    src: '/jamvid.mp4',
    title: 'Jam2Fit Highlights',
    category: 'Jam2Fit',
    type: 'video',
    videoUrl: '/jamvid.mp4',
    description: 'Highlights from the revolutionary nighttime fitness event.',
    date: '2023',
    participants: '400+'
  },

  // Afro Groove
  {
    id: 25,
    src: '/groove1.jpeg',
    title: 'Afro Groove Dance Fitness',
    category: 'AfroGroove',
    type: 'image',
    description: 'African dance-inspired fitness session with traditional rhythms.',
    date: '2023',
    participants: '150+'
  },
  {
    id: 26,
    src: '/groove2.jpeg',
    title: 'Cultural Fitness Fusion',
    category: 'AfroGroove',
    type: 'image',
    description: 'Blending traditional African dance with modern fitness techniques.',
    date: '2023',
    participants: '150+'
  },
  {
    id: 27,
    src: '/groove3.jpeg',
    title: 'Traditional Dance Moves',
    category: 'AfroGroove',
    type: 'image',
    description: 'Teaching traditional dance moves for fitness.',
    date: '2023',
    participants: '150+'
  },
  {
    id: 28,
    src: '/groove4.jpeg',
    title: 'Rhythm & Movement',
    category: 'AfroGroove',
    type: 'image',
    description: 'Focusing on rhythm and movement for full-body workout.',
    date: '2023',
    participants: '150+'
  },
  {
    id: 29,
    src: '/afrovid.mp4',
    title: 'Afro Groove Experience',
    category: 'AfroGroove',
    type: 'video',
    videoUrl: '/afrovid.mp4',
    description: 'Full session experience of Afro Groove dance fitness.',
    date: '2023',
    participants: '150+'
  },

  // Every Sunday Cycling
  {
    id: 30,
    src: '/cycling1.jpeg',
    title: 'Every Sunday Cycling Group',
    category: 'EverySundayCycling',
    type: 'image',
    description: 'Weekly cycling sessions for endurance and cardiovascular health.',
    date: '2024',
    participants: '100+ weekly'
  },
  {
    id: 31,
    src: '/cycling2.jpeg',
    title: 'Cycling Fitness Challenge',
    category: 'EverySundayCycling',
    type: 'image',
    description: 'Group cycling challenge building stamina and team spirit.',
    date: '2024',
    participants: '100+ weekly'
  },
  {
    id: 32,
    src: '/cycling3.jpeg',
    title: 'Scenic Route Cycling',
    category: 'EverySundayCycling',
    type: 'image',
    description: 'Enjoying scenic routes during Sunday cycling sessions.',
    date: '2024',
    participants: '100+ weekly'
  },
  {
    id: 33,
    src: '/cycling4.jpeg',
    title: 'Group Cycling Dynamics',
    category: 'EverySundayCycling',
    type: 'image',
    description: 'Team dynamics and coordination during group cycling.',
    date: '2024',
    participants: '100+ weekly'
  },

  // Ice Bath with Aerobics
  {
    id: 34,
    src: '/ice1.jpeg',
    title: 'Aerobics + Ice Bath Session',
    category: 'IceBathAerobics',
    type: 'image',
    description: 'High-intensity aerobics followed by ice bath recovery therapy.',
    date: '2024',
    participants: '80+'
  },
  {
    id: 35,
    src: '/ice.jpeg',
    title: 'Ice Bath Recovery',
    category: 'IceBathAerobics',
    type: 'image',
    description: 'Participants experiencing the benefits of cold water therapy.',
    date: '2024',
    participants: '80+'
  },

  // Training Sessions
  {
    id: 36,
    src: '/train1.jpeg',
    title: 'Corporate Aerobics - MTN',
    category: 'Training',
    type: 'image',
    description: 'Corporate Aerobics session with MTN SOUTH WEST STAFF in Abeokuta.',
    date: 'Ongoing',
    participants: 'Corporate Group'
  },
  {
    id: 37,
    src: '/train2.jpeg',
    title: 'Football Academy Fitness Talk',
    category: 'Training',
    type: 'image',
    description: 'Fitness Talk at a football academy in Ogbomosho.',
    date: 'Ongoing',
    participants: 'Academy Staff'
  },
  {
    id: 38,
    src: '/train3.jpeg',
    title: 'Maritime School Aerobics',
    category: 'Training',
    type: 'image',
    description: 'Aerobics Session at the Maritime School VI, Lagos State.',
    date: 'Ongoing',
    participants: 'School Community'
  },
  {
    id: 39,
    src: '/train4.jpeg',
    title: 'KEMSAN Acres Corporate Session',
    category: 'Training',
    type: 'image',
    description: 'Corporate Aerobics with KEMSAN Acres Global at Ilaji farm resort, Ibadan.',
    date: 'Ongoing',
    participants: 'Corporate Group'
  },
  {
    id: 40,
    src: '/train5.jpeg',
    title: 'Maritime School Follow-up',
    category: 'Training',
    type: 'image',
    description: '2nd visit to the Maritime School for follow-up session.',
    date: 'Ongoing',
    participants: 'School Community'
  },
  {
    id: 41,
    src: '/train6.jpeg',
    title: 'Morning Juice Aerobics',
    category: 'Training',
    type: 'image',
    description: 'Aerobics session at Morning Juice wellness center.',
    date: 'Ongoing',
    participants: 'Wellness Group'
  },
  {
    id: 42,
    src: '/train7.jpeg',
    title: 'Chaste International School',
    category: 'Training',
    type: 'image',
    description: 'Aerobics session at Chaste International School.',
    date: 'Ongoing',
    participants: 'School Community'
  },
  {
    id: 43,
    src: '/train8.jpeg',
    title: 'Brilliant Stars International',
    category: 'Training',
    type: 'image',
    description: 'Aerobics talk and session at Brilliant Stars International School.',
    date: 'Ongoing',
    participants: 'School Community'
  },
  {
    id: 44,
    src: '/training1.mp4',
    title: 'Training Techniques Demo',
    category: 'Training',
    type: 'video',
    videoUrl: '/training1.mp4',
    description: 'Professional training techniques and workout demonstrations.',
    date: 'Ongoing',
    participants: 'Various Groups'
  },

  // Ambassador Portraits
  {
    id: 45,
    src: '/the-fa.jpeg',
    title: 'The Fitness Ambassador',
    category: 'Portrait',
    type: 'image',
    description: 'Official portrait of Ajisafe Sulaiman, The Fitness Ambassador.',
    date: '2024',
    participants: 'Solo'
  },
];

const categories = ['All', 'Walk2Fitness', 'Jam2Fit', 'AfroGroove', 'EverySundayCycling', 'IceBathAerobics', 'Training', 'Portrait'];

const Gallery = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const goToPrevious = () => {
    const newIndex = selectedIndex === 0 ? filteredItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = selectedIndex === filteredItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const handleItemClick = (item: GalleryItem, index: number) => {
    if (isMobile) {
      // On mobile, toggle details instead of immediately opening lightbox
      if (showDetails === index) {
        openLightbox(item, index);
      } else {
        setShowDetails(showDetails === index ? null : index);
      }
    } else {
      openLightbox(item, index);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-linear-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#00802022_25%,transparent_25%,transparent_75%,#00802022_75%,#00802022),linear-gradient(45deg,#00802022_25%,transparent_25%,transparent_75%,#00802022_75%,#00802022)] bg-size-[20px_20px] bg-position-[0_0,10px_10px] opacity-10" />
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#008020] text-white rounded-full text-sm font-semibold mb-6">
              <Camera className="w-4 h-4" />
              Media Gallery
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              CAPTURING THE <span className='text-gradient'>JOURNEY</span>
            </h1>
            <p className="text-[16px] text-muted-foreground lg:w-[420px] w-auto mx-auto leading-tight lg:px-0 px-4">
              Explore photos and videos from our fitness events, training sessions, and memorable moments.
            </p>

            {/* Event Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto lg:px-0 px-3">
              {[
                { icon: Calendar, label: 'Events', value: '7+' },
                { icon: Users, label: 'Participants', value: '2000+' },
                { icon: Trophy, label: 'Editions', value: '10+' },
                { icon: Heart, label: 'Happy Clients', value: '500+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#ffde00]/20"
                >
                  <stat.icon className="w-8 h-8 text-[#008020] mx-auto mb-2" />
                  <p className="font-display text-2xl text-[#008020]">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 border-b border-border/50 sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container-max">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDetails(null); // Reset details on filter change
                }}
                className={`${selectedCategory === category
                  ? 'bg-[#008020] text-white hover:bg-[#008020]/90'
                  : 'hover:bg-[#008020]/10 hover:text-[#008020] hover:border-[#008020]'
                  } transition-all duration-200`}
              >
                {category}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Showing {filteredItems.length} items in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
          </p>
        </div>
      </section>

      {/* Event Info Cards */}
      <section className="py-8 bg-muted/30">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Walk2Fitness',
                color: '#008020',
                description: 'Mass community fitness walks with aerobics sessions',
                editions: '1.0 to 4.0',
                participants: '200-500+ per edition'
              },
              {
                title: 'Jam2Fit',
                color: '#ff8a00',
                description: 'Ilorin\'s first nighttime fitness party experience',
                editions: '1 Edition',
                participants: '400+ participants'
              },
              {
                title: 'Afro Groove',
                color: '#008020',
                description: 'African dance-inspired fitness fusion',
                editions: 'Special Edition',
                participants: '150+ participants'
              },
              {
                title: 'Every Sunday Cycling',
                color: '#ff8a00',
                description: 'Weekly cycling sessions for endurance training',
                editions: 'Weekly',
                participants: '100+ weekly'
              },
              {
                title: 'Ice Bath + Aerobics',
                color: '#008020',
                description: 'High-intensity workout with recovery therapy',
                editions: 'Special Edition',
                participants: '80+ participants'
              },
              {
                title: 'Personal Training',
                color: '#ff8a00',
                description: 'One-on-one & group fitness coaching',
                editions: 'Ongoing',
                participants: '500+ transformed'
              },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.editions}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#008020]" />
                    <span className="text-foreground font-medium">{event.participants}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ffde00]/20 text-[#ff8a00] text-xs font-semibold">
                    Active
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`${isMobile ? 'columns-1' : 'columns-2 md:columns-3 lg:columns-4'} gap-4`}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleItemClick(item, index)}
              >
                <div className="relative aspect-square">
                  <div className={`relative w-full h-full ${item.type === 'video' ? 'bg-linear-to-br from-[#008020]/10 to-black/30' : ''}`}>
                    <Image
                      src={item.type === 'video' ? '' : item.src}
                      alt={item.type === 'video' ? '' : item.title}
                      fill
                      sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${item.type === 'video' ? 'opacity-0' : ''
                        }`}
                      loading="lazy"
                    />

                    {/* Video indicator overlay - always visible */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#008020]/90 flex items-center justify-center z-10">
                          <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                        <div className="absolute top-4 left-4 px-2 py-1 bg-[#ff8a00] text-white rounded-full text-xs font-semibold flex items-center gap-1 z-20">
                          <Video className="w-3 h-3" />
                          VIDEO
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Image indicator */}
                  {item.type === 'image' && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm text-[#008020] rounded-full text-xs font-semibold flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      PHOTO
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#008020] rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>

                  {/* Overlay Content - Shows on hover (desktop) or when tapped (mobile) */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 ${isMobile
                    ? (showDetails === index ? 'translate-y-0' : 'translate-y-full')
                    : 'translate-y-full group-hover:translate-y-0'
                    } transition-transform duration-300 bg-linear-to-t from-[#008020] via-[#008020]/95 to-transparent`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-[#ffde00] text-[#008020] rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs text-white/80 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm md:text-base">{item.title}</h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-white/60 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.participants}
                      </span>
                      <span className="text-xs text-white/60 flex items-center gap-1">
                        {item.type === 'video' ? (
                          <>
                            <Video className="w-3 h-3" />
                            Video
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3" />
                            Photo
                          </>
                        )}
                      </span>
                    </div>
                    {isMobile && showDetails === index && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <Button
                          size="sm"
                          className="w-full bg-[#ff8a00] text-white hover:bg-[#ff8a00]/90 text-xs"
                        >
                          {item.type === 'video' ? 'Play Video' : 'View Full Size'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Mobile instruction */}
                  {isMobile && showDetails !== index && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="inline-block px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                        Tap for details
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#008020]/10 flex items-center justify-center">
                <Camera className="w-12 h-12 text-[#008020]" />
              </div>
              <p className="text-muted-foreground text-lg">No media found in this category.</p>
              <Button
                className="mt-4 bg-[#008020] text-white hover:bg-[#008020]/90"
                onClick={() => setSelectedCategory('All')}
              >
                View All Media
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-background hover:bg-background/10 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' ? (
                <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden bg-black">
                  <div className="aspect-video">
                    <video
                      src={selectedItem.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Info Panel */}
              <div className="bg-white rounded-2xl p-4 md:p-6 mt-4 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#008020] text-white rounded-full text-sm font-semibold">
                        {selectedItem.category}
                      </span>
                      <span className="px-3 py-1 bg-[#ffde00] text-[#008020] rounded-full text-sm font-semibold">
                        {selectedItem.type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedItem.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedItem.participants}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {selectedItem.description}
                </p>

                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="text-sm text-muted-foreground">
                    {selectedIndex + 1} / {filteredItems.length}
                  </div>
                  {filteredItems.length > 1 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPrevious}
                        className="border-[#008020] text-[#008020] hover:bg-[#008020]/10"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNext}
                        className="border-[#008020] text-[#008020] hover:bg-[#008020]/10"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;