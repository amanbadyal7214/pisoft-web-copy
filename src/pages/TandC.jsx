"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ScrollText,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { NavbarDemo } from "../components/navbar/Navbar2";
import AuthFloatingButtons from "../components/AuthFloatingButtons";
import Footer from "../components/Footer";
import ScrollToHashElement from "../components/ScrollToHash";
import SocialLinks from "../components/SocialLinks";
import ScrollButtons from "../components/TopBottomButtons";
import { Example } from "../components/Corn";
import { baseURl } from "../../baseURL";

export default function TermsAndConditions() {
  const [termsData, setTermsData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  // Handle scroll for floating buttons
  // useEffect(() => {
  //   const handleScroll = () => setShowAuthButtons(window.scrollY <= 100);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Fetch Terms & Conditions API
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(
          `${baseURl}/getTermsAndConditions?mode=BOTH`
        );
        setTermsData(response.data?.termsAndConditions || "");
      } catch (err) {
        console.error("Error fetching Terms:", err);
        setError("Failed to load Terms & Conditions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  return (
    <div className="min-h-screen text-blue-950 selection:bg-orange-500/30 overflow-x-hidden relative font-INB bg-slate-50">
      <ScrollToHashElement />
      <SocialLinks className="hidden lg:block" />

      {/* Background Orbs */}
      <div className="hidden md:fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/10 -top-40 -right-40 blur-[120px] rounded-full" />
        <div className="absolute w-[600px] h-[600px] bg-orange-500/5 bottom-0 left-0 blur-[120px] rounded-full" />
      </div>

      {/* Header/Nav */}
      <div className="fixed -top-9 left-0 w-full z-50 hidden lg:block">
        <AnimatePresence>
          {showAuthButtons && (
            <motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
            >
              <AuthFloatingButtons />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-end lg:justify-end xl:justify-center px-2 py-1">
          <Navbar className="hidden lg:block" />
          <NavbarDemo />
        </div>
      </div>

      <div className="fixed left-1 -top-2 z-[60] lg:hidden">
        <Navbar />
      </div>
      <div className="fixed top-4 right-4 z-[60] lg:hidden">
        <Example />
      </div>
      {showAuthButtons && (
        <div className="block lg:hidden">
          <AuthFloatingButtons />
        </div>
      )}

      <ScrollButtons />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-30 pb-10">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-500/20 bg-white shadow-sm">
              <ScrollText size={14} />
              Pisoft Informatics Legal
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
              Terms & <span className="text-orange-500 italic">Conditions</span>
            </h1>

            <p className="text-slate-500 font-medium">Last Updated: February 2026</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-10">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-blue-950/20 p-8 md:p-16 rounded-[3rem] shadow-xl"
            >
              {/* Dynamic API Content */}
              <div
                className="
                  prose prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-blue-950
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-strong:text-blue-950
                  prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2
                "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    termsData
                      // convert divs to semantic paragraphs
                      .replace(/<div>/g, "<p>")
                      .replace(/<\/div>/g, "</p>")
                      // convert numbered headings 1., 2., etc. to h2
                      .replace(/<p>(\d+\.\s[^<]+)<\/p>/g, "<h2>$1</h2>")
                      // convert letters A., B., C. to h3
                      .replace(/<p>([A-Z]\.\s[^<]+)<\/p>/g, "<h3>$1</h3>")
                  ),
                }}
              />

              {/* Support Card */}
              <div className="bg-orange-500 rounded-[2.5rem] p-10 text-white relative overflow-hidden mt-20">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <HelpCircle /> Have Questions?
                  </h3>

                  <p className="text-white/80 text-sm font-medium mb-8 max-w-md">
                    Our support team is here to help you understand our policies and your rights.
                  </p>

                  <a
                    href="mailto:info@pisoftinformatics.com"
                    className="inline-block bg-white text-orange-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-950 hover:text-white transition-all shadow-lg"
                  >
                    Contact Support Desk
                  </a>
                </div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}