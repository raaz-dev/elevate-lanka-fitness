import cardio from "@/assets/cardio.webp";
import classHiit from "@/assets/class-hiit.webp";
import classYoga from "@/assets/class-yoga.webp";
import facility from "@/assets/facility.webp";
import functional from "@/assets/functional.webp";
import weightLifting from "@/assets/weight-lifting.webp";
import nutritionImg from "@/assets/nutrition.webp";
import personalTraining from "@/assets/personal-training.webp";
import trainer1 from "@/assets/trainer-1.webp";
import trainer2 from "@/assets/trainer-2.webp";
import trainer3 from "@/assets/trainer-3.webp";
import trainer4 from "@/assets/trainer-4.webp";

export const images = {
  weightLifting,
  facility,
  cardio,
  functional,
  classHiit,
  classYoga,
  nutrition: nutritionImg,
  personalTraining,
};

export const site = {
  name: "IRONPEAK",
  legalName: "IRONPEAK Fitness Centre (Pvt) Ltd",
  phoneDisplay: "+94 76 123 4567",
  phone: "+94761234567",
  whatsapp: "94761234567",
  email: "hello@ironpeak.lk",
  address: "182 Duplication Road, Colombo 04, Sri Lanka",
  mapQuery: "182+Duplication+Road+Colombo+04+Sri+Lanka",
  hours: { weekdays: "5:00 AM â€“ 11:00 PM", saturday: "6:00 AM â€“ 10:00 PM", sunday: "7:00 AM â€“ 8:00 PM" },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};

export const stats = [
  { key: "years", value: 15, suffix: "+" },
  { key: "members", value: 4800, suffix: "+" },
  { key: "trainers", value: 24, suffix: "" },
  { key: "classes", value: 90, suffix: "+" },
  { key: "awards", value: 7, suffix: "" },
] as const;

export const whyUs = [
  {
    icon: "Dumbbell",
    title: "22,000 sq ft of premium kit",
    body: "Eleven Watson plate-loaded stations, Rogue rigs, Concept2 and Assault conditioning, full dumbbell rack to 70 kg.",
  },
  {
    icon: "GraduationCap",
    title: "Internationally certified coaches",
    body: "NASM, ACE, ISSA and Precision Nutrition credentials â€” verified, insured and continually assessed.",
  },
  {
    icon: "ClipboardCheck",
    title: "Assessment-led programming",
    body: "Every membership begins with a movement screen, InBody scan and a written 12-week plan.",
  },
  {
    icon: "HeartPulse",
    title: "Recovery is not an add-on",
    body: "Sauna, steam, contrast plunge, compression boots and sports massage included on premium tiers.",
  },
  {
    icon: "Clock",
    title: "Open 5 AM to 11 PM",
    body: "Before your commute or after the school run â€” the floor is staffed and coached all day.",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  icon: string;
  includes: string[];
  forWho: string;
  sessions: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "personal-training",
    name: "Personal Training",
    short: "One-to-one coaching, fully programmed.",
    description:
      "Private coaching built around a movement screen and InBody scan. Your coach programmes every session, tracks every lift and adjusts weekly.",
    image: personalTraining,
    icon: "UserRoundCheck",
    includes: ["Movement screen + InBody scan", "Written 12-week plan", "Weekly load progression", "WhatsApp check-ins"],
    forWho: "Anyone who wants accountability and the fastest safe route to a goal.",
    sessions: "45 or 60 min Â· 2â€“4Ã— weekly",
    featured: true,
  },
  {
    slug: "strength-conditioning",
    name: "Strength & Conditioning",
    short: "Barbell strength with athletic conditioning.",
    description:
      "Squat, press, hinge and pull built on linear then block periodisation, paired with energy-system work for real-world capacity.",
    image: functional,
    icon: "Dumbbell",
    includes: ["Barbell technique coaching", "Periodised blocks", "Conditioning finishers", "Quarterly testing"],
    forWho: "Members who want to get measurably stronger, not just tired.",
    sessions: "60 min Â· 3Ã— weekly",
    featured: true,
  },
  {
    slug: "weight-loss",
    name: "Weight Loss Programme",
    short: "Fat loss without crash dieting.",
    description:
      "A structured deficit built around Sri Lankan meals, three strength sessions and daily step targets, reviewed fortnightly.",
    image: cardio,
    icon: "TrendingDown",
    includes: ["Fortnightly InBody review", "Rice-and-curry meal plan", "Step + sleep targets", "Habit coaching"],
    forWho: "Members carrying extra body fat who want a sustainable plan.",
    sessions: "45 min Â· 3â€“4Ã— weekly",
    featured: true,
  },
  {
    slug: "bodybuilding",
    name: "Bodybuilding & Hypertrophy",
    short: "Physique work with contest-level detail.",
    description:
      "Volume-managed hypertrophy blocks, weak-point specialisation and posing coaching for stage-bound members.",
    image: facility,
    icon: "Flame",
    includes: ["Weak-point analysis", "Volume landmarks", "Peak-week protocol", "Posing coaching"],
    forWho: "Advanced lifters and competitive athletes.",
    sessions: "75 min Â· 4â€“6Ã— weekly",
  },
  {
    slug: "group-classes",
    name: "Group Fitness Classes",
    short: "Over 90 coached classes a week.",
    description:
      "HIIT, spin, Zumba, boxing, mobility and yoga run from 5:30 AM to 9 PM in two dedicated studios.",
    image: classHiit,
    icon: "Users",
    includes: ["90+ weekly classes", "Two studios", "App-based booking", "All levels welcome"],
    forWho: "Members who train better in a room full of people.",
    sessions: "30â€“60 min Â· unlimited",
    featured: true,
  },
  {
    slug: "yoga-mobility",
    name: "Yoga & Mobility",
    short: "Range of motion you can actually use.",
    description:
      "Hatha and Vinyasa flows plus joint-specific mobility clinics for shoulders, hips and ankles.",
    image: classYoga,
    icon: "Sparkles",
    includes: ["Hatha + Vinyasa", "Mobility clinics", "Breathwork", "Props provided"],
    forWho: "Desk-bound members and lifters chasing better positions.",
    sessions: "60 min Â· 2â€“3Ã— weekly",
  },
  {
    slug: "nutrition-coaching",
    name: "Nutrition Coaching",
    short: "Sri Lankan food, evidence-based macros.",
    description:
      "A Precision Nutrition coach builds your plan around kiribath, kottu and hoppers â€” no imported diet clichÃ©s.",
    image: nutritionImg,
    icon: "Salad",
    includes: ["Macro targets", "Local meal plans", "Supplement audit", "Monthly review"],
    forWho: "Anyone whose training outpaces their kitchen.",
    sessions: "Monthly consultation",
    featured: true,
  },
  {
    slug: "recovery-spa",
    name: "Recovery & Spa",
    short: "Sauna, plunge, compression, massage.",
    description:
      "Contrast therapy, Normatec compression and sports massage to keep training frequency high and soreness low.",
    image: facility,
    icon: "Waves",
    includes: ["Finnish sauna + steam", "Cold plunge", "Compression boots", "Sports massage"],
    forWho: "Members training four or more days a week.",
    sessions: "20â€“60 min Â· on demand",
  },
];

export type Plan = {
  slug: string;
  name: string;
  tagline: string;
  monthly: number;
  quarterly: number;
  annual: number;
  features: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "Off-peak gym floor access",
    monthly: 6500,
    quarterly: 17500,
    annual: 62000,
    features: ["Gym floor 10 AM â€“ 4 PM", "Induction session", "Locker access", "Member app"],
  },
  {
    slug: "core",
    name: "Core",
    tagline: "Full-day access, all equipment",
    monthly: 9500,
    quarterly: 26000,
    annual: 92000,
    features: ["Unlimited gym floor", "InBody scan quarterly", "2 group classes / week", "Locker + towel"],
  },
  {
    slug: "unlimited",
    name: "Unlimited",
    tagline: "Everything on the timetable",
    monthly: 14500,
    quarterly: 39500,
    annual: 138000,
    features: [
      "Unlimited gym + classes",
      "Monthly InBody + review",
      "Sauna & steam",
      "Guest pass monthly",
      "Written training plan",
    ],
    popular: true,
  },
  {
    slug: "elite",
    name: "Elite",
    tagline: "Coached, recovered, accountable",
    monthly: 27500,
    quarterly: 76000,
    annual: 268000,
    features: [
      "Everything in Unlimited",
      "4 PT sessions / month",
      "Nutrition coaching",
      "Full recovery suite",
      "Priority class booking",
    ],
  },
];

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  image: string;
  years: number;
  rating: number;
  reviews: number;
  specialisations: string[];
  certifications: string[];
  bio: string;
};

export const trainers: Trainer[] = [
  {
    slug: "dinesh-perera",
    name: "Dinesh Perera",
    role: "Head Coach Â· Strength",
    image: trainer1,
    years: 14,
    rating: 4.9,
    reviews: 212,
    specialisations: ["Powerlifting", "Strength & conditioning", "Return to training"],
    certifications: ["NASM-CPT", "NSCA-CSCS", "Precision Nutrition L1"],
    bio: "Fourteen years on the floor and three national powerlifting podiums. Dinesh builds patient, technique-first strength programmes.",
  },
  {
    slug: "nadeesha-fernando",
    name: "Nadeesha Fernando",
    role: "Fat Loss & Conditioning Coach",
    image: trainer2,
    years: 9,
    rating: 5.0,
    reviews: 178,
    specialisations: ["Fat loss", "HIIT", "Pre & post-natal"],
    certifications: ["ACE-CPT", "Pre/Post-Natal Specialist", "Kettlebell L2"],
    bio: "Nadeesha has guided over 400 members through sustainable fat loss without a single crash diet.",
  },
  {
    slug: "arun-selvaraj",
    name: "Arun Selvaraj",
    role: "Hypertrophy & Physique Coach",
    image: trainer3,
    years: 11,
    rating: 4.8,
    reviews: 143,
    specialisations: ["Bodybuilding", "Contest prep", "Nutrition"],
    certifications: ["ISSA Elite Trainer", "IFBB Coach L1", "PN L2"],
    bio: "Arun has prepped fifteen national-level competitors and speaks fluent Tamil, Sinhala and English on the floor.",
  },
  {
    slug: "hasini-jayawardena",
    name: "Hasini Jayawardena",
    role: "Yoga, Mobility & Recovery Lead",
    image: trainer4,
    years: 8,
    rating: 4.9,
    reviews: 156,
    specialisations: ["Vinyasa yoga", "Mobility", "Breathwork"],
    certifications: ["RYT-500", "FRC Mobility Specialist", "Breath Coach"],
    bio: "Hasini trained in Mysore and Colombo, and runs our shoulder and hip mobility clinics for lifters.",
  },
];

export type GymClass = {
  id: string;
  name: string;
  category: "Strength" | "Cardio" | "Mind & Body" | "Dance" | "Combat";
  trainer: string;
  day: string;
  time: string;
  slot: "morning" | "afternoon" | "evening";
  duration: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  spots: number;
};

export const classes: GymClass[] = [
  { id: "c1", name: "Sunrise HIIT", category: "Cardio", trainer: "Nadeesha Fernando", day: "Monday", time: "5:30 AM", slot: "morning", duration: 45, level: "Intermediate", spots: 6 },
  { id: "c2", name: "Barbell Basics", category: "Strength", trainer: "Dinesh Perera", day: "Monday", time: "6:30 PM", slot: "evening", duration: 60, level: "Beginner", spots: 4 },
  { id: "c3", name: "Vinyasa Flow", category: "Mind & Body", trainer: "Hasini Jayawardena", day: "Tuesday", time: "7:00 AM", slot: "morning", duration: 60, level: "Beginner", spots: 9 },
  { id: "c4", name: "Hypertrophy Lab", category: "Strength", trainer: "Arun Selvaraj", day: "Tuesday", time: "5:00 PM", slot: "evening", duration: 75, level: "Advanced", spots: 3 },
  { id: "c5", name: "Spin Sprints", category: "Cardio", trainer: "Nadeesha Fernando", day: "Wednesday", time: "6:00 AM", slot: "morning", duration: 45, level: "Intermediate", spots: 0 },
  { id: "c6", name: "Boxing Fundamentals", category: "Combat", trainer: "Dinesh Perera", day: "Wednesday", time: "7:30 PM", slot: "evening", duration: 60, level: "Beginner", spots: 8 },
  { id: "c7", name: "Zumba Colombo", category: "Dance", trainer: "Nadeesha Fernando", day: "Thursday", time: "1:00 PM", slot: "afternoon", duration: 45, level: "Beginner", spots: 12 },
  { id: "c8", name: "Mobility Clinic", category: "Mind & Body", trainer: "Hasini Jayawardena", day: "Thursday", time: "6:00 PM", slot: "evening", duration: 45, level: "Beginner", spots: 7 },
  { id: "c9", name: "Functional Circuit", category: "Strength", trainer: "Arun Selvaraj", day: "Friday", time: "6:30 AM", slot: "morning", duration: 50, level: "Intermediate", spots: 5 },
  { id: "c10", name: "Sunset Yoga", category: "Mind & Body", trainer: "Hasini Jayawardena", day: "Friday", time: "6:45 PM", slot: "evening", duration: 60, level: "Beginner", spots: 10 },
  { id: "c11", name: "Weekend Warrior", category: "Cardio", trainer: "Nadeesha Fernando", day: "Saturday", time: "8:00 AM", slot: "morning", duration: 60, level: "Advanced", spots: 2 },
  { id: "c12", name: "Deadlift Technique", category: "Strength", trainer: "Dinesh Perera", day: "Saturday", time: "11:00 AM", slot: "afternoon", duration: 60, level: "Intermediate", spots: 6 },
];

export const testimonials = [
  {
    name: "Rukshan De Silva",
    role: "Member since 2019",
    quote:
      "I came in unable to squat to depth. Two years later I am pulling 190 kg and my back pain is gone. The coaching detail here is the difference.",
    rating: 5,
  },
  {
    name: "Fathima Rizwan",
    role: "Lost 21 kg in 11 months",
    quote:
      "Nobody put me on a starvation diet. They fixed my breakfast, gave me a step target and taught me to lift. It never felt like punishment.",
    rating: 5,
  },
  {
    name: "Tharindu Bandara",
    role: "National rugby player",
    quote:
      "Off-season conditioning here is better than anything I have had at a club. Testing every quarter keeps everyone honest.",
    rating: 5,
  },
  {
    name: "Anusha Mahendran",
    role: "Member since 2022",
    quote:
      "The 5 AM crowd is my favourite part of Colombo. Staffed, coached, spotless â€” and the sauna afterwards is the reward.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Do I need experience to join?",
    a: "No. Every membership starts with an induction, a movement screen and a coach-written plan, whether you have trained for a decade or never at all.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes â€” up to two months per year at no cost. Freezes and upgrades are handled in the member app or at reception.",
  },
  {
    q: "Is there a joining fee?",
    a: "The LKR 5,000 joining fee is waived for members who sign up this month, on any tier and billing cycle.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. Book a free trial session and you get full floor access, one group class and an InBody scan with a coach.",
  },
  {
    q: "Are the classes included in membership?",
    a: "Core includes two classes a week; Unlimited and Elite include the full timetable with priority booking.",
  },
  {
    q: "Is parking available?",
    a: "Free covered parking for 60 vehicles, plus secure bike racks at the Duplication Road entrance.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Training" | "Nutrition" | "Recovery" | "Mindset";
  author: string;
  date: string;
  readMinutes: number;
  image: string;
};

export const posts: BlogPost[] = [
  {
    slug: "progressive-overload-colombo-heat",
    title: "Progressive overload when it is 33Â°C on the floor",
    excerpt:
      "Heat and humidity change your recovery maths. Here is how our coaches adjust volume and rest through the Colombo dry season.",
    category: "Training",
    author: "Dinesh Perera",
    date: "2026-07-18",
    readMinutes: 7,
    image: functional,
  },
  {
    slug: "rice-and-curry-macros",
    title: "Rice and curry, properly counted",
    excerpt:
      "You do not need to give up your lunch packet. A practical guide to portioning local staples for fat loss and muscle gain.",
    category: "Nutrition",
    author: "Arun Selvaraj",
    date: "2026-07-04",
    readMinutes: 9,
    image: nutritionImg,
  },
  {
    slug: "sleep-is-the-supplement",
    title: "Sleep is the supplement you are not taking",
    excerpt:
      "Before you buy another tub of anything, fix the seven hours that decide whether your training actually sticks.",
    category: "Recovery",
    author: "Hasini Jayawardena",
    date: "2026-06-21",
    readMinutes: 6,
    image: classYoga,
  },
];
