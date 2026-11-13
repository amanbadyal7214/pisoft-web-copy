import {
  useTransform,
  motion,
  useMotionValue,
  AnimatePresence
} from 'framer-motion'
import { useRef, useState } from 'react'
import TiltedCard from './TiltCard'

const Card = ({
  i,
  src,
  cap,
  progress,
  range,
  targetScale,
  url,
  isLast
}) => {
  const containerRef = useRef(null)
  const scale = useTransform(progress, range, [1, targetScale])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHoveringLink, setIsHoveringLink] = useState(false)

  const handleMouseMove = e => {
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={containerRef}
      className="max-h-screen lg:max-h-[75vh] flex items-center justify-center sticky top-0 w-full"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`
        }}
        className={`relative flex flex-col w-full sm:w-[85%] lg:w-[82%] sm:rounded-[20px] overflow-hidden mx-auto ${
          isLast
            ? 'h-[270px] md:h-[430px] lg:h-[300px] xl:h-[655px]'
            : 'h-[270px] md:h-[430px] lg:h-[500px] xl:h-[640px]'
        }`}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 h-[250px] lg:[400px] z-20 cursor-pointer"
          onMouseEnter={() => setIsHoveringLink(true)}
          onMouseLeave={() => setIsHoveringLink(false)}
          onMouseMove={handleMouseMove}
        >
          <motion.div className="absolute inset-0 z-0 pointer-events-none">
            <TiltedCard
              imageSrc={src}
              altText="Background"
              captionText={cap}
              rotateAmplitude={12}
              scaleOnHover={1.1}
              displayOverlayContent={false}
              showMobileWarning={false}
              showTooltip={false}
              containerWidth="100%"
              imageWidth="100%"
            />
          </motion.div>
        </a>
        <AnimatePresence>
          {isHoveringLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                left: mouseX,
                top: mouseY,
                translateX: '-50%',
                translateY: '-120%'
              }}
              className="fixed z-30 bg-black text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 rounded-lg pointer-events-none shadow-lg"
            >
              {url}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Card
