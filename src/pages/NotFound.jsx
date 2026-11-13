import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function PageNotFound() {
  const navigate = useNavigate()

  const handleNavigate = (path = '/') => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 text-center">
    
      <Helmet>
        <title>404 Page Not Found | Pisoft Informatics</title>
        <meta name="description" content="Page not Found" />
      </Helmet>

      {/* Lottie Animation */}
      <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8">
        <DotLottieReact
          src="https://lottie.host/25caf977-9bc9-47a6-bc8b-7906df24ee00/Qxws4Gmx2V.lottie"
          loop
          autoplay
          className="h-50"
        />
      </div>

      {/* Main Heading */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-950 mb-4">
        404 - Page Not Found
      </div>

      {/* Subtext */}
      <p className="text-black sm:text-base md:text-lg max-w-xl mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track or explore some useful links below.
      </p>

      {/* Helpful Links Section */}
      <nav className="mb-8">
        <ul className="flex flex-wrap justify-center gap-6 text-blue-950 font-semibold">
          <li>
            <button
              onClick={() => handleNavigate('/')}
              className="hover:underline"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/about')}
              className="hover:underline"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/CareerWithUs')}
              className="hover:underline"
            >
              Careers
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/contact')}
              className="hover:underline"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/Blogs')}
              className="hover:underline"
            >
              Blog
            </button>
          </li>
        </ul>
      </nav>

      {/* CTA Button */}
      <button
        onClick={() => handleNavigate('/')}
        className="inline-block bg-blue-950 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-blue-800 transition duration-300 shadow-md"
      >
        Go to Home Page
      </button>
    </div>
  )
}

export default PageNotFound
