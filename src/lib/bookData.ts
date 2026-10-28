// Everything the book says. Numbers that change (VisaHunt jobs/countries) live here only.

export const LINKS = {
  email: "contact@phantomgracetech.com",
  linkedin: "https://www.linkedin.com/in/mithlesh-shah14",
  github: "https://github.com/mithleshshah14",
};

export const TIMELINE = [
  { year: "2026", company: "Phantom Grace", role: "Founder", now: true },
  { year: "2026", company: "Publicis Sapient", role: "Senior Associate Technology L2" },
  { year: "2024", company: "DigitalZone", role: "Senior Software Engineer II" },
  { year: "2022", company: "Nike", role: "Software Engineer II" },
  { year: "2021", company: "EPAM", role: "Software Engineer" },
  { year: "2020", company: "VeriFone", role: "Software Engineer" },
  { year: "2018", company: "Wipro", role: "Software Engineer" },
];

export type Brand = {
  chapter: number;
  name: string;
  image: string;
  imageAlt: string;
  site: string;
  href: string;
  text: string;
  facts: [string, string][];
};

// Copy from the Phantom Grace About page. HuntwiseAI has no usage numbers on purpose (real usage is still small).
export const BRANDS: Brand[] = [
  {
    chapter: 2, name: "VisaHunt", image: "/book/visahunt-light-1280.jpg", imageAlt: "VisaHunt home page",
    site: "visa-hunt.com", href: "https://www.visa-hunt.com",
    text: "Every visa-sponsored job in one search: only employers on government sponsor registers, with salaries and visa guides beside them.",
    facts: [["62k+", "live jobs"], ["83", "countries"], ["Solo", "end to end"]],
  },
  {
    chapter: 3, name: "HuntwiseAI", image: "/book/huntwise-768.jpg", imageAlt: "HuntwiseAI hiring page",
    site: "huntwiseai.com", href: "https://huntwiseai.com",
    text: "AI candidate screening for agencies and HR teams: post a role, bring in applicants from any job board, get a ranked shortlist.",
    facts: [["Any", "job board"], ["Every", "applicant scored"], ["1", "ranked shortlist"]],
  },
  {
    chapter: 4, name: "Ashviora", image: "/book/ashviora-1280.jpg", imageAlt: "Ashviora shop",
    site: "ashviora.com", href: "https://ashviora.com",
    text: "Indian spice and wellness blends, made in small batches to traditional recipes, with no fillers or artificial additives.",
    facts: [["6", "blends"], ["Small", "batches"], ["0", "fillers"]],
  },
  {
    chapter: 5, name: "Silent Arc Studios", image: "/book/silentarc-1280.jpg", imageAlt: "Silent Arc Studios website",
    site: "silentarctech.com", href: "https://silentarctech.com",
    text: "An independent studio making 2D action and exploration games. The first one is in the works.",
    facts: [["2D", "action games"], ["Indie", "studio"], ["1st", "game coming"]],
  },
];

// Values are the Phantom Grace worker's topic keys (PhantomGrace src/contact.js TOPICS).
export const CONTACT_TOPICS: [string, string][] = [
  ["partnership", "Working together"],
  ["hiring", "Hiring"],
  ["visahunt", "VisaHunt"],
  ["huntwiseai", "HuntwiseAI"],
  ["ashviora", "Ashviora"],
  ["silent-arc", "Silent Arc Studios"],
  ["other", "Something else"],
];

export const CONTACT_ENDPOINT = "https://phantomgracetech.com/api/contact";
export const TURNSTILE_SITEKEY = "0x4AAAAAAFg7zY22n64RKBxI"; // public site key, same widget as the Phantom Grace form
