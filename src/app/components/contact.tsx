'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface ContactProps {
  contact: ContactInfo;
}

export default function Contact({ contact }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text: string | undefined, type: 'email' | 'phone') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm sm:text-base leading-relaxed text-gray-300">
        <p className="mb-6 font-medium text-orange-400">Get In Touch</p>

        <div className="space-y-3">
          {/* Email */}
          <div className="group flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-400">{contact.email}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(contact.email, 'email')}
                className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                title="Send email"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Phone */}
          {contact.phone && (
            <div className="group flex items-center justify-between p-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 transition-all">
              <div className="flex items-center gap-3 flex-1">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-400">{contact.phone}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(contact.phone, 'phone')}
                  className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`tel:${contact.phone}`}
                  className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                  title="Call"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Location */}
          {contact.location && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-700 bg-neutral-800/50">
              <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-400">{contact.location}</div>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(contact.linkedin || contact.github || contact.twitter || contact.website) && (
          <div className="mt-6 pt-6 border-t border-neutral-700">
            <p className="text-sm text-gray-400 mb-4">Connect with me:</p>
            <div className="flex flex-wrap gap-3">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 hover:text-orange-400 transition-all text-gray-400 text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 hover:text-orange-400 transition-all text-gray-400 text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}

              {contact.twitter && (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 hover:text-orange-400 transition-all text-gray-400 text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              )}

              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:border-orange-500/30 hover:text-orange-400 transition-all text-gray-400 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
