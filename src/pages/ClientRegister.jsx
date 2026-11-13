"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Building2, Mail, Phone, Globe, MapPin,
  ChevronRight, Briefcase, ChevronLeft, LayoutGrid, Receipt, ShieldCheck,
  RotateCcw, CheckCircle2, CalendarDays,Check, Zap ,ChevronDown,
  PhoneCall,
  MapPinCheck,
  PinIcon, 
} from "lucide-react";

import Navbar from '../components/Navbar';
import { NavbarDemo } from '../components/navbar/Navbar2';
import AuthFloatingButtons from '../components/AuthFloatingButtons';
import Footer from '../components/Footer';
import ScrollToHashElement from '../components/ScrollToHash';
import SocialLinks from '../components/SocialLinks';
import ScrollButtons from '../components/TopBottomButtons';
import { baseURl } from "../../baseURL";
import { Example } from "../components/Corn";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState({});
  const [businessNature, setBusinessNature] = useState("");
  const [businessNatureLabel, setBusinessNatureLabel] = useState("");
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [allBusinessNature, setAllBusinessNature] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // confirmation modal
  const openConfirmationModal = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
      window.location.href = "/";
    }, 15000);
  };



  // API Data States
  const [moduleCategoryName, setModuleCategoryName] = useState("");
  const [fetchedModules, setFetchedModules] = useState([]);
  const [baseMandatoryPrice, setBaseMandatoryPrice] = useState(0);

  // Form Data States
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "", email: "", phone: "", address1: "",
    address2: "", city: "", countryId: "", stateId: "",
    districtId: "", countryCode: "",
    pincode:"",addressType: "",
  });

  // Load Razorpay Script & Scroll Logic
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const onScroll = () => setShowAuthButtons(window.scrollY <= 100);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  // API Initial Fetch
  useEffect(() => {
    const fetchBusinessNatures = async () => {
      try {
        const res = await axios.get(`${baseURl}/client-business-natures`);
        const data = res.data?.data || res.data;
        setAllBusinessNature(Array.isArray(data) ? data : []);
      } catch (err) { console.error(err); }
    };
    fetchBusinessNatures();

    const fetchCountries = async () => {
      try {
        const res = await fetch(`${baseURl}/getAllCountries`);
        const result = await res.json();
        setCountries(Array.isArray(result) ? result : result.data || []);
      } catch (err) { console.error(err); }
    };
    fetchCountries();
  }, []);

  // Fetch Modules based on selection
  useEffect(() => {
    if (!businessNature) return;
    const fetchModules = async () => {
      setIsLoadingModules(true);
      try {
        const res = await axios.get(`${baseURl}/business-modules/client-business-natures/${businessNature}`);
        const responseData = res.data?.data || res.data;
        setModuleCategoryName(responseData.moduleName || "Modules");
        setFetchedModules(responseData.modules || []);
        setBaseMandatoryPrice(responseData.mandatoryPrice || 0);

        const mandatoryOnes = {};
        const processMandatory = (list) => {
          list.forEach(m => {
            if (m.mandatoryModule) mandatoryOnes[m.id] = true;
            if (m.children) processMandatory(m.children);
          });
        };
        processMandatory(responseData.modules || []);
        setSelectedModules(mandatoryOnes);
      } finally { setIsLoadingModules(false); }
    };
    fetchModules();
  }, [businessNature]);

  // Address Chain Logic
  useEffect(() => {
    if (!formData.countryId) return;
    (async () => {
      setIsLoadingStates(true);
      try {
        const res = await fetch(`${baseURl}/state/${formData.countryId}`);
        const result = await res.json();
        setStates(Array.isArray(result) ? result : result.data || []);
      } finally { setIsLoadingStates(false); }
    })();
  }, [formData.countryId]);

  useEffect(() => {
    if (!formData.stateId) return;
    (async () => {
      setIsLoadingDistricts(true);
      try {
        const res = await fetch(`${baseURl}/district/${formData.stateId}`);
        const result = await res.json();
        setDistricts(Array.isArray(result) ? result : result.data || []);
      } finally { setIsLoadingDistricts(false); }
    })();
  }, [formData.stateId]);

  // Pricing Calculation
  const totalPrice = useMemo(() => {
    const flatten = (items) => items.flatMap(i => [i, ...(i.children ? flatten(i.children) : [])]);
    const all = flatten(fetchedModules);
    const selectedSum = Object.entries(selectedModules).reduce((sum, [id, val]) => {
      if (!val) return sum;
      const item = all.find(i => String(i.id) === String(id));
      return sum + (Number(item?.price) || 0);
    }, 0);
    return selectedSum + baseMandatoryPrice;
  }, [selectedModules, fetchedModules, baseMandatoryPrice]);

  const toggleModule = (module, checked) => {
    if (module.mandatoryModule && !checked) return;

    let newSelected = { ...selectedModules, [module.id]: checked };
    const updateDescendants = (node, val) => {
      // Skip if child is mandatory and we are trying to uncheck
      if (node.mandatoryModule && !val) return;

      newSelected[node.id] = val;
      node.children?.forEach(child => updateDescendants(child, val));
    };

    if (module.children) {
      updateDescendants(module, checked);
    }

    if (!checked) {
      const updateAncestors = (modulesList) => {
        modulesList.forEach(parent => {
          if (parent.children && parent.children.length > 0) {
            updateAncestors(parent.children);

            const anyChildSelected = parent.children.some(child => newSelected[child.id]);

            if (!anyChildSelected && !parent.mandatoryModule) {
              newSelected[parent.id] = false;
            }
          }
        });
      };
      updateAncestors(fetchedModules);
    }

    setSelectedModules(newSelected);
  };;

  const generatePayload = (paymentId = null) => {
    const selectedIds = new Set(
      Object.keys(selectedModules)
        .filter(id => selectedModules[id])
        .map(Number)
    );

    // future-proof bucket
    const headersByLevel = {
      1: [],
      2: [],
      3: [],
      4: []
    };

    const traverse = (node, lastSelectedLevel = 0) => {
      const isSelected = selectedIds.has(node.id);

      let currentLevel = lastSelectedLevel;

      if (isSelected) {
        const targetLevel = Math.min(lastSelectedLevel + 1, 4);
        headersByLevel[targetLevel].push(node.id);
        currentLevel = targetLevel;
      }

      node.children?.forEach(child =>
        traverse(child, currentLevel)
      );
    };

    fetchedModules.forEach(root => traverse(root));

    return {
      client: {
        ownerName: formData.companyName,
        ownerEmail: formData.email,
        ownerContactNo1: formData.phone,
        natureOfBusiness: [
          { businessNature: { id: Number(businessNature) } }
        ],
        // clientpayments: [
        //   {
        //     totalAmount: paymentId ? totalPrice : 0
        //   }
        // ],
        organisatonAddressDetails: {
          addressType: formData.addressType ||"OFFICE",
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          pincode: formData.pincode || "N/A",
          district: { id: Number(formData.districtId) }
        }
      },

      headerOne: headersByLevel[1],
      headerTwo: headersByLevel[2],
      headerThree: headersByLevel[3],
      headerFour: headersByLevel[4].length ? headersByLevel[4] : null
    };
  };


  const validateForm = () => {
    const required = ['companyName', 'email', 'phone', 'address1', 'countryId', 'stateId', 'districtId'];
    const missing = required.filter(key => !formData[key]);
    if (missing.length > 0) {
      alert("Please fill in all required fields marked with * before proceeding.");
      setStep(1);
      return false;
    }
    return true;
  };

  const handleBookTrial = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const payload = generatePayload();
      await axios.post(`${baseURl}/trialAccess`, payload);

      openConfirmationModal(
        "Your trial booking is confirmed! We will send your credentials via email. Thank you for your submission."
      );
    } catch (err) {
      console.error("Trial Error:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  

  // RAZORPAY PAYMEsNT
const handleFinalize = async () => {
  if (!validateForm()) return;

  setIsProcessing(true);

  try {
    // CREATE ORDER
    const orderRes = await fetch(`${baseURl}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice })
    });

    if (!orderRes.ok) throw new Error("Order creation failed");

    const order = await orderRes.json();

    const options = {
      key: "rzp_live_S6Un70FJsheMtR",
      amount: order.amount,
      currency: "INR",
      name: "Pisoft Informatics",
      description: "Partner Registration Fee",
      order_id: order.id,

      prefill: {
        name: formData.companyName,
        email: formData.email,
        contact: formData.phone
      },

      theme: { color: "#F07C22" },

      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${baseURl}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          });

          if (!verifyRes.ok) throw new Error("Payment verification failed");

          const paymentId = response.razorpay_payment_id;
          const finalPayload = generatePayload(paymentId);
          console.log(finalPayload)

          // SAVE CLIENT + GET PDF
          const res = await axios.post(
            `${baseURl}/saveClientAndModule/${paymentId}`,
            finalPayload,
            {
              responseType: "blob"
            }
          );

          // AUTO DOWNLOAD PDF
          const pdfBlob = new Blob([res.data], {
            type: "application/pdf"
          });

          const pdfUrl = window.URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");

          link.href = pdfUrl;
          link.download = "Payment_Receipt.pdf"; 
          document.body.appendChild(link);
          link.click();

          link.remove();
          window.URL.revokeObjectURL(pdfUrl);

          openConfirmationModal(
            "Your payment is successful! Your PDF has been downloaded and credentials will be emailed to you."
          );

        } catch (err) {
          console.error("Verification / Save Error:", err);
          alert(
            "Payment received but verification or PDF generation failed. Please contact support."
          );
          setIsProcessing(false);
        }
      },

      modal: {
        ondismiss: () => setIsProcessing(false)
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", async function (response) {
      try {
        await fetch(`${baseURl}/payment/payment-failed`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: options.order_id,
            reason: response.error.description
          })
        });
      } catch (err) {
        console.error("Payment failed API error:", err);
      }

      alert("Payment Failed. Please try again.");
      setIsProcessing(false);
    });

    rzp.open();

  } catch (err) {
    console.error("Payment Init Error:", err);
    alert("Unable to start payment. Please try again.");
    setIsProcessing(false);
  }
};



//   const handleFinalize = async () => {
//   if (!validateForm()) return;

//   setIsProcessing(true);

//   try {
//     // 1️⃣ CREATE ORDER
//     const orderRes = await fetch(`${baseURl}/payment/create-order`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: totalPrice })
//     });

//     if (!orderRes.ok) throw new Error("Order creation failed");

//     const order = await orderRes.json();

//     // 2️⃣ RAZORPAY OPTIONS
//     const options = {
//       key: "rzp_live_S6Un70FJsheMtR",
//       amount: order.amount,
//       currency: "INR",
//       name: "Pisoft Informatics",
//       description: "Partner Registration Fee",
//       order_id: order.id,

//       prefill: {
//         name: formData.companyName,
//         email: formData.email,
//         contact: formData.phone
//       },

//       theme: { color: "#F07C22" },

//       // 3️⃣ PAYMENT SUCCESS HANDLER
//       handler: async function (response) {
//         try {
//           // VERIFY PAYMENT
//           const verifyRes = await fetch(`${baseURl}/payment/verify`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response)
//           });

//           if (!verifyRes.ok) throw new Error("Payment verification failed");

//           const paymentId = response.razorpay_payment_id;
//           const finalPayload = generatePayload(paymentId);
//           console.log(paymentId)

//           const res = await axios.post(
//             `${baseURl}/saveClientAndModule/${paymentId}`,
//             finalPayload
//           );

//           console.log(res)

//           openConfirmationModal(
//             "Your payment is successful! We will send your credentials via email. Thank you for your submission."
//           );

//         } catch (err) {
//           console.error("Verification / Save Error:", err);
//           alert("Payment received but verification failed. Please contact support.");
//           setIsProcessing(false);
//         }
//       },

//       modal: {
//         ondismiss: () => setIsProcessing(false)
//       }
//     };

//     // 4️⃣ OPEN RAZORPAY
//     const rzp = new window.Razorpay(options);

//     // 5️⃣ PAYMENT FAILED HANDLER
//     rzp.on("payment.failed", async function (response) {
//       try {
//         await fetch(`${baseURl}/payment/payment-failed`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             orderId: options.order_id,
//             reason: response.error.description
//           })
//         });
//       } catch (err) {
//         console.error("Payment failed API error:", err);
//       }

//       alert("Payment Failed. Please try again.");
//       setIsProcessing(false);
//     });

//     rzp.open();

//   } catch (err) {
//     console.error("Payment Init Error:", err);
//     alert("Unable to start payment. Please try again.");
//     setIsProcessing(false);
//   }
// };


  //   const handleFinalize = async () => {
  //   if (!validateForm()) return;

  //   setIsProcessing(true);

  //   try {
  //     const orderRes = await fetch(`${baseURl}/payment/create-order`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: totalPrice
  //       })
  //     });

  //     if (!orderRes.ok) throw new Error("Order creation failed");

  //     const order = await orderRes.json();

  //     // 2️⃣ RAZORPAY OPTIONS
  //     const options = {
  //       key: "rzp_live_S6Un70FJsheMtR", 
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "Pisoft Informatics",
  //       description: "Partner Registration Fee",
  //       order_id: order.id,

  //       prefill: {
  //         name: formData.companyName,
  //         email: formData.email,
  //         contact: formData.phone
  //       },

  //       theme: { color: "#F07C22" },

  //       handler: async function (response) {
  //         try {
  //           // 3️⃣ VERIFY PAYMENT (VERY IMPORTANT)
  //           const verifyRes = await fetch(`${baseURl}/payment/verify`, {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify(response)
  //           });

  //           if (!verifyRes.ok) throw new Error("Payment verification failed");

  //           // 4️⃣ SAVE CLIENT + MODULES (ONLY AFTER VERIFY)
  //           const finalPayload = generatePayload(response.razorpay_payment_id);
  //           await axios.post(`${baseURl}/saveClientAndModule`, finalPayload);

  //           alert("Registration & Payment Successful!");
  //           window.location.reload();

  //         } catch (err) {
  //           console.error("Verification / Save Error:", err);
  //           alert("Payment received but verification failed. Please contact support.");
  //         } finally {
  //           setIsProcessing(false);
  //         }
  //       },

  //       modal: {
  //         ondismiss: () => setIsProcessing(false)
  //       }
  //     };

  //     const rzp = new window.Razorpay(options);

  //     // 5️⃣ HANDLE FAILED PAYMENT
  //     rzp.on("payment.failed", async function (response) {
  //       try {
  //         await fetch(`${baseURl}/payment/payment-failed`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             orderId: options.order_id,
  //             reason: response.error.description
  //           })
  //         });
  //       } catch (err) {
  //         console.error("Payment failed API error:", err);
  //       }

  //       alert("Payment Failed. Please try again.");
  //       setIsProcessing(false);
  //     });

  //     rzp.open();

  //   } catch (err) {
  //     console.error("Payment Init Error:", err);
  //     alert("Unable to start payment. Please try again.");
  //     setIsProcessing(false);
  //   }
  // };


  return (
    <div className="min-h-screen font-INB bg-[#FBFDFF] text-slate-900 overflow-x-hidden">
      <ScrollToHashElement />
      <SocialLinks className="hidden lg:block" />
      <ScrollButtons />

      {/* Navigation */}
      <div className="fixed -top-9 left-0 w-full z-50 hidden lg:block">
        <AnimatePresence>
          {showAuthButtons && (
            <motion.div initial={{ opacity: 1, y: 40 }} exit={{ opacity: 0, y: -50 }}>
              <AuthFloatingButtons />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-center px-2 py-2">
          <Navbar className="hidden lg:block" />
          <NavbarDemo />
        </div>
      </div>

      <div className="fixed left-1 -top-2 z-50 lg:hidden"><Navbar /></div>
      <div className="fixed top-4 right-4 z-50 lg:hidden"><Example /></div>

      <main className="max-w-7xl mx-auto px-6 pt-20 lg:pt-32 pb-20">
        <header className="max-w-5xl mx-auto text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-black text-blue-950 mb-4 tracking-tighter">
            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Program</span>
          </motion.h1>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-orange-100 to-blue-100 shadow-xl border border-blue-100 text-blue-950 text-[13px] font-black uppercase tracking-widest">
            <Zap size={14} className="text-orange-500" /> Step {step} of 2 — {step === 1 ? 'Business Profile' : 'Select Modules'}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-5xl mx-auto bg-gradient-to-br from-blue-100 to-orange-100 rounded-[3rem] p-8 md:p-16 shadow-2xl border border-blue-500/10 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <InputField icon={<Building2 size={18} />} label="Company Name *" placeholder="Legal name" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
                <InputField icon={<Mail size={18} />} label="Business Email *" type="email" placeholder="contact@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />

                <SelectField label="Country *" icon={<Globe size={18} />} value={formData.countryId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const countryObj = countries.find(c => String(c.id) === String(id));
                    setFormData(prev => ({ ...prev, countryId: id, countryCode: countryObj?.countryCode || "", stateId: "", districtId: "" }));
                  }}
                  options={countries.map(c => ({ label: c.country, value: c.id }))}
                />

                <SelectField label="State *" icon={<MapPin size={18} />} value={formData.stateId} disabled={!formData.countryId} loading={isLoadingStates}
                  onChange={e => setFormData({ ...formData, stateId: e.target.value, districtId: "" })}
                  options={states.map(s => ({ label: s.state, value: s.id }))}
                />

                <SelectField label="District *" icon={<MapPin size={18} />} value={formData.districtId} disabled={!formData.stateId} loading={isLoadingDistricts}
                  onChange={e => setFormData({ ...formData, districtId: e.target.value })}
                  options={districts.map(d => ({ label: d.district, value: d.id }))}
                />

                <InputField icon={<Building2 size={18} />} label="City" placeholder="City name" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />

                <InputField icon={<PhoneCall size={18} />} label="Phone Number *" type="number" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <InputField icon={<PinIcon size={18} />} label="Pin Code *" type="number" placeholder="PinCode" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} />
                <InputField icon={<MapPinCheck size={18} />} label="Address Type *" type="text" placeholder="Address Type" value={formData.addressType} onChange={e => setFormData({ ...formData, addressType: e.target.value })} />

                <InputField icon={<MapPin size={18} />} label="Address Line 1 *" placeholder="Street / Area" value={formData.address1} onChange={e => setFormData({ ...formData, address1: e.target.value })} />
                <InputField icon={<MapPin size={18} />} label="Address Line 2" placeholder="Suite, Landmark, etc." value={formData.address2} onChange={e => setFormData({ ...formData, address2: e.target.value })} />

                <SelectField
                  label="Business Nature *"
                  icon={<Briefcase size={18} />}
                  value={businessNature}
                  onChange={e => {
                    setBusinessNature(e.target.value);
                    const selected = allBusinessNature.find(bn => String(bn.id) === String(e.target.value));
                    setBusinessNatureLabel(selected?.businessNature || "");
                  }}
                  options={allBusinessNature.map(bn => ({ label: bn.businessNature, value: bn.id }))}
                />
              </div>

              <button disabled={!businessNature || isLoadingModules} onClick={() => setStep(2)} className="w-full mt-12 bg-blue-950 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-600 transition-all disabled:opacity-20">
                {isLoadingModules ? "Loading..." : `Configure ${businessNatureLabel || "Modules"}`} <ChevronRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-6 hover:text-orange-500">
                  <ChevronLeft size={14} /> Back to Profile
                </button>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-950 to-slate-900 px-10 py-8 flex justify-between items-center text-white">
                    <div>
                      <h3 className="font-black uppercase tracking-widest text-sm">{moduleCategoryName}</h3>
                      <p className="text-blue-300 text-xs mt-1">Select tools for {businessNatureLabel}</p>
                    </div>
                    <LayoutGrid className="text-orange-500" size={24} />
                  </div>

                   {showConfirmation && (
                      <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
                          <h2 className="text-xl font-bold text-blue-950 mb-4">Submission Successful</h2>
                          <p className="text-sm text-slate-700 mb-6">{confirmationMessage}</p>
                          <button
                            onClick={() => {
                              setShowConfirmation(false);
                              window.location.href = "/";
                            }}
                            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                  <div className="p-4 md:p-10 space-y-2 z-10">
                    {fetchedModules.map(m => (
                      <ModuleRow key={m.id} module={m} level={0} selectedModules={selectedModules} toggleModule={toggleModule} />
                    ))}
                  </div>

                  <div className="bg-slate-50 p-8 border-t border-slate-100 flex justify-between items-center">
                    <button onClick={() => setSelectedModules({})} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500">
                      <RotateCcw size={14} /> Reset Selection
                    </button>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Selected Items</p>
                      <p className="text-xl font-black text-blue-950">{Object.values(selectedModules).filter(Boolean).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-32 pt-12 space-y-2">
                  <div className="bg-gradient-to-r from-[#112158] to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl">
                    <Receipt className="text-orange-500 mb-4" size={32} />
                    <p className="text-xs font-black uppercase tracking-widest text-blue-300">Total Due (INR)</p>
                    <div className="text-5xl font-black mt-2 mb-8 tracking-tighter">
                      ₹ {totalPrice.toLocaleString()}
                    </div>

                    <div className="space-y-4 mb-10 border-t border-white/10 pt-6">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-blue-400 uppercase tracking-widest">Base Fee</span>
                        <span>₹ {baseMandatoryPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-blue-400 uppercase tracking-widest">Add-ons</span>
                        <span>₹ {(totalPrice - baseMandatoryPrice).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <button onClick={handleFinalize} disabled={isProcessing} className="w-full bg-gradient-to-r from-orange-500 to-rose-500 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                        <ShieldCheck size={18} /> {isProcessing ? "PROCESSING..." : "FINALIZE & PAY"}
                      </button>

                      <button onClick={handleBookTrial} disabled={isProcessing} className="w-full bg-white/10 border border-white/20 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                        <CalendarDays size={18} /> BOOK A TRIAL DEMO
                      </button>
                    </div>
                   
                    <p className="text-[10px] text-center mt-6 text-blue-300 opacity-60">Trial bookings are subject to approval</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}



function ModuleRow({ module, level, selectedModules, toggleModule }) {
  const isSelected = !!selectedModules[module.id];
  const hasChildren = module.children && module.children.length > 0;
  const isChild = level > 0;

  return (
    <div className={`transition-all duration-300 ${isChild ? 'mt-2' : 'mb-6'}`}>
      <div
        onClick={() => toggleModule(module, !isSelected)}
        className={`group relative overflow-hidden transition-all duration-300 cursor-pointer
          ${isChild 
            ? `flex items-center gap-4 p-3 rounded-xl border-2 
               ${isSelected 
                 ? 'bg-blue-50/50 border-blue-200' 
                 : 'bg-white border-blue-100 hover:border-slate-200'}` 
            : `rounded-2xl border-2 shadow-sm
               ${isSelected 
                 ? 'bg-white border-blue-600 ring-4 ring-blue-600/5' 
                 : 'bg-white border-slate-200 hover:border-blue-300'}`
          }`}
      >
        {/* Left Status Accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300
          ${isSelected ? (isChild ? 'bg-orange-400' : 'bg-blue-600') : 'bg-slate-200'}`} 
        />

        <div className={`flex items-center justify-between w-full ${isChild ? '' : 'p-3'}`}>
          <div className="flex items-center gap-4">
            {/* Minimalist Checkbox */}
            <div className={`flex items-center justify-center rounded-lg transition-all duration-300
              ${isChild ? 'w-5 h-5' : 'w-6 h-6'} 
              ${isSelected 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-transparent border-2 border-slate-200'}`}>
              <Check size={isChild ? 12 : 18} strokeWidth={4} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`font-bold transition-colors
                  ${isChild ? 'text-sm text-slate-700' : 'text-lg text-slate-900'}
                  ${isSelected && !isChild ? 'text-blue-600' : ''}`}>
                  {module.name}
                </span>
                {module.mandatoryModule && (
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-slate-200">
                    Fix
                  </span>
                )}
              </div>
              <span className={`font-mono font-bold ${isChild ? 'text-xs text-orange-600' : 'text-sm text-slate-500'}`}>
                ₹{Number(module.price).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Icon */}
          <div className="flex items-center gap-3">
             {hasChildren ? (
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 ${isSelected ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} 
                />
             ) : (
                <Zap size={16} className={isSelected ? 'text-orange-500 fill-orange-500' : 'text-slate-300'} />
             )}
          </div>
        </div>
      </div>

      {/* Children Container - The "Box in Box" */}
      <AnimatePresence>
        {hasChildren && isSelected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ml-6 mt-1 p-2 rounded-b-2xl bg-slate-50 border-l-2  border-blue-700/90"
          >
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
              Included Sub-Modules
            </div>
            <div className="space-y-2">
              {module.children.map(child => (
                <ModuleRow
                  key={child.id}
                  module={child}
                  level={1}
                  selectedModules={selectedModules}
                  toggleModule={toggleModule}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div className="space-y-3 group">
      <label className="text-[13px] uppercase font-black text-blue-950 ml-1 tracking-widest">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors z-10">{icon}</div>
        <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-5 font-bold text-slate-900 focus:border-orange-500 focus:bg-white outline-none transition-all" {...props} />
      </div>
    </div>
  );
}

function SelectField({ label, icon, options = [], value, onChange, disabled, loading }) {
  return (
    <div className="space-y-3 group">
      <label className="text-[13px] uppercase font-black text-blue-950 ml-1 tracking-widest">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10">{icon}</div>
        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-12 font-bold text-slate-900 focus:border-orange-500 outline-none appearance-none disabled:opacity-50" value={value} onChange={onChange} disabled={disabled || loading}>
          <option value="">{loading ? "Loading..." : `Select ${label.replace('*', '')}`}</option>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 rotate-90 pointer-events-none" />
      </div>
    </div>
  );
}
