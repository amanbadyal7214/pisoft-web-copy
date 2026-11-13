import React from "react";
import { motion } from "framer-motion";

const MarqueeItem = ({ images, from, to }) => {
  return (
    <div className="flex MyGradient">
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => (
          <img
            key={`img1-${index}`}
            src={image}
            srcSet={`
              ${image.replace(".jpg", "-480.jpg")} 480w,
              ${image.replace(".jpg", "-720.jpg")} 720w,
              ${image.replace(".jpg", "-960.jpg")} 960w
            `}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 176px"
            alt={`Client logo ${index + 1}`}
            loading="lazy"
            className="w-35 md:w-44 pr-12 lg:pr-20 object-contain"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => (
          <img
            key={`img2-${index}`}
            src={image}
            srcSet={`
              ${image.replace(".jpg", "-480.jpg")} 480w,
              ${image.replace(".jpg", "-720.jpg")} 720w,
              ${image.replace(".jpg", "-960.jpg")} 960w
            `}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 176px"
            alt={`Client logo ${index + 1}`}
            loading="lazy"
            className="w-35 md:w-44 pr-12 lg:pr-20 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeItem;
