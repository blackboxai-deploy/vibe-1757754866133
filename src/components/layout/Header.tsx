"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const { content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: content.navigation.home, href: '#hero' },
    { label: content.navigation.about, href: '#about' },
    { label: content.navigation.services, href: '#services' },
    { label: content.navigation.portfolio, href: '#portfolio' },
    { label: content.navigation.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SolhaMedia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-blue-600 relative group",
                  isScrolled ? "text-gray-700" : "text-gray-700"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageToggle />
            <Link href="/admin/login">
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
              >
                {content.navigation.admin}
              </Button>
            </Link>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 transform hover:scale-105"
              size="sm"
            >
              {content.hero.ctaPrimary}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <div className="w-5 h-5 flex flex-col justify-center">
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gray-600 transition-transform duration-200",
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gray-600 transition-opacity duration-200 mt-1",
                    isMobileMenuOpen ? "opacity-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gray-600 transition-transform duration-200 mt-1",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  )}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "lg:hidden transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4 border-t border-gray-200/50">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 space-y-2">
              <Link href="/admin/login" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {content.navigation.admin}
                </Button>
              </Link>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="sm"
              >
                {content.hero.ctaPrimary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}