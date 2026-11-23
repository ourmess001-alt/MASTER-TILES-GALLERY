'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Download, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { MtgLogo } from './MtgLogo';
import { useQuote } from '../context/QuoteContext';

export const DigitalCardModal: React.FC = () => {
  const { isDigitalCardOpen, setIsDigitalCardOpen } = useQuote();
  const [copied, setCopied] = useState(false);

  if (!isDigitalCardOpen) return null;

  // Contact details
  const ownerName = 'Md. Abir Hossain';
  const role = 'Owner (স্বত্বাধিকারী)';
  const phoneOwner = '+880 1743-381500';
  const phoneShowroom1 = '+880 1911-776657';
  const phoneShowroom2 = '+880 1615-970588';
  const email = 'abirhossain7741@gmail.com';
  const address = 'Three Brothers Tiles Market, Nolapara, Bhabanipur, Gazipur Sadar, Gazipur';

  // Copy full details to clipboard
  const handleCopy = () => {
    const text = `MASTER TILES GALLERY (মাস্টার টাইল্স গ্যালারী)\nOwner: ${ownerName}\nWhatsApp/Mobile: ${phoneOwner}\nShowroom: ${phoneShowroom1}, ${phoneShowroom2}\nEmail: ${email}\nAddress: ${address}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate downloadable .vcf vCard file
  const handleDownloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${ownerName}`,
      'ORG:Master Tiles Gallery',
      'TITLE:Owner',
      `TEL;TYPE=CELL,VOICE:${phoneOwner.replace(/\s+/g, '')}`,
      `TEL;TYPE=WORK,VOICE:${phoneShowroom1.replace(/\s+/g, '')}`,
      `TEL;TYPE=WORK,VOICE:${phoneShowroom2.replace(/\s+/g, '')}`,
      `EMAIL:${email}`,
      `ADR;TYPE=WORK:;;Three Brothers Tiles Market, Nolapara, Bhabanipur;Gazipur Sadar;Gazipur;;Bangladesh`,
      'NOTE:Wholesale & Retail (পাইকারী ও খুচরা বিক্রয়) - Master Tiles Gallery',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Md_Abir_Hossain_Master_Tiles_Gallery.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDigitalCardOpen(false)}
          className="fixed inset-0 bg-slate-900/65 backdrop-blur-md"
        />

        {/* Modal Container */}
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-modal overflow-hidden border border-marble-300 z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsDigitalCardOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-marble-300 flex items-center justify-center text-slate-800 transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ========================================================
                THE REPLICATED PHYSICAL VISITING CARD
               ======================================================== */}
            <div className="relative p-6 sm:p-8 bg-[#FAF9F5] border-b border-marble-300 overflow-hidden">
              {/* Marble Veining Background SVG */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg
                  viewBox="0 0 500 320"
                  className="w-full h-full object-cover"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M-20 40 Q150 120 280 180 T520 280"
                    fill="none"
                    stroke="#B8A382"
                    strokeWidth="2.5"
                    opacity="0.5"
                  />
                  <path
                    d="M40 220 Q200 180 340 100 T520 60"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="1.8"
                    opacity="0.4"
                  />
                  <path
                    d="M-30 180 Q100 240 240 260 T480 320"
                    fill="none"
                    stroke="#8E8F94"
                    strokeWidth="1.2"
                    opacity="0.35"
                  />
                </svg>
              </div>

              {/* Card Content Layout */}
              <div className="relative z-10 space-y-6">
                {/* Top Section: Owner & Contact */}
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
                    {ownerName}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-slate-600 font-semibold mt-0.5">
                    {role}
                  </div>

                  {/* Phone List */}
                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2.5 font-semibold text-slate-900">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <a href={`tel:${phoneOwner.replace(/\s+/g, '')}`} className="hover:underline font-mono">
                        {phoneOwner}
                      </a>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-sans">
                        WhatsApp
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 pl-6">
                      <span className="text-slate-400 mr-1">Showroom:</span>
                      <a href={`tel:${phoneShowroom1.replace(/\s+/g, '')}`} className="font-mono hover:underline">
                        {phoneShowroom1}
                      </a>
                      <span className="mx-1 text-slate-300">,</span>
                      <a href={`tel:${phoneShowroom2.replace(/\s+/g, '')}`} className="font-mono hover:underline">
                        {phoneShowroom2}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-700 pt-1">
                      <Mail className="w-3.5 h-3.5 text-taupe-dark flex-shrink-0" />
                      <a href={`mailto:${email}`} className="hover:underline text-[11px]">
                        {email}
                      </a>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-700 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-900 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">
                        {address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Logo + Scannable QR Component */}
                <div className="pt-4 border-t border-marble-300/80 flex items-center justify-between">
                  <div>
                    <MtgLogo size="md" />
                    <div className="text-[10px] text-slate-600 font-bengali mt-1">
                      পাইকারী ও খুচরা বিক্রয় কেন্দ্র
                    </div>
                  </div>

                  {/* Scannable Visiting Card QR Representation */}
                  <div className="bg-white p-2 rounded-lg border border-marble-300 shadow-sm flex flex-col items-center">
                    <div className="w-14 h-14 bg-slate-900 rounded p-1 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">
                      Scan Contact
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-white space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadVCard}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Contact (সেভ করুন)</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-marble-100 hover:bg-marble-200 border border-marble-300 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied! (কপি হয়েছে)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Details (কপি করুন)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Callout */}
              <a
                href={`https://wa.me/8801743381500?text=${encodeURIComponent(
                  'আসসালামু আলাইকুম মোঃ আবির হোসেন ভাই, আমি মাস্টার টাইল্স গ্যালারীর ওয়েবসাইট থেকে ভিজিটিং কার্ড দেখে যোগাযোগ করছি।'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন (Md. Abir Hossain)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
