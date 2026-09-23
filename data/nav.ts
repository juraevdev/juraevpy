export const navLinks = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

/** Every section id on the home page, in visual order (used for active-section tracking). */
export const sectionIds = [
  "top",
  "about",
  "work",
  "case-study",
  "stack",
  "approach",
  "experience",
  "contact",
] as const;
