'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/util'

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null)

  const handleClick = card => {
    setSelected(card)
  }

  const handleClose = () => {
    setSelected(null)
  }

  return (
    <div className='w-full text-center md:h-[550px] h-[300px] grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-cols-2 max-w-7xl mx-auto gap-2 md:gap-4 relative px-2 sm:px-4 md:px-6 '>
      {cards.map((card, i) => (
        <div key={card.id || i} className={cn(card.className, '')}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              'relative overflow-hidden text-center bg-white rounded-xl h-full w-full cursor-pointer'
            )}
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Overlay */}
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-30 z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] flex items-center justify-center max-w-3xl bg-blue-400 rounded-lg shadow-2xl overflow-hidden'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div
                className='relative flex justify-center items-center text-center h-full w-full bg-blue-950 bg-opacity-60 p-4
                scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-auto max-h-[80vh]'
              >
                <div className='absolute top-2 right-2 text-center'>
                  <button
                    onClick={handleClose}
                    className='text-white text-2xl font-in hover:text-gray-300'
                    aria-label='layout'
                  >
                    &times;
                  </button>
                </div>
                <div className='text-white w-full flex items-center justify-center text-center'>
                  {selected.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

const ImageComponent = ({ card }) => {
  return (
    <div className='relative h-full flex justify-center items-center w-full group cursor-pointer'>
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        className='object-cover absolute inset-0 h-full w-full transition duration-200'
        alt={card.alt || 'thumbnail'}
      />
      <div className='absolute inset-0 text-center flex items-center justify-center bg-orange-300 bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none z-20'>
        <span className='text-blue-950 font-INB text-2xl text-center'>
          {card.title}
        </span>
      </div>
    </div>
  )
}
