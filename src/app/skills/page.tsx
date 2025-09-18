"use client";
import Navbar from '../component/navbar';
import ChromaGrid from '@/components/ChromaGrid';
import Aurora from '@/components/Aurora';

const skillsData = {
  Languages: ['Java (8, 11, 21)', 'Python', 'NodeJS', 'JavaScript'],
  Frameworks: ['Spring Boot', 'Spring MVC', 'Hibernate', 'Spring Security', 'ExpressJS', 'Keycloak', 'Micronaut'],
  WebTechnologies: ['ReactJS', 'HTML5', 'CSS3', 'REST/GraphQL APIs', 'Microservices'],
  AWSServices: ['AWS (EC2, S3, Lambda, EKS, RDS, SQS, CloudWatch, Elasticsearch)'],
  Databases: ['MySQL', 'PostgreSQL', 'DynamoDB', 'Oracle', 'MongoDB'],
  Tools: ['Git', 'Jenkins', 'Maven', 'Gradle', 'JIRA', 'Confluence', 'JMeter'],
  Testing: ['JUnit', 'Mockito', 'Cucumber'],
};

export default function SkillsPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 relative">
        <div style={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <Aurora
            colorStops={["#91e8a4", "#c290f7", "#a75bf7"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Skills</h1>
          <ChromaGrid data={skillsData} />
        </div>
      </div>
    </div>
  );
}