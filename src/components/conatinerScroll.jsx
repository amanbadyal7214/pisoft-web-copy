"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.975", "start 0.025"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleRange = isMobile ? [1.10,1.05] : [1.05, 1.02];

  // Apply easing to transform values
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [20, 0]), {
    stiffness: 50,
    damping: 20,
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], scaleRange), {
    stiffness: 50,
    damping: 20,
  });

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    {
      stiffness: 100,
      damping: 20,
    }
  );

  return (
    <div
      className="h-auto relative w-full scroll-smooth"
      ref={containerRef}
    >
      <div
        className="mt-18 w-full relative"
        style={{
          perspective: "1200px",
        }}
      >

        <Card
          rotate={rotate}
          scale={scale}
          translateY={translateY}
          isMobile={isMobile}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Card = ({ rotate, scale, translateY, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY,
      }}
      className={`
        max-w-5xl
        mx-auto
        border-4 border-[#6C6C6C]
        p-2 sm:p-4 md:p-6
        bg-[#222222]
        rounded-[30px]
        shadow-2xl
        h-[20rem] sm:h-[30rem] lg:h-[40rem]
        w-full
        transition-transform duration-300 ease-out
      `}
    >
      <div className="h-[100%] w-full rounded-2xl bg-transparent overflow-scroll lg:overflow-clip scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {children}
      </div>
    </motion.div>
  );
};
