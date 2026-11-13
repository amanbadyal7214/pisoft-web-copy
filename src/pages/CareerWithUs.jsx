import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { NavbarDemo } from '../components/navbar/Navbar2';
import { Example } from '../components/Corn';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import { baseURl } from '../../baseURL';

/**
 * Custom HTML Parser using DOMParser + Refined Tailwind Typography Scoping
 */
const renderParsedContent = (htmlString) => {
  if (!htmlString) return null;

  if (typeof window === 'undefined') {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  const baseProseClasses =
    "prose max-w-none text-slate-600 text-sm leading-relaxed space-y-3 " +
    "[&_p]:mb-2.5 [&_p]:text-slate-600 " +
    "[&_strong]:font-INB [&_strong]:text-slate-900 [&_b]:font-INB [&_b]:text-slate-900 " +
    "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ul]:space-y-1 [&_li]:text-slate-600 " +
    "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 " +
    "[&_h1]:text-lg [&_h1]:font-INB [&_h1]:text-slate-900 [&_h1]:mt-4 [&_h1]:mb-2 " +
    "[&_h2]:text-base [&_h2]:font-INB [&_h2]:text-slate-900 [&_h2]:mt-3 [&_h2]:mb-2 " +
    "[&_h3]:text-sm [&_h3]:font-INB [&_h3]:text-slate-800 " +
    "[&_a]:text-orange-600 [&_a]:underline [&_a:hover]:text-orange-700";

  return (
    <div
      className={baseProseClasses}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

/**
 * Extracts clean, plain-text summary for job cards
 */
const getPlainTextSummary = (htmlString) => {
  if (!htmlString) return { summary: 'No description provided.', hasMore: false };

  let text = htmlString;
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    text = doc.body.textContent || '';
  } else {
    text = htmlString.replace(/<\/?[^>]+(>|$)/g, '');
  }

  text = text.replace(/\s+/g, ' ').trim();
  const words = text.split(' ');

  if (words.length <= 22) {
    return { summary: text, hasMore: false };
  }

  return {
    summary: words.slice(0, 22).join(' ') + '...',
    hasMore: true,
  };
};

/**
 * Job Details Drawer Component - Right Side Drawer with Scroll
 */
function JobDrawer({ job, onClose, onApply }) {
  useLayoutEffect(() => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  if (!job) return null;

  const drawerUI = (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative z-10 bg-white border-l border-slate-200 text-slate-800 h-full w-full max-w-2xl shadow-2xl flex flex-col"
      >
        {/* Fixed Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/80 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-INB px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 border border-orange-200/60">
                {job.department || 'General'}
              </span>
              {job.numberOfVacancy && (
                <span className="text-xs font-INB px-2.5 py-1 rounded-md bg-slate-200/60 text-slate-600">
                  {job.numberOfVacancy} Openings
                </span>
              )}
            </div>
            <h2 className="text-2xl font-INB text-slate-900 tracking-tight">{job.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer text-xl"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div
          className="p-6 overflow-y-auto overscroll-contain font-in flex-1 min-h-0 space-y-4"
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
        >
          {renderParsedContent(job.description)}

          {/* Criteria & Specs Section */}
          <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-600 mt-6">
            {job.responsibilities?.length > 0 && (
              <p>
                <strong className="font-INB text-slate-800">Selection Criteria:</strong>{' '}
                {job.responsibilities.join(', ')}
              </p>
            )}
            <div className="flex flex-wrap gap-6 pt-1">
              <p>
                <strong className="font-INB text-slate-800">Experience:</strong>{' '}
                {job.experience} Years
              </p>
              <p>
                <strong className="font-INB text-slate-800">Education:</strong>{' '}
                {job.educationLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-INB text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(job.vacancyId);
            }}
            className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-INB text-sm shadow-sm transition-all cursor-pointer"
          >
            Apply for this Role
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(drawerUI, document.body) : null;
}

/**
 * Job Card Component
 */
function CareerCard({ job, onOpenModal, onApply }) {
  const { summary, hasMore } = getPlainTextSummary(job.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200 h-full group"
    >
      <div>
        {/* Department & Vacancies Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-INB px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 border border-orange-200/60">
            {job.department || 'General'}
          </span>
          {job.numberOfVacancy && (
            <span className="text-xs font-INB text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {job.numberOfVacancy} Openings
            </span>
          )}
        </div>

        <h3 className="text-lg font-INB mb-2 text-slate-900 group-hover:text-orange-600 transition-colors">
          {job.title}
        </h3>

        {/* Truncated Summary */}
        <p className="text-sm font-in text-slate-600 mb-4 leading-relaxed">
          {summary}
          {hasMore && (
            <button
              onClick={() => onOpenModal(job)}
              className="text-orange-600 hover:text-orange-700 ml-1.5 font-INB text-xs hover:underline cursor-pointer focus:outline-none"
            >
              Read details →
            </button>
          )}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-5">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-INB text-[10px] uppercase tracking-wider">Experience</span>
            <span className="font-INB text-slate-700">{job.experience} Yrs</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="block text-slate-400 font-INB text-[10px] uppercase tracking-wider">Education</span>
            <span className="font-INB text-slate-700 truncate block">{job.educationLevel}</span>
          </div>
        </div>

        <button
          onClick={() => onApply(job.vacancyId)}
          className="w-full bg-slate-900 hover:bg-orange-500 text-white font-INB py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 cursor-pointer text-sm"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}

function CareerWithUs() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`${baseURl}/vacancies`);
        const data = await response.json();

        const formatted = data.map((job) => ({
          title: job.jobTitle || 'Not specified',
          description: job.description || '',
          responsibilities:
            job.vacancyCiteriaList?.map((vc) => vc.selectionCriteria?.criteriaName).filter(Boolean) || [],
          experience: job.experienceLevel?.experienceLevelName || '0 - 5',
          educationLevel: job.educationLevel?.educationLevelName || 'Unknown',
          department: job.department?.department || '',
          numberOfVacancy: job.numberOfVacancy || null,
          vacancyId: job.id,
        }));

        setCareers(formatted);
      } catch (err) {
        console.error('Failed to fetch careers', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const handleApply = (vacancyId) => {
    navigate('/applyforCareer', { state: { vacancyId } });
  };

  return (
    <>
      <Helmet>
        <title>Careers at Pisoft Informatics | Current Job Openings</title>
        <meta
          name="description"
          content="Explore current job openings at Pisoft Informatics. Join our dynamic team of software developers, designers, and tech innovators."
        />
        <meta
          name="keywords"
          content="Pisoft Informatics careers, current job openings, software development jobs, IT careers India"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/CareerWithUs" />
        <link rel="canonical" href="https://Pisoftinformatics.com/CareerWithUs" />
      </Helmet>

      <div className="max-w-screen min-h-screen bg-slate-50/70 flex flex-col justify-between">
        <div>
          <SocialLinks className="hidden lg:block" />

          {/* Desktop Navbars */}
          <div className="fixed -top-9 left-0 w-full z-50 hidden lg:block">
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

            <div className="flex items-center justify-end lg:justify-end xl:justify-center px-2 py-1">
              <Navbar className="hidden lg:block" />
              <NavbarDemo />
            </div>
          </div>

          {/* Mobile Navbars */}
          <div className="fixed left-1 -top-2 z-50 lg:hidden">
            <Navbar />
          </div>
          <div className="fixed top-4 right-4 z-50 max-w-[90%] sm:max-w-none lg:hidden">
            <Example />
          </div>
          {showAuthButtons && (
            <div className="block lg:hidden">
              <AuthFloatingButtons />
            </div>
          )}

          <ScrollButtons />

          {/* Header Banner */}
          <main className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
            <div className="text-center mb-12 lg:mb-16">
              <span className="text-xs font-INB uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60 inline-block mb-3">
                Join Our Team
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-INB text-slate-900 tracking-tight mb-4">
                Current Job Openings
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Build the future of software and technological innovation with us. Explore our open positions below.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-9 w-9 border-2 border-slate-300 border-t-orange-500"></div>
              </div>
            ) : careers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200/80 max-w-md mx-auto">
                <p className="text-slate-500 font-INB text-sm">No active job vacancies at the moment. Please check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {careers.map((job) => (
                  <CareerCard
                    key={job.vacancyId}
                    job={job}
                    onOpenModal={(selected) => setSelectedJob(selected)}
                    onApply={handleApply}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Drawer Overlay Component */}
        <AnimatePresence>
          {selectedJob && (
            <JobDrawer
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onApply={handleApply}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="w-full bg-white mt-16 border-t border-slate-200/80">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default CareerWithUs;