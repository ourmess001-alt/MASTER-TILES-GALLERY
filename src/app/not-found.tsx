import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#A67839] mb-2">
        404 — Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-8">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত বা পরিবর্তিত হতে পারে। মূল পৃষ্ঠায় ফিরে যেতে নিচের বাটনে ক্লিক করুন।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F2124] text-white hover:bg-[#A67839] text-xs font-bold transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home (হোমে ফিরে যান)</span>
      </Link>
    </div>
  );
}
