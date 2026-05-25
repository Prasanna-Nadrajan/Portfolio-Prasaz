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
              ? "bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg border border-zinc-200 dark:border-zinc-800"
              : "bg-transparent"
          }`}
        >
          <NavLink to="/" className="flex items-center space-x-2 px-4 group">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="text-white dark:text-black font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Prasaz</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-1 rounded-xl">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative px-5 py-2 text-sm font-medium rounded-lg transition-all
                  ${isActive
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-violet-700 dark:text-zinc-400 dark:hover:text-violet-500"
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

          <div className="flex items-center space-x-2 px-2 text-zinc-600 dark:text-zinc-400">
            {/* Sidebar toggle — desktop only */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="hidden md:flex p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-violet-700 dark:hover:text-violet-500 rounded-lg transition-colors"
                title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              >
                {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
              </button>
            )}
            <NavLink
              to="/terminal"
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-violet-700 dark:hover:text-violet-500 rounded-lg transition-colors"
              title="Terminal Mode"
            >
              <TerminalIcon size={20} />
            </NavLink>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-violet-700 dark:hover:text-violet-500 rounded-lg transition-colors"
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
        className="md:hidden overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                px-4 py-3 rounded-xl font-medium transition-colors
                ${isActive
                  ? "bg-zinc-200 dark:bg-zinc-800 text-violet-800 dark:text-violet-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
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
