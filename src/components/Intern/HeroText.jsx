import React from 'react'
import { FlipWords } from './flipwords'
import { motion } from 'framer-motion'

export default function HeroText() {
    return (
        <section className="flex flex-col items-center justify-center h-[200px] md:h-[500px] lg:h-[600px] px-6 md:px-16">
            {/* Hero Text */}
            <div className="z-10 text-center md:text-left max-w-4xl">
                <motion.h1
                    className="text-2xl md:text-5xl font-INB text-[#F07C22]  drop-shadow-lg"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Welcome to our
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-5xl font-INB text-blue-950"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Internship Programs <br />
                    <motion.span
                        className="text-xl md:text-3xl text-blue-950"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        That are
                    </motion.span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <FlipWords
                        words={['Secure', 'Modern', 'Scalable']}
                        className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-[#F07C22] "
                    />
                </motion.div>
            </div>
        </section>
    );
}
