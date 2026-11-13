import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { NavbarDemo } from '../components/navbar/Navbar2';
import { Example } from '../components/Corn';
import Footer from '../components/Footer';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import { AnimatePresence, motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollButtons from '../components/TopBottomButtons';
import SocialLinks from '../components/SocialLinks';
import { baseURl } from '../../baseURL';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';

function CareerApply() {
  const location = useLocation();
  const vacancyId = location?.state?.vacancyId || 0;

  const [reCaptchaCode, setReCaptchaCode] = useState("")

  const handleRecaptchaChange = (token) => {
    setReCaptchaCode(token);
  }

  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    coverLetter: '',
    resume: null,
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reCaptchaCode) {
      alert("Captcha not verified")
      return null
    }
    else {
      const applicationData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        coverLetter: formData.coverLetter,
        vacancyId: vacancyId,
        reCaptchaCode
      };
      console.log(applicationData)
      const multipartData = new FormData();
      multipartData.append('application', new Blob([JSON.stringify(applicationData)], { type: 'application/json' }));
      multipartData.append('file', formData.resume);

      try {
        const response = await fetch(`${baseURl}/careerApplication`, {
          method: 'POST',
          body: multipartData,
        });

        if (response.ok) {
          alert('Application submitted successfully!');
          setReCaptchaCode(null)
        }
        else if (response.status === 409) {
          const res = await response.text()
          alert(res)
        }
        else {
          alert('Failed to submit application.');
          setReCaptchaCode(null)
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred. Please try again.');
      }
    }

  };

  return (
    <>
      <Helmet>
        <title>Careers at Pisoft Informatics | Software, IT, and ERP Jobs</title>
        <meta
          name="description"
          content="Apply for IT careers at Pisoft Informatics! Join us to deliver software solutions and services in web development, ERP, and AI. See how we're loading the future."
        />
        <meta
          name="keywords"
          content="Pisoft Informatics careers, IT jobs, software development jobs, web developer careers, tech company hiring, apply for IT job, resume submission, AI job opportunities, career in technology, software engineering positions, services, loading, pisoft, software, solutions, erp, informatics, how"
        />
        <meta property="og:url" content="https://Pisoftinformatics.com/applyforCareer" />
        <link rel="canonical" href="https://Pisoftinformatics.com/applyforCareer" />
      </Helmet>

      <div className="w-full overflow-hidden">
        <SocialLinks className="hidden lg:block" />
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

          <div className="flex items-center justify-end lg:justify-end xl:justify-center px-2 py-2">
            <Navbar className="hidden lg:block" />
            <NavbarDemo />
          </div>
        </div>

        <div className="fixed left-1 -top-2 z-50000 lg:hidden">
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

        <div>
          <ScrollButtons />
        </div>

        <section className="flex flex-col md:flex-row pl-3 pt-15 md:pt-30 lg:pt-38 lg:pl-10">
          <div className="w-full lg:w-1/2">
            <div className="text-xl lg:text-3xl font-INB text-orange-500 mb-2">Apply For Career</div>
            <p className="text-black font-in mb-4">Fill this form to apply for a position at our company.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-4 rounded-lg shadow-md">
              <div>
                <label className="font-INB text-sm mb-1 block">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-orange-500 p-1"
                />
              </div>

              <div>
                <label className="font-INB text-sm mb-1 block">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-orange-500 p-1"
                />
              </div>

              <div>
                <label className="font-INB text-sm mb-1 block">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-orange-500 p-1"
                />
              </div>

              <div>
                <label className="font-INB text-sm mb-1 block">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 bg-transparent focus:outline-none focus:border-orange-500 p-2"
                ></textarea>
              </div>

              <div>
                <label className="font-INB text-sm mb-1 block">
                  Upload Resume <span className="text-red-600">*</span>
                </label>
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-orange-500 p-1"
                />
              </div>

              <input type="hidden" name="vacancyId" value={vacancyId} />

              <ReCAPTCHA
                sitekey='6Le5HMgrAAAAADHeshTHDFlC0TjGYlI_YI9bXL4L'
                onChange={handleRecaptchaChange}
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-INB py-2 px-6 rounded-md tracking-widest"
              >
                Submit Application
              </button>
            </form>
          </div>

          <div className="w-auto h-auto lg:w-1/2 hidden lg:flex justify-center items-end">
            <DotLottieReact
              src="https://lottie.host/badc6699-0d98-445e-affa-4fe610ca209a/D4TOn4FfmW.lottie"
              loop
              autoplay
            />
          </div>
        </section>

        <div className="w-full mt-5">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default CareerApply;
