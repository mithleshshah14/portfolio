"use client";
import { useState, useEffect } from "react";
import Navbar from "./component/navbar";
import { skillsData } from "./skillsData";
import { experienceData } from "./experienceData";
import Image from "next/image";

export default function Home() {
  // Change to mounted for clarity
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted in the next tick to avoid hydration mismatch
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Return null initially to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#3b4252] min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Mithlesh Shah</h1>
          <p className="text-gray-300 mb-3">mithleshshah84@gmail.com | +91 7999673489</p>
          <a
            href="https://www.linkedin.com/in/mithlesh-shah14"
            className="text-blue-300 hover:text-blue-400 transition-colors mb-6 inline-block"
          >
            LinkedIn
          </a>
          <p className="text-lg text-gray-300 leading-relaxed mt-6">
            Senior Software Engineer with 7 years of experience designing and building scalable
            microservices using Java, Spring Boot, AWS, and ReactJS. Skilled in developing secure
            REST/GraphQL APIs, optimizing cloud deployments, and implementing CI/CD pipelines.
          </p>
          <Image
            src="/program.jpg" // Path relative to public folder
            alt="Programmer Illustration"
            width={400} // Larger width for high clarity
            height={300} // Proportional height
            className="mt-8 mx-auto object-contain" // Center and maintain aspect ratio
            style={{
              border: "8px solid", // Base border width
              borderImage: "linear-gradient(to right, #3b4252, transparent) 1", // Faded border matching bg
              borderRadius: "8px", // Slight rounding
            }}
            quality={100} // Max quality for clarity
          />
        </div>
      </section>

{/* Skills Section */}
<section id="skills" className="py-24">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-white mb-16">Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {Object.entries(skillsData).map(([category, skills]) => (
        <div key={category} className="bg-[#2e3440] p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-300 mb-6">{category}</h3>
          <ul className="space-y-4">
            {skills.map((skill, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <skill.icon className="text-blue-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-200 text-sm">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Projects Section - Remove glass-card class */}
      <section id="projects" className="py-24 bg-[#2e3440]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Projects & Experience</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {experienceData.map((exp, index) => (
              <div key={index} className="bg-[#3b4252] p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  {exp.role} - {exp.company}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                <h4 className="text-lg font-medium text-gray-200 mb-2">{exp.project}</h4>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Remove glass-card class */}
      <section id="contact" className="py-24 bg-[#2e3440]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Contact Me</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#3b4252] p-8 rounded-lg border border-gray-700">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-[#2e3440]/50 border border-gray-600 
                             text-white placeholder-gray-400 focus:outline-none focus:border-blue-400
                             transition-colors"
                    aria-label="Your Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-[#2e3440]/50 border border-gray-600 
                             text-white placeholder-gray-400 focus:outline-none focus:border-blue-400
                             transition-colors"
                    aria-label="Your Email"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-lg bg-[#2e3440]/50 border border-gray-600 
                             text-white placeholder-gray-400 focus:outline-none focus:border-blue-400
                             transition-colors resize-none"
                    aria-label="Your Message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg 
                           hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}