// Round icon links (email, LinkedIn, GitHub) for the contents page and "The end". Inline SVG: no icon package.
import { LINKS } from "@/lib/bookData";

const ICONS = {
  email: <path d="M3 6.5h18v11H3z M3.5 7l8.5 6.5L20.5 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  linkedin: <path d="M4.5 3.5h15a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1zM7 10v7.5h2.5V10zm1.25-4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zM11 10v7.5h2.5v-4c0-1.1.6-1.7 1.5-1.7s1.3.6 1.3 1.7v4h2.5v-4.6c0-2.3-1.2-3.1-2.8-3.1-1.2 0-2 .6-2.5 1.2V10z" fill="currentColor" />,
  github: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.46v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.4-1.06-1.4-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.1-.24-4.32-1.06-4.32-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.42-1.21.09-2.53 0 0 .8-.26 2.62.97a9 9 0 0 1 4.77 0c1.82-1.23 2.62-.97 2.62-.97.52 1.32.2 2.29.1 2.53.6.66.97 1.51.97 2.55 0 3.65-2.22 4.46-4.34 4.69.34.3.65.88.65 1.78v2.64c0 .26.16.57.66.47A9.5 9.5 0 0 0 12 2.5z" fill="currentColor" />,
};

const ITEMS: { key: keyof typeof ICONS; href: string; label: string }[] = [
  { key: "email", href: `mailto:${LINKS.email}`, label: `Email Mithlesh (${LINKS.email})` },
  { key: "linkedin", href: LINKS.linkedin, label: "Mithlesh Shah on LinkedIn" },
  { key: "github", href: LINKS.github, label: "Mithlesh Shah on GitHub" },
];

export function Social({ className = "" }: { className?: string }) {
  return (
    <p className={`social ${className}`}>
      {ITEMS.map((i) => (
        <a key={i.key} href={i.href} aria-label={i.label} title={i.label} {...(i.key === "email" ? {} : { target: "_blank", rel: "noopener" })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i.key]}</svg>
        </a>
      ))}
    </p>
  );
}
