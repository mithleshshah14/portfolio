"use client";
import { useEffect, useState } from "react";
import { Download } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-white">
            MS<span className="text-blue-400">.</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative transition-colors duration-300 ${activeSection === id ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {label}
                {activeSection === id && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
            <a
              href="/MITHLESH_SHAH_RESUME.pdf"
              download="Mithlesh_Shah_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Download size={14} />
              Resume
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
}