import React, { useEffect, useState, useRef } from 'react';
import { TbPinned } from "react-icons/tb";
import BlurText from '../BlurText';
import { motion } from 'framer-motion';
import { baseURl } from '../../../baseURL';

function OurExpertise() {
    // Static fallback data
    const staticExpertise = [
        {
            id: 1,
            header: 'Software Development',
            content: 'Custom software solutions, mobile app development, and web development.',
        },
        {
            id: 2,
            header: 'ERP Solutions',
            content: 'Education Sector, Finance, Retail, Wholesale, Real Estate, Medical Sector.',
        },
        {
            id: 3,
            header: 'Digital Marketing',
            content: 'Social Media, SEO, Digital Advertisement, SMS, WhatsApp, E-mails.',
        },
        {
            id: 4,
            header: 'IT Consulting',
            content: 'Strategic planning, IT infrastructure management, and cloud computing.',
        },
    ];

    const [values, setValues] = useState(staticExpertise); // Default to static data
    const cardsRef = useRef([]);
    const [maxHeight, setMaxHeight] = useState(0);

    const bgColors = [
        'bg-green-100',
        'bg-yellow-100',
        'bg-blue-100',
        'bg-red-100',
        'bg-purple-100',
        'bg-pink-100',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURl}/org/our-expertises/modes/OFFLINE`);
                if (!response.ok) throw new Error('Failed to fetch');

                const jsonData = await response.json();

                // Replace static only if valid data is fetched
                if (Array.isArray(jsonData) && jsonData.length > 0) {
                    setValues(jsonData);
                }
            } catch (error) {
                console.error('Error fetching values:', error);
                // Keep static data
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (cardsRef.current.length) {
            const heights = cardsRef.current.map(card => card?.offsetHeight || 0);
            setMaxHeight(Math.max(...heights));
        }
    }, [values]);

    return (
        <div className="flex flex-col justify-center items-center py-2 md:py-8 px-6">
            <div className="flex justify-center items-center max-w-screen mb-8 text-center">
                <BlurText
                    text="Our Expertise"
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="font-INB text-2xl sm:text-3xl md:text-5xl text-center text-blue-950"
                />
            </div>

            <div className="relative max-w-7xl flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center lg:grid-cols-4 gap-6 pb-4">
                    {values.map((value, index) => {
                        const bgColor = bgColors[index % bgColors.length];

                        return (
                            <motion.div
                                key={value.id}
                                ref={el => (cardsRef.current[index] = el)}
                                style={{ height: maxHeight || 'auto' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.15 }}
                                whileHover={{ scale: 1.05 }}
                                className={`min-w-[230px] sm:min-w-[250px] h-auto max-w-[300px] ${bgColor} rounded-3xl shadow-md p-4 flex flex-col cursor-pointer`}
                            >
                                <div className="text-xl mb-4"><TbPinned /></div>
                                <div className="text-xl font-INB mb-2">{value.header}</div>
                                <p className="text-base font-in text-gray-700 flex-grow">{value.content}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OurExpertise;
