"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { Example } from "../components/Corn";
import { World } from "../components/Globe";
import Footer from "../components/Footer";
import { NavbarDemo } from "../components/navbar/Navbar2";
import { useEffect, useState } from "react";
import Form from "../components/contact/form";
import AuthFloatingButtons from "../components/AuthFloatingButtons";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButtons from "../components/TopBottomButtons";
import SocialLinks from "../components/SocialLinks";
import { Helmet } from "react-helmet";


function Contact() {
  const globeConfig = {
    pointSize: 5,
    globeColor: "#082567",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.8,
    polygonColor: "rgba(255,255,255,0.7)",
    arcTime: 700,
    arcLength: 2.9,
    rings: 3,
    maxRings: 5,
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
  };

  const data = [
    {
      startLat: 40.7128, startLng: -74.0060,
      endLat: 30.430, endLng: 76.4140,
      color: "#32cd32", arcAlt: 0.3, order: 1,
    },
    {
      startLat: 35.6762, startLng: 139.6503,
      endLat: -33.8688, endLng: 151.2093,
      color: "#Ed7014", arcAlt: 0.2, order: 2,
    },
    {
      startLat: 48.8566, startLng: 2.3522,
      endLat: -23.5505, endLng: -46.6333,
      color: "#fa8128", arcAlt: 0.25, order: 3,
    },
    {
      startLat: 55.7558, startLng: 37.6173,
      endLat: 99.6139, endLng: 77.2090,
      color: "#Ed7014", arcAlt: 0.28, order: 4,
    },
    {
      startLat: 39.9042, startLng: 116.4074,
      endLat: -1.2921, endLng: 36.8219,
      color: "#87CEEB", arcAlt: 0.22, order: 5,
    },
    {
      startLat: 19.4326, startLng: -99.1332,
      endLat: 37.7749, endLng: -122.4194,
      color: "#fda172", arcAlt: 0.27, order: 6,
    },
  ];

  const [showGlobe, setShowGlobe] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGlobe(true);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden">

      <Helmet>
        <title>Contact Pisoft Informatics | IT, Software Solutions, and ERP Services</title>
        <meta
          name="description"
          content="Contact Pisoft Informatics for ERP solutions, custom software and IT services. See how we can provide the digital solutions you need. We are loading to help you!"
        />
        <meta
          name="keywords"
          content="contact Pisoft Informatics, ERP solutions, software development support, IT consulting services, business inquiries, tech support, custom software solutions, IT services contact, digital transformation partner, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/contact" />
        <link rel="canonical" href="https://Pisoftinformatics.com/contact" />
      </Helmet>

      <SocialLinks className="hidden lg:block" />
      <section>
        <div className="fixed -top-9 left-0 w-full z-50 hidden lg:block">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AuthFloatingButtons />
            </motion.div>
          </AnimatePresence>
          <div
            className={`
      flex items-center 
      justify-center lg:justify-end xl:justify-center
         py-2
    `}
          >
            <Navbar className="hidden lg:block" />
            <NavbarDemo />
          </div>
        </div>


        <div className="fixed left-1 -top-2 z-50000 lg:hidden">
          <Navbar />
        </div>
        <div className="fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden">
          <Example />
        </div>
        <div className="block lg:hidden">
          <AuthFloatingButtons />
        </div>


        <div>
          <ScrollButtons />
        </div>

      </section>



      {/* Contact & Globe Section */}
      <section className="flex flex-col md:flex-row pl-3 pt-20 md:pt-30 lg:mt-15 lg:pl-10">
        {/* Left Contact Section */}
        <div className="w-full lg:w-1/2">
          <Fo
          rm />
        </div>

        {/* Right Globe Section */}
        <div className="w-full lg:w-1/2 hidden lg:flex justify-center items-center relative">
          <div className="w-full h-full" style={{ height: "605px", width: "95%" }}>
            {showGlobe ? (
              <World globeConfig={globeConfig} data={data} />
            ) : (
              <div className="w-full h-full flex justify-center items-center text-gray-400 text-sm">
                Loading globe...
              </div>
            )}
          </div>
        </div>

      </section >

      {/* Footer */}
      < section className="w-full mt-10" >
        <Footer />
      </section >
    </div >
  );
}

export default Contact;
