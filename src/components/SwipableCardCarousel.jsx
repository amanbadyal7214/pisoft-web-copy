import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Dbutton from './Dbutton'
import RotatingText from './RotatingText'
import { baseURl } from '../../baseURL'
import CodeSnippetCompiler, { LANGUAGE_MAP } from './CodeSnippetCompiler'

const hoverStyles = [
  'bg-orange-400 text-black border-orange-300',
  'bg-orange-400 text-black border-orange-300',
  'bg-orange-400 text-black border-orange-300',
  'bg-orange-400 text-black border-orange-300'
]

export default function SwipableCardCarousel () {
  const [cards, setCards] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  const handlePrev = () => swiperRef.current?.slidePrev()
  const handleNext = () => swiperRef.current?.slideNext()

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const prevBodyOverflow = document.body.style.overflow
      const prevHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'

      // Freeze Lenis smooth scroll instance so background page cannot scroll
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop()
      }

      return () => {
        document.body.style.overflow = prevBodyOverflow
        document.documentElement.style.overflow = prevHtmlOverflow
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.start()
        }
      }
    }
  }, [isModalOpen])

  // Allow closing modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${baseURl}/blogs`)
        const data = await response.json()
        // console.log('Fetched API data:', data)

        const normalized = data.map(b => ({
          title: b.name,
          author: b.authorName,
          time: b.blogDate,
          link: b.link || `#/blog/${b.id}`,
          fullContent: b.content || 'Full content not available.',
          techName: b.techName || b.technology || b.category || 'javascript'
        }))

        setCards(normalized)
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }

    fetchBlogs()
  }, [])

  // Extract clean plain text for carousel card previews
  const getCleanPreviewText = (htmlString) => {
    if (!htmlString) return ''
    try {
      let text = htmlString
        .replace(/\\u003c/gi, '<')
        .replace(/\\u003e/gi, '>')
        .replace(/\\u0026/gi, '&')
        .replace(/\\r\\n/gi, ' ')
        .replace(/\\n/gi, ' ')
      if (typeof window !== 'undefined') {
        const doc = new DOMParser().parseFromString(text, 'text/html')
        return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
      }
      return text.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim()
    } catch {
      return htmlString.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim()
    }
  }

  // Content Renderer tailored for blog HTML structure
  const renderParsedContent = (htmlString, techName) => {
    if (!htmlString) return null

    // 1. Normalize unicode escapes and line breaks
    let cleanHtml = htmlString
    if (cleanHtml.includes('\\u003C') || cleanHtml.includes('\\u003c') || cleanHtml.includes('\\u003E') || cleanHtml.includes('\\u003e')) {
      cleanHtml = cleanHtml
        .replace(/\\u003c/gi, '<')
        .replace(/\\u003e/gi, '>')
        .replace(/\\u0026/gi, '&')
        .replace(/\\r\\n/gi, '\n')
        .replace(/\\n/gi, '\n')
    }
    cleanHtml = cleanHtml.replace(/\r\n/g, '\n')

    if (typeof window === 'undefined') {
      return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    }

    // 2. Parse into DOM and clean up editor quirks
    const parser = new DOMParser()
    const doc = parser.parseFromString(cleanHtml, 'text/html')

    // Clean up links: ensure target="_blank" and remove clashing copy-pasted backgrounds
    doc.querySelectorAll('a').forEach(a => {
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
      if (
        a.style.backgroundColor === 'rgb(255, 255, 255)' ||
        a.style.backgroundColor === '#ffffff' ||
        a.style.backgroundColor === 'white'
      ) {
        a.style.backgroundColor = 'transparent'
      }
    })

    // Remove empty paragraphs or <p><br></p> that introduce massive vertical gaps
    doc.querySelectorAll('p').forEach(p => {
      if (!p.textContent.trim() && !p.querySelector('img, video, iframe, code, pre')) {
        p.remove()
      }
    })

    const parsedHtml = doc.body.innerHTML
    const snippetElements = Array.from(doc.querySelectorAll('.pi-code-snippet'))

    const baseProseClasses =
      "prose prose-slate max-w-none text-[15px] sm:text-base text-slate-800 leading-relaxed " +
      // Paragraphs & Body
      "[&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-slate-800 " +
      "[&_div]:leading-relaxed " +
      "[&_span]:leading-relaxed " +
      // Bold & Underline (acting as section headers in the blog)
      "[&_strong]:font-INB [&_strong]:font-bold [&_strong]:text-slate-900 " +
      "[&_b]:font-INB [&_b]:font-bold [&_b]:text-slate-900 " +
      "[&_u]:underline [&_u]:decoration-orange-500 [&_u]:decoration-2 [&_u]:underline-offset-4 " +
      // Headings
      "[&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-INB [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:leading-snug " +
      "[&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-INB [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-2.5 [&_h2]:leading-snug " +
      "[&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-INB [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_h3]:mb-2 " +
      "[&_h4]:font-INB [&_h4]:font-semibold [&_h4]:text-slate-900 " +
      // Links
      "[&_a]:text-orange-600 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-orange-700 hover:[&_a]:decoration-2 transition-all " +
      // Lists (Nested sub-bullets & spacing)
      "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1.5 " +
      "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1.5 " +
      "[&_li]:leading-relaxed [&_li]:text-slate-800 " +
      "[&_li>ul]:list-[circle] [&_li>ul]:pl-5 [&_li>ul]:my-1.5 [&_li>ul]:space-y-1 " +
      "[&_li>ul>li>ul]:list-[square] [&_li>ul>li>ul]:pl-5 " +
      // Inline code
      "[&_code]:bg-slate-100 [&_code]:text-orange-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono [&_code]:border [&_code]:border-slate-200 " +
      // Pre / Code Snippets
      "[&_pre]:bg-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:border [&_pre]:border-slate-200 [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:border-none " +
      // Subscript / Superscript
      "[&_sup]:text-xs [&_sup]:font-semibold [&_sup]:text-slate-600 " +
      "[&_sub]:text-xs [&_sub]:font-semibold [&_sub]:text-slate-600 " +
      // Font tag & CMS editor classes
      "[&_font]:text-inherit [&_font]:leading-relaxed " +
      "[&_.BodyCopy]:leading-relaxed " +
      // Tables
      "[&_table]:w-full [&_table]:border-collapse [&_table]:my-5 " +
      "[&_th]:border [&_th]:border-gray-300 [&_th]:bg-slate-100 [&_th]:p-2.5 [&_th]:text-left [&_th]:font-sans [&_th]:font-semibold " +
      "[&_td]:border [&_td]:border-gray-300 [&_td]:p-2.5 [&_td]:leading-normal " +
      // Images
      "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-4"

    if (snippetElements.length === 0) {
      return (
        <div
          className={`${baseProseClasses} mb-8 pb-8`}
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      )
    }

    const defaultLangId =
      LANGUAGE_MAP[(techName || 'javascript').toLowerCase()] || 71

    const blocks = []
    let currentHtml = parsedHtml

    snippetElements.forEach((snippetEl, index) => {
      const outerHtml = snippetEl.outerHTML
      let splitIdx = currentHtml.indexOf(outerHtml)
      let matchLen = outerHtml.length

      if (splitIdx === -1) {
        const snippetMatch = currentHtml.match(
          /<(?:\w+)[^>]*class="[^"]*pi-code-snippet[^"]*"[\s\S]*?<\/(?:\w+)>/i
        )
        if (snippetMatch) {
          splitIdx = snippetMatch.index
          matchLen = snippetMatch[0].length
        }
      }

      if (splitIdx !== -1) {
        const preHtml = currentHtml.substring(0, splitIdx)
        if (preHtml.trim()) {
          blocks.push(
            <div
              key={`html-${index}`}
              className={baseProseClasses}
              dangerouslySetInnerHTML={{ __html: preHtml }}
            />
          )
        }

        const labelEl = snippetEl.querySelector('.snippet-lang-label')
        const codeEl = snippetEl.querySelector('code')

        const label = labelEl ? labelEl.textContent : ''
        let codeText = codeEl ? codeEl.innerHTML : snippetEl.textContent

        codeText = codeText
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim()

        blocks.push(
          <CodeSnippetCompiler
            key={`snippet-${index}`}
            initialCode={codeText}
            label={label}
            defaultLangId={defaultLangId}
            techName={techName}
          />
        )

        currentHtml = currentHtml.substring(splitIdx + matchLen)
      }
    })

    if (currentHtml.trim()) {
      blocks.push(
        <div
          key="html-tail"
          className={baseProseClasses}
          dangerouslySetInnerHTML={{ __html: currentHtml }}
        />
      )
    }

    return <div className="mb-8 pb-8">{blocks}</div>
  }

  return (
    <div className='relative w-full'>
      {/* Heading */}
      <div className='flex justify-center sm:justify-start pl-0 sm:pl-5 mb-6 sm:mb-8 md:mb-10'>
        <div className='text-3xl sm:text-4xl md:text-5xl mr-2 font-INB mt-1 sm:mt-2'>
          Latest
        </div>
        <RotatingText
          texts={['Insights', 'Blogs', 'Cases']}
          mainClassName='px-1 sm:px-2 md:px-2 text-3xl sm:text-4xl md:text-5xl font-INB bg-[#f07c22] text-white overflow-hidden py-0.5 sm:py-0.9 md:py-1 justify-center rounded-lg'
          staggerFrom='last'
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.025}
          splitLevelClassName='overflow-hidden pb-0.5 sm:pb-0.9 md:pb-1'
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>

      {/* Description & CTA */}
      <div className='flex flex-col sm:flex-row items-center text-justify justify-between mb-6 sm:mb-8'>
        <p className='mt-10 font-in text-base text-justify sm:text-lg md:text-xl font-normal leading-normal text-black tracking-wider'>
          Stay ahead of the curve with our expert analysis, industry trends, and
          actionable advice. Our blog offers fresh perspectives on the
          challenges and opportunities in the tech landscape, helping you make
          informed decisions and drive innovation within your organization.
        </p>
        <div className='m-5 relative z-10'>
          <Dbutton />
        </div>
      </div>
      {/* Swiper Carousel */}
      {cards.length > 0 && (
        <Swiper
          spaceBetween={25}
          slidesPerView='auto'
          className='!overflow-visible'
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 8 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 }
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} style={{ height: 'auto', width: '100px' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-2 shadow-md transition-all duration-300 flex flex-col justify-between h-full w-full overflow-hidden ${
                  hoveredIndex === index
                    ? hoverStyles[index % hoverStyles.length]
                    : 'bg-blue-950 text-white'
                }`}
              >
                <div className='flex flex-col justify-between h-full p-4'>
                  <div>
                    <p
                      className={`inline-flex items-center mb-3 px-4 py-2 text-sm font-INB rounded-full transition-all duration-300 shadow-md self-start ${
                        hoveredIndex === index
                          ? 'bg-white text-black'
                          : 'bg-[#e38724] text-white'
                      } hover:scale-110`}
                    >
                      {card.author || '5 min read'}
                    </p>
                    <div className='font-in text-lg sm:text-xl mb-2'>
                      {card.title}
                    </div>

                    <p className='text-sm text-white/80 font-in line-clamp-3 leading-relaxed'>
                      {getCleanPreviewText(card.fullContent)}
                    </p>
                  </div>

                  {/* CTA */}
                  {card.link && (
                    <button
                      onClick={() => {
                        setModalContent(card)
                        setIsModalOpen(true)
                      }}
                      className={`mt-6 inline-flex items-center px-4 py-2 text-sm font-jS rounded-full transition-all duration-300 shadow-md self-start ${
                        hoveredIndex === index
                          ? 'bg-white text-black'
                          : 'bg-[#f07c22] text-white'
                      } hover:scale-105`}
                    >
                      Read More
                      <ArrowUpRight size={16} className='ml-2' />
                    </button>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {isModalOpen && modalContent && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 md:p-8 overflow-hidden'
          onClick={() => setIsModalOpen(false)}
          onWheel={e => e.stopPropagation()}
        >
          <motion.div
            data-lenis-prevent
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='relative flex flex-col w-full max-w-5xl h-[88vh] max-h-[88vh] min-h-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'
            onClick={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
          >
            {/* Pinned Sticky Header - Always visible at top */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0 z-20'>
              <div className='pr-4 overflow-hidden'>
                <h2 className='text-lg sm:text-2xl font-bold font-INB text-slate-900 truncate leading-snug'>
                  {modalContent.title}
                </h2>
                <div className='flex items-center gap-2 text-xs sm:text-sm text-orange-600 font-INB mt-0.5'>
                  <span>{modalContent.time}</span>
                  {modalContent.author && (
                    <>
                      <span className='text-gray-400'>•</span>
                      <span className='text-slate-600 font-normal'>By {modalContent.author}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Close Button: Fixed on top header, stays clickable even after scrolling */}
              <button
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition cursor-pointer shrink-0 ml-2'
                aria-label='Close modal'
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Modal Content Area */}
            <div
              data-lenis-prevent
              className='flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 bg-white'
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {renderParsedContent(modalContent.fullContent, modalContent.techName)}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Navigation + Pagination */}
      {cards.length > 0 && (
        <div className='flex justify-between items-center mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6'>
          <div className='flex items-center gap-2'>
            {cards.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                  i === activeIndex ? 'bg-orange-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              onClick={handlePrev}
              className='bg-orange-400 hover:bg-gray-300 p-1.5 sm:p-2 rounded-full'
              aria-label='arrow left'
            >
              <ArrowLeft size={10} className='text-white size-8' />
            </button>
            <button
              onClick={handleNext}
              className='bg-orange-400 hover:bg-gray-300 p-1.5 sm:p-2 rounded-full'
              aria-label='arrow right'
            >
              <ArrowRight size={10} className='text-white size-8' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
