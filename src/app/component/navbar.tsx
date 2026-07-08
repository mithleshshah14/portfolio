"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "products", label: "Products" },
  { id: "story", label: "Story" },
  { id: "stack", label: "Stack" },
];

const sectionIds = ["products", "story", "stack", "contact"];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(sectionId);
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return activeSection;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const linkClass = (id: string) =>
    `relative py-1 transition-colors ${
      activeSection === id
        ? "text-fog after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-huntwise"
        : "text-mist hover:text-fog"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-night/80 backdrop-blur-md border-b border-hairline">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex justify-between items-center py-4">
          <a
            href="#"
            className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-fog"
          >
            Mithlesh&nbsp;Shah
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={linkClass(id)}>
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2 bg-fog text-night font-bold rounded-full hover:opacity-80 transition-all duration-300 active:scale-95"
            >
              Work with me
            </a>
          </div>

          <button
            className="md:hidden p-2 text-fog"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-6">
            {links.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="text-mist hover:text-fog transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2 bg-fog text-night font-bold rounded-full text-center"
            >
              Work with me
            </a>
          </div>
        )}
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-huntwise to-visahunt-deep"
        style={{ scaleX: progress }}
      />
    </nav>
  );
}
