import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const dummyProjects = [
  {
    id: 6,
    category: 'Website',
    caption: 'red',
    description: 'blue',
    website_url: 'https://www.pisoftinformatics.com/',
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx',
  },

  {
    id: 7,
    category: 'Website',
    caption: 'red',
    description: 'blue',
    website_url: 'https://www.pisoftinformatics.com/',
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx',
  }, {
    id: 8,
    category: 'Website',
    caption: 'red',
    description: 'blue',
    website_url: 'https://www.pisoftinformatics.com/',
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx',
  },
  {
    id: 6,
    category: 'Website',
    caption: 'red',
    description: 'blue',
    website_url: 'https://www.pisoftinformatics.com/',
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787372983/CaseStudies/Images/ftrl78qn9eke0fpnbern.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787372984/CaseStudies/Docs/case_study_1787372984218-950770228.docx',
  },
  {
    id: 5,
    category: 'Website',
    caption: 'Test',
    description: 'Test',
    website_url: '',
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787373029/CaseStudies/Images/ur85zamgxxve1afz4eks.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787373030/CaseStudies/Docs/case_study_1787373030107-311028188.docx',
  },
  {
    id: 4,
    category: 'Portal',
    caption: 'xfdgxdfghdf',
    description: 'zsdgfsdgsdfh',
    website_url: null,
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290343/CaseStudies/Images/y0asvwght4njeklmxf66.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290343/CaseStudies/Docs/case_study_1787290341636-107446393.docx',
  },
  {
    id: 3,
    category: 'Portal',
    caption: 'dfjfghjgdf',
    description: 'xhjkhukft',
    website_url: null,
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290239/CaseStudies/Images/fwrqttgc1lt5ziokii6h.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290239/CaseStudies/Docs/case_study_1787290237589-13503753.docx',
  },
  {
    id: 2,
    category: 'App',
    caption: 'zdsfjhk',
    description: 'dgfh',
    website_url: null,
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787290035/CaseStudies/Images/mljnwdb6k4vuokkksjdu.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787290035/CaseStudies/Docs/case_study_1787290033452-629295466.docx',
  },
  {
    id: 1,
    category: 'ERP',
    caption: 'stdkl;',
    description: 'sfhjghj',
    website_url: null,
    image_url: 'https://res.cloudinary.com/dh3bnwlaj/image/upload/v1787289647/CaseStudies/Images/g3qosl6tani7hqlykuta.jpg',
    file_path: 'https://res.cloudinary.com/dh3bnwlaj/raw/upload/v1787289643/CaseStudies/Docs/case_study_1787289638876-126438062.docx',
  },
];

// Duplicate dummy projects so we have enough items per category (at least 8)
const expandedDummyProjects = [
  ...dummyProjects,
  ...dummyProjects.map(p => ({ ...p, id: p.id + 10 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 20 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 30 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 40 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 50 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 60 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 70 })),
  ...dummyProjects.map(p => ({ ...p, id: p.id + 80 })),
];

const ClientProjects = ({ filterCategory, showAll = false }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: 'All Projects' },
    { id: 'Website', label: 'Website Application' },
    { id: 'App', label: 'Mobile App' },
    { id: 'Portal', label: 'Portal' },
    { id: 'ERP', label: 'ERP Solution' }
  ];

  const projectsToRender = showAll
    ? (activeTab === 'All' ? dummyProjects : dummyProjects.filter(p => p.category === activeTab))
    : (filterCategory ? expandedDummyProjects.filter(p => p.category === filterCategory) : expandedDummyProjects).slice(0, 9);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], [100, -300]);

  return (
    <section ref={containerRef} className="py-4 overflow-hidden bg-slate-50/30">

      <div className="w-full overflow-hidden mb-8 whitespace-nowrap">
        <motion.div
          style={{ x: xTransform }}
          className="text-4xl md:text-5xl font-INB text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-900 tracking-tighter uppercase flex items-center space-x-8"
        >
          <span>OUR PROJECTS </span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS </span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
          <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
           <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
           <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
           <span className="text-blue-300 mx-4">•</span>
          <span>OUR PROJECTS</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4">
        {showAll && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-INB text-xs md:text-sm transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-blue-950 border border-blue-100 hover:bg-blue-50 shadow-sm'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Asymmetric Tight Grid Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 md:gap-3 space-y-2 md:space-y-3">
          {projectsToRender.map((project, index) => {
            9            // Distinct dynamic ratios for true asymmetry
            const aspectRatios = [
              'aspect-[4/5]',
              'aspect-[16/10]',
              'aspect-[3/4]',
              'aspect-[8/9]',
              'aspect-square',
            ];
            const currentAspect = aspectRatios[index % aspectRatios.length];
            const isStaggered = index % 2 === 0 ? 'md:translate-y-2' : 'md:-translate-y-2';

            return (
              <motion.div
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                viewport={{ once: true, margin: '-30px' }}
                className={`relative group break-inside-avoid rounded-xl border-2 border-slate-200/80 hover:border-[#F07C22] bg-white p-1 transition-all duration-300 transform hover:shadow-xl ${isStaggered}`}
              >
                {/* Background Image (Original with Asymmetric Frame Fit) */}
                <div className={`w-full overflow-hidden rounded-lg ${currentAspect} relative bg-slate-900 flex items-center justify-center`}>
                  <img
                    src={project.image_url}
                    alt={project.caption || 'Project'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Category Pill Tag */}
                  {project.category && (
                    <span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase rounded border border-white/20">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Hover Effect Container (UNCHANGED) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none flex justify-center items-center">

                  {/* Dimmed Background */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

                  {/* Pop Out Card */}
                  <div className="relative w-[85%] h-[85%] border-[6px] border-[#F07C22] shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500 pointer-events-auto overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.caption || 'Project'}
                      className="w-full h-full object-cover"
                    />

                    {/* Dark Overlay & Action Buttons */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-3">
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-[#3b5fe3] text-white rounded-full font-INB text-xs md:text-sm shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                        >
                          Visit Website
                        </a>
                      )}
                      {project.file_path && (
                        <a
                          href={project.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-full font-INB text-xs md:text-sm shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                        >
                          View Case Study
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {!showAll && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate(filterCategory ? `/all-projects?category=${encodeURIComponent(filterCategory)}` : '/all-projects')}
            className="px-8 py-3 bg-blue-950 text-white font-INB rounded-full hover:bg-blue-900 border-2 border-transparent hover:border-[#F07C22] transition-all shadow-lg"
          >
            SHOW MORE
          </button>
        </div>
      )}
    </section>
  );
};

export default ClientProjects;