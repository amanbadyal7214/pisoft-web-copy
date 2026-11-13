import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BlurText from '../BlurText'
import { useNavigate } from 'react-router-dom'
import { baseURl } from '../../../baseURL'

function Technology() {
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await fetch(`${baseURl}/technologies/modes/OFFLINE`)
        const data = await res.json()

        const formattedData = data.map(item => ({
          id: item.id,
          technologyName: item.technologyName,
          description: item.description,
          image: item.imagePath
        }))

        setTechnologies(formattedData)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch technologies:', err)
        setLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  return (
    <div className='overflow-clip'>
      {/* Header */}
      <section className='w-full flex flex-col items-start bg-transparent sm:px-2 ml-5 py-4 lg:py-1 mb-3'>
        <BlurText
          text='Explore Our Technologies'
          className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-in text-[#F07C22] leading-tight text-left sm:text-center'
          delay={110}
          duration={0.7}
          ease='power3.out'
          splitType='chars'
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin='-100px'
        />
        <p className='mt-4 px-2 text-base md:text-xl lg:text-2xl text-blue-950'>
          In the first few months, you'll immerse yourself in advanced
          technologies, mastering as per the need of IT industry.
        </p>
      </section>

      {/* Tech Grid */}
      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
          <p className='ml-4 text-xl text-blue-950'>Loading Technologies...</p>
        </div>
      ) : (
        <section className='w-screen max-w-7xl mx-auto z-10 flex flex-wrap justify-center items-center'>
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-7 mb-5 '>
            {technologies.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                onClick={() =>
                  navigate(
                    `/Alltechnologies/${item.id}/${encodeURIComponent(item.technologyName)}`
                  )
                }
                whileHover={{ scale: 1.02 }}
                className='group cursor-pointer rounded-2xl p-[2px] bg-gradient-to-br from-gray-500 via-gray-100 to-gray-50 shadow-md shadow-blue-950 hover:shadow-xl transition-all duration-200 ease-in-out'
              >
                <div className='bg-gradient-to-br from-sky-50 via-white to-gray-50 rounded-2xl flex flex-col items-center justify-center w-[6rem] h-[6rem] lg:w-[10rem] lg:h-[10rem]'>
                  <motion.img
                    src={item.image || '/default-tech-icon.png'}
                    whileHover={{ scale: 1.25, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className='object-contain h-12 w-12 mb-1'
                    alt={item.technologyName}
                    onError={(e) => { e.target.src = '/default-tech-icon.png' }} // Fallback if URL is broken
                  />

                  <p className='text-[0.7rem] lg:text-[1.2rem] text-blue-950 font-INB mt-2 text-center px-1'>
                    {item.technologyName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Technology