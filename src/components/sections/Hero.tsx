"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { content } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      number: '500+',
      label: content.hero.stats.projects
    },
    {
      number: '200+', 
      label: content.hero.stats.clients
    },
    {
      number: '8+',
      label: content.hero.stats.experience
    },
    {
      number: '98%',
      label: content.hero.stats.satisfaction
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                ✨ {content.hero.subtitle}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {content.hero.title.split(' ').slice(0, 3).join(' ')}
                </span>
                <br />
                <span className="text-gray-700">
                  {content.hero.title.split(' ').slice(3).join(' ')}
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {content.hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('#contact')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {content.hero.ctaPrimary}
                <span className="ml-2">→</span>
              </Button>
              
              <Button
                onClick={() => scrollToSection('#portfolio')}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-medium rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
              >
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Hero illustration */}
          <div className="relative">
            <div className="relative">
              {/* Main hero image */}
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl transform -rotate-6"></div>
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8c54b77c-a686-4ece-9241-0caeee65f3aa.png"
                  alt="Digital Solutions Workspace"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                  loading="eager"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 animate-pulse">
                  <span className="text-white text-2xl">💻</span>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12 animate-pulse">
                  <span className="text-white text-xl">📱</span>
                </div>

                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center transform rotate-45 animate-bounce">
                  <span className="text-white text-sm">🚀</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-0 w-32 h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full opacity-60"></div>
            <div className="absolute bottom-10 right-0 w-24 h-1 bg-gradient-to-l from-purple-600 to-transparent rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#about')}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </button>
      </div>
    </section>
  );
}