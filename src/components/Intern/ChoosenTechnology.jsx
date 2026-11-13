'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '../Sidebar'
import { motion, AnimatePresence } from 'motion/react'
import AuthFloatingButtons from '../AuthFloatingButtons'
import { cn } from '../../lib/util'
import { useParams, useNavigate } from 'react-router-dom'
import { NavbarDemo } from '../navbar/Navbar2'
import Footer from '../Footer'
import { Example } from '../Corn'
import Navbar from '../Navbar'
import ScrollButtons from '../TopBottomButtons'
import { baseURl } from '../../../baseURL'

export function SidebarDemo() {
  const [open, setOpen] = useState(false)
  const [technologies, setTechnologies] = useState([])
  const [selectedTech, setSelectedTech] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [activeTechId, setActiveTechId] = useState(null)
  const [modalContent, setModalContent] = useState(null)
  const scrollYRef = useRef(0)

  const { id: techId } = useParams()
  const navigate = useNavigate()

  // 1. Initial Fetch - Get Tech and use imagePath directly
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await fetch(`${baseURl}/technologies/modes/OFFLINE`)
        const data = await res.json()

        const formattedData = data.map(item => ({
          label: item.technologyName,
          id: item.id.toString(),
          href: '#',
          iconImage: item.imagePath // Store the image path here
        }))

        setTechnologies(formattedData)
      } catch (err) {
        console.error('Failed to fetch technologies:', err)
      }
    }

    fetchTechnologies()
  }, [])

  // 2. Handle URL Params
  useEffect(() => {
    if (techId && technologies.length > 0) {
      const stringId = techId.toString()
      setActiveTechId(stringId)
      handleTechClick(stringId)
    }
  }, [techId, technologies])

  const handleTechClick = async (techId) => {
    const stringId = techId.toString()
    setActiveTechId(stringId)

    const tech = technologies.find(t => t.id === stringId)
    const techName = tech ? encodeURIComponent(tech.label) : 'Unknown'

    navigate(`/Alltechnologies/${stringId}/${techName}`)

    if (window.innerWidth < 1024) {
      setOpen(false)
    }

    setLoadingDetails(true)
    try {
      const res = await fetch(`${baseURl}/ws-topics/technologies/${stringId}`)
      const data = await res.json()

      const technologyInfo = data[0]?.technology || {}
      const normalizedData = {
        technologyName: technologyInfo.technologyName || 'Unknown',
        description: technologyInfo.description || '',
        topics: data.map(topic => ({
          topicTitle: topic.topic,
          explanation: topic.explanation,
          subTopics: topic.subTopics?.map(sub => ({
            subTopic: sub.subTopic,
            description: sub.explanation
          })) || []
        }))
      }

      setSelectedTech(normalizedData)
    } catch (err) {
      setSelectedTech({
        technologyName: 'Not Available',
        description: 'Please try another Technology.',
        topics: []
      })
    } finally {
      setLoadingDetails(false)
    }
  }

  // Rest of your logic (Modal handling, scroll logic, etc.)
  useEffect(() => {
    if (modalContent) {
      scrollYRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        window.scrollTo(0, scrollYRef.current)
      }
    }
  }, [modalContent])

  const closeModal = () => setModalContent(null)
  const [showAuthButtons, setShowAuthButtons] = useState(true)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <main className='overflow-clip'>
      <div className='relative flex w-full min-h-screen font-INB bg-white'>

        {/* Navigation Layers (Omitted for brevity, same as original) */}
        <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
            <AnimatePresence>
                {showAuthButtons && (
                <motion.div initial={{ opacity: 1, y: 40, x: -50 }} exit={{ opacity: 0, y: -50, x: -50 }} transition={{ duration: 0.3 }}>
                    <AuthFloatingButtons />
                </motion.div>
                )}
            </AnimatePresence>
            <div className='flex items-center justify-center'>
                <Navbar className='hidden lg:block' />
                <NavbarDemo />
            </div>
        </div>
        <div className='fixed lg:top-2 lg:right-4 top-6 right-6 z-50 lg:hidden'><Example /></div>
        <div className='fixed left-2 -top-2 z-50000 lg:hidden'><Navbar /></div>
        {showAuthButtons && <div className='block lg:hidden'><AuthFloatingButtons /></div>}
        <div className='hidden md:block'><ScrollButtons /></div>

        {/* Sidebar */}
        <Sidebar className='min-h-screen mt-5 fixed left-0 top-0' open={open} setOpen={setOpen}>
          <SidebarBody className='py-6 gap-6 z-20 min-h-screen overflow-hidden'>
            <div className='flex flex-col h-full mt-30'>
              <div className='flex-1 mt-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-100'>
                {technologies.length === 0 ? (
                  <p className='text-sm text-white text-center italic'>Loading technologies...</p>
                ) : (
                  technologies.map((tech, idx) => (
                    <SidebarLink
                      key={tech.id}
                      link={{
                        ...tech,
                        icon: (
                          <img
                            src={tech.iconImage || '/default-tech-icon.png'}
                            alt={`Logo for ${tech.label}`}
                            width="40"
                            height="40"
                            className="h-10 w-10 shrink-0 rounded-full object-contain bg-white"
                            onError={(e) => { e.target.src = '/default-tech-icon.png' }}
                          />
                        )
                      }}
                      onClick={e => {
                        e.preventDefault()
                        handleTechClick(tech.id)
                      }}
                      className={cn(
                        'cursor-pointer px-2 py-2 rounded-md transition-all duration-200 text-white flex items-center gap-2',
                        tech.id === activeTechId
                          ? 'bg-orange-100 text-blue-950 font-semibold'
                          : 'hover:bg-orange-100 hover:text-blue-950'
                      )}
                    />
                  ))
                )}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content Area */}
        <main className={cn(
          'flex-1 p-6 pt-10 mt-12 lg:mt-20 ml-5 md:ml-2 overflow-y-auto transition-all duration-300',
          open ? 'overflow-hidden pointer-events-none' : 'overflow-y-auto'
        )}>
          {!selectedTech && !loadingDetails && (
            <div className='text-3xl font-bold text-blue-950 flex text-center mt-20'>
              Select a technology from the sidebar
            </div>
          )}

          {loadingDetails && (
            <p className='text-blue-950 self-center mt-10 italic'>Loading...</p>
          )}

          {selectedTech && !loadingDetails && (
            <motion.div
              key={selectedTech.technologyName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='max-w-6xl mx-auto grid grid-cols-1 gap-6 pb-24'
            >
              <div className='text-xl md:text-2xl lg:text-4xl font-INB text-blue-950 mb-2'
                dangerouslySetInnerHTML={{ __html: selectedTech.technologyName }}
              />
              <p className='text-base md:text-md lg:text-xl font-in text-blue-950 mb-0'
                dangerouslySetInnerHTML={{ __html: selectedTech.description }}
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {selectedTech.topics.map((topic, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className='p-4 bg-blue-950 rounded-lg border border-blue-950 cursor-pointer transition hover:scale-103'
                    // onClick={() =>
                    //   setModalContent({
                    //     type: 'topic',
                    //     title: topic.topicTitle,
                    //     explanation: topic.explanation,
                    //     subTopics: topic.subTopics
                    //   })
                    // }
                  >
                    <div className='text-lg font-in text-orange-400 mb-2'>{topic.topicTitle}</div>
                    <div className='pl-4 border-l border-orange-300'>
                      {topic.subTopics.map((sub, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className='mb-3 cursor-pointer'
                          // onClick={e => {
                          //   e.stopPropagation()
                          //   setModalContent({
                          //     type: 'subtopic',
                          //     title: sub.subTopic,
                          //     explanation: sub.description
                          //   })
                          // }}
                        >
                          <h4 className='text-white font-jS'>{sub.subTopic}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>

        {/* Modal Logic (Omitted for brevity, same as original) */}
        {modalContent && (
             <div className='fixed pt-4 inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-opacity-60 bg-white/30' onClick={closeModal}>
                <motion.div onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className='bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg'>
                    <div className='text-xl font-bold text-blue-950 mb-4'>{modalContent.title}</div>
                    <p className='text-base text-blue-950 whitespace-pre-wrap mb-6' dangerouslySetInnerHTML={{ __html: modalContent.explanation }} />
                    <button onClick={closeModal} className='mt-6 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition'>Close</button>
                </motion.div>
             </div>
        )}
      </div>

      <section className='w-screen overflow-hidden'>
        <Footer />
      </section>
    </main>
  )
}