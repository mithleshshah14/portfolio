export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  project: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    period: "Apr 2024 – Present",
    role: "Senior Software Engineer II",
    company: "DigitalZone",
    project: "DZOne Platform",
    description: "Architected scalable microservices using Spring Boot and AWS EKS for lead generation, designed secure REST/GraphQL APIs with OAuth2/JWT.",
    tech: ["Spring Boot", "AWS EKS", "GraphQL", "OAuth2"],
    achievements: ["40% performance improvement", "Zero-downtime deployments"]
  },
  {
    period: "Jul 2022 – Apr 2024",
    role: "Software Engineer II",
    company: "Nike India Technology Centre",
    project: "Retail Cart Checkout",
    description: "Built and optimized Spring Boot microservices, migrated to AWS, and developed ReactJS components for checkout UI.",
    tech: ["Spring Boot", "AWS", "ReactJS", "Microservices"],
    achievements: ["25% faster checkout process", "99.9% uptime"]
  },
  {
    period: "Jul 2021 – Jul 2022",
    role: "Software Engineer",
    company: "EPAM Systems India",
    project: "IAM Keycloak",
    description: "Enhanced Spring Boot functionalities and ensured access control with JUnit/Mockito tests.",
    tech: ["Spring Boot", "Keycloak", "JUnit", "Mockito"],
    achievements: ["100% test coverage", "Enhanced security protocols"]
  },
  {
    period: "Aug 2020 – Jul 2021",
    role: "Software Engineer",
    company: "VeriFone India Technology Pvt. Ltd",
    project: "VHTS",
    description: "Developed Spring Boot payment tokenization services with JUnit/Mockito unit tests.",
    tech: ["Spring Boot", "Payment Processing", "JUnit", "Mockito"],
    achievements: ["Secure payment processing", "PCI compliance"]
  },
  {
    period: "Nov 2018 – Aug 2020",
    role: "Software Engineer",
    company: "Wipro Ltd",
    project: "Akana to Tyk Migration",
    description: "Deployed Spring Boot APIs to Tyk Gateway on AWS for enhanced security and real-time monitoring.",
    tech: ["Spring Boot", "Tyk Gateway", "AWS", "API Management"],
    achievements: ["Enhanced API security", "Real-time monitoring"]
  },
];