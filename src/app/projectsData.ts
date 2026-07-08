export interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  url: string;
  domain: string;
  accent: string;
  accentDeep: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tech: string[];
  features: string[];
}

export const projectsData: ProjectItem[] = [
  {
    name: "HuntWise AI",
    tagline: "AI-powered career management platform",
    description:
      "An all-in-one suite for modern job seekers. Automate multi-source searches, analyze resume ATS compatibility, and generate context-aware interview prep tools.",
    url: "https://www.huntwiseai.com",
    domain: "huntwiseai.com",
    accent: "#2DD4BF",
    accentDeep: "#0D9488",
    image: "/mockups/huntwise.png",
    imageAlt: "HuntWise AI dashboard with job application tracking and AI career tools",
    imageWidth: 1896,
    imageHeight: 905,
    tech: ["Next.js", "OpenAI", "Firebase", "Stripe"],
    features: [
      "Multi-source job search aggregation",
      "Real-time ATS scoring & suggestions",
      "AI-powered cover letters & prep",
    ],
  },
  {
    name: "VisaHunt",
    tagline: "Every visa-sponsored tech job. One search.",
    description:
      "Global relocation simplified. A specialized engine that verifies sponsorship status directly with government databases to ensure accuracy for international talent.",
    url: "https://www.visa-hunt.com",
    domain: "visa-hunt.com",
    accent: "#60A5FA",
    accentDeep: "#1D4ED8",
    image: "/mockups/visahunt.png",
    imageAlt: "VisaHunt search interface for visa-sponsored tech jobs with salary data",
    imageWidth: 1408,
    imageHeight: 909,
    tech: ["Next.js 15", "React 19", "OpenAI", "Redis"],
    features: [
      "Government-verified sponsor lists",
      "Direct salary comparisons across countries",
      "Country-specific developer visa guides",
    ],
  },
];

export interface StoryItem {
  year: string;
  company: string;
  role: string;
  current?: boolean;
  project: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export const storyData: StoryItem[] = [
  {
    year: "2018",
    company: "Wipro",
    role: "Software Engineer",
    project: "Akana → Tyk API Gateway Migration",
    description:
      "Migrated 300+ APIs from Akana to Tyk API Gateway, improving security, observability, and performance. Deployed Spring Boot services on AWS with centralized authentication, rate limiting, and monitoring.",
    tech: ["Spring Boot", "Tyk", "API Gateway", "AWS", "Rate Limiting"],
    achievements: ["300+ APIs migrated", "Centralized auth & monitoring"],
  },
  {
    year: "2020",
    company: "VeriFone",
    role: "Software Engineer",
    project: "Payment Tokenization (VHTS)",
    description:
      "Developed secure payment tokenization services handling sensitive PII and financial data. Implemented encryption and key-management workflows using HSM tools (Payshield, nShield) with backend validation and database failover analysis.",
    tech: ["Tokenization", "HSM", "Payshield", "nShield", "Payments"],
    achievements: ["PCI-grade data security", "Reliable transaction processing"],
  },
  {
    year: "2021",
    company: "EPAM",
    role: "Software Engineer",
    project: "Enterprise IAM — Keycloak",
    description:
      "Enhanced Keycloak-based IAM services with Spring Boot for secure authentication and authorization. Implemented fine-grained access control and SSO integrations used by thousands of enterprise users.",
    tech: ["Keycloak", "Spring Boot", "SSO", "IAM", "Microservices"],
    achievements: ["SSO for thousands of enterprise users", "Fine-grained access control"],
  },
  {
    year: "2022",
    company: "Nike",
    role: "Software Engineer II",
    project: "Retail Backend — Cart, Checkout & Payments",
    description:
      "Developed core backend microservices (Cart, Checkout, Payments, Invoicing, Notifications) supporting 4K+ retail stores. Led migration of transaction data from on-prem to AWS and shipped reactive REST APIs with Spring WebFlux for high-throughput notification workflows.",
    tech: ["Spring WebFlux", "AWS Lambda", "DynamoDB", "Elasticsearch", "S3", "React/Next.js"],
    achievements: ["4K+ retail stores served", "On-prem → AWS data migration"],
  },
  {
    year: "2024",
    company: "DigitalZone",
    role: "Senior Software Engineer II",
    project: "DZOne Lead-Gen Platform",
    description:
      "Led architecture and delivery of 5 cloud-native Java microservices on AWS EKS supporting 100K+ leads/month. Designed event-driven systems with Kafka, built centralized RBAC with OAuth2/JWT for 10K+ users, and integrated AI-powered features using RAG pipelines with LLM APIs.",
    tech: ["Java", "Spring Boot", "Kafka", "AWS EKS", "OAuth2/JWT", "RAG + LLMs", "PostgreSQL", "Redis"],
    achievements: ["100K+ leads/month", "Mentored 3–4 backend engineers"],
  },
  {
    year: "PRESENT",
    company: "Founder",
    role: "Shipping HuntWise & VisaHunt",
    current: true,
    project: "HuntWise AI & VisaHunt",
    description:
      "Building and running two live SaaS products solo — product design, engineering, AI features, payments, SEO, and growth.",
    tech: ["Next.js", "React 19", "TypeScript", "OpenAI", "Firebase", "Stripe", "Razorpay"],
    achievements: ["2 products in production", "End-to-end ownership"],
  },
];

export interface StackGroup {
  label: string;
  color: string;
  items: string[];
}

export const stackData: StackGroup[] = [
  {
    label: "Languages",
    color: "#60A5FA",
    items: ["Java (8, 11, 21)", "JavaScript", "TypeScript", "Python"],
  },
  {
    label: "Backend",
    color: "#2DD4BF",
    items: ["Spring Boot", "Microservices", "REST APIs", "Distributed Systems", "Hibernate", "Micronaut", "Reactive Java (WebFlux)"],
  },
  {
    label: "Frontend",
    color: "#A78BFA",
    items: ["React.js", "Next.js"],
  },
  {
    label: "AI / ML & LLMs",
    color: "#FBBF24",
    items: ["RAG", "LLM Integration", "Prompt Engineering", "Vector Databases"],
  },
  {
    label: "Cloud & DevOps",
    color: "#22D3EE",
    items: ["AWS (EKS, EC2, S3, Lambda, RDS)", "Docker", "Kubernetes", "Jenkins", "CI/CD"],
  },
  {
    label: "Messaging & Data",
    color: "#60A5FA",
    items: ["Kafka", "Redis", "Elasticsearch", "SQS"],
  },
  {
    label: "Databases",
    color: "#2DD4BF",
    items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    label: "Security",
    color: "#A78BFA",
    items: ["OAuth2", "JWT", "Keycloak", "RBAC", "Tokenization"],
  },
  {
    label: "Testing",
    color: "#22D3EE",
    items: ["JUnit", "Mockito", "TDD"],
  },
];

export const educationData = {
  degree: "Bachelor of Engineering, Computer Science & Engineering",
  school: "Vikrant Institute of Technology & Management",
  year: "2018",
};

export interface CapabilityItem {
  title: string;
  description: string;
}

export const capabilitiesData: CapabilityItem[] = [
  {
    title: "Product & Design",
    description:
      "Transforming complex problems into intuitive SaaS workflows. Focused on utility over decoration, moving from initial hypothesis to polished UX in record time.",
  },
  {
    title: "Engineering",
    description:
      "Java, Spring Boot, AWS, Next.js, and React. I build systems that stay up, scale effortlessly, and maintain high performance under heavy concurrent loads.",
  },
  {
    title: "AI & Growth",
    description:
      "Deep integration of OpenAI features, semantic search, and programmatic SEO. Managing the full revenue cycle with Stripe and Razorpay subscriptions.",
  },
];
