"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  Github,
  GraduationCap,
  Globe,
  Linkedin,
  Sparkles,
} from "lucide-react";
import Navbar from "./component/navbar";
import {
  projectsData,
  storyData,
  stackData,
  educationData,
  capabilitiesData,
  type ProjectItem,
  type StoryItem,
} from "./projectsData";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOut } },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOut } },
};

const viewport = { once: true, margin: "-80px" } as const;

const GrainOverlay = () => <div className="grain-overlay" aria-hidden="true" />;

// Soft radial glow used across sections
const Glow = ({ className, color }: { className: string; color: string }) => (
  <div
    aria-hidden="true"
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
  />
);

export default function Home() {
  return (
    <div className="min-h-screen text-fog">
      <GrainOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <StorySection />
        <StackSection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

const Eyebrow = ({ children, color = "text-skyline" }: { children: React.ReactNode; color?: string }) => (
  <span className={`font-mono text-xs uppercase tracking-[0.3em] mb-4 block ${color}`}>
    {children}
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <Glow className="-top-40 -left-32 w-[560px] h-[480px]" color="rgba(29,78,216,0.35)" />
      <Glow className="top-64 -right-40 w-[520px] h-[460px]" color="rgba(14,116,144,0.28)" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center md:text-left">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <Eyebrow>SaaS Founder &amp; Engineer</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-8xl font-extrabold tracking-[-0.04em] leading-[1.02] max-w-4xl mb-8"
          >
            I build software products people{" "}
            <em className="text-silver font-serif">actually</em> use.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-mist max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0"
          >
            Founder of HuntWise AI and VisaHunt — two live SaaS products helping
            people land jobs worldwide. Built solo, end to end: product, code,
            and growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-5 mb-20"
          >
            <a
              href="#products"
              className="w-full md:w-auto px-8 py-4 bg-fog text-night font-bold rounded-full hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg text-center"
            >
              See my products
            </a>
            <a
              href="#story"
              className="font-bold text-lg inline-flex items-center gap-2 hover:translate-x-1 transition-transform"
            >
              Read my story <ArrowRight size={20} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-hairline pt-8"
          >
            {[
              { value: "2", label: "products live", color: "#2DD4BF", live: true },
              { value: "8 yrs", label: "building software", color: "#60A5FA", live: false },
              { value: "Solo", label: "design → code → launch", color: "#A78BFA", live: false },
            ].map(({ value, label, color, live }) => (
              <div
                key={label}
                className="flex flex-col items-center md:items-start rounded-xl border p-5 backdrop-blur-sm"
                style={{ borderColor: `${color}30`, backgroundColor: `${color}0A` }}
              >
                <span className="font-display text-3xl font-bold inline-flex items-center gap-2.5">
                  {live && (
                    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: color }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: color }}
                      />
                    </span>
                  )}
                  {value}
                </span>
                <span
                  className="font-mono text-xs uppercase tracking-[0.15em] mt-1.5"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Product mockup with a subtle mouse-tracking 3D tilt
const TiltMockup = ({ project }: { project: ProjectItem }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[28px] pointer-events-none opacity-40"
        style={{ background: `radial-gradient(ellipse, ${project.accent}33, transparent 70%)` }}
      />
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
        className="relative rounded-[20px] overflow-hidden shadow-2xl bg-panel will-change-transform"
      >
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none border z-10"
          style={{ borderColor: `${project.accent}40` }}
        />
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          className="w-full h-auto"
          priority={project.name === "HuntWise AI"}
        />
      </motion.div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="relative py-28 md:py-40 border-y border-hairline overflow-hidden">
      <Glow className="top-1/3 -left-48 w-[500px] h-[500px]" color="rgba(13,148,136,0.15)" />
      <Glow className="bottom-0 -right-48 w-[500px] h-[500px]" color="rgba(29,78,216,0.15)" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-20"
        >
          <Eyebrow color="text-huntwise">What I&apos;ve built</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Two products. Both live.
          </h2>
        </motion.div>

        <div className="space-y-28 md:space-y-40">
          {projectsData.map((project, index) => (
            <ProductShowcase key={project.name} project={project} flipped={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = ({ project, flipped }: { project: ProjectItem; flipped: boolean }) => {
  const Icon = project.name === "HuntWise AI" ? Briefcase : Globe;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
    >
      <motion.div
        variants={flipped ? slideFromRight : slideFromLeft}
        className={`md:col-span-5 order-2 ${flipped ? "md:order-2" : "md:order-1"}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: project.accentDeep }}
          >
            <Icon size={24} />
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold">{project.name}</h3>
        </div>

        <p className="text-lg font-bold mb-4" style={{ color: project.accent }}>
          {project.tagline}
        </p>

        <p className="text-mist mb-6 leading-relaxed">{project.description}</p>

        <ul className="space-y-3 mb-6">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle2 size={20} style={{ color: project.accent }} className="shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-panel border border-hairline rounded-full font-mono text-xs text-mist"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold hover:underline underline-offset-4 decoration-2"
          style={{ textDecorationColor: project.accent }}
        >
          Visit {project.domain} <ArrowUpRight size={20} />
        </a>
      </motion.div>

      <motion.div
        variants={flipped ? slideFromLeft : slideFromRight}
        className={`md:col-span-7 order-1 ${flipped ? "md:order-1" : "md:order-2"}`}
      >
        <TiltMockup project={project} />
      </motion.div>
    </motion.div>
  );
};

const StorySection = () => {
  return (
    <section id="story" className="max-w-7xl mx-auto px-5 md:px-8 py-28 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="md:col-span-5"
        >
          <Eyebrow>The story</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Engineer by training, founder by choice.
          </h2>
          <p className="text-lg md:text-xl text-mist leading-relaxed mb-10">
            Eight years engineering backend systems at Nike, EPAM, VeriFone and
            DigitalZone taught me how to build software that scales. In 2025 I
            started shipping my own products, focusing on high-impact AI tools.
          </p>
          <div className="flex items-start gap-3 border-t border-hairline pt-6">
            <GraduationCap size={20} className="text-dim shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim block mb-1">
                Education
              </span>
              <span className="text-sm text-mist">
                {educationData.degree} — {educationData.school}, {educationData.year}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="md:col-span-6 md:col-start-7 space-y-5"
        >
          {storyData.map((item) => (
            <StoryCard key={item.year + item.company} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StoryCard = ({ item }: { item: StoryItem }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={fadeUp} className="flex items-start gap-6 group">
      <span
        className={`font-mono text-xs shrink-0 w-20 pt-5 ${
          item.current ? "text-huntwise font-bold" : "text-dim"
        }`}
      >
        {item.year}
      </span>
      <div
        className={`flex-grow rounded-xl border overflow-hidden transition-all duration-300 ${
          item.current
            ? "bg-gradient-to-r from-huntwise-deep/25 to-visahunt-deep/25 border-huntwise/40"
            : "bg-panel border-hairline group-hover:border-white/25"
        }`}
      >
        <button
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="w-full flex items-center justify-between gap-4 p-4 text-left cursor-pointer"
        >
          <span>
            <span className="font-bold block">{item.company}</span>
            <span className="text-sm text-mist">{item.role}</span>
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-mist transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <div className="px-4 pb-4 pt-1 border-t border-hairline">
                <span className="font-mono text-xs uppercase tracking-wider block mt-3 mb-2 text-huntwise">
                  {item.project}
                </span>
                <p className="text-sm mb-4 leading-relaxed text-mist">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full font-mono text-xs border border-white/15 text-mist"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={15} className="shrink-0 text-huntwise" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const StackSection = () => {
  return (
    <section id="stack" className="border-y border-hairline bg-panel/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-28 md:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-16"
        >
          <Eyebrow>The stack</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Tools of the trade.
          </h2>
        </motion.div>

        <div>
          {stackData.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: easeOut }}
              className="border-t border-hairline py-5 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8"
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: group.color }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                  {group.label}
                </span>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-sm text-fog/90 border transition-colors duration-300"
                    style={{
                      borderColor: `${group.color}38`,
                      backgroundColor: `${group.color}0F`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = () => {
  const icons = [Compass, Code2, Sparkles];

  return (
    <section className="py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-20"
        >
          <Eyebrow color="text-huntwise">How I work</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Full-stack independence.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {capabilitiesData.map((capability, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={capability.title}
                variants={fadeUp}
                className="bg-panel border border-hairline p-10 rounded-[20px] hover:border-white/25 transition-colors"
              >
                <Icon size={36} className="text-huntwise mb-8" />
                <h3 className="font-display text-2xl font-bold mb-4">{capability.title}</h3>
                <p className="text-mist leading-relaxed">{capability.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden">
      <Glow className="-bottom-40 -left-32 w-[480px] h-[420px]" color="rgba(14,116,144,0.25)" />
      <Glow className="-top-24 -right-32 w-[440px] h-[400px]" color="rgba(29,78,216,0.22)" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-28 md:py-40 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div variants={fadeUp}>
            <Eyebrow color="text-huntwise">Building something? Let&apos;s talk</Eyebrow>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="mailto:mithleshshah84@gmail.com"
            className="font-display text-3xl md:text-6xl font-extrabold tracking-tight hover:text-huntwise transition-colors break-words block"
          >
            mithleshshah84@gmail.com
          </motion.a>

          <motion.div variants={fadeUp} className="flex justify-center gap-8 mt-10">
            <a
              href="https://www.linkedin.com/in/mithlesh-shah14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mist hover:text-fog transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="https://github.com/mithleshshah14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mist hover:text-fog transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-hairline">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-5 md:px-8 py-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">
          Mithlesh Shah
        </span>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex gap-4">
            <a
              href="https://www.huntwiseai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-mist hover:text-huntwise transition-colors"
            >
              HuntWise AI
            </a>
            <a
              href="https://www.visa-hunt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-mist hover:text-visahunt transition-colors"
            >
              VisaHunt
            </a>
            <a
              href="/MITHLESH_SHAH_RESUME.pdf"
              download="Mithlesh_Shah_Resume.pdf"
              className="font-mono text-xs uppercase text-mist hover:text-fog transition-colors"
            >
              Resume ↓
            </a>
          </div>
          <span className="font-mono text-xs uppercase text-dim">© 2026 Mithlesh Shah</span>
        </div>
      </div>
    </footer>
  );
};
