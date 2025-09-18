"use client";
import Navbar from '../component/navbar';
import Plasma from '../../components/Plasma';

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
      <div className="min-h-screen" style={{ backgroundColor: '#06000f', position: 'relative' }}>
        <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <Plasma
            color="#ff6b35"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={true}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-white">
          <section className="w-full max-w-4xl mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-gray-100 text-center">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillsData).map(([category, items]) =>
                items.map((skill, index) => (
                  <div key={`${category}-${index}`} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">{category}</h3>
                    <p className="text-white">{skill}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}