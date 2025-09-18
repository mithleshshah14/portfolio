"use client";
import Navbar from './component/navbar';
import Beams from '../components/Beams';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: '#06000f', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <h1 className="text-4xl font-bold text-blue-600">Mithlesh Shah</h1>
          <p className="text-gray-600">mithleshshah84@gmail.com | +917999673489</p>
          <a href="https://www.linkedin.com/in/mithlesh-shah14" className="text-blue-500">LinkedIn</a>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary</h1>
          <p className="text-lg text-gray-600">
            Senior Software Engineer with 7 years of experience designing and building scalable microservices using Java, Spring Boot, AWS, and ReactJS. Skilled in developing secure REST/GraphQL APIs, optimizing cloud deployments, and implementing CI/CD pipelines.
          </p>
        </div>
      </div>
    </div>
  );
}