import React from 'react'
import { useState, useEffect } from 'react'
import { baseURl } from '../../baseURL'
import { InfiniteMovingCards } from './Intern/infiniteCards'

function Testimonial () {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${baseURl}/testimonials`)
        const data = await res.json()

        const formattedData = data
          .filter(item => item.isApproved)
          .map(item => ({
            name: item.name,
            quote: item.feedback,
            image: item.dp
              ? item.dp.startsWith('data:')
                ? item.dp
                : `data:image/gif;base64,${item.dp}`
              : item.tempDp,
            rating: item.rating
          }))

        setTestimonials(formattedData)
      } catch (err) {
        console.error('Failed to fetch testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <div style={{ minHeight: '250px' }}>
      {loading || testimonials.length === 0 ? (
        <div className='flex justify-center items-center py-10'>
          <div className='animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500'></div>
          <p className='ml-4 text-lg text-blue-950'>Loading Testimonials...</p>
        </div>
      ) : (
        <InfiniteMovingCards
          items={testimonials}
          direction='right'
          speed='slow'
        />
      )}
    </div>
  )
}

export default Testimonial
