import React, { useState, useEffect, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Terminal as TerminalIcon, PanelLeftClose, PanelLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About",      path: "/" },
  { name: "Portfolio",  path: "/portfolio" },
  { name: "Blog",       path: "/blog" },
  { name: "Platforms",  path: "/platforms" },
  { name: "Experience", path: "/experience" },
  { name: "Resume",     path: "/resume" },
  { name: "Contact",    path: "/contact" },
];

interface NavbarProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = memo(({ isSidebarOpen = true, onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // passive: true prevents the browser from waiting for preventDefault() on every scroll tick
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-outfit ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`relative flex items-center justify-between p-2 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/95 dark:bg-black/80 backdrop-blur-md shadow-lg border border-slate-200/80 dark:border-white/10"
              : "bg-white/80 dark:bg-transparent backdrop-blur-sm border border-slate-200/50 dark:border-transparent"
          }`}
        >
          <NavLink to="/" className="flex items-center space-x-2 px-4 group">
            <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
              <span className="text-white dark:text-black font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-800 dark:text-white">Prasaz</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200/80 dark:border-transparent">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative px-5 py-2 text-sm font-medium rounded-lg transition-all
                  ${isActive
                    ? "text-slate-900 bg-white shadow-sm dark:bg-transparent dark:shadow-none dark:text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-transparent"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-2 px-2">
            {/* Sidebar toggle — desktop only */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="hidden md:flex p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg transition-colors"
                title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              >
                {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
              </button>
            )}
            <NavLink
              to="/terminal"
              className="p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg transition-colors"
              title="Terminal Mode"
            >
              <TerminalIcon size={20} />
            </NavLink>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-lg"
      >
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                px-4 py-3 rounded-xl font-medium transition-colors
                ${isActive
                  ? "bg-slate-100 dark:bg-white/10 text-blue-700 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-transparent"
                }
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
