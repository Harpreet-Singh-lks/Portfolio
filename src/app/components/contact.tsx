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
    <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4 md:p-6 backdrop-blur-sm">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-serif italic text-amber-400 mb-1 sm:mb-2">Get In Touch</h3>
        <p className="text-sm sm:text-base text-gray-300">
          Let's connect and discuss opportunities, collaborations, or just have a chat!
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Email */}
        <div className="group flex items-center justify-between p-2 sm:p-3 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 transition-all">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-400/10 text-amber-400 flex-shrink-0">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-200">Email</div>
              <div className="text-sm sm:text-base text-gray-400 truncate">{contact.email}</div>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => copyToClipboard(contact.email, 'email')}
              className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-700/50 transition-all"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-700/50 transition-all"
              title="Send email"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>

        {/* Phone */}
        {contact.phone && (
          <div className="group flex items-center justify-between p-2 sm:p-3 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-400/10 text-emerald-400 flex-shrink-0">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-medium text-gray-200">Phone</div>
                <div className="text-sm sm:text-base text-gray-400">{contact.phone}</div>
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={() => copyToClipboard(contact.phone, 'phone')}
                className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700/50 transition-all"
                title="Copy phone"
              >
                {copiedPhone ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
              <a
                href={`tel:${contact.phone}`}
                className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700/50 transition-all"
                title="Call"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Location */}
        {contact.location && (
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-zinc-800 bg-zinc-800/50">
            <div className="p-1.5 sm:p-2 rounded-lg bg-blue-400/10 text-blue-400 flex-shrink-0">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-200">Location</div>
              <div className="text-sm sm:text-base text-gray-400">{contact.location}</div>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-800">
        <div className="text-xs sm:text-sm font-medium text-gray-200 mb-2 sm:mb-3">Connect on social</div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
            >
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-blue-300 truncate">LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-500 group-hover:text-blue-400 flex-shrink-0" />
            </a>
          )}

          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-gray-500/50 hover:bg-gray-500/10 transition-all"
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 truncate">GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-500 group-hover:text-gray-400 flex-shrink-0" />
            </a>
          )}

          {contact.twitter && (
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all"
            >
              <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-sky-300 truncate">Twitter</span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-500 group-hover:text-sky-400 flex-shrink-0" />
            </a>
          )}

          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-amber-300 truncate">Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}