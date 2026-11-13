import React from 'react';
import { Link } from 'react-router-dom';
import {
  MailOpen,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Building2,
  Compass,
  BookOpen,
  GraduationCap,
  Target,
  ArrowUp
} from 'lucide-react';

const TFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-screen mx-auto bg-white rounded-t-3xl shadow-lg overflow-hidden border border-gray-100 font-sans text-gray-700">
      
      {/* Top Section Padding Wrapper */}
      <div className="p-8 lg:p-12 space-y-12">
        
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-gray-50 to-orange-50/30 border border-orange-100/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-200 shrink-0">
              <MailOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Stay Updated, Keep Learning</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Get the latest tutorials, articles and resources straight to your inbox.
              </p>
            </div>
          </div>

          <form className="flex items-center gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-72 bg-white"
              required
            />
            <button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition duration-200 shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Brand & Address Section (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link to="/Tutorials" className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-orange-200">
                T
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">PITutorial</span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              The most trusted platform to learn programming, prepare for interviews and grow in your career.
            </p>

            {/* Addresses (Updated from API Response) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Corporate Address</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    F-468, Industrial Focal Point, Phase 8-B, Mohali, Punjab - 140307
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Right Links Columns (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            
            {/* Company */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <Building2 className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Company</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                <li><Link to="/about" className="hover:text-orange-500 transition">About Us</Link></li>
                <li><Link to="/T&C" className="hover:text-orange-500 transition">Legal</Link></li>
                <li><Link to="/Privacy-Policy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
                <li><Link to="/CareerWithUs" className="hover:text-orange-500 transition">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500 transition">Contact Us</Link></li>
                <li><Link to="/ClientRegister" className="hover:text-orange-500 transition">Corporate Solution</Link></li>
                <li><Link to="/InternshipProgram" className="hover:text-orange-500 transition">Campus Training Program</Link></li>
              </ul>
            </div>

            {/* Explore */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <Compass className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Explore</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                <li><Link to="/Tutorials" className="hover:text-orange-500 transition">POTD</Link></li>
                <li><Link to="/Tquiz?technologyId=199" className="hover:text-orange-500 transition">Practice Problems</Link></li>
                <li><Link to="/Blogs" className="hover:text-orange-500 transition">Blogs</Link></li>
                <li><Link to="/InternshipProgram" className="hover:text-orange-500 transition">Upskill Courses</Link></li>
                <li><Link to="/Location" className="hover:text-orange-500 transition">Connect</Link></li>
              </ul>
            </div>

            {/* Tutorials */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Tutorials</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                <li><Link to="/Tutorials/195" className="hover:text-orange-500 transition">Programming</Link></li>
                <li><Link to="/Tutorials/195" className="hover:text-orange-500 transition">Languages</Link></li>
                <li><Link to="/Tutorials/199" className="hover:text-orange-500 transition">DSA</Link></li>
                <li><Link to="/Tutorials/194" className="hover:text-orange-500 transition">Web Technology</Link></li>
                <li><Link to="/Tutorials/197" className="hover:text-orange-500 transition">AI, ML & Data Science</Link></li>
                <li><Link to="/Tutorials/196" className="hover:text-orange-500 transition">DevOps & Database</Link></li>
                <li><Link to="/Tutorials" className="hover:text-orange-500 transition">CS Core Subjects</Link></li>
                <li><Link to="/Tutorials" className="hover:text-orange-500 transition">GATE</Link></li>
              </ul>
            </div>

            {/* Courses */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Courses</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                <li><Link to="/InternshipProgram" className="hover:text-orange-500 transition">ML and Data Science</Link></li>
                <li><Link to="/InternshipProgram" className="hover:text-orange-500 transition">DSA and Placements</Link></li>
                <li><Link to="/WebApplications" className="hover:text-orange-500 transition">Web Development</Link></li>
                <li><Link to="/MobileApplications" className="hover:text-orange-500 transition">Mobile Development</Link></li>
                <li><Link to="/Tutorials" className="hover:text-orange-500 transition">Certifications</Link></li>
              </ul>
            </div>

            {/* Preparation Corner */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span className="text-gray-900 font-bold">Preparation</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                <li><Link to="/CareerWithUs" className="hover:text-orange-500 transition">Interview Corner</Link></li>
                <li><Link to="/Tquiz" className="hover:text-orange-500 transition">Aptitude & Quizzes</Link></li>
                <li><Link to="/Tutorials" className="hover:text-orange-500 transition">System Design</Link></li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Dark Bar */}
      <div className="bg-[#051336] text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} Pisoft Informatics. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-xs text-gray-300">
          <Link to="/T&C" className="hover:text-white transition">Terms of Service</Link>
          <span className="text-gray-600">|</span>
          <Link to="/Privacy-Policy" className="hover:text-white transition">Privacy Policy</Link>
          <span className="text-gray-600">|</span>
          <Link to="/contact" className="hover:text-white transition">Disclaimer</Link>
        </div>

        <button 
          onClick={scrollToTop} 
          className="w-9 h-9 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
};

export default TFooter;