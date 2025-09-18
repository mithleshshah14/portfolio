"use client";
import Navbar from '../component/navbar';
import Plasma from '../../components/Plasma';

const experienceData = [
  {
    period: 'Apr 2024 – Present',
    role: 'Senior Software Engineer II',
    company: 'DigitalZone',
    project: 'DZOne Platform',
    description: 'Architected scalable microservices using Spring Boot and AWS EKS for lead generation, designed secure REST/GraphQL APIs with OAuth2/JWT.',
  },
  {
    period: 'Jul 2022 – Apr 2024',
    role: 'Software Engineer II',
    company: 'Nike India Technology Centre',
    project: 'Retail Cart Checkout',
    description: 'Built and optimized Spring Boot microservices, migrated to AWS, and developed ReactJS components for checkout UI.',
  },
  {
    period: 'Jul 2021 – Jul 2022',
    role: 'Software Engineer',
    company: 'EPAM Systems India',
    project: 'IAM Keycloak',
    description: 'Enhanced Spring Boot functionalities and ensured access control with JUnit/Mockito tests.',
  },
  {
    period: 'Aug 2020 – Jul 2021',
    role: 'Software Engineer',
    company: 'VeriFone India Technology Pvt. Ltd',
    project: 'VHTS',
    description: 'Developed Spring Boot payment tokenization services with JUnit/Mockito unit tests.',
  },
  {
    period: 'Nov 2018 – Aug 2020',
    role: 'Software Engineer',
    company: 'Wipro Ltd',
    project: 'Akana to Tyk Migration',
    description: 'Deployed Spring Boot APIs to Tyk Gateway on AWS for enhanced security and real-time monitoring.',
  },
];

export default function ProjectsPage() {
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
          <section className="w-full max-w-3xl mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-gray-100 text-center">Projects & Experience</h2>
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-medium text-gray-200">{exp.role} - {exp.company}</h3>
                  <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
                  <h4 className="text-md font-semibold text-gray-300">{exp.project}</h4>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}