'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '../../lib/util'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className
}) => {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  // Track touch for distinguishing scroll vs tap
  const touchStartX = useRef(0)

  useEffect(() => {
    addAnimation()
  }, [])

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current.appendChild(duplicatedItem)
      })
      getSpeed()
      setStart(true)
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        fast: '35s',
        normal: '40s',
        slow: '45s'
      }
      containerRef.current.style.setProperty(
        '--animation-duration',
        speedMap[speed] || '40s'
      )
    }
  }

  const openModal = item => {
    setActiveItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setActiveItem(null)
    setIsModalOpen(false)
  }

  const scrollByAmount = 320 + 24

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollByAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollByAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleTouchStart = e => {
    if (pauseOnHover) setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e, item) => {
    if (pauseOnHover) setIsPaused(false)
    const touchEndX = e.changedTouches[0].clientX
    const diffX = Math.abs(touchEndX - touchStartX.current)

    // If swipe was small, treat it as tap
    if (diffX < 10) {
      openModal(item)
    }
  }

  return (
    <>
      <div className='relative'>
        <div
          ref={containerRef}
          className={cn(
            'scroller z-10 max-w-screen overflow-x-auto py-5 lg:[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]',
            className
          )}
        >
          <ul
            ref={scrollerRef}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            className={cn(
              'flex w-max min-w-full shrink-0 flex-nowrap gap-6 px-6',
              start && 'animate-scroll-right-to-left',
              isPaused && 'paused'
            )}
          >
            {items.map(item => (
              <li
                key={item.id || item.name}
                onClick={() => openModal(item)}
                onTouchStart={handleTouchStart}
                onTouchEnd={e => handleTouchEnd(e, item)}
                className='relative w-[320px] max-w-full shrink-0 rounded-[1.5rem] sm:rounded-[1.7rem] bg-blue-950 px-6 py-5 md:w-[470px] shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105 hover:bg-[#e38724] cursor-pointer'
              >
                <blockquote className='flex flex-col justify-between h-full'>
                  <p className='text-white text-base md:text-lg font-jS leading-relaxed mb-4'>
                    “{item.quote.slice(0, 160).trim()}...”
                  </p>
                  <span className='text-sm text-zinc-50 underline'>
                    Read full feedback →
                  </span>
                  <div className='mt-6 border-t border-gray-200 pt-2'>
                    <span className='block font-semibold text-white text-md'>
                      {item.name}
                    </span>
                    {item.rating && (
                      <span className='block text-zinc-50 text-md'>
                        ⭐ {item.rating}/5
                      </span>
                    )}
                  </div>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-blue-950/30'>
            <div className='relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] p-6 sm:p-8 border border-orange-200 overflow-y-auto'>
              <button
                onClick={closeModal}
                className='absolute top-3 right-4 text-orange-400 text-2xl font-bold hover:text-orange-500'
                aria-label='Close'
              >
                &times;
              </button>
              <div className='text-2xl sm:text-3xl font-INB text-orange-400 mb-3'>
                Feedback from {activeItem?.name}
              </div>
              <p className='text-blue-950 font-in leading-relaxed'>
                {activeItem?.quote}
              </p>
              {activeItem?.rating && (
                <p className='text-sm text-blue-800 mt-4'>
                  ⭐ <span className='font-semibold'>{activeItem.rating}</span>/5
                </p>
              )}
              <div className='mt-6 flex justify-end'>
                <button
                  onClick={closeModal}
                  className='px-5 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 font-medium transition'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Arrow Buttons */}
        <button
          onClick={scrollLeft}
          aria-label='Scroll Left'
          className='absolute -left-10 top-1/2 -translate-y-1/2 z-20'
        >
          <ChevronLeft
            size={10}
            className='text-blue-950 size-10 hover:text-orange-500'
          />
        </button>
        <button
          onClick={scrollRight}
          aria-label='Scroll Right'
          className='absolute -right-10 top-1/2 -translate-y-1/2 z-20'
        >
          <ChevronRight
            size={10}
            className='text-blue-950 size-10 hover:text-orange-500'
          />
        </button>

        {/* Scrollbar Styling and Animation */}
        <style>{`
          .scroller::-webkit-scrollbar {
            height: 8px;
          }
          .scroller::-webkit-scrollbar-track {
            background: transparent;
          }
          .scroller::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 4px;
          }

          .scroller {
            scrollbar-width: thin;
            scrollbar-color: white transparent;
          }

          @keyframes scrollRightToLeft {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50% - 0.75rem));
            }
          }

          .animate-scroll-right-to-left {
            animation: scrollRightToLeft var(--animation-duration, 40s) linear infinite;
          }

          .paused {
            animation-play-state: paused !important;
          }
        `}</style>
      </div>
    </>
  )
}