// Keep the imported document unchanged while presenting English terms consistently.
const englishTerms = [
  "Prenatal Check-Up", "Postnatal Check-Up", "Check-Ups", "Check-Up",
  "Physical Assessment", "Vital Signs", "Tests and Screenings", "Tests", "Screenings",
  "Family Planning", "Side Effects", "Health Center", "Healthcare Facility",
  "Healthcare Provider", "Body Image", "Baby Blues", "Second Trimester",
  "First Trimester", "Third Trimester", "Trimester", "Danger Signs",
  "Braxton Hicks Contractions", "Increased Vaginal Secretions", "Bloody Show",
  "Energy Spurt/Nesting", "Weight Loss", "True Labor", "False Labor",
  "Mood Swings", "Emotional Lability", "Taking-In Phase", "Taking-Hold Phase",
  "Letting-Go Phase", "Source", "Sources",
];

export function displayHeading(text: string) {
  return englishTerms.reduce(
    (result, term) => result.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), term),
    text,
  );
}
