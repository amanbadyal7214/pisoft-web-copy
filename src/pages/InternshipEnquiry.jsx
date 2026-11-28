'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { NavbarDemo } from '../components/navbar/Navbar2'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { baseURl2 } from '../../baseURL'
import { Helmet } from 'react-helmet'
import { User, GraduationCap, Book, X, Receipt, PartyPopper, MessageSquare, CreditCard, CheckCircle2, Search, Clock, Zap, TrendingUp, FileText, Upload } from 'lucide-react'
import ReactConfetti from 'react-confetti'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthFloatingButtons from '../components/AuthFloatingButtons'
import ScrollButtons from '../components/TopBottomButtons'
import { Example } from '../components/Corn'
import axios from 'axios'


const LazyGlobeAnimation = () => (
  <DotLottieReact
    src='https://lottie.host/2bd4e954-5589-4825-b595-4eb163cd9573/d8VremIkIq.lottie'
    loop autoplay style={{ width: '100%', height: '100%' }}
  />
)

export default function InternshipEnquiry() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true)
  const [animationLoaded, setanimationLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // --- TIMER STATE ---
  const [timeLeft, setTimeLeft] = useState(600); // 10 Minutes countdown

  const [formData, setFormData] = useState({
    name: '', email: '', mobileNo: '', university: '',
    className: '', semester: '', category: '', technology: '', courseId: '',
    cv: null
  })

  const [categories, setCategories] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [courses, setCourses] = useState([])
  const [universities, setUniversities] = useState([])
  const [classes, setClasses] = useState([])
  const [semesters, setSemesters] = useState([])

  const [displayCourseFee, setDisplayCourseFee] = useState(0); 
  const [registrationFee, setRegistrationFee] = useState(2000);    
  const [userPayableAmount, setUserPayableAmount] = useState(2000);
  const [showAuthButtons, setShowAuthButtons] = useState(true)

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowAuthButtons(window.scrollY <= 100)
  //   }
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // Timer logic
  useEffect(() => {
    let timer;
    if (isModalOpen && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalAmount = displayCourseFee + registrationFee;
  const discountedTotal = isCouponApplied ? Math.max(0, totalAmount - 2000) : totalAmount;
  const remainingOfficeBalance = Math.max(0, discountedTotal - userPayableAmount);

  const getDynamicCoupon = () => {
    let baseName = formData.name.replace(/\s/g, '').toUpperCase();
    let prefix = baseName.substring(0, 4).padEnd(4, 'X');
    return `${prefix}2034`;
  }

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    setTimeout(() => setPageLoading(false), 800)
    setTimeout(() => setanimationLoaded(true), 1200)

    fetch(`${baseURl2}/technology-categories/technologies/modes/OFFLINE`).then(res => res.json()).then(data => setCategories(data))
    fetch(`${baseURl2}/getAllCollegeUniversities`).then(res => res.json()).then(data => setUniversities(data))
    fetch(`${baseURl2}/getAllSemesters`).then(res => res.json()).then(data => setSemesters(data))
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if (formData.university) fetch(`${baseURl2}/getAllClassesByCollege/${formData.university}`).then(res => res.json()).then(data => setClasses(data))
  }, [formData.university])

  useEffect(() => {
    if (formData.category) fetch(`${baseURl2}/technologies/technology-categories/${formData.category}/modes/OFFLINE`).then(res => res.json()).then(data => setTechnologies(data))
  }, [formData.category])

  useEffect(() => {
    if (formData.technology) fetch(`${baseURl2}/courses/technologies/${formData.technology}`).then(res => res.json()).then(data => setCourses(data))
  }, [formData.technology])

  useEffect(() => {
    if (formData.courseId) {
      fetch(`${baseURl2}/getCourseDetails/${formData.courseId}`)
        .then(res => res.json())
        .then(data => {
          const backendFee = Number(data.fee) || 0;
          const backendRegFee = Number(data.registrationFee) || 0;
          setDisplayCourseFee(backendFee + 2000); 
          setRegistrationFee(backendRegFee); 
          setUserPayableAmount(2000); 
        })
    }
  }, [formData.courseId])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === "mobileNo") {
      const val = value.replace(/\D/g, "").slice(0, 10);
      setFormData(f => ({ ...f, [name]: val }));
    } else if (name === "cv" && files) {
      const file = files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size exceeds 5MB. Please upload a smaller file.");
          return;
        }
        setFormData(f => ({ ...f, cv: file }));
      }
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  }

  const handleAmountChange = (e) => {
    const val = Number(e.target.value);
    setUserPayableAmount(val);
    toast.dismiss();
    if (val < 2000) {
      toast.info("Min. ₹2000 is required", { autoClose: 2000, position: "top-right" });
    } else if (val > discountedTotal) {
      toast.error(`Amount cannot exceed Total Fee (₹${discountedTotal})`, { autoClose: 2000, position: "top-right" });
    }
  }

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === getDynamicCoupon()) {
      setIsCouponApplied(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      toast.success("Scholarship Applied Successfully!");
    } else {
      toast.error(`Invalid Scholarship Code`);
    }
  }

  const handleEnquirySubmit = async () => {
    const univName = universities.find(u => String(u.id) === String(formData.university))?.name || "";
    const classNameStr = classes.find(c => String(c.id) === String(formData.className))?.name || "";
    const semName = semesters.find(s => String(s.id) === String(formData.semester))?.name || null;

    const payload = {
      name: formData.name, email: formData.email, contact: formData.mobileNo,
      university: univName, className: classNameStr, semester: semName,
      categoryCode: 1, courseId: Number(formData.courseId),
      registrationAmount: userPayableAmount, pendingOfficeAmount: remainingOfficeBalance,
      couponApplied: isCouponApplied ? getDynamicCoupon() : "NONE"
    }

    const tid = toast.loading("Processing Enquiry...");
    try {
      let res;
      if (formData.cv) {
        const multipartData = new FormData();
        multipartData.append('application', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        multipartData.append('file', formData.cv);
        multipartData.append('resume', formData.cv);
        multipartData.append('cv', formData.cv);
        Object.keys(payload).forEach(key => {
          if (payload[key] !== null && payload[key] !== undefined) {
            multipartData.append(key, payload[key]);
          }
        });

        res = await fetch(`${baseURl2}/course-applications`, {
          method: 'POST',
          body: multipartData
        });

        if (res.status === 415) {
          res = await fetch(`${baseURl2}/course-applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
      } else {
        res = await fetch(`${baseURl2}/course-applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        toast.update(tid, { render: "Enquiry Sent! Our team will contact you.", type: "success", isLoading: false, autoClose: 3000 });
        setIsModalOpen(false);
      } else { throw new Error(); }
    } catch (e) {
      toast.update(tid, { render: "Submission failed. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  const handleSyllabusNavigation = () => {
    const selectedTech = technologies.find(t => t.id == formData.technology);
    const techNameForURL = selectedTech ? selectedTech.technologyName.replace(/\s+/g, '-') : 'course';
    window.open(`/Alltechnologies/${formData.technology}/${techNameForURL}`, '_blank');
  };

  const handlePaymentSubmit = async () => {
    if (userPayableAmount < 2000) {
        toast.error("Min. ₹2000 required");
        return;
    }
    const isScriptLoaded = await loadRazorpay();
    if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load.");
        return;
    }
    const tid = toast.loading("Initializing secure payment...");
    try {
        const orderRes = await fetch(`${baseURl2}/course-payment/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: userPayableAmount })
        });
        if (!orderRes.ok) throw new Error("Order creation failed");
        const orderData = await orderRes.json();

        const options = {
            key: "rzp_live_S6Un70FJsheMtR",
            amount: orderData?.amount,
            currency: "INR",
            name: "Pisoft Informatics",
            description: `Internship Registration`,
            order_id: orderData.id,
            prefill: {
                name: formData.name.replace(/[^\x00-\x7F]/g, ""),
                email: formData.email,
                contact: formData.mobileNo
            },
            theme: { color: "#002147" },
            handler: async function (response) {
                const verifyTid = toast.loading("Verifying payment and generating receipt...");
                try {
                    const verifyPayload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    const verifyRes = await fetch(`${baseURl2}/course-payment/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(verifyPayload)
                    });
                    if (!verifyRes.ok) {
                        const errorData = await verifyRes.json();
                        throw new Error(errorData.message || "Payment verification failed");
                    }

                    const leadPayload = {
                        collegeId: Number(formData.university),
                        classId: Number(formData.className),
                        courseId: Number(formData.courseId),
                        semesterId: Number(formData.semester),
                        technologyId: Number(formData.technology),
                        firstName: formData.name,
                        mobileNo: formData.mobileNo,
                        emailID: formData.email
                    };
                    const leadRes = await axios.post(
                        `${baseURl2}/saveStudentLead/${response.razorpay_payment_id}`,
                        leadPayload,
                        { responseType: 'blob' }
                    );

                    const blob = new Blob([leadRes.data], { type: 'application/pdf' });
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `Receipt_${response.razorpay_payment_id}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(downloadUrl);

                    toast.update(verifyTid, { render: "Enrollment Successful! Receipt Downloaded.", type: "success", isLoading: false, autoClose: 5000 });
                    setIsModalOpen(false);
                    setShowConfetti(true);
                } catch (err) {
                    toast.update(verifyTid, { render: err.message || "Error finalizing enrollment.", type: "error", isLoading: false });
                }
            },
            modal: { ondismiss: () => toast.info("Payment cancelled") }
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async function (response) {
            try {
                await fetch(`${baseURl2}/course/payment-failed`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        reason: response.error.description,
                        code: response.error.code,
                        payment_id: response.error.metadata.payment_id,
                        order_id: response.error.metadata.order_id,
                        amount: userPayableAmount
                    })
                });
            } catch (err) {}
            toast.error(`Payment Failed: ${response.error.description}`);
        });
        rzp.open();
        toast.dismiss(tid);
    } catch (error) {
        toast.update(tid, { render: "Unable to start payment.", type: "error", isLoading: false, autoClose: 2000 });
    }
};

  return (
    <div className='w-full font-in overflow-hidden relative bg-[#fafafa]'>
      <ToastContainer theme="colored" position="top-right" />
      <Helmet><title>Internship Enquiry | Pisoft Informatics</title></Helmet>

      {showConfetti && (
        <div className='fixed inset-0 z-[200] pointer-events-none'>
          <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={600} gravity={0.2} />
        </div>
      )}

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl -z-10 -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 -ml-40 -mb-20" />

      {pageLoading && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-white'>
          <DotLottieReact src='https://lottie.host/4ce43db8-2aa2-4617-96f0-aad2bb51dc7b/0FITZztajf.lottie' loop autoplay className='h-30 w-30' />
        </div>
      )}

      {/* Navigation */}
      <div className='bg-white w-full overflow-x-hidden'>
        <div className='fixed -top-9 left-0 w-full z-50 hidden lg:block'>
          <AnimatePresence>
            {showAuthButtons && (
              <motion.div initial={{ opacity: 1, y: 40, x: -50 }} animate={{ opacity: 1, y: 40, x: -50 }} exit={{ opacity: 0, y: -50, x: -50 }} transition={{ duration: 0.3 }}>
                <AuthFloatingButtons />
              </motion.div>
            )}
          </AnimatePresence>
          <div className='flex items-center justify-center'>
            <Navbar className='hidden lg:block' />
            <NavbarDemo />
          </div>
        </div>
        <div className='fixed left-1 -top-2 z-50 lg:hidden'><Navbar /></div>
        <div className='fixed top-4 right-4 z-50 lg:hidden'><Example /></div>
        <ScrollButtons />
      </div>

      <section className='flex flex-col lg:flex-row pl-3 pr-3 pt-24 lg:pt-32 mb-5 lg:pl-16 min-h-screen relative z-10'>
        <div className='w-full lg:w-[60%]'>
          <div className='mb-8'>
            <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='text-xl sm:text-2xl lg:text-3xl font-bold font-INB mb-2'>
              <span className='text-[#F07C22] mr-3'>Apply For</span>
              <span className='text-[#002147]'>Internship</span>
            </motion.h2>
            <div className='h-1.5 w-24 bg-[#F07C22] rounded-full'></div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className='space-y-8 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white'>
            <div className='space-y-8'>
              <div>
                <h3 className='flex items-center gap-2 text-orange-600 font-bold text-sm uppercase mb-6 tracking-widest'><User size={16} /> Personal Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <input type='text' name='name' value={formData.name} onChange={handleChange} required placeholder="Full Name" className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all' />
                  <input type='email' name='email' value={formData.email} onChange={handleChange} required placeholder="Email Address" className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all' />
                  <input type='tel' name='mobileNo' value={formData.mobileNo} onChange={handleChange} required placeholder="10-digit Mobile No" className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all' />
                  <select name='university' value={formData.university} onChange={handleChange} required className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all'>
                    <option value=''>Select University</option>
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <h3 className='flex items-center gap-2 text-orange-600 font-bold text-sm uppercase mb-6 tracking-widest'><GraduationCap size={16} /> Academic info</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <select name='className' value={formData.className} onChange={handleChange} required className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all' disabled={!formData.university}>
                    <option value=''>Select Class</option>
                    {classes.map(cl => <option key={cl.id} value={cl.id}>{cl.name}</option>)}
                  </select>
                  <select name='semester' value={formData.semester} onChange={handleChange} className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all'>
                    <option value=''>Select Semester</option>
                    {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <h3 className='flex items-center gap-2 text-orange-600 font-bold text-sm uppercase mb-6 tracking-widest'><Book size={16} /> Course Selection</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <select name='category' onChange={handleChange} required className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all'>
                    <option value=''>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select name='technology' onChange={handleChange} required className='border-b-2 border-gray-100 outline-none py-2 focus:border-orange-500 bg-transparent transition-all'>
                    <option value=''>Select Technology</option>
                    {technologies.map(t => <option key={t.id} value={t.id}>{t.technologyName}</option>)}
                  </select>
                </div>
                <select name='courseId' onChange={handleChange} required className='w-full border-b-2 border-gray-100 outline-none py-2 mt-8 focus:border-orange-500 bg-transparent transition-all'>
                  <option value=''>Select Specific Course Duration</option>
                  {courses.map(c => <option key={c.courseId} value={c.courseId}>{c.courseName}</option>)}
                </select>
              </div>

              <div>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest'>
                    <FileText size={16} /> Upload CV / Resume
                  </h3>
                  <span className='text-[11px] font-semibold text-slate-400'>
                    (Optional • PDF, DOC, DOCX up to 5MB)
                  </span>
                </div>

                {!formData.cv ? (
                  <label className='flex flex-col sm:flex-row items-center justify-center gap-3 p-4 sm:p-5 border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-2xl cursor-pointer bg-slate-50/60 hover:bg-orange-50/40 transition-all group'>
                    <div className='w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform'>
                      <Upload size={18} />
                    </div>
                    <div className='text-center sm:text-left'>
                      <p className='text-xs sm:text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors'>
                        Click to browse or drag & drop your CV
                      </p>
                      <p className='text-[11px] text-slate-400 mt-0.5'>
                        Supported formats: PDF, DOC, DOCX
                      </p>
                    </div>
                    <input
                      type='file'
                      name='cv'
                      id='cv'
                      accept='.pdf,.doc,.docx'
                      onChange={handleChange}
                      className='hidden'
                    />
                  </label>
                ) : (
                  <div className='flex items-center justify-between p-3.5 sm:p-4 bg-orange-50/80 border border-orange-200 rounded-2xl'>
                    <div className='flex items-center gap-3 min-w-0'>
                      <div className='w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0'>
                        <FileText size={18} />
                      </div>
                      <div className='min-w-0'>
                        <p className='text-xs sm:text-sm font-bold text-slate-800 truncate'>
                          {formData.cv.name}
                        </p>
                        <p className='text-[10px] text-slate-500 font-medium'>
                          {(formData.cv.size / (1024 * 1024)).toFixed(2)} MB • Attached
                        </p>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => setFormData(f => ({ ...f, cv: null }))}
                      className='p-1.5 hover:bg-orange-200/60 text-slate-500 hover:text-red-500 rounded-lg transition-colors flex-shrink-0 ml-2'
                      title='Remove file'
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type='submit' className='bg-[#F07C22] text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-xl shadow-orange-200'>
                PROCEED TO SUMMARY
              </motion.button>
            </div>
          </form>
        </div>

        <div className='hidden lg:flex w-[65%] justify-center items-center sticky top-40 h-fit'>
          {animationLoaded && <LazyGlobeAnimation />}
        </div>
      </section>

      {/* SUMMARY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#002147]/80 backdrop-blur-md" />

            <motion.div initial={{ scale: 0.7, y: 20 }} animate={{ scale: 0.8, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-[#002147] p-4 text-white flex justify-between items-center">
                <h2 className='font-bold text-base flex items-center gap-2'><Receipt size={16} className='text-orange-400' /> Order Summary</h2>
                <button onClick={() => setIsModalOpen(false)} className='p-1.5 hover:bg-white/10 rounded-full transition-colors'><X size={18} className='text-gray-300' /></button>
              </div>

              <div className="p-5">
                {/* --- IMPROVED SCHOLARSHIP SECTION --- */}
                {!isCouponApplied ? (
                  <div className='mb-6 p-4 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-400 border-dashed rounded-2xl relative overflow-hidden'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                        <p className='text-[13px] font-black text-orange-800 uppercase tracking-tighter'>Exclusive Scholarship</p>
                      </div>
                      <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                        SAVE ₹2000
                      </div>
                    </div>

                    <div className="bg-white border border-orange-200 rounded-xl p-3 shadow-sm mb-3">
                      <p className='text-[10px] t  ext-gray-800 mb-1 font-bold'>USE CODE:</p>
                      <div className='flex items-center justify-between'>
                        <span className='text-xl font-black text-[#002147] tracking-widest'>{getDynamicCoupon()}</span>
                        <button 
                          onClick={() => setCoupon(getDynamicCoupon())}
                          className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold"
                        >
                          TAP TO FILL
                        </button>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <input type="text" placeholder="Enter Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className='flex-1 border-2 border-orange-200 rounded-lg px-3 py-2 outline-none focus:border-orange-500 text-sm uppercase font-bold shadow-inner' />
                      <button onClick={handleApplyCoupon} className='bg-[#002147] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-black transition-all active:scale-95'>APPLY</button>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-2 text-red-600 bg-red-50 py-1.5 rounded-lg border border-red-100">
                      <Clock size={12} className="animate-pulse" />
                      <p className="text-[10px] font-bold uppercase italic">Valid for: <span className='text-xs'>{formatTime(timeLeft)}</span> mins only!</p>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className='mb-4 p-4 bg-green-600 rounded-2xl flex items-center justify-between text-white shadow-lg'>
                    <div className='flex items-center gap-3'>
                      <div className="bg-white/20 p-2 rounded-full"><PartyPopper size={20} /></div>
                      <div>
                        <p className='text-[10px] font-bold opacity-80 uppercase'>Scholarship Applied</p>
                        <p className='text-sm font-black'>YOU SAVED ₹2,000!</p>
                      </div>
                    </div>
                    <CheckCircle2 size={24} />
                  </motion.div>
                )}

                {/* Scarcity Progress Bar */}
                <div className='mb-4'>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-[10px] font-bold text-gray-800 uppercase flex items-center gap-1'><Zap size={10} className='text-orange-500' /> Registration Status</p>
                        <p className='text-[10px] font-bold text-orange-600 italic'>85% Full</p>
                    </div>
                    <div className='h-1.5 w-full bg-gray-100 rounded-full overflow-hidden'>
                        <motion.div initial={{ width: "0%" }} animate={{ width: "85%" }} className='h-full bg-gradient-to-r from-orange-400 to-orange-600' />
                    </div>
                </div>

                <div className='space-y-1.5 text-xs border-b border-dashed border-gray-200 pb-3 mb-3'>
                  <div className='flex justify-between text-gray-800'><span>Registration Fee</span><span>₹{registrationFee}</span></div>
                  <div className='flex justify-between text-gray-800'><span>Course Fee </span><span>₹{displayCourseFee}</span></div>
                  {isCouponApplied && <div className='flex justify-between text-green-600 font-medium'><span>Scholarship Discount</span><span>- ₹2,000</span></div>}
                  {formData.cv && (
                    <div className='flex justify-between text-gray-800 pt-1 border-t border-dashed border-gray-100'>
                      <span className='flex items-center gap-1 text-slate-500'><FileText size={12} /> Attached CV</span>
                      <span className='font-semibold text-slate-700 truncate max-w-[130px]'>{formData.cv.name}</span>
                    </div>
                  )}
                  <div className='flex justify-between pt-2 text-[#002147] font-black text-lg'><span>Net Total</span><span>₹{discountedTotal}</span></div>
                </div>

                <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${userPayableAmount < 1 || userPayableAmount > discountedTotal ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-[12px] font-bold text-slate-500 uppercase'>Custom Pay:</span>
                    <div className='relative'>
                      <span className='absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs'>₹</span>
                      <input type="number" value={userPayableAmount} onChange={handleAmountChange} className={`w-24 pl-5 pr-2 py-1.5 border-2 rounded-xl font-bold text-sm outline-none ${userPayableAmount < 1 || userPayableAmount > discountedTotal ? 'border-red-500 text-red-600' : 'border-orange-400 text-orange-600'}`} />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='p-2 bg-white rounded-xl border border-slate-100 text-center'><p className='text-[11px] uppercase text-slate-400'>Pay Now</p><p className={`text-sm font-bold ${userPayableAmount < 1 ? 'text-red-500' : 'text-green-600'}`}>₹{userPayableAmount}</p></div>
                    <div className='p-2 bg-white rounded-xl border border-slate-100 text-center'><p className='text-[11px] uppercase text-slate-400'>Remaining</p><p className='text-sm font-bold text-red-500'>₹{remainingOfficeBalance}</p></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <button disabled={userPayableAmount < 1 || userPayableAmount > discountedTotal} onClick={handlePaymentSubmit} className={`text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${userPayableAmount < 1 || userPayableAmount > discountedTotal ? 'bg-gray-400' : 'bg-[#002147] hover:bg-black shadow-lg shadow-blue-100'}`}>
                    PAY ₹{userPayableAmount} <CreditCard size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleEnquirySubmit} className='text-[#002147] border border-[#002147]/20 py-2.5 rounded-xl font-bold text-[10px] hover:bg-slate-50 flex items-center justify-center gap-1'>
                      <MessageSquare size={12} /> ENQUIRE ONLY
                    </button>
                    <button onClick={handleSyllabusNavigation} className='text-orange-600 border border-orange-200 py-2.5 rounded-xl font-bold text-[10px] hover:bg-orange-50 flex items-center justify-center gap-1'>
                      <Search size={12} /> SYLLABUS
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}