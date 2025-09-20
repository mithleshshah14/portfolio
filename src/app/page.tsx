"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./component/navbar";
import { skillsData } from "./skillsData";
import { experienceData } from "./experienceData";
import { 
  Mail, Phone, ArrowDown, Code, Rocket, Lightbulb, 
  Github, Linkedin, Download
} from 'lucide-react';

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Typing Animation Hook
const useTypingAnimation = (text: string, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Scroll Reveal Hook
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Hero Section Component
const HeroSection = () => {
  const typedText = useTypingAnimation("Senior Software Engineer", 100);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <AnimatedBackground />
      
      <div className="text-center max-w-4xl mx-auto px-4 z-10">
        <div className="mb-8">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gray-800 flex items-center justify-center">
              <Code className="text-blue-400" size={80} />
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Mithlesh Shah
          </span>
        </h1>
        
        <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12">
          {typedText}
          <span className="animate-pulse">|</span>
        </div>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Passionate about building scalable microservices and cloud solutions. 
          7 years of experience turning complex problems into elegant code.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="mailto:mithleshshah84@gmail.com" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Mail size={16} />
            Get In Touch
          </a>
          <a href="https://www.linkedin.com/in/mithlesh-shah14" className="flex items-center gap-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg transition-all duration-300">
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="text-blue-400 mx-auto" size={24} />
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            About <span className="text-blue-400">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a Senior Software Engineer with 7 years of experience designing and building scalable 
                microservices using Java, Spring Boot, AWS, and ReactJS. My passion lies in creating 
                robust, efficient solutions that drive business growth.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Throughout my career, I've worked with industry leaders like Nike, EPAM, and VeriFone, 
                where I've honed my skills in cloud architecture, API design, and full-stack development.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Rocket size={16} />
                  <span>7+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Lightbulb size={16} />
                  <span>Innovation Focused</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-gray-300">Projects Delivered</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                <div className="text-gray-300">Companies</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-300">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className="py-24 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Technical <span className="text-blue-400">Skills</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
              <div 
                key={category} 
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-6">{category}</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <skill.icon className="text-blue-400" size={20} />
                          <span className="text-gray-200 text-sm">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="experience" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Professional <span className="text-blue-400">Experience</span>
          </h2>
          
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-2">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg font-medium text-white mb-2">{exp.company}</h4>
                    <p className="text-gray-400 mb-4">{exp.period}</p>
                    
                    <h5 className="text-lg font-medium text-gray-200 mb-3">{exp.project}</h5>
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h6 className="text-lg font-semibold text-gray-200 mb-3">Key Achievements</h6>
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
interface ContactSectionProps {
  formData: { name: string; email: string; message: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const ContactSection = ({ formData, handleChange, handleSubmit, isSubmitting }: ContactSectionProps) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 text-lg mb-8">
                  I'm always interested in discussing new opportunities, 
                  innovative projects, or just having a chat about technology.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400">mithleshshah84@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-400">+91 7999673489</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/mithlesh-shah14" className="text-blue-400 hover:text-blue-300 transition-colors">
                      mithlesh-shah14
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Mithlesh Shah. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/mithlesh-shah14" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/mithleshshah14" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:mithleshshah84@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};