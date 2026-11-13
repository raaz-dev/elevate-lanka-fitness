import { images } from "./site";

export const values = [
  { title: "Coach first", body: "Equipment is easy to buy. We invest in the people holding the clipboard." },
  { title: "Evidence, not fashion", body: "If a method has no evidence behind it, it does not make it onto our floor." },
  { title: "Everyone belongs", body: "First-timer or national athlete — same welcome, same standard of care." },
  { title: "Spotless, always", body: "Cleaning rounds every hour, equipment audits weekly. No exceptions." },
];

export const achievements = [
  { year: "2011", title: "Founded on Duplication Road", body: "A 900 sq ft strength room with four members and one coach." },
  { year: "2016", title: "Second floor added", body: "Two studios, a conditioning zone and our first group timetable." },
  { year: "2021", title: "Recovery suite opened", body: "Sauna, steam, contrast plunge and sports massage under one roof." },
  { year: "2024", title: "Gym of the Year", body: "Recognised by the Sri Lanka Fitness Association for coaching standards." },
];

export const accreditations = ["NASM", "ACE", "ISSA", "NSCA", "Precision Nutrition", "REPs"];

export const equipment = [
  "Watson plate-loaded stations",
  "Rogue power racks & platforms",
  "Concept2 rowers & SkiErgs",
  "Assault bikes & curved treadmills",
  "Dumbbells to 70 kg",
  "Full turf sled track",
];

export const mealPlans = [
  {
    name: "Fat Loss · 1,800 kcal",
    kcal: 1800,
    meals: ["Two egg hoppers + sambol", "Red rice, dhal, grilled fish, greens", "Curd with papaya", "Chicken kottu (half portion)"],
  },
  {
    name: "Maintenance · 2,400 kcal",
    kcal: 2400,
    meals: ["Kiribath + fish curry", "Rice, chicken curry, two vegetables", "Whey + banana", "Roti with beef curry"],
  },
  {
    name: "Muscle Gain · 3,100 kcal",
    kcal: 3100,
    meals: ["Four-egg omelette + toast", "Rice, mutton curry, dhal, salad", "Peanut butter sandwich + milk", "Devilled chicken + noodles"],
  },
];

export const recipes = [
  { name: "High-protein pol sambol bowl", kcal: 480, note: "Coconut sambol, red rice and grilled chicken, 42 g protein." },
  { name: "Lean chicken kottu", kcal: 620, note: "Half the oil, double the chicken, cabbage-forward." },
  { name: "Curd & jaggery recovery pot", kcal: 310, note: "Post-training carbs and probiotics in ninety seconds." },
  { name: "Dhal and spinach protein curry", kcal: 390, note: "Vegetarian, 24 g protein, ready in one pot." },
];

export const supplements = [
  { name: "Whey protein", body: "Only if you struggle to hit 1.6 g/kg from food." },
  { name: "Creatine monohydrate", body: "5 g daily. The most evidence-backed supplement in existence." },
  { name: "Vitamin D3", body: "Common gap for indoor workers, even in Sri Lanka." },
  { name: "Electrolytes", body: "Useful in Colombo heat when sessions run past 60 minutes." },
];

export const galleryItems = [
  { src: images.facility, alt: "IRONPEAK main training floor", cat: "facility" as const },
  { src: images.cardio, alt: "Cardio and conditioning zone", cat: "facility" as const },
  { src: images.functional, alt: "Functional training turf area", cat: "facility" as const },
  { src: images.weightLifting, alt: "Weightlifting on the gym floor", cat: "facility" as const },
  { src: images.classHiit, alt: "HIIT class in the main studio", cat: "classes" as const },
  { src: images.classYoga, alt: "Yoga class in the mind and body studio", cat: "classes" as const },
  { src: images.personalTraining, alt: "Personal training session", cat: "classes" as const },
  { src: images.nutrition, alt: "Nutrition consultation with local meals", cat: "events" as const },
];
