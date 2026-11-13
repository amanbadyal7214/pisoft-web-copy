import React from 'react'
import EG1 from "/EG1.webp"
import eg2 from "/eg2.webp"
import HOE1 from "/HOE1.webp"
import hoe2 from "/hoe2.webp"
import LP1 from "/LP1.webp"
import LP2 from "/lp2.webp"
import SE1 from "/SE1.webp"
import SE2 from "/se2.webp"
import PE1 from "/PE1.webp"
import PE2 from "/pe2.avif"
import ra1 from "/ra1.webp"
import ra2 from "/ra2.webp"
import CO1 from "/CO1.webp"
import CO2 from "/CO2.webp"
import TC1 from "/TC1.webp"
import TC2 from "/TC2.webp"

import { Timeline } from './timeline'

export function TimelineDemo () {
  const data = [
    {
      title: 'Expert Guidance',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 sm:text-sm text-justify dark:text-blue-950'>
            Throughout your internship at our software development company in
            Mohali, our experienced professionals will mentor you at every step,
            sharing valuable insights and knowledge to help you navigate the IT
            services landscape. You’ll gain hands-on experience in a real-world
            setting, honing your skills effectively.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[4/3] max-h-48 w-full overflow-hidden rounded-lg shadow-md'>
              <img
                src={EG1}
                alt='Expert guidance 1'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>{' '}
            <div className='aspect-[4/3] max-h-48 w-full overflow-hidden rounded-lg shadow-md'>
              <img
                src={eg2}
                alt='Expert guidance 2'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Hands-On Experience',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Engage directly with live projects in web & mobile app development
            and custom software development. This immersive experience is
            invaluable for building confidence and competence in your chosen
            field.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-md'>
              <img
                src= {HOE1}
                alt='Hands-On Experience 1'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-md'>
              <img
                src= {hoe2}
                alt='Hands-On Experience 2'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Live Project',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Our internship program for software developers in Mohali offers the
            opportunity to work on live projects, which you can showcase or
            submit to your college or university. This practical experience will
            significantly enhance your portfolio and academic credentials.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src={LP1}
                alt='live project 1'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src= {LP2}
                alt='live project 2'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Skill Enhancement',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            We are dedicated to your professional development in the IT services
            industry. Our program focuses on enhancing your aptitude,
            communication, and other essential skills to ensure you become a
            highly employable candidate.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
               src ={SE1}
               alt='skill enhancement 1'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
               src ={SE2}
                alt='skill enhancement 2'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Path to full time employment',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Exceptional interns who demonstrate their skills and commitment
            during our internship program software development Mohali may be
            considered for full-time positions, providing a seamless transition
            from intern to employee.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={PE1}
               alt='Path to full time employment 1'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={PE2}
                alt='Path to full time employment 2'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Recognition and rewards',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Outstanding performance during your internship may earn you the
            “Best Intern Award,” recognizing your hard work and dedication. This
            accolade will boost your professional profile as you advance in your
            career.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={ra1}
                alt='Recognition and rewards 1'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={ra2}
                alt='Recognition and rewards 2'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Certificate Opportunities',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Interning with us allows you to earn two prestigious certifications:
            one for successfully completing your internship and another as an
            experience certificate, adding significant value to your resume.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={CO1}
                alt='Certificate Opportunities 1'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={CO2}
                alt='Certificate Opportunities 2'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Team Collaboration',
      content: (
        <div>
          <p className='mb-8 md:text-xl font-in text-blue-950 text-justify sm:text-sm dark:text-blue-950'>
            Experience working in a collaborative team environment, enhancing
            your teamwork and interpersonal skills, which are vital in any
            workplace.
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={TC1}
                alt='Team Collaboration 1'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='aspect-[16/9] max-h-60 overflow-hidden rounded-lg shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]'>
              <img
                src ={TC2}
                alt='Team Collaboration 2'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      )
    }
  ]
  return (
    <div className='relative w-full'>
      <Timeline data={data} />
    </div>
  )
}
