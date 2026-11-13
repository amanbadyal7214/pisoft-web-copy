import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TiltCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = (e) => setIsLargeScreen(e.matches);
    mediaQuery.addListener(handleResize);

    return () => mediaQuery.removeListener(handleResize);
  }, []);

  const handleClick = () => {
    if (!isLargeScreen) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[540px] h-[180px] sm:h-[220px] md:h-[340px] rounded-xl bg-gradient-to-br from-orange-200 to-orange-500 shadow-xl"
      style={{ perspective: "1000px", cursor: !isLargeScreen ? "pointer" : "default" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full rounded-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={"https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FKangSir_900x900.webp?alt=media&token=8b53bdd4-107e-4b3e-940c-079705a8d159"}
            alt="Our Director P.S Kang is signing an MOU with vice Chancellor of CT University"
            width="400"
            height="400"
            className="w-full h-full object-contain bg-no-repeat rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FHarishSir_900x900.webp?alt=media&token=2ec41a99-6c0e-4167-96f4-01ee57014b57"
            alt="Harish Sir Photo"
            width="400"
            height="400"
            className="w-full h-full object-contain bg-no-repeat rounded-xl"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

const Hover = () => {
  return (
    <div className="w-full flex items-center justify-center pointer-events-auto px-4 sm:px-6 md:px-0">
      <TiltCard />
    </div>
  );
};

export default Hover;
