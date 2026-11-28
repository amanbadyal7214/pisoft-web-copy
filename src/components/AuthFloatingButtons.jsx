import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiPhoneCall } from "react-icons/fi";
import { FaBook, FaDoorOpen, FaPenFancy, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { baseURl } from "../../baseURL";

const buttonConfig = [
  {
    label: "Apply for Internship",
    icon: <FiBriefcase className="w-4 h-4 md:w-5 md:h-5" />,
    mobileIcon: <FiBriefcase className="w-3.5 h-3.5" />,
    link: "/applyforInternship",
  },
  {
    label: "Take a Test",
    icon: <FaPenFancy className="w-4 h-4 md:w-5 md:h-5" />,
    mobileIcon: <FaPenFancy className="w-3.5 h-3.5" />,
    link: "https://project.pisofterp.com/pipl/test-system/take-test",
    isPrimary: true,
  },
  {
    label: "Tutorial",
    icon: <FaBook className="w-4 h-4 md:w-5 md:h-5" />,
    mobileIcon: <FaBook className="w-3.5 h-3.5" />,
    link: "https://www.careerlief.com",
  },
  {
    label: "Login",
    icon: <FaDoorOpen className="w-4 h-4 md:w-5 md:h-5" />,
    mobileIcon: <FaDoorOpen className="w-3.5 h-3.5" />,
    link: "/loginRegisterUser",
  },
  {
    label: "Career With Us",
    icon: <FaUserTie className="w-4 h-4 md:w-5 md:h-5" />,
    mobileIcon: <FaUserTie className="w-3.5 h-3.5" />,
    link: "/CareerWithUs",
  },
];

const isExternal = (url) => url.startsWith("http://") || url.startsWith("https://");

const AuthFloatingButtons = () => {
  const [contactNo, setContactNo] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Fetch contact number from aboutUs API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`${baseURl}/aboutUs`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setContactNo(data.contactNo2 || data.contactNo1 || "");
      } catch (err) {
        console.error("Failed to fetch contact number:", err);
      }
    };

    fetchContactData();
  }, []);

  // Listen to scroll: adjust presentation on scroll and detect bottom of screen
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      // Hide when user reaches within 160px of document bottom
      const threshold = 160;
      const atBottom = documentHeight - scrollPosition <= threshold;

      setIsAtBottom(atBottom);
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Also observe footer element directly so buttons hide immediately when footer appears
  useEffect(() => {
    const footer = document.querySelector("footer") || document.querySelector(".footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAtBottom(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const commonMotionProps = {
    whileHover: {
      backgroundColor: "#FDA851",
      color: "#182B67",
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(253, 186, 116, 0.5)",
    },
    initial: { backgroundColor: "#182B67", color: "#fff" },
    transition: { duration: 0.3 },
  };

  const desktopBtnClasses =
    "relative flex items-center justify-center rounded-full font-INB cursor-pointer border-2 border-transparent px-2 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm";

  // Filter secondary buttons for the mobile dock (excluding Take a Test which has its own prominent pill)
  const secondaryMobileButtons = buttonConfig.filter((b) => !b.isPrimary);

  return (
    <>
      {/* ================= DESKTOP VIEW (lg and up) ================= */}
      <div className="hidden lg:flex items-center gap-2 md:gap-3 z-[600000] justify-end pt-2">
        {/* Call Us Anchor */}
        {contactNo && (
          <motion.a
            href={`tel:${contactNo.startsWith("+") ? contactNo : `+91${contactNo}`}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              backgroundColor: "#FDA851",
              color: "#182B67",
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(253, 186, 116, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center justify-center rounded-full font-INB cursor-pointer border-2 transition-all duration-300 shadow-md ${
              isScrolled
                ? "bg-[#182B67] text-white border-blue-950 px-3.5 py-2 text-xs shadow-lg"
                : " bg-[#182B67] text-white border-transparent px-3.5 py-2 text-xs md:text-sm"
            }`}
            title={`Call us at ${contactNo}`}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="relative flex items-center justify-center">
                <FiPhoneCall className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-inherit" />
              </span>
              <span className="whitespace-nowrap">
                {isScrolled ? (
                  <>
                    <span className="opacity-90">Call:</span> {contactNo}
                  </>
                ) : (
                  <>
                    <span className="opacity-90">Call us at:</span> {contactNo}
                  </>
                )}
              </span>
            </div>
          </motion.a>
        )}

        {/* Desktop Action Buttons */}
        {buttonConfig.map(({ label, icon, link }) => {
          const content = (
            <div className="flex items-center justify-center gap-2">
              <span>{label}</span>
              <span className="relative flex items-center justify-center">
                {icon}
              </span>
            </div>
          );

          return isExternal(link) ? (
            <motion.a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={desktopBtnClasses}
              {...commonMotionProps}
            >
              {content}
            </motion.a>
          ) : (
            <motion.div key={label} className={desktopBtnClasses} {...commonMotionProps}>
              <Link to={link} className="w-full h-full">
                {content}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ================= COMPACT MOBILE DOCK (< lg) ================= */}
      {/* Sleek, unified Floating Action Capsule docked at bottom right, hides when reaching bottom */}
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex lg:hidden fixed bottom-3 right-2.5 z-[600000] max-w-[96vw]"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0b1633]/92 backdrop-blur-md shadow-2xl border border-white/20">
              
              {/* 1. CALL BUTTON (Directly visible, prominent & 1-tap dial) */}
              {contactNo && (
                <motion.a
                  href={`tel:${contactNo.startsWith("+") ? contactNo : `+91${contactNo}`}`}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F07C22] hover:bg-orange-600 text-white font-INB text-xs shadow-md shrink-0 transition-colors cursor-pointer"
                  title={`Call us at ${contactNo}`}
                >
                  <FiPhoneCall className="w-3.5 h-3.5 animate-pulse text-white" />
                  <span className="font-bold">{isScrolled ? "Call" : "Call Us"}</span>
                </motion.a>
              )}

              {/* 2. TAKE A TEST BUTTON (Directly visible & highlighted with pulse badge) */}
              <motion.a
                href="https://project.pisofterp.com/pipl/test-system/take-test"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.94 }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 via-[#FDA851] to-orange-400 text-[#182B67] font-INB text-xs shadow-md shrink-0 transition-all cursor-pointer"
                title="Take a Test"
              >
                <FaPenFancy className="w-3.5 h-3.5 text-[#182B67]" />
                <span className="font-extrabold whitespace-nowrap">Take a Test</span>
                {/* Live Indicator Badge */}
                <span className="absolute -top-1 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
              </motion.a>

              {/* Elegant Divider */}
              <div className="w-[1px] h-4 bg-white/25 shrink-0 mx-0.5" />

              {/* 3. COMPACT QUICK ACTION ICONS (Apply, Tutorial, Login, Career) */}
              <div className="flex items-center gap-1 shrink-0">
                {secondaryMobileButtons.map(({ label, mobileIcon, link }) => {
                  const isExt = isExternal(link);
                  const iconClasses =
                    "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#FDA851] text-white hover:text-[#182B67] shrink-0 transition-all active:scale-90 cursor-pointer";

                  return isExt ? (
                    <a
                      key={label}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={iconClasses}
                      title={label}
                      aria-label={label}
                    >
                      {mobileIcon}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={link}
                      className={iconClasses}
                      title={label}
                      aria-label={label}
                    >
                      {mobileIcon}
                    </Link>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthFloatingButtons;