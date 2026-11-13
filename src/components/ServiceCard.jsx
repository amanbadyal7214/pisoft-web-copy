import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { baseURl } from '../../baseURL'

const ITEMS_PER_PAGE = 7

export default function AccordionMenu () {
  const [services, setServices] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const toggle = index => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseURl}/FAQs/OFFLINE`)
        const data = await response.json()
        setServices(data)
      } catch (err) {
        console.error('Error fetching services:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) return <div className='text-center p-10'>Loading...</div>
  if (error) return <div className='text-center p-10 text-red-600'>{error}</div>

  // Pagination Logic
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedServices = services.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setActiveIndex(null)
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setActiveIndex(null)
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 mt-15 lg:mt-0'>
      {/* Header */}
      <div className='text-center mb-6'>
        <div className='font-INB text-[3vh] sm:text-[3.5vh] md:text-[5vh] text-black tracking-wide'>
          You Might Be <span className='text-[#F07C22]'>Wondering…</span>
        </div>
      </div>

      {/* FAQ Items */}
      <div className='space-y-4 px-1'>
        {paginatedServices.map((item, index) => {
          const isActive = index === activeIndex

          return (
            <motion.div
              key={item.id}
              onClick={() => toggle(index)}
              className='cursor-pointer rounded-md bg-gray-100 shadow-sm transition-colors duration-300'
            >
              {/* Question Header */}
              <div className='flex justify-between items-center py-1.5 px-4 sm:px-6'>
                <div
                  className={`font-in text-base sm:text-md md:text-lg font-medium ${
                    isActive ? 'text-[#F07C22]' : 'text-gray-800'
                  }`}
                >
                  {item.question}
                </div>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={isActive ? { rotate: 45 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className='text-gray-400 hover:text-sky-600'
                >
                  {isActive ? (
                    <ArrowUpRight className='w-5 h-5 sm:w-6 sm:h-6 text-sky-600' />
                  ) : (
                    <Plus className='w-6 h-6 sm:w-7 sm:h-7' />
                  )}
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {isActive && item.answer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className='overflow-hidden px-4 sm:px-6 pb-4'
                  >
                    <p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {/* Pagination Controls */}
      <div className='flex justify-between items-center mt-6 px-1 sm:px-2'>
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className='px-4 py-2 rounded-xl bg-blue-950 text-white font-medium'
          >
            Previous
          </button>
        )}

        <div className='flex-1' />

        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className='px-4 py-2 rounded-xl bg-blue-950 text-white font-medium ml-auto'
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
