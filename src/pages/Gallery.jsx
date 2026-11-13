import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Example } from '../components/Corn'
import { NavbarDemo } from '../components/navbar/Navbar2'
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import Footer from '../components/Footer'
import BlurText from '../components/BlurText'
import ScrollButtons from '../components/TopBottomButtons'
import SocialLinks from '../components/SocialLinks'
import { baseURl } from '../../baseURL'
import { Helmet } from 'react-helmet'

// Gallery Image component
function PhotoThumb({ src, alt, onClick }) {
  return (
    <motion.div
      className='rounded overflow-hidden cursor-pointer'
      whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(0,0,0,0.2)' }}
      onClick={() => onClick(src)}
    >
      <img
        src={src}
        width="1024"
        height="768"
        className="w-full h-48 object-cover"
        loading="lazy"
      />
    </motion.div>
  )
}

export default function Gallery() {
  const [galleryData, setGalleryData] = useState({})
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [photosByDate, setPhotosByDate] = useState([]) // <-- array!
  const [modalPhoto, setModalPhoto] = useState(null)
  const [modalInfo, setModalInfo] = useState({ title: '', description: '' }) // <-- initialized
  const [showAuthButtons, setShowAuthButtons] = useState(true)

  // Show/hide auth buttons on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // Fetching & organizing gallery data
  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetch(`${baseURl}/gallery`)
        const arr = await res.json()
        const grouped = {}

        arr.forEach(item => {
          const yr = item.financialYear?.name
          const ev = item.eventType?.leadGeneratedFrom
          const date = item.name
          const photo = `${baseURl}/gallery-resources/galleries/${item.id}`
          const desc = item.description || item.eventType?.description || ''

          if (!yr || !ev || !date) return

          grouped[yr] = grouped[yr] || {}
          grouped[yr][ev] = grouped[yr][ev] || {}
          grouped[yr][ev][date] = grouped[yr][ev][date] || {
            photos: [],
            description: desc
          }
          grouped[yr][ev][date].photos.push(photo)
        })

        setGalleryData(
          Object.keys(grouped)
            .sort((a, b) => b - a)
            .reduce((acc, yr) => {
              acc[yr] = grouped[yr]
              return acc
            }, {})
        )
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      }
    })()
  }, [])

  return (
    <div className='max-w-screen overflow-hidden text-center'>
      <Helmet>
        <title>Photo Gallery - Memorable Moments | Pisoft Informatics</title>
        <meta
          name="description"
          content="Browse Pisoft Informatics' photo gallery featuring memorable moments, company events, team activities, and milestones organized by year and event type. Relive our journey through vivid images and detailed event descriptions."
        />
        <meta
          name="keywords"
          content="photo gallery, company events photos, memorable moments, event photos by year, Pisoft Informatics gallery, corporate event pictures, team activities photos, company milestones photos"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/OurGallery" />
        <link rel="canonical" href="https://Pisoftinformatics.com/OurGallery" />
      </Helmet>

      <SocialLinks className='hidden lg:block' />
      {/* === Top Bar === */}
      <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
        <AnimatePresence>
          {showAuthButtons && (
            <motion.div
              initial={{ opacity: 1, y: 40, x: -50 }}
              exit={{ opacity: 0, y: -50, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AuthFloatingButtons />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flex row: Navbar + NavbarDemo */}
        <div
          className={`
          flex items-center 
          justify-end lg:justify-end xl:justify-center
          px-2 py-1
        `}
        >
          <Navbar className='hidden lg:block' />
          <NavbarDemo />
        </div>
      </div>

      <div className='fixed left-1 -top-2 z-50000 lg:hidden'>
        <Navbar />
      </div>
      <div className='fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden'>
        <Example />
      </div>
      {showAuthButtons && (
        <div className='block lg:hidden'>
          <AuthFloatingButtons />
        </div>
      )}

      <div>
        <ScrollButtons />
      </div>

      {/* === Heading === */}
      <section className='justify-center items-center flex flex-col px-6 md:px-12 mt-20 md:mt-30 lg:mt-30'>
        <div className='text-center flex flex-col justify-center items-center text-lg md:text-2xl font-Cr lg:text-4xl font-bold text-blue-950 mb-8 leading-snug'>
          <h1><BlurText
            text=' Some Memorable Moments'
            delay={200}
            animateBy='words'
            direction='top'
            className='text-center'
          /></h1>
        </div>
        <div className='max-w-7xl md:flex justify-center items-center gap-2 px-2 hidden'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className='relative rounded-[15px] hover-scale-110 transform transition-all shadow-lg  shadow-orange-300 duration-300 lg:h-140 lg:w-250'
            style={{
              backgroundImage: `url('scroll7.webp')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
      </section>

      <section className='lg:pt-12 max-w-7xl mx-auto text-center mb-6'>
        <div className='text-xl md:text-2xl lg:text-3xl font-bold text-blue-950 mb-8'>
          Journey Through the Years
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {Object.keys(galleryData).map(yr => (
            <motion.div key={yr} className='relative group' whileHover='hover'>
              {/* Button */}
              <motion.button
                onClick={() => {
                  setSelectedYear(yr)
                  setSelectedEvent(null)
                  setSelectedDate(null)
                  setPhotosByDate([])
                  setModalInfo({ title: '', description: '' })
                }}
                whileHover={{ scale: 1.05 }}
                className={`px-5 py-2 rounded-4xl shadow-md whitespace-nowrap ${selectedYear === yr
                  ? 'bg-blue-950 text-white shadow-black'
                  : 'bg-white border-3 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white'
                  } transition-colors duration-200`}
              >
                {yr}
              </motion.button>

              {/* Tooltip Below */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                variants={{
                  hover: { opacity: 1, y: 10, transition: { duration: 0.2 } }
                }}
                className='absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-base md:text-lg px-4 py-2 rounded-md shadow-xl pointer-events-none z-10 whitespace-nowrap'
              >
                View events for {yr}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Event Selector */}
      {selectedYear && (
        <section className='mb-6 max-w-7xl mx-auto'>
          <div className='flex flex-wrap justify-center gap-3'>
            {Object.keys(galleryData[selectedYear]).map(ev => (
              <motion.button
                key={ev}
                onClick={() => {
                  setSelectedEvent(ev)
                  setSelectedDate(null)
                  setPhotosByDate([])
                  setModalInfo({ title: '', description: '' })
                }}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-4xl shadow-md whitespace-nowrap ${selectedEvent === ev
                  ? 'bg-blue-950 text-white shadow-black'
                  : 'bg-white text-blue-950 border-3 border-blue-950 hover:bg-blue-950 hover:text-white'
                  } transition-all duration-300`}
              >
                {ev}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Date Selector */}
      {selectedYear && selectedEvent && (
        <section className='mb-6 max-w-7xl mx-auto'>
          <div className='flex flex-wrap justify-center gap-4'>
            {Object.entries(galleryData[selectedYear][selectedEvent]).map(
              ([dt, { photos, description }]) => (
                <motion.button
                  key={dt}
                  onClick={() => {
                    setSelectedDate(dt)
                    setPhotosByDate(photos || [])
                    setModalInfo({ title: dt, description: description || '' })
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-4xl shadow-md whitespace-nowrap ${selectedDate === dt
                    ? 'bg-blue-950 text-white shadow-black'
                    : 'bg-white text-blue-950 border-3 border-blue-950 hover:bg-blue-950 hover:text-white'
                    } transition-all duration-300`}
                >
                  {dt} ({photos.length})
                </motion.button>
              )
            )}
          </div>
        </section>
      )}

      {/* Photos Display */}
      {selectedDate && (
        <section className='px-4 md:px-8 py-8 max-w-7xl mx-auto'>
          <div className='shadow-lg rounded-xl overflow-hidden border border-gray-300'>
            {/* Description on Top */}
            <div className='p-6 border-b border-gray-200 bg-blue-50'>
              <div className='text-xl font-semibold text-blue-900 mb-2'>
                {modalInfo?.title || 'No title'}
              </div>
              <p className='text-gray-800'>
                {modalInfo?.description || 'No description available.'}
              </p>
            </div>

            {/* Photos Below */}
            <div className='p-6'>
              <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {photosByDate.map((src, idx) => (
                  <PhotoThumb
                    key={idx}
                    src={src}
                    alt={`Photo ${idx + 1}`}
                    onClick={src => {
                      setModalPhoto(src)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Photo Modal */}
      <AnimatePresence>
        {modalPhoto && (
          <motion.div
            className='fixed inset-0 bg-white/20 backdrop-blur-2xl bg-opacity-80 z-50 flex items-center justify-center'
            onClick={() => setModalPhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='relative p-6 rounded-3xl max-w-7xl'
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setModalPhoto(null)}
                className='absolute top-9 right-9 text-black hover:text-gray-700 text-2xl font-bold'
                aria-label='Close'
              >
                &times;
              </button>

              <img
                src={modalPhoto}
                alt="Selected"
                className="w-full max-h-[90vh] h-auto rounded-xl"
              />

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='mt-22'>
        <Footer />
      </div>
    </div>
  )
}
