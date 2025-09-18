"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setActiveSection("home");

    let timeout: NodeJS.Timeout;

    // Check URL hash on load
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      if (["home", "skills", "projects", "contact"].includes(id)) {
        setActiveSection(id);
        const section = document.getElementById(id);
        if (section) {
          // Assign the timeout to the variable
          timeout = setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 0);
        }
      }
    }

    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"];
      let current = "";

      // Check if we're at the bottom of the page
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomThreshold = 100;

      if (documentHeight - (scrollPosition + windowHeight) < bottomThreshold) {
        current = "contact";
      } else {
        // Find the section that takes up most of the viewport
        let maxVisibleHeight = 0;

        for (const id of sections) {
          const section = document.getElementById(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              current = id;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (!isMounted) return;
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav role="navigation" className="bg-gray-800 p-4 fixed w-full z-50 shadow-md">
      <ul className="flex space-x-4 sm:space-x-6 text-white justify-center">
        {["home", "skills", "projects", "contact"].map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(section)}
              aria-label={`Scroll to ${section.charAt(0).toUpperCase() + section.slice(1)} section`}
              className={`hover:text-blue-400 transition-colors relative px-2 py-1 ${
                isMounted && activeSection === section 
                  ? "text-blue-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-blue-400 border-b border-blue-400"
                  : ""
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}