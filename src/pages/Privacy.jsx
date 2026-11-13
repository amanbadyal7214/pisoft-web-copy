"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  UserCircle,
  CreditCard,
  Share2,
  BellRing,
  RefreshCcw,
  Mail,
  Phone,
  ChevronRight,
  ScrollText,
  Binary,
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

export default function PrivacyPolicy() {
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  const [contactNo1, setContactNo1] = useState("");
  const [contactNo2, setContactNo2] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressDist, setAddressDist] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const [termsContent, setTermsContent] = useState("");
  const [loadingTerms, setLoadingTerms] = useState(true);
  const [termsError, setTermsError] = useState(null);

  /* ================= ABOUT US API ================= */
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${baseURl}/aboutUs`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        setCompanyName(data?.companyName || "");
        setContactNo1(data?.contactNo1 || "");
        setContactNo2(data?.contactNo2 || "");
        setEmail(data?.email || "");
        setGstIn(data?.gstIN || "");
        setCompanyLogo(data?.companyLogo || "");
        setAddressLine(data?.addressLine1 || "");
        setAddressLine2(data?.addressLine2 || "");
        setAddressDist(data?.addressDistrict || "");
        setAddressState(data?.addressState || "");
        setAddressCountry(data?.addressCountry || "");
      } catch (err) {
        console.error("Failed to fetch about us data:", err);
      }
    };

    fetchAboutData();
  }, []);

  /* ================= SCROLL EFFECT ================= */
  // useEffect(() => {
  //   const handleScroll = () => setShowAuthButtons(window.scrollY <= 100);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  /* ================= TERMS API ================= */
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(
          `${baseURl}/getTermsAndConditions?mode=BOTH`
        );

        setTermsContent(response?.data?.termsAndConditions || "");
      } catch (err) {
        console.error("Failed to fetch terms & conditions:", err);
        setTermsError("Failed to load Terms & Privacy content.");
      } finally {
        setLoadingTerms(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="min-h-screen text-blue-950 selection:bg-orange-500/30 overflow-x-hidden relative font-INB bg-slate-50">
      <ScrollToHashElement />
      <SocialLinks className="hidden lg:block" />

      {/* Background Effects */}
      <div className="hidden md:fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/5 -top-40 -right-40 blur-[120px] rounded-full" />
        <div className="absolute w-[600px] h-[600px] bg-orange-500/5 bottom-0 left-0 blur-[120px] rounded-full" />
      </div>

      {/* Header Navigation */}
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-10">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-500/20 bg-white shadow-sm">
              <ShieldCheck size={14} /> Data Protection
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
              Privacy <span className="text-orange-500 italic">Policy</span>
            </h1>

            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              At {companyName || "Pisoft Informatics"}, we are committed to protecting the privacy and security of our users' personal information.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-10">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-blue-950/20 p-8 md:p-16 rounded-[3rem] shadow-xl space-y-16"
            >
              {/* Terms Content */}
              {loadingTerms && (
                <p className="text-blue-950 font-medium">
                  Loading content...
                </p>
              )}

              {termsError && (
                <p className="text-red-600 font-bold">
                  {termsError}
                </p>
              )}

              {!loadingTerms && !termsError && (
                <div
                  className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-blue-950 prose-p:text-slate-600 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(termsContent),
                  }}
                />
              )}

              {/* Contact Card */}
              <div className="bg-orange-500 rounded-[2.5rem] p-6 text-white relative overflow-hidden mt-16">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <BellRing /> Need Support?
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/90">
                      <Mail size={18} />
                      {email || "support@example.com"}
                    </div>

                    <div className="flex items-center gap-3 text-white/90">
                      <Phone size={18} />
                      {contactNo1 || "Not Available"}
                    </div>
                  </div>

                  <a
                    href={`mailto:${email}`}
                    className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-950 hover:text-white transition-all shadow-lg inline-block text-center"
                  >
                    Contact Privacy Team
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