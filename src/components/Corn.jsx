import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MotionConfig, motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Accordion from "./Accordion";
import { baseURl } from "../../baseURL";

export function Example() {
  const [active, setActive] = useState(false);
  const [bgImage, setBgImage] = useState("/images/default.jpg");
  const navigate = useNavigate();
  const location = useLocation();

  const overlayRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const tlRef = useRef(null);

  const imageMap = {
    home: "/office.jpeg",
    about: "/office2.jpeg",
    services: "/images/services.jpg",
    contact: "/images/contact.jpg",
  };

  useEffect(() => {
    setActive(false);
  }, [location.pathname]);

  // GSAP timeline setup
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.set(overlayRef.current, { display: "flex" })
      .fromTo(
        overlayRef.current,
        { y: "-100%" },
        { y: 0, duration: 0.6, ease: "power4.out" }
      )
      .fromTo(
        leftRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        rightRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current
        ?.reverse()
        .eventCallback("onReverseComplete", () => {
          gsap.set(overlayRef.current, { display: "none" });
        });
    }
  }, [active]);


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


 useEffect(() => {
  const fetchAboutData = async () => {
    try {
      const response = await fetch(`${baseURl}/aboutUs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setCompanyName(data.companyName || "");
      setContactNo1(data.contactNo1 || "");
      setContactNo2(data.contactNo2 || "");
      setEmail(data.email || "");
      setGstIn(data.gstIN || "");
      setCompanyLogo(data.companyLogo || "");
      setAddressLine(data.addressLine1 || "");
      setAddressLine2(data.addressLine2 || "");
      setAddressDist(data.addressDistrict || "");
      setAddressState(data.addressState || "");
      setAddressCountry(data.addressCountry || "");
    } catch (err) {
      console.error("Failed to fetch about us data:", err);
    }
  };

  fetchAboutData();
}, []);


  return (
    <>
      <div className="flex justify-center items-center h-8 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 rounded-xl bg-white z-50 relative">
        <div className="text-sm sm:text-base md:text-lg font-in text-black mr-2 sm:mr-3 md:mr-4">
          Menu
        </div>
        <AnimatedHamburgerButton active={active} setActive={setActive} />
      </div>

      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-blue-950 via-gray-950 to-gray-950 text-white z-40 hidden"
      >
        <div className="flex flex-col md:flex-row w-full h-full">

          <div
            ref={leftRef}
            className="w-full md:w-[75%] h-[55%] md:h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 relative overflow-hidden"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 pt-15 md:pt-0">
              <div className="text-3xl sm:text-5xl md:text-7xl font-bebas tracking-wide bg-clip-text text-transparent bg-white/80">
                Pisoft
              </div>
              <div className="text-3xl sm:text-5xl md:text-7xl font-bebas tracking-wide bg-clip-text text-transparent bg-orange-400/80">
                Informatics
              </div>
              <div className="text-xl sm:text-2xl md:text-6xl font-bebas tracking-wide bg-clip-text text-transparent bg-orange-400/80">
                Contact
              </div>
              <div className="text-base sm:text-lg md:text-2xl font-bebas tracking-wide bg-clip-text text-transparent bg-white/80">
                <p className="text-sm sm:text-base md:text-lg">
                  {addressLine}
                </p>
                <p className="text-sm sm:text-base md:text-lg">
                  {addressLine2},{addressDist},{addressState},{addressCountry}
                </p>
                <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg">
                  {email}
                </p>
                <p className="text-sm sm:text-base md:text-lg">Phone: {contactNo1}, {contactNo2}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-gray-950 to-gray-950 opacity-60 z-0" />
          </div>

          {/* Nav Links - Bottom/Right side */}
          <div
            ref={rightRef}
            className="w-full md:w-1/2 h-[50%] md:h-full flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 font-in text-md md:text-2xl"
          >
            <Link
              to="/"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.home)}
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Accordion className="cursor-pointer hover:text-blue-400 py-1" title="About Us">
              <Link
                to="/about#about-us"
                onClick={() => setActive(false)}
                onMouseEnter={() => setBgImage(imageMap.about)}
                className="block cursor-pointer text-md md:text-2xl hover:text-blue-400 py-1"
              >
                About us
              </Link>
              <Link
                to="/about#our-vision"
                onClick={() => setActive(false)}
                onMouseEnter={() => setBgImage(imageMap.about)}
                className="block cursor-pointer hover:text-blue-400 py-1"
              >
                Our Vision
              </Link>
              <Link
                to="/about#our-mission"
                onClick={() => setActive(false)}
                onMouseEnter={() => setBgImage(imageMap.about)}
                className="block cursor-pointer hover:text-blue-400 py-1"
              >
                Our mission
              </Link>
            </Accordion>

            <Link
              to="/ERPSolutions"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.about)}
              className="hover:text-blue-400 transition block py-1"
            >
              ERP Services
            </Link>

            <Accordion className="cursor-pointer hover:text-blue-400 py-1" title="Other Services">
              <Link
                to="/WebApplications"
                onClick={() => setActive(false)}
                onMouseEnter={() => setBgImage(imageMap.about)}
                className="block cursor-pointer hover:text-blue-400 py-1"
              >
                Web Application
              </Link>
              <Link
                to="/MobileApplications"
                onClick={() => setActive(false)}
                onMouseEnter={() => setBgImage(imageMap.about)}
                className="block cursor-pointer hover:text-blue-400 py-1"
              >
                Mobile Application
              </Link>
            </Accordion>

            <Link
              to="/free-training"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.home)}
              className="hover:text-blue-400 transition"
            >
              Free Training
            </Link>

            <Link
              to="/InternshipProgram"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.home)}
              className="hover:text-blue-400 transition"
            >
              Internship
            </Link>

            <Link
              to="/OurGallery"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.home)}
              className="hover:text-blue-400 transition"
            >
              Gallery
            </Link>

            <Link
              to="/Blogs"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.home)}
              className="hover:text-blue-400 transition"
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              onClick={() => setActive(false)}
              onMouseEnter={() => setBgImage(imageMap.contact)}
              className="hover:text-blue-400 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const AnimatedHamburgerButton = ({ active, setActive }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className="relative h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 rounded-full bg-white/0 transition-colors hover:bg-white/20"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-[2px] w-5 sm:w-6 md:w-8 bg-black"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-[2px] w-5 sm:w-6 md:w-8 bg-black"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-[2px] w-3 sm:w-4 md:w-5 bg-black"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 4px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 4px)",
    },
  },
};
