"use client";
import { useEffect } from "react";
import { CONTACT_ENDPOINT, LINKS, TURNSTILE_SITEKEY } from "@/lib/bookData";
import { startBook, wireContact } from "./engine"; // plain JS on purpose (see engine.js)

/** Starts the page-turn engine (not with reduced motion: the faces stay a readable column) and the contact form. */
export function BookEngine() {
  useEffect(() => {
    const ac = new AbortController();
    wireContact(ac.signal, { endpoint: CONTACT_ENDPOINT, sitekey: TURNSTILE_SITEKEY, email: LINKS.email });
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) startBook(ac.signal);
    return () => ac.abort();
  }, []);
  return null;
}
