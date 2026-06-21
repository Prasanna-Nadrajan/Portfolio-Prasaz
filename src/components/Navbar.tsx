import { useEffect, useState } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    return (localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDark(!dark);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav id="nav" className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={(e) => scrollToSection(e, 'hero')}>prasaz</a>
      <div className="nav-right">
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
          <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a></li>
          <li><a href="#work" onClick={(e) => scrollToSection(e, 'work')}>Work</a></li>
          <li><a href="#platforms" onClick={(e) => scrollToSection(e, 'platforms')}>Platforms</a></li>
          <li><a href="#blog" onClick={(e) => scrollToSection(e, 'blog')}>Blog</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        </ul>
        <button className="theme-btn" id="themeBtn" aria-label="Toggle colour scheme" onClick={toggleTheme}>
          <span className="t-icon" id="tIcon">{dark ? '◐' : '◑'}</span>
          <span id="tLabel">{dark ? 'Light' : 'Dark'}</span>
        </button>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
