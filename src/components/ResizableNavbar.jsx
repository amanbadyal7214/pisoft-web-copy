'use client'
import { cn } from '../lib/util'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from 'motion/react'

import React, { useRef, useState, useEffect } from 'react'
// import imgscr from "/Pisoft_logo.png";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', latest => {
    setVisible(latest > 100)
  })

  return (
    <motion.div
      ref={ref}
      className={cn('sticky inset-x-0 top-0 z-40 w-full', className)}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  )
}

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'blur(0px)',
        backgroundColor: visible ? '#182B67' : 'rgba(255,255,255,0)',
        color: visible ? '#ffffff' : '#182B67',
        boxShadow: visible
          ? '0 4px 8px rgba(85, 163, 221, 0.4)'
          : '0px 0px 0px rgba(0,0,0,0)'
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.8, 0.25, 1]
      }}
      className={cn(
        'relative z-[60] hidden w-full max-w-[1200px] flex-row items-center justify-center rounded-full py-6 lg:flex mx-auto transition-all duration-500 ease-in-out',
        className
      )}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  )
}

export const NavItems = ({ items, className, onItemClick, visible }) => {
  const [hovered, setHovered] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const dropdownRefs = useRef([])
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname
    const matchedIndex = items.findIndex(item => item.link === currentPath)
    if (matchedIndex !== -1) setActiveIndex(matchedIndex)
  }, [location.pathname, items])

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRefs.current.every(ref => ref && !ref.contains(event.target))
      ) {
        setHovered(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const renderDropdownItems = children => {
    return children.map((child, idx) => {
      const hasSubChildren = child.children && child.children.length > 0

      return (
        <div key={idx} className='relative group text-left'>
          <Link
            to={child.link || '#'}
            onClick={() => {
              setHovered(null)
              onItemClick && onItemClick()
            }}
            className={cn(
              'block px-4 py-2 text-sm font-in hover:bg-orange-300 hover:text-blue-950 rounded-full whitespace-nowrap',
              visible ? 'text-white' : 'text-blue-950'
            )}
          >
            {child.name} {hasSubChildren ? '▸' : ''}
          </Link>
          {hasSubChildren && (
            <div
              className={cn(
                'absolute left-full top-0 mt-1 w-auto rounded-md hover:text-blue-950 shadow-md py-2 z-50 hidden group-hover:block',
                visible ? 'bg-blue-950' : 'bg-white'
              )}
            >
              {renderDropdownItems(child.children)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center text-sm font-in transition duration-200 lg:flex',
        visible ? 'text-white' : 'text-blue-950',
        className
      )}
    >
      {items.map((item, idx) => {
        const isDropdown = item.children && item.children.length > 0
        const isActive = activeIndex === idx
        const isHovered = hovered === idx

        return (
          <div
            key={`link-${idx}`}
            className='relative'
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            ref={el => (dropdownRefs.current[idx] = el)}
          >
            <Link
              to={item.link || '#'}
              onClick={() => {
                setActiveIndex(idx)
                setHovered(null)
                onItemClick && onItemClick()
              }}
              className={cn(
                'relative px-3 xl:px-4 py-2 text-sm cursor-pointer whitespace-nowrap',
                visible ? 'text-white' : 'text-blue-950'
              )}
            >
              {(isHovered || isActive) && (
                <motion.div
                  layoutId='hovered'
                  className={cn(
                    'absolute inset-0 h-full w-full rounded-full bg-orange-300 text-blue-950 z-10',
                    visible ? 'text-blue-950' : 'text-blue-950'
                  )}
                />
              )}
              <span className='relative z-20'>
                {item.name} {isDropdown && '▾'}
              </span>
            </Link>

            {isDropdown && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      'absolute left-0 mt-4 w-70 rounded-md backdrop-blur-xl shadow-xl py-2 z-50 text-center',
                      visible ? 'bg-blue-950' : 'bg-white'
                    )}
                  >
                    {renderDropdownItems(item.children)}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(208, 232, 255, 0.2), 0 1px 1px rgba(0, 0, 0, 0.05)'
          : 'none',
        backgroundColor: visible ? '#0f172a' : '#ffffff',
        color: visible ? '#ffffff' : '#0f172a',
        y: visible ? 20 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50
      }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-6 py-4 lg:hidden',
        visible ? 'bg-blue-950 text-white' : 'bg-white text-blue-950',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-row items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  )
}

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-0 h-full w-full rounded-full bg-[#FFE0B2]',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX className='text-blue-950 text-3xl' onClick={onClick} />
  ) : (
    <IconMenu2 className='text-blue-950 text-3xl' onClick={onClick} />
  )
}

// Optional: Responsive Logo
// export const NavbarLogo = ({ visible }) => {
//     return (
//         <a
//             href="/"
//             className="relative z-20 mr-6 flex px-5 space-x-4 items-center py-3 text-lg font-semibold text-blue-950"
//         >
//             <img
//                 src={imgscr}
//                 alt="logo"
//                 width={visible ? 140 : 200}
//                 height={visible ? 140 : 200}
//                 className="transition-all duration-300 ease-in-out"
//             />
//         </a>
//     );
// };
