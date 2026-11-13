import React from 'react'
import { FiMail, FiInfo, FiPhone } from "react-icons/fi";
import { useState, useEffect } from "react";
import { baseURl } from '../../../baseURL';
import ReCAPTCHA from "react-google-recaptcha";

function Form() {

    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        mobileNo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = `${formData.firstName} ${formData.lastName}`;

        const payload = {
            contact: {
                name: fullName,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                mobileNo: formData.mobileNo,
            },
            recaptchaToken: recaptchaToken,
        };

        try {
            const response = await fetch(`${baseURl}/saveContactUs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to send form");
            }

            alert("Form submitted successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: "",
                mobileNo: "",
            });
            setRecaptchaToken(null);
        } catch (err) {
            console.error(err);
            alert("Error submitting form.");
        }
    };


    const [contactNo1, setContactNo1] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch(`${baseURl}/aboutUs`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setContactNo1(data.contactNo1 || "");
                setEmail(data.email || "");
            } catch (err) {
                console.error("Failed to fetch about us data:", err);
            }
        };
        fetchAboutData();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap text-xl sm:text-2xl font-bold font-INB mb-4">
                <p className="text-gray-900  mr-2">Get in Touch</p>
                <p className="text-gray-900">with us</p>
            </div>
            <p className="text-gray-700 font-in mb-2">
                Fill this form to reach our team or mail us at:
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-1">
                <FiMail />
                <a
                    href={`mailto:${email}`}
                    className="hover:underline"
                >
                    {email}
                </a>
            </p>

            {/* PHONE */}
            <p className="flex items-center gap-2 text-gray-700 mb-6">
                <FiPhone />
                <a
                    href={`tel:${contactNo1}`}
                    className="hover:underline"
                >
                    {contactNo1}
                </a>
            </p>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-2 rounded-lg shadow-md max-w-auto">

                {/* First and last name */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="firstName" className="font-INB text-sm mb-1 block">
                            First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 placeholder:font-INB tracking-widest"
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                        <label htmlFor="lastName" className="font-INB text-sm mb-1 block">
                            Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 placeholder:font-INB tracking-widest"
                        />
                    </div>
                </div>

                {/* Email and contact */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="email" className="font-INB text-sm mb-1 block">
                            Email <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 placeholder:font-INB tracking-widest"
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                        <label htmlFor="mobileNo" className="font-INB text-sm mb-1 block">
                            Contact Number <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="mobileNo"
                            type="tel"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 placeholder:font-INB tracking-widest"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="font-INB text-sm mb-1 block">
                        Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 placeholder:font-INB tracking-widest"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="font-INB text-sm mb-1 block">
                        Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-400 placeholder-gray-700 bg-transparent focus:outline-none focus:border-orange-500 p-1 resize-none placeholder:font-INB tracking-widest"
                    />
                </div>

                <ReCAPTCHA
                    sitekey="6Le5HMgrAAAAADHeshTHDFlC0TjGYlI_YI9bXL4L"
                    onChange={handleRecaptchaChange}
                />

                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold font-INB tracking-widest py-2 px-4 rounded-md"
                >
                    Submit
                </button>

            </form>

        </div>
    )
}

export default Form