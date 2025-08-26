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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-serif italic text-amber-400 mb-2">Get In Touch</h3>
        <p className="text-sl text-gray-300">
          Let's connect and discuss opportunities, collaborations, or just have a chat!
        </p>
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div className="group flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sl font-medium text-gray-200">Email</div>
              <div className="text-xl text-gray-400">{contact.email}</div>
            </div>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => copyToClipboard(contact.email, 'email')}
              className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-700/50 transition-all"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-700/50 transition-all"
              title="Send email"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Phone */}
        {contact.phone && (
          <div className="group flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-200">Phone</div>
                <div className="text-xs text-gray-400">{contact.phone}</div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => copyToClipboard(contact.phone, 'phone')}
                className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700/50 transition-all"
                title="Copy phone"
              >
                {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`tel:${contact.phone}`}
                className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700/50 transition-all"
                title="Call"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Location */}
        {contact.location && (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-800/50">
            <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sl font-medium text-gray-200">Location</div>
              <div className="text-xl text-gray-400">{contact.location}</div>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="text-sl font-medium text-gray-200 mb-3">Connect on social</div>
        <div className="flex flex-wrap gap-3">
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span className="text-xl text-gray-300 group-hover:text-blue-300">LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-blue-400" />
            </a>
          )}

          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-gray-500/50 hover:bg-gray-500/10 transition-all"
            >
              <Github className="w-4 h-4 text-gray-400" />
              <span className="text-xl text-gray-300 group-hover:text-gray-200">GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-gray-400" />
            </a>
          )}

          {contact.twitter && (
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span className="text-xs text-gray-300 group-hover:text-sky-300">Twitter</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-sky-400" />
            </a>
          )}

          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-gray-300 group-hover:text-amber-300">Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}