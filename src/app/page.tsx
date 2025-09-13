"use client";

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Section Placeholder */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">About SolhaMedia</h2>
            <p className="mt-4 text-lg text-gray-600">Coming soon...</p>
          </div>
        </div>
      </section>

      {/* Services Section Placeholder */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">Coming soon...</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section Placeholder */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Portfolio</h2>
            <p className="mt-4 text-lg text-gray-600">Coming soon...</p>
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-600">Coming soon...</p>
          </div>
        </div>
      </section>
    </main>
  );
}