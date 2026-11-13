import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import Navbar from '../components/Navbar';
import { Example } from '../components/Corn';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';
import { NavbarDemo } from '../components/navbar/Navbar2';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import { baseURl } from '../../baseURL';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaUser, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa6';
import { Helmet } from 'react-helmet';

function Blogs() {
  const navigate = useNavigate();

  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [categoryPage, setCategoryPage] = useState(0);
  const categoriesPerPage = 7;

  const API_URL = `${baseURl}/blogs`;

  // Function to create a URL-friendly slug
  const createSlug = (name) => {
    return name
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Handler to navigate to the dedicated blog page
  const handleBlogClick = (blog) => {
    const technologySlug = createSlug(blog.blogTechnology?.technologyName || 'uncategorized');
    const blogId = blog.id;
    navigate(`/blogs/${technologySlug}/${blogId}`);
  };

  // useEffect(() => {
  //   const handleScroll = () => setShowAuthButtons(window.scrollY <= 100);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        setBlogs(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Removed the useEffect for body scroll locking as we are using dedicated pages now.

  const latestBlogs = blogs
    .slice()
    .sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate))
    .slice(0, 3);

  const trendingBlogs = blogs
    .slice()
    .sort(
      (a, b) => (b.blogComments?.length || 0) - (a.blogComments?.length || 0)
    )
    .slice(0, 5);

  const getRandomBlogs = (array, num) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const todayHighlights = getRandomBlogs(blogs, 6);

  const recentTwo = blogs
    .slice()
    .sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate))
    .slice(0, 2);

  const categories = [
    ...new Set(
      blogs.map(b => b.blogTechnology?.technologyName || 'Uncategorized')
    ),
  ];

  const paginatedCategories = categories.slice(
    categoryPage * categoriesPerPage,
    (categoryPage + 1) * categoriesPerPage
  );

  if (loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95'>
        <DotLottieReact
          src='https://lottie.host/4ce43db8-2aa2-4617-96f0-aad2bb51dc7b/0FITZztajf.lottie'
          loop
          autoplay
          className='h-20 w-20'
        />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <Helmet>
        <title>Tech Blogs | Software, AI, ERP, and IT Insights by Pisoft Informatics</title>
        <meta
          name="description"
          content="Read Pisoft Informatics' expert tech blogs on software development, AI, cybersecurity, and ERP solutions. Get key services and insights into how we are loading the future of IT."
        />
        <meta
          name="keywords"
          content="AI/ML blog, software development blogs, audio redaction, data compliance, IT security, AI in software, tech innovation, IT consulting insights, cloud computing, latest technology trends, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/Blogs" />
        <link rel="canonical" href="https://Pisoftinformatics.com/Blogs" />
      </Helmet>

      <main className='max-w-screen overflow-hidden text-blue-950 font-IN bg-white'>
        {/* Social + Nav components */}
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

        {/* Banner */}
        <section className='relative lg:mt-35 w-full h-[250px] md:h-[300px] lg:h-[55vh] overflow-hidden'>
          <img
            src='/BlogBanner.webp'
            alt='Descriptive title of the blog post'
            width="1400"
            height="787"
            className='w-full h-full object-cover'
            loading="lazy"
          />
          <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4'>
            <div className='text-3xl md:text-5xl font-INB text-white mb-2'>
              <h1>Our Blogs</h1>
            </div>
            <p className='text-white text-sm md:text-lg lg:text-xl max-w-xl font-in'>
              Explore news, insights, and technical guides on audio redaction and
              compliance.
            </p>
          </div>
        </section>

        <section className='max-w-7xl mx-auto py-12 grid grid-cols-1 px-4 lg:grid-cols-3 gap-12'>
          {/* === FEATURED POSTS === */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
            >
              Featured Blogs
            </motion.div>

            {/* Main Featured Post */}
            {latestBlogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='flex flex-col md:flex-row gap-4 mb-8 bg-white hover:scale-102 transition-all transform ease-in-out border-gray-400 shadow-lg shadow-blue-300 p-4 rounded-xl cursor-pointer'
                onClick={() => handleBlogClick(latestBlogs[0])}
              >
                <img
                  src={`data:${latestBlogs[0].imageType};base64,${latestBlogs[0].blogPhoto}`}
                  alt={latestBlogs[0].name}
                  width="600"
                  height="400"
                  className='w-full md:w-1/2 h-50 object-cover rounded-lg'
                  loading="eager"
                />
                <div className='flex flex-col justify-between'>
                  <div>
                    <div className='text-xl font-INB mb-2'>
                      {latestBlogs[0].name}
                    </div>
                    <p className='text-gray-900 mb-2'>
                      {latestBlogs[0].content
                        ?.replace(/<[^>]+>/g, '')
                        .slice(0, 100)}
                      ...
                    </p>
                    <div className='text-sm text-gray-900 flex items-center gap-4 flex-wrap'>
                      <span className='flex items-center gap-2'>
                        <FaUser className='text-blue-900' />{' '}
                        {latestBlogs[0].authorName}
                      </span>
                      <span className='flex items-center gap-2'>
                        <FaCalendarAlt className='text-blue-900' />{' '}
                        {latestBlogs[0].blogDate}
                      </span>
                      <span className='flex items-center gap-2'>
                        <FaClock className='text-blue-900' /> 6min read
                      </span>
                    </div>
                  </div>
                  <button
                    className='bg-blue-950 text-white py-2 px-3 rounded-md hover:bg-blue-800 transition-all ease-in-out hover:text-white text-sm mt-2 w-fit'
                    onClick={(e) => { e.stopPropagation(); handleBlogClick(latestBlogs[0]); }}
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            )}

            {/* Other Featured Posts */}
            <div className='grid md:grid-cols-2 gap-6'>
              {latestBlogs.slice(1).map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='flex gap-4 bg-white border hover:scale-105 border-gray-200 shadow-lg shadow-orange-200 rounded-xl p-3 hover:shadow-lg transition cursor-pointer'
                  onClick={() => handleBlogClick(post)}
                >
                  <img
                    src={`data:${post.imageType};base64,${post.blogPhoto}`}
                    alt={post.name}
                    width="96"
                    height="96"
                    className='w-24 h-24 object-contain rounded'
                    loading="lazy"
                  />
                  <div className='flex flex-col justify-between'>
                    <div>
                      <h4 className='font-in text-lg'>{post.name}</h4>
                      <div className='text-sm text-gray-900 flex items-center gap-2 mt-2 flex-wrap'>
                        <span className='flex items-center gap-2'>
                          <FaUser className='text-blue-900' /> {post.authorName}
                        </span>
                        <span className='flex items-center gap-2'>
                          <FaCalendarAlt className='text-blue-900' />{' '}
                          {post.blogDate}
                        </span>
                        <span className='flex items-center gap-2'>
                          <FaClock className='text-blue-900' /> 6min read
                        </span>
                      </div>
                    </div>
                    <button
                      className='bg-blue-950 text-white py-2 hover:scale-105 px-3 rounded-md hover:bg-blue-800 transition-all ease-in-out hover:text-white text-sm mt-2 w-fit'
                      onClick={(e) => { e.stopPropagation(); handleBlogClick(post); }}
                    >
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* === TRENDING POSTS === */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
            >
              Trending
            </motion.div>
            <ol className='space-y-7 p-3 space-x-2 bg-white border hover:scale-105 border-gray-200 shadow-lg shadow-blue-300 rounded-xl hover:shadow-lg transition'>
              {trendingBlogs.map((blog, index) => (
                <li key={index} className='flex gap-4 items-start'>
                  <span className='text-2xl font-INB text-blue-950'>
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <div>
                    <p
                      className='font-INB cursor-pointer text-blue-950 hover:underline'
                      onClick={() => handleBlogClick(blog)}
                    >
                      {blog.name}
                    </p>
                    <p className='text-sm text-gray-900'>
                      {blog.authorName} | in{' '}
                      <span className='font-in'>
                        {blog.blogTechnology?.technologyName || 'Uncategorized'}{' '}
                      </span> {blog.blogDate} | 6min read
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* === HIGHLIGHT SECTION === */}
        <section className='max-w-7xl px-4 mx-auto py-12'>
          {/* Horizontal Featured */}
          <div className='flex flex-col md:flex-row gap-6 mb-12'>
            <img
              src='/BlogBanner2.webp'
              alt='Descriptive featured tip image'
              width="774"
              height="516"
              className='w-full h-[300px] md:w-1/2 object-contain rounded'
              loading="lazy"
            />
            <div>
              <div className='text-xl md:text-2xl font-INB mb-2'>
                Your Blog Posts are Boring: 3 Tips for Making Your Writing More
                Interesting
              </div>
              <p className='text-gray-900 leading-normal text-justify mb-2'>
                1) If your blog posts are putting readers to sleep, it’s time to
                shake things up. Start strong with a hook that grabs attention
                immediately—skip the slow intros and get to the point.
              </p>
              <p className='text-gray-900 leading-normal text-justify mb-2'>
                2) Telling stories is another powerful way to connect; people
                remember narratives more than facts or tips. Keep your tone
                conversational.
              </p>
              <p className='text-gray-900 leading-normal text-justify mb-2'>
                3) Use short paragraphs, bullet points, and bold text to make it
                easy to scan. Don’t forget to add visuals—images, GIFs, or even
                quick charts make things more engaging.
              </p>
              <p className='text-sm text-gray-900 mt-3'>
                Priyanka Sharma | August 28, 2025 | 2 min read
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
          >
            Today's Highlights
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {todayHighlights.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className='flex gap-4 bg-white border border-gray-200 shadow-md shadow-orange-100 rounded-xl p-3 cursor-pointer hover:shadow-lg transition'
                onClick={() => handleBlogClick(post)}
              >
                <img
                  src={`data:${post.imageType};base64,${post.blogPhoto}`}
                  alt={post.name}
                  width="96"
                  height="96"
                  className='w-24 h-24 object-contain rounded-lg'
                  loading="lazy"
                />
                <div className='flex flex-col justify-between'>
                  <h4 className='font-in text-base font-semibold text-blue-950'>
                    {post.name}
                  </h4>
                  <p className='text-sm text-gray-800 mt-1'>
                    in{' '}
                    <span className='font-in'>
                      {post.blogTechnology?.technologyName || 'Uncategorized'}
                    </span>
                  </p>
                  <div className='text-sm text-gray-900 flex items-center gap-2 mt-2 flex-wrap'>
                    <span className='flex items-center gap-2'>
                      <FaUser className='text-blue-900' /> {post.authorName}
                    </span>
                    <span className='flex items-center gap-2'>
                      <FaCalendarAlt className='text-blue-900' /> {post.blogDate}
                    </span>
                    <span className='flex items-center gap-2'>
                      <FaClock className='text-blue-900' /> 6min read
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className='max-w-7xl flex flex-col lg:flex-row px-4 mx-auto gap-8 py-12'>
          {/* Left: Most Recent Posts */}
          <div className='flex-1'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
            >
              Most Recent Posts
            </motion.div>
            <div className='space-y-8'>
              {recentTwo.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.2 }}
                  className='flex flex-row gap-4 cursor-pointer hover:bg-shadow-300 hover:scale-103 hover:shadow-lg bg-white border-gray-400 shadow-md shadow-blue-200 p-4 rounded-lg transition'
                  onClick={() => handleBlogClick(post)}
                >
                  <div className='flex-1'>
                    <p className='text-xl text-orange-500 uppercase font-in mb-1'>
                      {post.blogTechnology?.technologyName || 'Uncategorized'}
                    </p>
                    <div className='text-lg font-INB mb-2'>{post.name}</div>
                    <p className='text-md text-gray-900 mb-1'>
                      {post.content?.replace(/<[^>]+>/g, '').slice(0, 80)}...
                    </p>
                    <div className='text-sm text-gray-900 flex items-center gap-4 flex-wrap'>
                      <span className='flex items-center gap-2'>
                        <FaUser className='text-blue-900' /> {post.authorName}
                      </span>
                      <span className='flex items-center gap-2'>
                        <FaCalendarAlt className='text-blue-900' />{' '}
                        {post.blogDate}
                      </span>
                      <span className='flex items-center gap-2'>
                        <FaClock className='text-blue-900' /> 6min read
                      </span>
                    </div>
                  </div>
                  <img
                    src={`data:${post.imageType};base64,${post.blogPhoto}`}
                    alt={post.name}
                    width="160"
                    height="112"
                    className='w-40 h-28 object-contain rounded'
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div className='w-full lg:w-1/3'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className='text-2xl md:text-3xl font-INB mb-6 border-b-2 border-orange-400 inline-block'
            >
              Categories
            </motion.div>

            <ul className='space-y-4 p-3 space-x-2 bg-white border hover:scale-105 border-gray-200 shadow-lg shadow-orange-200 rounded-xl hover:shadow-lg transition'>
              {paginatedCategories.map((cat, i) => {
                // * FIX: Define isActive here *
                const isActive = activeCat === cat;

                const filteredPosts = blogs.filter(
                  blog =>
                    (blog.blogTechnology?.technologyName || 'Uncategorized') ===
                    cat
                );

                return (
                  <li key={i}>
                    <div
                      className={`flex items-center gap-2 text-lg font-in text-blue-950 cursor-pointer hover:text-orange-500 transition duration-200 ${isActive ? 'font-bold' : ''
                        }`}
                      onClick={() => setActiveCat(isActive ? null : cat)}
                    >
                      <FaAngleRight className='text-blue-950' />
                      {cat}
                    </div>

                    {/* Subcategory Blog Titles */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className='pl-6 mt-3 space-y-2 overflow-hidden list-disc'
                        >
                          {filteredPosts.map(post => (
                            <motion.li
                              key={post.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className='flex items-center gap-2 text-base text-blue-950 hover:text-orange-600 cursor-pointer'
                              onClick={() => handleBlogClick(post)}
                            >
                              <FaAngleDown className='text-blue-950' />
                              {post.name}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <div className='flex justify-between mt-4'>
              {categoryPage > 0 && (
                <button
                  className='text-blue-900 hover:text-orange-500 font-semibold'
                  onClick={() => setCategoryPage(prev => Math.max(prev - 1, 0))}
                >
                  ← Previous
                </button>
              )}
              {(categoryPage + 1) * categoriesPerPage < categories.length && (
                <button
                  className='text-blue-900 hover:text-orange-500 font-semibold ml-auto'
                  onClick={() =>
                    setCategoryPage(prev =>
                      (prev + 1) * categoriesPerPage < categories.length
                        ? prev + 1
                        : prev
                    )
                  }
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </section>

        {/* The Blog Drawer section is entirely removed */}

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}

export default Blogs;