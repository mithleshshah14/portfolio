import { Code } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type SkillItem = {
  name: string;
  icon: LucideIcon;
  level: number;
};

export const skillsData: Record<string, SkillItem[]> = {
  Languages: [
    { name: "Java (8, 11, 21)", icon: Code, level: 95 },
    { name: "Python", icon: Code, level: 80 },
    { name: "NodeJS", icon: Code, level: 85 },
    { name: "JavaScript", icon: Code, level: 90 },
  ],
  Frameworks: [
    { name: "Spring Boot", icon: Code, level: 95 },
    { name: "Hibernate", icon: Code, level: 85 },
    { name: "Keycloak", icon: Code, level: 80 },
  ],
  "Web Technologies": [
    { name: "ReactJS", icon: Code, level: 88 },
    { name: "HTML5", icon: Code, level: 95 },
    { name: "CSS3", icon: Code, level: 85 },
  ],
  "AWS Services": [
    { name: "AWS", icon: Code, level: 85 }
  ],
  Databases: [
    { name: "MySQL", icon: Code, level: 90 },
    { name: "PostgreSQL", icon: Code, level: 85 },
    { name: "MongoDB", icon: Code, level: 80 },
  ],
  Tools: [
    { name: "Git", icon: Code, level: 95 },
    { name: "Jenkins", icon: Code, level: 80 },
    { name: "Maven", icon: Code, level: 85 },
    { name: "Gradle", icon: Code, level: 80 },
  ],
};