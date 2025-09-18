"use client";
import Navbar from "./component/navbar";
import { skillsData } from "./skillsData";
import { experienceData } from "./experienceData";

export default function Home() {
  return (
    <div className="bg-[#3b4252] min-h-screen text-white">
      <Navbar />

      {/* Hero / About */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-bold text-blue-400 mb-2">Mithlesh Shah</h1>
        <p className="text-gray-300 mb-2">mithleshshah84@gmail.com | +91 7999673489</p>
        <a
          href="https://www.linkedin.com/in/mithlesh-shah14"
          className="text-blue-300 hover:text-blue-100"
        >
          LinkedIn
        </a>
        <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">
          Senior Software Engineer with 7 years of experience designing and building scalable
          microservices using Java, Spring Boot, AWS, and ReactJS. Skilled in developing secure
          REST/GraphQL APIs, optimizing cloud deployments, and implementing CI/CD pipelines.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-300">{category}</h3>
              <ul className="space-y-3">
                {skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <skill.icon className="text-blue-400" /> {/* Render as component */}
                    <span className="text-white">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      {/* Projects */}
      <section id="projects" className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Projects & Experience</h2>
        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-medium text-gray-200">
                {exp.role} - {exp.company}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
              <h4 className="text-md font-semibold text-gray-300">{exp.project}</h4>
              <p className="text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Contact Me</h2>
        <form className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-[#2e3440] border border-gray-600 text-white focus:outline-none focus:border-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-[#2e3440] border border-gray-600 text-white focus:outline-none focus:border-white"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg bg-[#2e3440] border border-gray-600 text-white focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
