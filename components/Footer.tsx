// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Footer component
// *********************

'use client';

import Link from 'next/link';
import { FaLinkedin, FaEnvelope, FaPhone, FaUser, FaUniversity } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-500">AB</span>
              <span className="text-2xl font-semibold text-white ml-1">Electro</span>
            </div>
            <p className="text-sm">
              Your one-stop destination for quality electronics and gadgets. 
              We provide the best products at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-blue-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-blue-400 transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Developer Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaUser className="w-5 h-5 text-blue-400 mr-3" />
                <span>Abhas Bali</span>
              </li>
              <li className="flex items-center">
                <FaUniversity className="w-5 h-5 text-blue-400 mr-3" />
                <span>Student at SRM IST KTR</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 text-blue-400 mr-3" />
                <a href="tel:+917009080399" className="hover:text-blue-400 transition-colors duration-200">
                  +91 7009080399
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-blue-400 mr-3" />
                <a href="mailto:ab9266@srmist.edu.in" className="hover:text-blue-400 transition-colors duration-200">
                  ab9266@srmist.edu.in
                </a>
              </li>
              <li className="flex items-center">
                <FaLinkedin className="w-5 h-5 text-blue-400 mr-3" />
                <a 
                  href="https://www.linkedin.com/in/abhas-bali-6805202b7/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} AB Electro. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/privacy-policy" 
                className="text-sm hover:text-blue-400 transition-colors duration-200 mr-4"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
