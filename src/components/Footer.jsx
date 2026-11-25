"use client";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube} from "react-icons/fa";
import {Mail , Phone, PhoneCall} from "lucide-react"
import CircularText from "./Circlet";
import { useState, useEffect } from "react";
import { baseURl } from "../../baseURL";
import { Link } from "react-router-dom"; 

const Footer = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactNo1, setContactNo1] = useState("");
  const [contactNo2, setContactNo2] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressDist, setAddressDist] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${baseURl}/aboutUs`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCompanyName(data.companyName || "");
        setContactNo1(data.contactNo1 || "");
        setContactNo2(data.contactNo2 || "");
        setEmail(data.email || "");
        setAddressLine(data.addressLine1 || "");
        setAddressLine2(data.addressLine2 || "");
        setAddressDist(data.addressDistrict || "");
        setAddressState(data.addressState || "");
        setAddressCountry(data.addressCountry || "");
        setPincode(data.pincode || "140307");
        setCity(data.city || "SAS Nagar");
      } catch (err) {
        console.error("Failed to fetch about us data:", err);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <footer className="bg-[#122155] text-white px-6 sm:px-12 md:px-24 relative z-10 py-3 max-w-screen">
      <div className="max-w-[110rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12 border-b border-gray-700 pb-12">
        
        {/* Branding */}
        <div className="flex flex-col items-center mt-5">
          <div className="relative lg:w-45 lg:h-45 sm:w-36 sm:h-36 md:w-40 md:h-40">
            <CircularText
              text="PISOFT ✦ INFORMATICS ✦ "
              onHover="speedUp"
              spinDuration={15}
              className="custom-class"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-start items-center mt-5">
          <div className="w-full flex items-center justify-center">
            <div className="text-xl font-bold tracking-wide lg:-ml-20 text-white uppercase mb-4">QUICK LINKS</div>
          </div>
          <ul className="grid grid-cols-2 gap-y-2.5 gap-x-7 lg:gap-x-0 text-white text-base sm:text-[1.05rem] w-full">
            <li className="text-right lg:text-left"><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li className="text-left"><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
            <li className="text-right lg:text-left"><Link to="/ERPSolutions" className="hover:text-orange-400 transition">ERP Services</Link></li>
            <li className="text-left"><Link to="/WebApplications" className="hover:text-orange-400 transition">More Services</Link></li>
            <li className="text-right lg:text-left"><Link to="/ourGallery" className="hover:text-orange-400 transition">Gallery</Link></li>
            <li className="text-right lg:text-left"><Link to="/free-training" className="hover:text-orange-400 transition">Free Training</Link></li>
            <li className="text-left"><Link to="/InternshipProgram" className="hover:text-orange-400 transition">Internship</Link></li>
            <li className="text-right lg:text-left"><Link to="/contact" className="hover:text-orange-400 transition">Contact Us</Link></li>
            <li className="text-left">
              <Link to="/Privacy-Policy" className="hover:text-orange-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Mission & Social */}
        <div className="flex flex-col items-center mt-5">
          <p className="not-italic text-white font-md text-sm sm:text-[1.05rem] leading-normal [text-align:justify]">
            Empowering your digital transformation with innovative IT technologies. Trusted by global businesses for reliable, future-ready digital services.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://www.facebook.com/pisoftinformatics" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-full hover:bg-blue-500 transition duration-300"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/company/pisoft-informatics/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-full hover:bg-blue-600 transition duration-300"><FaLinkedinIn /></a>
            <a href="https://youtube.com/@pisoftinformatics?si=vOpTFinURdfh_1Hu" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-full hover:bg-red-500 transition duration-300"><FaYoutube /></a>
            <a href="https://www.instagram.com/pisoftinformaticspvtltd/?hl=en" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-full hover:bg-pink-500 transition duration-300"><FaInstagram /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center text-center mt-5">
          <div className="text-sm sm:text-[1.05rem] font-bold tracking-wide text-white uppercase mb-2">Contact</div>
          <address className="not-italic text-gray-300 font-md text-sm sm:text-lg leading-loose lg:leading-relaxed">
            <p>{addressLine} {addressLine2} {city}</p>
            <p>{addressDist}, {addressState}, {pincode}, {addressCountry}</p>
            <p><Mail className="inline-block w-5 h-5 mr-3" /> {email}</p>
            <p><PhoneCall className="inline-block w-5 h-5 mr-3" /> {contactNo2}, {contactNo1}</p>
          </address>
        </div>
      </div>

      <div className="mt-10 text-center text-md sm:text-md lg:text-base text-gray-400 tracking-wider leading-loose">
        © <span className="text-white font-semibold">{companyName}</span> All rights reserved. | <Link to="/T&C" title="Terms and Conditions" className="text-white cursor-pointer leading-loose underline leading-wider">T&C</Link> | <Link to="/Privacy-Policy" title="Privacy Policy" className="text-white underline cursor-pointer">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;