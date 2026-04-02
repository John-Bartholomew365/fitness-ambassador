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
    date: '2025',
    participants: '500+'
  },
  {
    id: 2,
    src: '/four2.jpeg',
    title: 'Group Warm-up Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Massive group warm-up session led by The Fitness Ambassador.',
    date: '2025',
    participants: '500+'
  },
  {
    id: 3,
    src: '/walk.jpg',
    title: 'Walk2Fitness 4.0 Aerobics',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'High-energy aerobics session with enthusiastic participants.',
    date: '2025',
    participants: '500+'
  },
  {
    id: 4,
    src: '/four3.jpeg',
    title: 'Community Engagement',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Engaging with community members during Walk2Fitness 4.0.',
    date: '2025',
    participants: '500+'
  },
  {
    id: 5,
    src: '/four4.jpeg',
    title: 'Fitness Challenge',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Participants taking on fitness challenges during the event.',
    date: '2025',
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
    date: '2025',
    participants: '500+'
  },

  // Walk2Fitness 5.0 — IDs 100–154
  {
    id: 100,
    src: '/w1.jpg',
    title: 'The Power Count',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The crowd stays synchronized, pushing through a set of high-intensity reps with grit.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 101,
    src: '/w2.jpg',
    title: 'Walk2Fitness 5.0 — The Crowd Arrives',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Hundreds of fitness enthusiasts gathering for the biggest Walk2Fitness yet.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 102,
    src: '/w3.jpg',
    title: '5.0 Morning Energy',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The energy at dawn — Walk2Fitness 5.0 participants ready to make history.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 103,
    src: '/w4.jpg',
    title: '5.0 Group Warm-Up',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Synchronized warm-up session setting the tone for Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 104,
    src: '/w5.jpg',
    title: '5.0 Final Walk',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The closing walk — a triumphant end to the landmark Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 105,
    src: '/w6.jpg',
    title: 'The Empowered Pace',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "The ladies bring an incredible burst of energy to the session, matching the intensity of every rep with effortless drive.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 106,
    src: '/w7.jpg',
    title: '5.0 Crowd Panorama',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'A sweeping view of the record-breaking crowd at Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 107,
    src: '/w8.jpg',
    title: 'Walk2Fitness 5.0 — Fitness Ambassador in Action',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The Fitness Ambassador leading participants through the signature routine.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 108,
    src: '/w9.jpg',
    title: '5.0 Stretching Session',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Proper stretching and mobility work as part of the 5.0 structured program.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 109,
    src: '/w10.jpg',
    title: 'Walk2Fitness 5.0 — Unity Walk',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Hundreds walking together as one — the spirit of Walk2Fitness in full display.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 110,
    src: '/w11.jpg',
    title: '5.0 Team Drill',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Coordinated team drills bringing structure and fun to the 5.0 experience.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 111,
    src: '/w12.jpg',
    title: 'The Continuous Burn',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The momentum stays high as the session pushes forward, keeping every participant locked in and moving with purpose.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 112,
    src: '/w13.jpg',
    title: 'Walk2Fitness 5.0 — Cardio Circuit',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants pushing through the cardio circuit at the milestone edition.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 113,
    src: '/w14.jpg',
    title: '5.0 Power Pose',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'A moment of collective strength and pride at Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 114,
    src: '/w15.jpg',
    title: 'Pushing Forward',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The drive remains relentless as a new wave of movement takes over, ensuring the spirit of the session stays at its peak.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 115,
    src: '/w16.jpg',
    title: 'Walk2Fitness 5.0 — Squad Goals',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Friends, families, and strangers united by fitness at Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 116,
    src: '/w17.jpg',
    title: '5.0 High Knees Challenge',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants tackling the high knees challenge with full intensity.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 117,
    src: '/w18.jpg',
    title: 'Double the Energy',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The Fitness Ambassador and VicthawOfficial are all smiles at the front, ready to kick off the next session with a burst of high energy.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 118,
    src: '/w19.jpg',
    title: 'Walk2Fitness 5.0 — Wide Angle',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The full scale of Walk2Fitness 5.0 — a sight to behold.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 119,
    src: '/w20.jpg',
    title: 'The Fitness Walk',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "A massive crowd hits the streets for the Walk2Fitness in Ilorin.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 120,
    src: '/w21.jpg',
    title: 'The Active Crowd',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants follow the rhythm as trainers lead the morning workout.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 121,
    src: '/w22.jpg',
    title: 'The Planning Crew',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The committee members take center stage for a quick group photo.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 122,
    src: '/w23.jpg',
    title: 'The Pure Energy',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants radiate high energy during an intense workout session.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 123,
    src: '/w24.jpg',
    title: 'The Session Flow',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "Participants find their rhythm together during the morning's physical drills.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 124,
    src: '/w25.jpg',
    title: 'Walk2Fitness 5.0 — Sunrise Shots',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Golden hour light over the Walk2Fitness 5.0 crowd — pure magic.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 125,
    src: '/w26.jpg',
    title: 'The Synchronized Set',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The energy stays high as the group locks into a rhythm, grinding through another round of movements.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 126,
    src: '/w27.jpg',
    title: 'The Inclusive Edge',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The determination is palpable as participants of all backgrounds push their limits together during the session.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 127,
    src: '/w28.jpg',
    title: 'Walk2Fitness 5.0 — Smiles All Round',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Joy and satisfaction on the faces of Walk2Fitness 5.0 participants.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 128,
    src: '/w29.jpg',
    title: 'The Field Flow',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Individual participants find their rhythm, staying fully engaged as they power through the intense demands of the session.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 129,
    src: '/w30.jpg',
    title: 'The Power Pulse',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "Energy ripples through the crowd as everyone stays in sync, mirroring the movements and powering through the reps together.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 130,
    src: '/w31.jpg',
    title: 'The Core Team',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The leadership stands with the convener, marking the unity and effort that made the day possible.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 131,
    src: '/w32.jpg',
    title: 'Rhythm in Motion',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The crowd stays in perfect sync as VicthawOfficial leads the charge, capturing the peak energy of Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 132,
    src: '/w33.jpg',
    title: 'The Mission in Motion',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants display powerful reminders that health begins with movement, sharing the core message behind the walk.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 133,
    src: '/w34.jpg',
    title: 'Walk2Fitness 5.0 — Community Portrait',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "A candid portrait of Ilorin's fitness community at the milestone edition.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 134,
    src: '/w35.jpg',
    title: '5.0 Endurance Walk',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The endurance walk segment testing commitment and building stamina.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 135,
    src: '/w36.jpg',
    title: '5.0 Fitness Fashion',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants showing up in style at Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 136,
    src: '/w37.jpg',
    title: 'Voices on the Bridge',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'High above the city, the message stays clear as participants hold their signs high, turning the bridge into a platform for health.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 137,
    src: '/w38.jpg',
    title: 'A Vital Reminder',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Spreading the word that every step counts, highlighting how walking serves as a natural and effective way to lower blood pressure.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 138,
    src: '/w39.jpg',
    title: '5.0 Finale Energy',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The explosive finale energy that capped off Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 139,
    src: '/w40.jpg',
    title: 'The Bond of Success',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Pure joy and mutual respect on display as VicthawOfficial celebrates the Convener’s hard work, a proud moment of brotherhood and shared victory for the vision.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 140,
    src: '/w41.jpg',
    title: '5.0 Dynamic Poses',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Participants striking dynamic fitness poses mid-session at 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 141,
    src: '/w42.jpg',
    title: 'Leading the Way',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'From a high point, the Convener stays at the front to guide the crowd and keep the energy strong as everyone moves together.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 142,
    src: '/w43.jpg',
    title: 'Walk2Fitness 5.0 — Joy in Motion',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Pure joy captured mid-movement at the Walk2Fitness 5.0 milestone edition.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 143,
    src: '/w44.jpg',
    title: 'Health in Focus',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The journey goes beyond movement as participants take a moment to get their vitals checked, making sure their fitness is backed by real health data.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 144,
    src: '/w45.jpg',
    title: 'The Expert Session',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Certified trainers lead the massive crowd through the fitness drills.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 145,
    src: '/w46.jpg',
    title: 'The Bold Stance',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'A motivated walker proudly displays his commitment to the grind.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 146,
    src: '/w47.jpg',
    title: 'The Lead Workout',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Coach Korede takes the massive crowd through a high-energy session.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 147,
    src: '/w48.jpg',
    title: 'The Peak Vibe',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The crowd stays locked in, keeping the intensity high until the end.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 148,
    src: '/w49.jpg',
    title: 'Walk2Fitness 5.0 — Legacy Shot',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "A defining frame from the edition that cemented Walk2Fitness's legacy.",
    date: '2026',
    participants: '500+'
  },
  {
    id: 149,
    src: '/w50.jpg',
    title: 'The Heart of the Event',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The Fitness Ambassador is all smiles, radiating pure energy as he leads the charge.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 150,
    src: '/w51.jpg',
    title: 'The Chief Motivator',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The Fitness Ambassador claps his hands in encouragement, a wide smile reflecting the success of the session.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 151,
    src: '/w52.jpg',
    title: 'Walk2Fitness 5.0 — Milestone Moment',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'Commemorating the fifth edition — a milestone for Ilorin fitness culture.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 152,
    src: '/w53.jpg',
    title: '5.0 All Smiles',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The post-session glow — smiles, sweat, and satisfaction at Walk2Fitness 5.0.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 153,
    src: '/w54.jpg',
    title: 'Leading the Line',
    category: 'Walk2Fitness5',
    type: 'image',
    description: 'The Fitness Ambassador takes center stage once more, guiding the participants through a high-octane sequence with expert precision.',
    date: '2026',
    participants: '500+'
  },
  {
    id: 154,
    src: '/w55.jpg',
    title: 'The Backstage Blueprint',
    category: 'Walk2Fitness5',
    type: 'image',
    description: "A detailed look at the supporters behind the scenes, acknowledging the essential partnerships that drive the event's success.",
    date: '2026',
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
    date: '2024',
    participants: '400+'
  },
  {
    id: 8,
    src: '/three1.jpeg',
    title: 'Group Exercise Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Guided group exercises during Walk2Fitness 3.0.',
    date: '2024',
    participants: '400+'
  },
  {
    id: 9,
    src: '/three3.jpeg',
    title: 'Wellness Activities',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Health and wellness activities for all age groups.',
    date: '2024',
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
    date: '2023',
    participants: '300+'
  },
  {
    id: 11,
    src: '/two2.jpeg',
    title: 'Group Photo Session',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Official group photo of all Walk2Fitness 2.0 participants.',
    date: '2023',
    participants: '300+'
  },
  {
    id: 12,
    src: '/two3.jpeg',
    title: 'Fitness Demonstrations',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Fitness experts demonstrating proper exercise techniques.',
    date: '2023',
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
    date: '2022',
    participants: '2000+'
  },
  {
    id: 14,
    src: '/one1.jpeg',
    title: 'Inaugural Aerobics',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'First aerobics session of the inaugural Walk2Fitness event.',
    date: '2022',
    participants: '2000+'
  },
  {
    id: 15,
    src: '/one3.jpeg',
    title: 'Community Building',
    category: 'Walk2Fitness',
    type: 'image',
    description: 'Building fitness community from the ground up.',
    date: '2022',
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
    date: '2025',
    participants: '400+'
  },
  {
    id: 17,
    src: '/jam2fit2.jpg',
    title: 'DJ Fitness Session',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Live DJ mixing tracks for high-intensity workout sessions.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 18,
    src: '/jam2fit3.jpg',
    title: 'Nighttime Workout',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Participants enjoying fitness under the night sky.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 19,
    src: '/jam2fit4.jpg',
    title: 'Group Dance Fitness',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Synchronized dance fitness routines with the crowd.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 20,
    src: '/jam2fit5.jpg',
    title: 'Fitness Entertainment',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Combining entertainment with effective workout sessions.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 21,
    src: '/jam2fit6.jpg',
    title: 'Energy & Enthusiasm',
    category: 'Jam2Fit',
    type: 'image',
    description: 'High-energy atmosphere with enthusiastic participants.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 22,
    src: '/jam2fit8.jpg',
    title: 'Light Show Workout',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Workout session enhanced with spectacular light shows.',
    date: '2025',
    participants: '400+'
  },
  {
    id: 23,
    src: '/jam2fit9.jpg',
    title: 'Finale Celebration',
    category: 'Jam2Fit',
    type: 'image',
    description: 'Grand finale celebration of Jam2Fit event.',
    date: '2025',
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
    date: '2025',
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
    date: '2025',
    participants: '150+'
  },
  {
    id: 26,
    src: '/groove2.jpeg',
    title: 'Cultural Fitness Fusion',
    category: 'AfroGroove',
    type: 'image',
    description: 'Blending traditional African dance with modern fitness techniques.',
    date: '2025',
    participants: '150+'
  },
  {
    id: 27,
    src: '/groove3.jpeg',
    title: 'Traditional Dance Moves',
    category: 'AfroGroove',
    type: 'image',
    description: 'Teaching traditional dance moves for fitness.',
    date: '2025',
    participants: '150+'
  },
  {
    id: 28,
    src: '/groove4.jpeg',
    title: 'Rhythm & Movement',
    category: 'AfroGroove',
    type: 'image',
    description: 'Focusing on rhythm and movement for full-body workout.',
    date: '2025',
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
    date: '2025',
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

const categories = ['All', 'Walk2Fitness5', 'Walk2Fitness', 'Jam2Fit', 'AfroGroove', 'EverySundayCycling', 'IceBathAerobics', 'Training', 'Portrait'];

const categoryLabels: Record<string, string> = {
  'All': 'All',
  'Walk2Fitness5': 'Walk2Fitness 5.0',
  'Walk2Fitness': 'Walk2Fitness (1.0–4.0)',
  'Jam2Fit': 'Jam2Fit',
  'AfroGroove': 'AfroGroove',
  'EverySundayCycling': 'Every Sunday Cycling',
  'IceBathAerobics': 'Ice Bath Aerobics',
  'Training': 'Training',
  'Portrait': 'Portrait',
};

const Gallery = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

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
                  setShowDetails(null);
                }}
                className={`${selectedCategory === category
                  ? category === 'Walk2Fitness5'
                    ? 'bg-[#008020] text-white hover:bg-[#008020]/90 ring-2 ring-[#ffde00] ring-offset-1'
                    : 'bg-[#008020] text-white hover:bg-[#008020]/90'
                  : category === 'Walk2Fitness5'
                    ? 'hover:bg-[#008020]/10 hover:text-[#008020] hover:border-[#008020] border-[#008020]/40 text-[#008020] font-semibold'
                    : 'hover:bg-[#008020]/10 hover:text-[#008020] hover:border-[#008020]'
                  } transition-all duration-200`}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Showing {filteredItems.length} items in {categoryLabels[selectedCategory] ?? selectedCategory}
          </p>
        </div>
      </section>

      {/* Walk2Fitness 5.0 Banner — shown when that filter is active */}
      <AnimatePresence>
        {selectedCategory === 'Walk2Fitness5' && (
          <motion.section
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="py-8 bg-linear-to-r from-[#008020]/10 via-[#ffde00]/10 to-[#008020]/10 border-b border-[#008020]/20"
          >
            <div className="container-max text-center">
              <p className="text-sm font-semibold text-[#008020] uppercase tracking-widest mb-1">The Milestone Edition</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">Walk2Fitness <span className="text-[#008020]">5.0</span> — 55 Moments from History</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">700+ participants. One morning. A legacy cemented. Browse every frame from Ilorin&apos;s grandest fitness gathering.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Event Info Cards */}
      <section className="py-8 bg-muted/30">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Walk2Fitness 5.0',
                color: '#008020',
                description: "The milestone fifth edition — Ilorin's grandest fitness gathering yet.",
                editions: 'The Grand Milestone',
                participants: '700+ participants'
              },
              {
                title: 'Walk2Fitness',
                color: '#008020',
                description: "Mass community fitness walks with aerobics sessions",
                editions: '1.0 to 4.0',
                participants: '200–500+ per edition'
              },
              {
                title: 'Jam2Fit',
                color: '#ff8a00',
                description: "Ilorin's first nighttime fitness party experience",
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
                description: 'One-on-one & group / corporate fitness coaching',
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
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${item.type === 'video' ? 'opacity-0' : ''}`}
                      loading="lazy"
                    />

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

                  {item.type === 'image' && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm text-[#008020] rounded-full text-xs font-semibold flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      PHOTO
                    </div>
                  )}

                  {/* Category badge — highlight 5.0 entries */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold ${item.category === 'Walk2Fitness5' ? 'bg-[#008020] text-white' : 'bg-white/90 text-[#008020]'}`}>
                      {item.category === 'Walk2Fitness5' ? 'W2F 5.0' : item.category}
                    </span>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 p-4 ${isMobile
                    ? (showDetails === index ? 'translate-y-0' : 'translate-y-full')
                    : 'translate-y-full group-hover:translate-y-0'
                    } transition-transform duration-300 bg-linear-to-t from-[#008020] via-[#008020]/95 to-transparent`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-[#ffde00] text-[#008020] rounded-full text-xs font-semibold">
                        {item.category === 'Walk2Fitness5' ? 'Walk2Fitness 5.0' : item.category}
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
                          <><Video className="w-3 h-3" />Video</>
                        ) : (
                          <><ImageIcon className="w-3 h-3" />Photo</>
                        )}
                      </span>
                    </div>
                    {isMobile && showDetails === index && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <Button size="sm" className="w-full bg-[#ff8a00] text-white hover:bg-[#ff8a00]/90 text-xs">
                          {item.type === 'video' ? 'Play Video' : 'View Full Size'}
                        </Button>
                      </div>
                    )}
                  </div>

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
              <Button className="mt-4 bg-[#008020] text-white hover:bg-[#008020]/90" onClick={() => setSelectedCategory('All')}>
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
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-background hover:bg-background/10 z-10" onClick={closeLightbox}>
              <X className="w-6 h-6" />
            </Button>

            {filteredItems.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/10" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:bg-background/10" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' ? (
                <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black">
                  <Image src={selectedItem.src} alt={selectedItem.title} fill sizes="100vw" className="object-contain" />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden bg-black">
                  <div className="aspect-video">
                    <video src={selectedItem.videoUrl} controls autoPlay className="w-full h-full object-contain" playsInline>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-4 md:p-6 mt-4 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#008020] text-white rounded-full text-sm font-semibold">
                        {selectedItem.category === 'Walk2Fitness5' ? 'Walk2Fitness 5.0' : selectedItem.category}
                      </span>
                      <span className="px-3 py-1 bg-[#ffde00] text-[#008020] rounded-full text-sm font-semibold">
                        {selectedItem.type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">{selectedItem.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{selectedItem.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{selectedItem.participants}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{selectedItem.description}</p>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="text-sm text-muted-foreground">{selectedIndex + 1} / {filteredItems.length}</div>
                  {filteredItems.length > 1 && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={goToPrevious} className="border-[#008020] text-[#008020] hover:bg-[#008020]/10">
                        <ChevronLeft className="w-4 h-4 mr-1" />Previous
                      </Button>
                      <Button variant="outline" size="sm" onClick={goToNext} className="border-[#008020] text-[#008020] hover:bg-[#008020]/10">
                        Next<ChevronRight className="w-4 h-4 ml-1" />
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