"use client";
import Link from "next/link";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <ul className="flex space-x-6 text-white justify-center">
        <li>
          <button onClick={() => scrollToSection("home")}>Home</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </li>
      </ul>
    </nav>
  );
}
