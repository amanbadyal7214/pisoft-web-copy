"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Building2,
  GraduationCap,
  Boxes,
  Users,
  UserCheck,
  Mail,
  Phone,
  Globe,
  MapPin,
  ChevronRight,
  Briefcase,
  ChevronLeft,
  LayoutGrid,
  Receipt,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  CheckCircle,
  CalendarDays,
  Check,
  Zap,
  ChevronDown,
  PhoneCall,
  MapPinCheck,
  PinIcon,
  Lock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Clock,
  Layers,
  FileText,
  Search,
  Server,
  HelpCircle,
  CheckSquare
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

// Visual Pre-configured Industry Sectors with Graphics
const VISUAL_SECTORS = [
  {
    id: "real-estate",
    name: "Real Estate & Builders (REMS)",
    tag: "REMS ERP",
    desc: "Unit layout, booking CRM, demand letters & RERA compliance",
    icon: Building2,
    image: "/pibuilding.avif",
    matchKeywords: ["real estate", "builder", "property", "rems"]
  },
  {
    id: "education",
    name: "Education Management (SMS)",
    tag: "Education ERP",
    desc: "Admissions, student lifecycle, fee counter & gradebook",
    icon: GraduationCap,
    image: "/SCHOOL.webp",
    matchKeywords: ["education", "school", "college", "institute", "sms"]
  },
  {
    id: "inventory",
    name: "Inventory & Warehouse (WMS)",
    tag: "Warehouse ERP",
    desc: "Barcode/batch tracking, multi-warehouse & stock valuation",
    icon: Boxes,
    image: "/InventoryManagement.webp",
    matchKeywords: ["inventory", "warehouse", "wms", "stock", "supply chain"]
  },
  {
    id: "crm",
    name: "Enterprise Sales & CRM",
    tag: "Sales CRM",
    desc: "Lead pipeline, omnichannel sync & instant quote PDF",
    icon: Users,
    image: "/CRM.webp",
    matchKeywords: ["crm", "sales", "lead", "deal"]
  },
  {
    id: "hrms",
    name: "HRMS & Biometric Payroll",
    tag: "Workforce ERP",
    desc: "Biometric clock-in, PF/ESI/TDS & 1-click payroll",
    icon: UserCheck,
    image: "/HR.webp",
    matchKeywords: ["hr", "payroll", "hrms", "employee", "workforce"]
  },
  {
    id: "custom",
    name: "Custom Enterprise Solution",
    tag: "Custom Architecture",
    desc: "Modular microservices, bespoke portals & REST APIs",
    icon: Sparkles,
    image: "/erp3.webp",
    matchKeywords: ["custom", "software", "enterprise", "other"]
  }
];

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState({});
  const [businessNature, setBusinessNature] = useState("");
  const [businessNatureLabel, setBusinessNatureLabel] = useState("");
  const [selectedSectorCard, setSelectedSectorCard] = useState("real-estate");
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [allBusinessNature, setAllBusinessNature] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [deploymentMode, setDeploymentMode] = useState("cloud"); // "cloud" | "onpremise"
  const [moduleSearchQuery, setModuleSearchQuery] = useState("");

  // Confirmation Modal Handler
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

  // Cascading Address States
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    countryId: "",
    stateId: "",
    districtId: "",
    countryCode: "",
    pincode: "",
    addressType: "OFFICE"
  });

  // Load Razorpay Script & Scroll Logic
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const onScroll = () => setShowAuthButtons(window.scrollY <= 100);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  // Fetch Business Natures & Countries
  useEffect(() => {
    const fetchBusinessNatures = async () => {
      try {
        const res = await axios.get(`${baseURl}/client-business-natures`);
        const data = res.data?.data || res.data;
        const list = Array.isArray(data) ? data : [];
        setAllBusinessNature(list);

        // Pre-select first nature if available
        if (list.length > 0 && !businessNature) {
          const first = list[0];
          setBusinessNature(String(first.id));
          setBusinessNatureLabel(first.businessNature);
        }
      } catch (err) {
        console.error("Error fetching business natures:", err);
      }
    };
    fetchBusinessNatures();

    const fetchCountries = async () => {
      try {
        const res = await fetch(`${baseURl}/getAllCountries`);
        const result = await res.json();
        setCountries(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Sync Visual Sector Selection with API Business Natures
  const handleSelectVisualSector = (sector) => {
    setSelectedSectorCard(sector.id);

    // Try finding a matching business nature from the API
    if (allBusinessNature.length > 0) {
      const match = allBusinessNature.find((bn) => {
        const nameLower = (bn.businessNature || "").toLowerCase();
        return sector.matchKeywords.some((keyword) => nameLower.includes(keyword));
      });

      if (match) {
        setBusinessNature(String(match.id));
        setBusinessNatureLabel(match.businessNature);
      } else {
        // Fallback to first available or set label
        setBusinessNature(String(allBusinessNature[0].id));
        setBusinessNatureLabel(sector.name);
      }
    } else {
      setBusinessNatureLabel(sector.name);
    }

    if (validationErrors.businessNature) {
      setValidationErrors((prev) => ({ ...prev, businessNature: null }));
    }
  };

  // Fetch Modules based on selection
  useEffect(() => {
    if (!businessNature) return;
    const fetchModules = async () => {
      setIsLoadingModules(true);
      try {
        const res = await axios.get(
          `${baseURl}/business-modules/client-business-natures/${businessNature}`
        );
        const responseData = res.data?.data || res.data;
        setModuleCategoryName(responseData.moduleName || "Modules");
        setFetchedModules(responseData.modules || []);
        setBaseMandatoryPrice(responseData.mandatoryPrice || 0);

        const mandatoryOnes = {};
        const processMandatory = (list) => {
          list.forEach((m) => {
            if (m.mandatoryModule) mandatoryOnes[m.id] = true;
            if (m.children) processMandatory(m.children);
          });
        };
        processMandatory(responseData.modules || []);
        setSelectedModules(mandatoryOnes);
      } catch (err) {
        console.error("Error fetching modules:", err);
      } finally {
        setIsLoadingModules(false);
      }
    };
    fetchModules();
  }, [businessNature]);

  // Address Chain Logic: Country -> State -> District
  useEffect(() => {
    if (!formData.countryId) return;
    (async () => {
      setIsLoadingStates(true);
      try {
        const res = await fetch(`${baseURl}/state/${formData.countryId}`);
        const result = await res.json();
        setStates(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setIsLoadingStates(false);
      }
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
      } catch (err) {
        console.error("Error fetching districts:", err);
      } finally {
        setIsLoadingDistricts(false);
      }
    })();
  }, [formData.stateId]);

  // Pricing Calculation
  const totalPrice = useMemo(() => {
    const flatten = (items) => items.flatMap((i) => [i, ...(i.children ? flatten(i.children) : [])]);
    const all = flatten(fetchedModules);
    const selectedSum = Object.entries(selectedModules).reduce((sum, [id, val]) => {
      if (!val) return sum;
      const item = all.find((i) => String(i.id) === String(id));
      return sum + (Number(item?.price) || 0);
    }, 0);
    return selectedSum + baseMandatoryPrice;
  }, [selectedModules, fetchedModules, baseMandatoryPrice]);

  const toggleModule = (module, checked) => {
    if (module.mandatoryModule && !checked) return;

    let newSelected = { ...selectedModules, [module.id]: checked };
    const updateDescendants = (node, val) => {
      if (node.mandatoryModule && !val) return;
      newSelected[node.id] = val;
      node.children?.forEach((child) => updateDescendants(child, val));
    };

    if (module.children) {
      updateDescendants(module, checked);
    }

    if (!checked) {
      const updateAncestors = (modulesList) => {
        modulesList.forEach((parent) => {
          if (parent.children && parent.children.length > 0) {
            updateAncestors(parent.children);
            const anyChildSelected = parent.children.some((child) => newSelected[child.id]);
            if (!anyChildSelected && !parent.mandatoryModule) {
              newSelected[parent.id] = false;
            }
          }
        });
      };
      updateAncestors(fetchedModules);
    }

    setSelectedModules(newSelected);
  };

  const generatePayload = (paymentId = null) => {
    const selectedIds = new Set(
      Object.keys(selectedModules)
        .filter((id) => selectedModules[id])
        .map(Number)
    );

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

      node.children?.forEach((child) => traverse(child, currentLevel));
    };

    fetchedModules.forEach((root) => traverse(root));

    return {
      client: {
        ownerName: formData.companyName,
        ownerEmail: formData.email,
        ownerContactNo1: formData.phone,
        natureOfBusiness: [{ businessNature: { id: Number(businessNature) } }],
        organisatonAddressDetails: {
          addressType: formData.addressType || "OFFICE",
          address1: formData.address1,
          address2: formData.address2 || "",
          city: formData.city || "",
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
    const errors = {};
    if (!formData.companyName.trim()) errors.companyName = "Legal company name is required";
    if (!businessNature) errors.businessNature = "Please select your industry sector";
    if (!formData.email.trim()) errors.email = "Business email is required";
    if (!formData.phone.trim()) errors.phone = "Primary contact phone is required";
    if (!formData.countryId) errors.countryId = "Select operating country";
    if (!formData.stateId) errors.stateId = "Select state / territory";
    if (!formData.districtId) errors.districtId = "Select administrative district";
    if (!formData.address1.trim()) errors.address1 = "Address line 1 is required";
    if (!formData.pincode.trim()) errors.pincode = "Postal PIN code is required";

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStep(1);
      return false;
    }
    return true;
  };

  const handleStepProceed = () => {
    if (!validateForm()) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trial Access Booking
  const handleBookTrial = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const payload = generatePayload();
      await axios.post(`${baseURl}/trialAccess`, payload);

      openConfirmationModal(
        "Your private staging sandbox request is confirmed! Our engineering team in Mohali will initialize your dedicated cloud instance and email your administrative credentials within 24 hours."
      );
    } catch (err) {
      console.error("Trial Error:", err);
      alert("Submission encountered a delay. Please contact our architects directly at +91 82880 29916.");
    } finally {
      setIsProcessing(false);
    }
  };

  // RAZORPAY PAYMENT
  const handleFinalize = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);

    try {
      // 1. CREATE ORDER
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
        description: `Enterprise ERP Deployment: ${businessNatureLabel || "Custom"}`,
        order_id: order.id,

        prefill: {
          name: formData.companyName,
          email: formData.email,
          contact: formData.phone
        },

        theme: { color: "#f97316" },

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

            // SAVE CLIENT + GET PDF
            const res = await axios.post(
              `${baseURl}/saveClientAndModule/${paymentId}`,
              finalPayload,
              { responseType: "blob" }
            );

            // AUTO DOWNLOAD PDF
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            const pdfUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = `Pisoft_Tax_Invoice_${paymentId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(pdfUrl);

            openConfirmationModal(
              "Your payment is successful! Your official GST payment invoice PDF has been downloaded, and production deployment credentials will be dispatched to your registered email."
            );
          } catch (err) {
            console.error("Verification / Save Error:", err);
            alert("Payment completed but receipt generation encountered a delay. Please contact direct engineering support at +91 82880 29916.");
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
              reason: response.error?.description || "Transaction failed"
            })
          });
        } catch (err) {
          console.error("Payment failed API error:", err);
        }

        alert("Payment was not completed. Please check your banking credentials or try again.");
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment Init Error:", err);
      alert("Unable to initiate secure checkout. Please try again or reach our engineering leads directly at +91 82880 29916.");
      setIsProcessing(false);
    }
  };

  // Filtered Modules for Search
  const filteredModules = useMemo(() => {
    if (!moduleSearchQuery.trim()) return fetchedModules;
    const query = moduleSearchQuery.toLowerCase();

    return fetchedModules.filter((m) => {
      const matchName = (m.name || "").toLowerCase().includes(query);
      const matchChildren = m.children && m.children.some((c) => (c.name || "").toLowerCase().includes(query));
      return matchName || matchChildren;
    });
  }, [fetchedModules, moduleSearchQuery]);

  const activeSectorObj = VISUAL_SECTORS.find((s) => s.id === selectedSectorCard) || VISUAL_SECTORS[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-white">
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

      {/* Main Registration Portal Container */}
      <main className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-20 sm:pt-24 lg:pt-28 pb-16">
        
        {/* =========================================================================
            1. RICH ENTERPRISE HERO & VISUAL SECTOR PREVIEW
           ========================================================================= */}
        <section className="relative mb-8 sm:mb-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Luminous Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs"
            >
              <Sparkles size={14} className="text-orange-600" />
              <span>Pisoft Cloud Hub • Enterprise Licensing & Staging Console</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-INB text-[#182b67] tracking-tight leading-[1.18] sm:leading-[1.14] mb-3.5"
            >
              Configure Your Enterprise ERP <br />
              <span className="text-orange-500">Live Modular Deployment & Pricing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-6"
            >
              Tailor your industry ERP or custom enterprise platform. Select your business domain, customize modular workflows, review transparent deployment fees, and immediately launch your private staging sandbox or complete full Git code handover.
            </motion.p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl mx-auto mb-8">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                <div className="font-INB text-base sm:text-lg text-[#182b67]">12+ Yrs</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Mohali Engineering</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                <div className="font-INB text-base sm:text-lg text-emerald-600">500+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Active Deployments</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                <div className="font-INB text-base sm:text-lg text-orange-600">100%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Git Code Ownership</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                <div className="font-INB text-base sm:text-lg text-sky-600">99.9%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Cloud Uptime SLA</div>
              </div>
            </div>

            {/* High-Impact Visual Stepper Navigator */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 border border-slate-200/90 shadow-sm flex items-center justify-between">
              {/* Step 1 Pill */}
              <button
                onClick={() => setStep(1)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  step === 1
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-[#182b67] hover:bg-slate-100'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === 1 ? 'bg-white text-orange-600' : 'bg-slate-200 text-slate-700'
                }`}>
                  1
                </div>
                <span className="hidden sm:inline">01. Enterprise Profile & Territory</span>
                <span className="sm:hidden">01. Profile</span>
              </button>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200 mx-1 flex-shrink-0"></div>

              {/* Step 2 Pill */}
              <button
                onClick={() => {
                  if (validateForm()) setStep(2);
                }}
                disabled={!businessNature}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  step === 2
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-[#182b67] hover:bg-slate-100'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === 2 ? 'bg-white text-orange-600' : 'bg-slate-200 text-slate-700'
                }`}>
                  2
                </div>
                <span className="hidden sm:inline">02. Module Matrix & Deployment</span>
                <span className="sm:hidden">02. Modules</span>
              </button>
            </div>
          </div>
        </section>

        {/* Global Validation Warning */}
        {Object.keys(validationErrors).length > 0 && step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-3 shadow-xs"
          >
            <AlertCircle size={18} className="text-rose-600 flex-shrink-0" />
            <span>Please complete all required fields marked with * below to generate your modular configuration.</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* =========================================================================
                STEP 1: INTERACTIVE SECTOR SELECTOR & REGISTRATION PROFILE
               ========================================================================= */
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Visual Sector Selector Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-100">
                  <div>
                    <span className="text-orange-600 font-bold uppercase tracking-wider text-xs">
                      Step 1 • Visual Sector Selector
                    </span>
                    <h2 className="text-xl sm:text-2xl font-INB text-[#182b67] mt-0.5">
                      Select Your Operating Industry Sector
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Click your enterprise domain below to load tailored modules, workflows, and Indian regulatory compliance frameworks.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200">
                      Active: {activeSectorObj.tag}
                    </span>
                  </div>
                </div>

                {/* 6 Visual Sector Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 mb-6">
                  {VISUAL_SECTORS.map((sector) => {
                    const Icon = sector.icon;
                    const isSelected = selectedSectorCard === sector.id;

                    return (
                      <div
                        key={sector.id}
                        onClick={() => handleSelectVisualSector(sector)}
                        className={`group p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                          isSelected
                            ? 'bg-orange-50/50 border-orange-500 shadow-md ring-2 ring-orange-500/10'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}

                        <div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-[#182b67]/10 text-[#182b67] group-hover:bg-[#182b67] group-hover:text-white'
                          }`}>
                            <Icon size={20} />
                          </div>

                          <h3 className={`font-INB text-xs sm:text-sm leading-snug mb-1.5 ${
                            isSelected ? 'text-orange-700' : 'text-[#182b67]'
                          }`}>
                            {sector.name}
                          </h3>

                          <p className="text-[11px] text-slate-500 leading-tight">
                            {sector.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                          <span className={isSelected ? 'text-orange-600' : 'text-slate-400'}>
                            {sector.tag}
                          </span>
                          <span className={isSelected ? 'text-orange-600 font-extrabold' : 'text-slate-400'}>
                            {isSelected ? 'SELECTED ●' : 'SELECT →'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Sector Live Showcase Preview Strip */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#182b67] to-[#12245c] text-white flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeSectorObj.image}
                      alt={activeSectorObj.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 border-orange-400/60 shadow-md flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                          Ready for Deployment
                        </span>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Full Indian Statutory Rules Included
                        </span>
                      </div>
                      <h4 className="font-INB text-base sm:text-lg text-white">
                        {activeSectorObj.name}
                      </h4>
                      <p className="text-blue-100/75 text-xs max-w-xl leading-relaxed">
                        Pre-integrated with GST invoicing, automated ledger postings, role-based mobile apps, and direct Mohali engineering lead assignment.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStepProceed}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    <span>Proceed to Modules</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Enterprise Profile & Operating Jurisdiction Dual Forms */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Form Column 1: Organization & Primary Channels (6 Cols) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                          <Building2 size={16} />
                        </div>
                        <h3 className="font-INB text-base text-[#182b67]">Enterprise Profile</h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                        Section 01
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Legal Company Name */}
                      <ModernInputField
                        icon={<Building2 size={16} />}
                        label="Company Legal Name *"
                        placeholder="e.g. Paramount Global Infrastructures Pvt. Ltd."
                        value={formData.companyName}
                        error={validationErrors.companyName}
                        onChange={(e) => {
                          setFormData({ ...formData, companyName: e.target.value });
                          if (validationErrors.companyName) setValidationErrors((prev) => ({ ...prev, companyName: null }));
                        }}
                      />

                      {/* Business Nature / Sector Selector */}
                      <ModernSelectField
                        label="Selected Enterprise Industry Domain *"
                        icon={<Briefcase size={16} />}
                        value={businessNature}
                        error={validationErrors.businessNature}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBusinessNature(val);
                          const selected = allBusinessNature.find((bn) => String(bn.id) === String(val));
                          setBusinessNatureLabel(selected?.businessNature || "");
                          if (validationErrors.businessNature) setValidationErrors((prev) => ({ ...prev, businessNature: null }));
                        }}
                        options={allBusinessNature.map((bn) => ({ label: bn.businessNature, value: bn.id }))}
                      />

                      {/* Work Email */}
                      <ModernInputField
                        icon={<Mail size={16} />}
                        label="Corporate Work Email *"
                        type="email"
                        placeholder="director@company.com"
                        value={formData.email}
                        error={validationErrors.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (validationErrors.email) setValidationErrors((prev) => ({ ...prev, email: null }));
                        }}
                      />

                      {/* Contact Phone */}
                      <ModernInputField
                        icon={<PhoneCall size={16} />}
                        label="Primary Direct Contact Phone *"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        error={validationErrors.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (validationErrors.phone) setValidationErrors((prev) => ({ ...prev, phone: null }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                    <Lock size={12} className="text-orange-500" />
                    <span>Information encrypted and strictly confidential under corporate NDA.</span>
                  </div>
                </div>

                {/* Form Column 2: Deployment Jurisdiction & Registered Address (6 Cols) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <h3 className="font-INB text-base text-[#182b67]">Registered Operating Territory</h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                        Section 02
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Country & State */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <ModernSelectField
                          label="Country *"
                          icon={<Globe size={16} />}
                          value={formData.countryId}
                          error={validationErrors.countryId}
                          onChange={(e) => {
                            const id = e.target.value;
                            const countryObj = countries.find((c) => String(c.id) === String(id));
                            setFormData((prev) => ({
                              ...prev,
                              countryId: id,
                              countryCode: countryObj?.countryCode || "",
                              stateId: "",
                              districtId: ""
                            }));
                            if (validationErrors.countryId) setValidationErrors((prev) => ({ ...prev, countryId: null }));
                          }}
                          options={countries.map((c) => ({ label: c.country, value: c.id }))}
                        />

                        <ModernSelectField
                          label="State / Territory *"
                          icon={<MapPin size={16} />}
                          value={formData.stateId}
                          disabled={!formData.countryId}
                          loading={isLoadingStates}
                          error={validationErrors.stateId}
                          onChange={(e) => {
                            setFormData({ ...formData, stateId: e.target.value, districtId: "" });
                            if (validationErrors.stateId) setValidationErrors((prev) => ({ ...prev, stateId: null }));
                          }}
                          options={states.map((s) => ({ label: s.state, value: s.id }))}
                        />
                      </div>

                      {/* District & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <ModernSelectField
                          label="Administrative District *"
                          icon={<MapPin size={16} />}
                          value={formData.districtId}
                          disabled={!formData.stateId}
                          loading={isLoadingDistricts}
                          error={validationErrors.districtId}
                          onChange={(e) => {
                            setFormData({ ...formData, districtId: e.target.value });
                            if (validationErrors.districtId) setValidationErrors((prev) => ({ ...prev, districtId: null }));
                          }}
                          options={districts.map((d) => ({ label: d.district, value: d.id }))}
                        />

                        <ModernInputField
                          icon={<Building2 size={16} />}
                          label="City / Hub"
                          placeholder="e.g. Mohali / Chandigarh"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>

                      {/* Address Type & PIN Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <ModernSelectField
                          label="Facility Address Type *"
                          icon={<MapPinCheck size={16} />}
                          value={formData.addressType}
                          onChange={(e) => setFormData({ ...formData, addressType: e.target.value })}
                          options={[
                            { label: "Corporate Office", value: "OFFICE" },
                            { label: "Headquarters", value: "HEADQUARTERS" },
                            { label: "Regional / Branch Office", value: "BRANCH" },
                            { label: "Factory / Plant", value: "FACTORY" },
                            { label: "Commercial Facility", value: "COMMERCIAL" }
                          ]}
                        />

                        <ModernInputField
                          icon={<PinIcon size={16} />}
                          label="Postal PIN Code *"
                          type="text"
                          placeholder="140307"
                          value={formData.pincode}
                          error={validationErrors.pincode}
                          onChange={(e) => {
                            setFormData({ ...formData, pincode: e.target.value });
                            if (validationErrors.pincode) setValidationErrors((prev) => ({ ...prev, pincode: null }));
                          }}
                        />
                      </div>

                      {/* Address Lines */}
                      <ModernInputField
                        icon={<MapPin size={16} />}
                        label="Registered Address Line 1 *"
                        placeholder="F-468, Industrial Focal Point, Phase 8-B"
                        value={formData.address1}
                        error={validationErrors.address1}
                        onChange={(e) => {
                          setFormData({ ...formData, address1: e.target.value });
                          if (validationErrors.address1) setValidationErrors((prev) => ({ ...prev, address1: null }));
                        }}
                      />

                      <ModernInputField
                        icon={<MapPin size={16} />}
                        label="Address Line 2 (Suite / Landmark)"
                        placeholder="Near S.A.S. Nagar Industrial Zone"
                        value={formData.address2}
                        onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Tax invoice & statutory GST ledger will be registered against this jurisdiction.</span>
                  </div>
                </div>
              </div>

              {/* Action Proceed Strip */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-INB text-lg text-[#182b67]">Ready to Customize Capabilities?</h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Proceed to choose your exact core modules, view instant pricing breakdown, and initialize your deployment roadmap.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!businessNature || isLoadingModules}
                  onClick={handleStepProceed}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-INB text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  {isLoadingModules ? (
                    <span>Loading Modular Matrix...</span>
                  ) : (
                    <>
                      <span>Configure Modules & Pricing Engine</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
                STEP 2: MODULAR ARCHITECTURE MATRIX & STICKY INVESTMENT CONSOLE
               ========================================================================= */
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
              {/* Left Column: Interactive Module Studio (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Back Bar & Quick Sector Stat */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#182b67] hover:text-orange-600 transition cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>Back to Organization Profile</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Target Industry:</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                      {businessNatureLabel || "Enterprise"}
                    </span>
                  </div>
                </div>

                {/* Module Catalog Main Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Deep Navy Card Header */}
                  <div className="bg-[#182b67] p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-orange-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                        Interactive Modular Architecture Studio
                      </div>
                      <h3 className="font-INB text-xl sm:text-2xl text-white">
                        {moduleCategoryName || "Core Solution Modules"}
                      </h3>
                      <p className="text-blue-100/75 text-xs sm:text-sm mt-1 max-w-xl">
                        Activate the functional modules your organization requires. Core engine modules are automatically locked for operational integrity.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white flex items-center gap-2">
                        <Layers size={15} className="text-orange-400" />
                        <span>{Object.values(selectedModules).filter(Boolean).length} Modules Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar & Quick Filters Bar */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search modules..."
                        value={moduleSearchQuery}
                        onChange={(e) => setModuleSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={() => {
                          const allOnes = {};
                          const selectAll = (list) => {
                            list.forEach((m) => {
                              allOnes[m.id] = true;
                              if (m.children) selectAll(m.children);
                            });
                          };
                          selectAll(fetchedModules);
                          setSelectedModules(allOnes);
                        }}
                        className="text-xs font-bold text-[#182b67] hover:text-orange-600 transition cursor-pointer"
                      >
                        + Select All Available
                      </button>

                      <div className="w-1 h-3 bg-slate-300"></div>

                      <button
                        onClick={() => {
                          const mandatoryOnly = {};
                          const resetToMandatory = (list) => {
                            list.forEach((m) => {
                              if (m.mandatoryModule) mandatoryOnly[m.id] = true;
                              if (m.children) resetToMandatory(m.children);
                            });
                          };
                          resetToMandatory(fetchedModules);
                          setSelectedModules(mandatoryOnly);
                        }}
                        className="text-xs font-bold text-slate-500 hover:text-orange-600 transition cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw size={12} />
                        <span>Reset Core</span>
                      </button>
                    </div>
                  </div>

                  {/* Module Cards Grid */}
                  <div className="p-4 sm:p-6 space-y-3">
                    {filteredModules.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-sm">
                        {moduleSearchQuery ? "No modules matching your query." : "Loading modular architecture catalog..."}
                      </div>
                    ) : (
                      filteredModules.map((m) => (
                        <ModernModuleRow
                          key={m.id}
                          module={m}
                          level={0}
                          selectedModules={selectedModules}
                          toggleModule={toggleModule}
                        />
                      ))
                    )}
                  </div>

                  {/* Summary Bar at Bottom of Catalog */}
                  <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200/80 flex items-center justify-between">
                    <div className="text-xs text-slate-600">
                      Mandatory Core Engine: <span className="font-bold text-[#182b67]">₹ {baseMandatoryPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="text-right text-xs">
                      Total Selected: <span className="font-bold text-orange-600">₹ {totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Deployment Console & Checkout (4 Cols) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <div className="bg-gradient-to-br from-[#182b67] via-[#101e4a] to-[#0c1636] text-white rounded-3xl p-6 sm:p-7 border border-[#182b67]/60 shadow-xl relative overflow-hidden">
                  
                  {/* Subtle Orange Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-400/30 flex items-center justify-center">
                          <Receipt size={16} />
                        </div>
                        <h4 className="font-INB text-sm uppercase tracking-wider text-white">Deployment Console</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white">
                        Live Quote
                      </span>
                    </div>

                    {/* Total Price Display */}
                    <div className="py-2 mb-4 border-b border-white/10">
                      <div className="text-xs text-blue-200/70 uppercase tracking-wider">Total Enterprise Deployment</div>
                      <div className="text-3xl sm:text-4xl font-INB text-white tracking-tight mt-1 flex items-baseline gap-1.5">
                        <span>₹ {totalPrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs font-normal text-blue-200/60 uppercase">INR</span>
                      </div>
                    </div>

                    {/* Hosting Mode Switcher */}
                    <div className="mb-5 p-3 rounded-2xl bg-white/[0.07] border border-white/10">
                      <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider mb-2">
                        Deployment Infrastructure
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeploymentMode("cloud")}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                            deploymentMode === "cloud"
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-white/10 text-blue-200 hover:bg-white/15'
                          }`}
                        >
                          AWS Cloud (99.9%)
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeploymentMode("onpremise")}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                            deploymentMode === "onpremise"
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-white/10 text-blue-200 hover:bg-white/15'
                          }`}
                        >
                          On-Premises Server
                        </button>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-2.5 text-xs mb-6">
                      <div className="flex justify-between items-center text-blue-100/80">
                        <span>Base Core Engine Fee</span>
                        <span className="font-mono font-bold text-white">₹ {baseMandatoryPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-blue-100/80">
                        <span>Selected Functional Add-ons</span>
                        <span className="font-mono font-bold text-white">
                          ₹ {(totalPrice - baseMandatoryPrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-blue-100/80">
                        <span>14-Day Staging Cloud Sandbox</span>
                        <span className="font-bold text-emerald-400">Included Free</span>
                      </div>
                      <div className="flex justify-between items-center text-blue-100/80">
                        <span>Source Code Handover & Git IP</span>
                        <span className="font-bold text-orange-400">100% Perpetual</span>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="space-y-2.5">
                      <button
                        onClick={handleFinalize}
                        disabled={isProcessing}
                        className="w-full py-4 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-INB text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:transform-none"
                      >
                        <ShieldCheck size={16} />
                        <span>{isProcessing ? "Processing Security Check..." : "Finalize & Secure Deployment"}</span>
                      </button>

                      <button
                        onClick={handleBookTrial}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-INB text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CalendarDays size={15} />
                        <span>Schedule 14-Day Staging Sandbox</span>
                      </button>
                    </div>

                    {/* Trust Footnotes */}
                    <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-[10px] text-blue-200/60 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Lock size={11} className="text-emerald-400" />
                        <span>Razorpay 256-Bit SSL Encrypted Payment Gateway</span>
                      </div>
                      <div>Automated official GST invoice downloaded upon completion.</div>
                    </div>
                  </div>
                </div>

                {/* Direct Engineering Support Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-INB text-xs text-[#182b67]">Have Specialized Scope Inquiries?</h5>
                    <p className="text-[11px] text-slate-500">Connect directly with our senior software architects in Mohali.</p>
                  </div>
                  <a
                    href="tel:+918288029916"
                    className="p-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white transition flex-shrink-0 shadow-md shadow-orange-500/20"
                    title="Call Senior Architect"
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            CONFIRMATION POPUP MODAL
           ========================================================================= */}
        <AnimatePresence>
          {showConfirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl border border-slate-100 relative"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="text-xl sm:text-2xl font-INB text-[#182b67] mb-2">
                  Registration & Order Received
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {confirmationMessage}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-6 space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enterprise:</span>
                    <strong className="text-slate-800">{formData.companyName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sector Domain:</span>
                    <strong className="text-slate-800">{businessNatureLabel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deployment Node:</span>
                    <strong className="text-emerald-600">Mohali Cloud Node Online</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Technical Hotline:</span>
                    <strong className="text-[#182b67]">+91 82880 29916</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      window.location.href = "/";
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-INB text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-orange-500/20"
                  >
                    Return to Homepage
                  </button>

                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// =============================================================================
// SUB-COMPONENTS: MODERN MODULE ROW & FORM INPUTS
// =============================================================================

function ModernModuleRow({ module, level, selectedModules, toggleModule }) {
  const isSelected = !!selectedModules[module.id];
  const hasChildren = module.children && module.children.length > 0;
  const isChild = level > 0;

  return (
    <div className={`transition-all duration-200 ${isChild ? 'mt-2' : 'mb-3'}`}>
      <div
        onClick={() => toggleModule(module, !isSelected)}
        className={`group relative overflow-hidden transition-all duration-200 cursor-pointer rounded-2xl border ${
          isChild
            ? isSelected
              ? 'bg-orange-50/50 border-orange-300 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
            : isSelected
              ? 'bg-white border-orange-400 shadow-sm ring-2 ring-orange-500/10'
              : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
      >
        {/* Left Status Accent Indicator Bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-200 ${
            isSelected
              ? isChild
                ? 'bg-orange-400'
                : 'bg-orange-500'
              : 'bg-slate-200 group-hover:bg-slate-300'
          }`}
        />

        <div className="p-3.5 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Custom Modern Checkbox */}
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 border border-slate-300 text-transparent'
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`font-INB leading-snug transition-colors ${
                    isChild ? 'text-xs text-slate-800' : 'text-sm text-[#182b67]'
                  } ${isSelected && !isChild ? 'text-orange-600' : ''}`}
                >
                  {module.name}
                </span>

                {module.mandatoryModule && (
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-slate-200">
                    Core Mandatory
                  </span>
                )}
              </div>

              <span className="font-mono text-xs font-bold text-orange-600 mt-0.5">
                ₹ {Number(module.price).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action Icon / Chevron */}
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <span className="hidden sm:inline">
                  {module.children.length} Sub-modules
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSelected ? 'rotate-180 text-orange-500' : 'text-slate-400'
                  }`}
                />
              </div>
            ) : (
              <Zap
                size={14}
                className={isSelected ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}
              />
            )}
          </div>
        </div>
      </div>

      {/* Children Sub-modules Container */}
      <AnimatePresence>
        {hasChildren && isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 sm:ml-6 mt-1.5 pl-3 sm:pl-4 py-2 border-l-2 border-orange-400/60 space-y-2 overflow-hidden"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
              Included Functional Sub-capabilities
            </div>
            {module.children.map((child) => (
              <ModernModuleRow
                key={child.id}
                module={child}
                level={1}
                selectedModules={selectedModules}
                toggleModule={toggleModule}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModernInputField({ icon, label, error, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </div>
        <input
          className={`w-full py-3 pl-10 pr-3.5 rounded-xl border text-xs sm:text-sm outline-none transition bg-white ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}

function ModernSelectField({ label, icon, options = [], value, onChange, disabled, loading, error }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          {icon}
        </div>
        <select
          className={`w-full py-3 pl-10 pr-9 rounded-xl border text-xs sm:text-sm outline-none appearance-none transition bg-white cursor-pointer disabled:opacity-50 disabled:bg-slate-50 ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
        >
          <option value="">{loading ? "Loading..." : `Select ${label.replace('*', '').trim()}`}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
