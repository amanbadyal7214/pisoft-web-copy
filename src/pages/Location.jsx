import React, { useState, useEffect } from 'react';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import Navbar from '../components/Navbar';
import { Example } from '../components/Corn';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';
import { NavbarDemo } from '../components/navbar/Navbar2';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import { Helmet } from 'react-helmet';

function Location() {
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])


  return (
    <>
      <Helmet>
        <title>IT Internship & Training Locations | Mohali & Chandigarh | Pisoft</title>
        <meta
          name="description"
          content="Find the Pisoft Informatics office in Mohali/Chandigarh for IT training and internship. See how our services are loading future software solutions. Visit our IT Hub today!"
        />
        <meta
          name="keywords"
          content="IT internship Mohali, IT training Chandigarh, Sector 73 Mohali address, SAS Nagar training, Kharar IT institute, Pisoft office location, Mohali IT Hub, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/location" />
        <link rel="canonical" href="https://Pisoftinformatics.com/location" />
      </Helmet>

      <main className='max-w-screen overflow-hidden text-blue-950 font-IN bg-white'>
        <SocialLinks className='hidden lg:block' />
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
          <div className='flex items-center justify-center lg:justify-end xl:justify-center py-2'>
            <Navbar className='hidden lg:block' />
            <NavbarDemo />
          </div>
        </div>
        <div className='fixed left-1 -top-2 z-50 lg:hidden'>
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
        <ScrollButtons />

        <section className='relative lg:mt-35 w-full h-[250px] md:h-[300px] lg:h-[55vh] overflow-hidden'>
          <img
            src='/location1.webp'
            alt='Location'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4'>
            <div className='text-3xl md:text-5xl font-INB text-white mb-2'>
              Our Locations
            </div>
            <p className='text-white text-sm md:text-lg lg:text-xl max-w-xl font-in'>
              Experience the Best Internship/Training Program at your Nearest Tech Hub
            </p>
          </div>
        </section>


        {/* Original Blog Content (Kept for continuity) */}
        <section className='max-w-7xl px-4 mx-auto py-6 pt-9 lg:pt-12 '>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='text-xl md:text-3xl font-INB mb-6 inline-block border-b-2 border-orange-400'
          >
            Wondering Where to start Your Career
          </motion.h2>
          <div className='flex flex-col md:flex-row gap-6 mb-12 p-4 rounded-lg shadow-sm'>
            <img
              src='/location.avif'
              alt='Student thinking about internship location'
              className='w-full h-[400px] md:w-1/2 object-contain rounded'
            />
            <div>
              <div className='text-xl md:text-2xl font-INB mb-2 text-blue-950'>
                Stop Searching: The Best IT Internship/Training Program is Right Here in Mohali
              </div>
              <p className='text-gray-900 text-justify mb-2 font-in leading-loose'>
                <span className='text-blue-950 font-bold font-INB'>Are you a student in Chandigarh, Kharar, or SAS Nagar looking for a transformative internship? </span> You've found the right place. Our office in <u className='text-blue-950'>Sector 73, Mohali </u> is strategically located at the heart of the region's burgeoning <span className='text-blue-950 font-bold font-INB'>IT Hub </span>, making us the most accessible and relevant choice for your professional development. We don't just offer training; we provide a launchpad into the technology sector with programs guaranteed to give you an edge in the competitive job market.
              </p>

              <p className='text-gray-900 text-justify mb-2 font-in leading-loose'>
                <span>Why Pisoft in Mohali is the Best Choice for  <span className='text-blue-950 font-bold font-INB'>Internship/Training: </span></span>
                <br />
                1) <span className='text-blue-950 font-bold font-INB'>Real-World Experience: </span> Move beyond theory. Our programs focus on <span className='text-blue-950 font-bold font-INB'>Live Projects</span> using technologies demanded by top companies in <span className='text-blue-950 font-bold font-INB'>Mohali</span> and the wider <span className='text-blue-950 font-bold font-INB'>IT Hub</span>.
                <br />
                2) <span className='text-blue-950 font-bold font-INB'> Industry-Expert Mentorship:</span> Learn directly from seasoned professionals who are building scalable solutions right here in <span className='text-blue-950 font-bold font-INB'>SAS Nagar, Mohali </span>.
                <br />
                3) <span className='text-blue-950 font-bold font-INB'>Prime Location Advantage:</span> Our <span className='text-blue-950 font-bold font-INB'>Sector 73, Mohali </span> address ensures easy connectivity from surrounding areas, allowing you to focus on your learning without a difficult commute.
              </p>

              <p className='text-gray-900 leading-loose text-justify mb-2 font-in'>
                Don't settle for remote or generic programs. An on-site, immersive internship in a vibrant <span className='text-blue-950 font-bold font-INB'>Mohali IT Hub </span> location like ours is crucial for networking and hands-on skill development. <span className='text-blue-950 font-bold font-INB'>Visit our office today in Sector 73, Mohali, Punjab </span>, and see why Pisoft Informatics is consistently rated the <span className='text-blue-950 font-bold font-INB'>best company </span> for practical and placement-focused <span className='text-blue-950 font-bold font-INB'>IT internship and training in Chandigarh, SAS Nagar, and Kharar </span>. Take control of your career path with us!
              </p>

            </div>
          </div>
        </section>

        <section className='max-w-7xl px-4 mx-auto py-2 lg:py-6'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
          >
            Find Us on Map
          </motion.h2>
          <div className='relative w-full h-[500px] md:h-[550px] overflow-hidden rounded-lg shadow-2xl'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2862.8511191817856!2d76.6920676746608!3d30.716660986410865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffecf9e94a1%3A0xd1eb3732056db4f5!2sPisoft%20Informatics%20Pvt%20Ltd.!5e1!3m2!1sen!2sin!4v1762232039756!5m2!1sen!2sin"
              width="100%"
              height="80%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pisoft Informatics Office Location Map"
            ></iframe>
          </div>
        </section>
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}

export default Location;