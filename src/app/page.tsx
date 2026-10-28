import { Book } from "@/components/book/Book";
import { LINKS } from "@/lib/bookData";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mithlesh Shah",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Phantom Grace Technologies", url: "https://phantomgracetech.com" },
  address: { "@type": "PostalAddress", addressLocality: "Gwalior", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
  url: "https://mithleshshah.com",
  sameAs: [LINKS.linkedin, LINKS.github],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Book />
    </main>
  );
}
