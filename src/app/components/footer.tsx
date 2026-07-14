'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:preetsinghlks@gmail.com', label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600
                            text-white rounded-xl grid place-items-center
                            font-bold text-lg shadow-lg shadow-blue-500/20 mb-4">
              H
            </div>
            <p className="text-neutral-400 text-sm">
              Full-stack engineer passionate about building scalable systems and exploring Web3.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-neutral-400 hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
              <Link href="/chat" className="text-neutral-400 hover:text-blue-400 transition-colors text-sm">
                Chat
              </Link>
              <Link href="/blog" className="text-neutral-400 hover:text-blue-400 transition-colors text-sm">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-neutral-800/50
                             transition-all duration-200 hover:scale-110"
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800/50 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm text-center sm:text-left">
              © {currentYear} Harpreet Singh. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-neutral-400 hover:text-blue-400 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-neutral-400 hover:text-blue-400 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
