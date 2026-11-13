import React from 'react'

const BloomrStyleCard = ({
  subtitle,
  title,
  description,
  url,
  videosrc,
  bgClass
}) => {
  // Fix: Firebase URLs already have a '?' so we must use '&' for additional params
  const srcSet = `
    ${videosrc}&w=480 480w,
    ${videosrc}&w=768 768w,
    ${videosrc}&w=1200 1200w
  `;

  return (
    <div
      className={`
        ${bgClass} 
        rounded-3xl sm:rounded-[60px]
        p-2 sm:p-6 md:p-5
        shadow-xl
        flex flex-col items-center
        w-full h-full
        transition-all duration-300
        border border-gray-200
        overflow-clip
      `}
    >
      {/* Image */}
      <img
        src={videosrc}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 100vw,
               1200px"
        alt="bgBloom"
        loading="lazy"
        className="w-full h-[160px] sm:h-[200px] md:h-[220px] lg:h-[250px] xl:h-[250px] rounded-3xl object-cover shadow-2xl"
      />

      {/* CONTENT */}
      <div
        className={`
          w-full text-center mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 text-white
        `}
      >
        {/* SUBTITLE */}
        <div className='text-sm sm:text-base md:text-md lg:text-2xl font-jsB uppercase mb-2'>
          <h1>{subtitle}</h1>
        </div>

        {/* TITLE */}
        <div className='text-sm sm:text-base md:text-md lg:text-xl font-jsB  mb-3'>
          {title}
        </div>

        {/* DESCRIPTION */}
        <p className='text-base sm:text-sm md:text-base lg:text-md xl:text-lg '>
          {description}
        </p>
      </div>
    </div>
  )
}

export default BloomrStyleCard