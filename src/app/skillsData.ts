import { FaJava } from "react-icons/fa";
import { IconType } from "react-icons";
import {
    SiPython,
    SiNodedotjs,
    SiJavascript,
    SiSpringboot,
    SiHibernate,
    SiKeycloak,
    SiReact,
    SiHtml5,
    SiCss3,
    SiAmazon,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiGit,
    SiJenkins,
    SiApachemaven,
    SiGradle,
    SiJira,
    SiConfluence,
    SiJunit5,
    SiTestinglibrary,
} from "react-icons/si";

// Update the type definition
type SkillItem = {
    name: string;
    icon: IconType; // Changed from 'typeof FaJava' to 'IconType'
};

export const skillsData: Record<string, SkillItem[]> = {
    Languages: [
        { name: "Java (8, 11, 21)", icon: FaJava },
        { name: "Python", icon: SiPython },
        { name: "NodeJS", icon: SiNodedotjs },
        { name: "JavaScript", icon: SiJavascript },
    ],
    Frameworks: [
        { name: "Spring Boot", icon: SiSpringboot },
        { name: "Hibernate", icon: SiHibernate },
        { name: "Keycloak", icon: SiKeycloak },
    ],
    WebTechnologies: [
        { name: "ReactJS", icon: SiReact },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
    ],
    AWSServices: [{ name: "AWS", icon: SiAmazon }],
    Databases: [
        { name: "MySQL", icon: SiMysql },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
    ],
    Tools: [
        { name: "Git", icon: SiGit },
        { name: "Jenkins", icon: SiJenkins },
        { name: "Maven", icon: SiApachemaven },
        { name: "Gradle", icon: SiGradle },
        { name: "JIRA", icon: SiJira },
        { name: "Confluence", icon: SiConfluence },
    ],
    Testing: [
        { name: "JUnit", icon: SiJunit5 },
        { name: "Mockito", icon: SiTestinglibrary },
    ],
};