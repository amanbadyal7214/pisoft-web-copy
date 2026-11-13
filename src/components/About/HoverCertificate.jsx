
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const ROTATION_RANGE = 40;

const TiltCard = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / rect.height) - 0.5) * -ROTATION_RANGE;
    const rY = ((mouseX / rect.width) - 0.5) * ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{
        transformStyle: "preserve-3d",
        transform,
        willChange: "transform",
        perspective: "1000px",
        backfaceVisibility: "hidden",
        isolation: "isolate",
      }}
      className="relative w-full max-w-[450px] sm:max-w-[400px] md:max-w-[580px] h-[250px] sm:h-[280px] md:h-[300px] lg:h-[430px] rounded-xl bg-gradient-to-br from-orange-200 to-orange-500 shadow-xl"
    >
      <motion.div
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="absolute inset-4 sm:inset-5 bg-gradient-to-br from-orange-200 to-orange-400 rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
      >
        <img
          src="/certificate.webp"
          alt="Official website development certificate"
          loading="lazy"
          width='1000'
          height='700'
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 450px, 570px"
          className="w-full max-h-[500px] object-contain rounded-xl"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </motion.div>
    </motion.div>
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
