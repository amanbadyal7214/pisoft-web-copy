import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaUser,
    FaCalendarAlt,
    FaClock,
    FaAngleRight,
    FaFire,
    FaFilter,
    FaReply,
    FaAngleDown
} from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Import shared components from the index page
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import { Example } from '../components/Corn';
import { NavbarDemo } from '../components/navbar/Navbar2';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import { baseURl } from '../../baseURL'; // Ensure baseURl is defined correctly here

// --- Helper Functions (Reused from Blogs.jsx) ---
const createSlug = (name) => {
    return name
        ?.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
};

const cleanBase64 = (base64String) => {
    // This helper removes newlines, carriage returns, and spaces which can break Base64 URI
    return base64String ? base64String.replace(/[\r\n\s]/g, '') : '';
};

// --- REMOVED mockSingleBlog as we are now fetching data ---
// We'll keep a minimal structure for initial state check if needed, but 
// we rely on the API now.

function BlogDetails() {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const [blogPost, setBlogPost] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSidebarCategory, setActiveSidebarCategory] = useState(null);
    const [showAuthButtons, setShowAuthButtons] = useState(true);

    // Using useMemo to define URLs so they are consistent across renders
    const BLOG_API_URL = useMemo(() => `${baseURl}/blogs/${blogId}`, [baseURl, blogId]);
    const ALL_BLOGS_API_URL = useMemo(() => `${baseURl}/blogs`, [baseURl]);

    // --- Data Fetching: CORRECTED LOGIC ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. FETCH THE SINGLE BLOG POST
                const singleRes = await fetch(BLOG_API_URL);

                if (singleRes.status === 404) {
                    setBlogPost(null); // Triggers "Blog post not found."
                    setLoading(false);
                    return;
                }

                if (!singleRes.ok) {
                    throw new Error(`Failed to fetch blog post: ${singleRes.statusText}`);
                }

                const postData = await singleRes.json();
                setBlogPost(postData);

                // 2. FETCH ALL BLOGS FOR SIDEBAR
                const allRes = await fetch(ALL_BLOGS_API_URL);
                if (!allRes.ok) throw new Error('Failed to fetch all blogs for sidebar');
                const allData = await allRes.json();
                setAllBlogs(allData);

            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setBlogPost(null); // Ensure null on error
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // Dependency array includes URLs and blogId to refetch if they change
    }, [blogId, BLOG_API_URL, ALL_BLOGS_API_URL]);

    // Scroll effect for floating buttons
    // useEffect(() => {
    //     const handleScroll = () => setShowAuthButtons(window.scrollY <= 100);
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    // --- Sidebar Data Calculation (Memoized) ---
    const { trendingBlogs, categories } = useMemo(() => {
        const trending = [...allBlogs]
            // Assuming your backend sorts by 'likes' or similar; using comment count as a mock for 'trending'
            .sort((a, b) => (b.blogComments?.length || 0) - (a.blogComments?.length || 0))
            .slice(0, 5);

        const uniqueCategories = [
            ...new Set(
                allBlogs.map(b => b.blogTechnology?.technologyName || 'Uncategorized')
            ),
        ];

        return { trendingBlogs: trending, categories: uniqueCategories };
    }, [allBlogs]);

    const handleRelatedBlogClick = (blog) => {
        const technologySlug = createSlug(blog.blogTechnology?.technologyName || 'uncategorized');
        // Navigates and triggers a full reload/re-render of this component via the 'blogId' param change
        navigate(`/blogs/${technologySlug}/${blog.id}`);
    };

    // --- Loading/Error State ---
    if (loading)
        return (
            <div className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 text-blue-950'>
                <DotLottieReact
                    src='https://lottie.host/4ce43db8-2aa2-4617-96f0-aad2bb51dc7b/0FITZztajf.lottie'
                    loop
                    autoplay
                    className="h-25 w-25"
                />
                <p className='text-lg mt-4 animate-pulse'>Loading blog post...</p>
            </div>
        );

    if (error) return <p className='p-8 text-center text-xl text-red-500 bg-red-50 border border-red-200 rounded-lg'>Error fetching data: {error}</p>;

    if (!blogPost) return <p className='p-8 text-center text-xl text-gray-500'>Blog post not found.</p>;

    const cleanedPhoto = blogPost.blogPhoto ? cleanBase64(blogPost.blogPhoto) : null;

    return (
        <>
            <Helmet>
                <title>{blogPost.name} | Pisoft Informatics</title>
                <meta name="description" content={blogPost.content?.replace(/<[^>]+>/g, '').slice(0, 160)} />
            </Helmet>

            <main className='max-w-screen overflow-hidden text-blue-950 font-IN bg-gray-50 min-h-screen'>
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

                <section className='max-w-7xl mx-auto pt-[70px] lg:pt-[130px] pb-16 grid grid-cols-1 px-4 lg:grid-cols-3 gap-12'>

                    {/* === LEFT COLUMN: MAIN BLOG POST CONTENT === */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='lg:col-span-2'
                    >
                        {/* Title and Metadata */}
                        <div className='mb-6'>
                            <p className='text-sm font-semibold uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit mb-3'>
                                {blogPost.blogTechnology?.technologyName || 'Uncategorized'}
                            </p>
                            <span className='text-4xl md:text-5xl font-INB mb-4 text-blue-950 leading-tight'>
                                {blogPost.name}
                            </span>
                            <div className='text-sm text-gray-600 flex items-center gap-4 flex-wrap border-b pb-4'>
                                <span className='flex items-center gap-2'><FaUser className='text-blue-700' /> {blogPost.authorName}</span>
                                <span className='flex items-center gap-2'><FaCalendarAlt className='text-blue-700' /> {blogPost.blogDate}</span>
                                <span className='flex items-center gap-2'><FaClock className='text-blue-700' /> {blogPost.readTime || 6} min read</span>
                            </div>
                        </div>

                        {cleanedPhoto && (
                            <img
                                src={`data:${blogPost.imageType || 'image/jpeg'};base64,${cleanedPhoto}`}
                                alt={blogPost.name}
                                width="1200"
                                height="675"
                                className='w-full h-auto object-cover rounded-xl shadow-xl shadow-blue-100 mb-8'
                                loading="lazy"
                            />
                        )}

                        <div
                            className='prose max-w-none prose-lg prose-blue-950 prose-h2:font-INB prose-h3:font-INB prose-a:text-orange-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 bg-white p-6 rounded-xl shadow-xl shadow-orange-100'
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                        />

                        {/* Comments/Action Section */}
                        <div className='mt-8 pt-6 border-t border-gray-200'>
                            <div className='text-2xl font-INB mb-4'>See More Related Blogs</div>
                            <button
                                onClick={() => navigate('/blogs')}
                                className='bg-blue-950 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2'
                            >
                                <FaReply className='rotate-180' /> View More Blogs
                            </button>
                        </div>
                    </motion.div>

                    {/* === RIGHT COLUMN: SIDEBAR === */}
                    <div className='lg:sticky lg:top-28 self-start'>

                        {/* 1. Trending Posts */}
                        <div className='bg-white p-6 rounded-2xl shadow-xl shadow-orange-100 border border-gray-100 mb-10'>
                            <div className='text-2xl font-INB text-blue-950 mb-6 border-b pb-3'>
                                <FaFire className='inline mr-2 text-orange-500' /> Trending Topics
                            </div>
                            <ol className='space-y-4'>
                                {trendingBlogs.map((blog, index) => (
                                    <li key={blog.id} className='flex gap-2 items-start group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-1 -m-1' onClick={() => handleRelatedBlogClick(blog)}>
                                        <span className='text-xl font-INB text-orange-500 flex-shrink-0'>
                                            {String(index + 1).padStart(2, '0')}.
                                        </span>
                                        <div className='flex flex-col'>
                                            <p className='font-semibold text-blue-950 group-hover:text-orange-600 transition-colors line-clamp-2'>
                                                {blog.name}
                                            </p>
                                            <p className='text-xs text-gray-500 mt-1'>
                                                {blog.authorName}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* 2. Categories List (Accordion) */}
                        <div className='bg-white p-4 rounded-2xl shadow-xl shadow-blue-100 border border-gray-100'>
                            <div className='text-2xl font-INB text-blue-950 mb-6 border-b pb-3'>
                                <FaFilter className='inline mr-2 text-orange-500' /> All Categories
                            </div>
                            <ul className='space-y-2'>
                                {categories.map((cat) => {
                                    const isActiveDropdown = activeSidebarCategory === cat;

                                    const filteredPosts = allBlogs.filter(
                                        blog => (blog.blogTechnology?.technologyName || 'Uncategorized') === cat
                                    );

                                    return (
                                        <li key={cat}>
                                            <div
                                                onClick={() => setActiveSidebarCategory(isActiveDropdown ? null : cat)}
                                                className={`flex items-center justify-between gap-2 text-lg font-semibold text-blue-950 cursor-pointer p-2 rounded-lg transition duration-200 border-b border-gray-100 hover:bg-blue-50 ${isActiveDropdown ? 'bg-blue-50' : ''}`}
                                            >
                                                <span className='flex items-center gap-2'>
                                                    {/* Span to navigate to the filtered blog list */}
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/blogs?category=${createSlug(cat)}`);
                                                        }}
                                                        className='hover:text-orange-600 transition-colors'
                                                    >
                                                        {cat} ({filteredPosts.length})
                                                    </span>
                                                </span>
                                                {/* Icon to show/hide the dropdown */}
                                                <button className='p-1 flex items-center justify-center text-orange-600'>
                                                    {isActiveDropdown ? <FaAngleDown className='h-4 w-4 transform transition-transform duration-300' /> : <FaAngleRight className='h-4 w-4 transform transition-transform duration-300' />}
                                                </button>
                                            </div>

                                            {/* Subcategory Blog Titles Dropdown with Animation */}
                                            <AnimatePresence>
                                                {isActiveDropdown && (
                                                    <motion.ul
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className='pl-4 mt-2 space-y-2 overflow-hidden list-none text-sm'
                                                    >
                                                        {filteredPosts.map(post => (
                                                            <motion.li
                                                                key={post.id}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.2, delay: 0.1 }}
                                                                className='flex items-center gap-2 text-gray-700 hover:text-orange-600 cursor-pointer p-1 rounded-md'
                                                                onClick={() => handleRelatedBlogClick(post)}
                                                            >
                                                                <FaAngleRight className='h-3 w-3 flex-shrink-0' />
                                                                <span className='line-clamp-1'>{post.name}</span>
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>
            </main>
        </>
    );
}

export default BlogDetails;