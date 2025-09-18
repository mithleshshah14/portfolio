"use client";
import Navbar from './component/navbar';
import Plasma from '../components/Plasma';

export default function Home() {
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
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold text-blue-400 mb-2">Mithlesh Shah</h1>
            <p className="text-gray-300 mb-2">mithleshshah84@gmail.com | +917999673489</p>
            <a href="https://www.linkedin.com/in/mithlesh-shah14" className="text-blue-300 hover:text-blue-100">LinkedIn</a>
          </header>
          <section className="max-w-2xl text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-100">Summary</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Senior Software Engineer with 7 years of experience designing and building scalable microservices using Java, Spring Boot, AWS, and ReactJS. Skilled in developing secure REST/GraphQL APIs, optimizing cloud deployments, and implementing CI/CD pipelines. Passionate about creating robust enterprise solutions with clean code and scalable architectures.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}