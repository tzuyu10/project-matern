"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    setOpen(false);
    if (pathname !== "/") return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", "/");
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  useEffect(() => {
    let frame = 0;
    const updateHeader = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextState = window.scrollY > 24;
        setScrolled((currentState) => currentState === nextState ? currentState : nextState);
      });
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <header className={`site-header ${scrolled ? "is-scrolled" : "is-at-top"}`}><div className="container header-inner">
      <Link className="brand header-brand" href="/" onClick={handleLogoClick} aria-label="Project M.A.T.E.R.N. home"><Image className="header-brand-mark" src="/media/brand-mark.webp" alt="" width={58} height={68} priority /><Image className="header-brand-wordmark" src="/media/brand-wordmark.webp" alt="Project M.A.T.E.R.N." width={145} height={48} priority /></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link className={pathname === "/" ? "active" : ""} href="/">Home</Link><a href="/#topics">Explore Topics</a><Link className={pathname === "/about" ? "active" : ""} href="/about">About Us</Link><Link className={pathname === "/references" ? "active" : ""} href="/references">References</Link></nav>
      <div className="header-actions"><ThemeToggle /><a className="header-cta" href="/#topics">Find Your Guidance <ArrowUpRight size={17} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button></div>
    </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/" onClick={handleLogoClick}>Home</Link>
      <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
      <a href="/#topics" onClick={() => setOpen(false)}>Explore All Topics</a>
      <Link href="/references" onClick={() => setOpen(false)}>References</Link>
    </nav>}</header>;
}
export function Footer() {
  return <footer><div className="container footer-inner"><Link className="brand brand-with-image" href="/" aria-label="Project M.A.T.E.R.N. home"><Image className="brand-logo footer-brand-logo" src="/media/brand-logo.webp" alt="Project M.A.T.E.R.N." width={140} height={69} /></Link><p lang="fil">Kaalaman para sa mas handa at mas panatag na ina.</p><div><Link href="/about">About us</Link><Link href="/references">References</Link><a href="#main">Back to top ↑</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Project M.A.T.E.R.N.</span><span>Maternal Awareness Through Effective Resource and Nursing Education</span></div></footer>;
}
