import React from 'react';
import { motion } from 'framer-motion';

function Tech() {

  return (
    <div className="w-full bg-transparent flex flex-col items-center justify-center px-4 py-12">
      {/* Text Section */}
      <div className="text-center space-y-4 mb-10 max-w-4xl">
        <div
          className="font-in text-[#F07C22]  text-[18px] sm:text-[20px] leading-tight"
        >
          Tech And Tools We Use
        </div>

        <div
          className="font-INB text-blue-950 text-3xl sm:text-4xl md:text-5xl leading-tight"
        >
          Robust Technologies Behind Every Product We Design and Deliver
        </div>

        <div
          className="font-INB text-[#F07C22] text-[18px] sm:text-[20px] leading-tight"
        >
          We Use Top Technologies to Build Your Dream Products
        </div>
      </div>


      <section className="flex flex-col items-center min-h-auto w-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-4 gap-2">
          {[
            {
              title: 'Frontend Development',
              images: ['48.webp', '49.webp', '50.webp', '51.webp'],
            },
            {
              title: 'Cyber Security',
              images: ['44.webp', '45.webp', '46.webp', '47.webp'],
            },
            {
              title: 'Mobile Development',
              images: ['15.webp', '16.webp', '17.webp', '18.webp'],
            },
            {
              title: 'Digital Marketing',
              images: ['1.webp', '2.webp', '3.webp', '4.webp'],
            },
            {
              title: 'Graphic Designing',
              images: ['40.webp', '41.webp', '42.webp', '43.webp'],
            },
            {
              title: 'Backend Development',
              images: ['52.webp', '53.webp', '54.webp', '55.webp'],
            },
            {
              title: 'Data Analytics',
              images: ['56.webp', '57.webp', '58.webp', '59.webp'],
            },
            {
              title: 'Data Science',
              images: ['29.webp', '22.webp', '23.webp', '24.webp'],
            },
            {
              title: 'Cloud Computing',
              images: ['33.webp', '34.webp', '35.webp', '36.webp'],
            },
            {
              title: 'Databases',
              images: ['8.webp', '9.webp', '10.webp', '11.webp'],
            },
            {
              title: 'Networking',
              images: ['60.webp', '61.webp', '62.webp', '63.webp'],
            },
            {
              title: 'AI & ML',
              images: ['26.webp', '27.webp', '25.webp', '22.webp'],
            },
          ].map((category, index, arr) => (
            <motion.div
              key={index}
              className="rounded-xl p-4 border-gray-200/50 border-2 text-center transition transform hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-950 duration-300 ease-in-out"
              initial={{ opacity: 0, x: index < arr.length / 2 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, type: "spring"}}
            >
              <div className="text-sm lg:text-md font-INB mb-5 text-blue-950">
                {category.title}
              </div>
              <div className="grid grid-cols-2 items-center gap-0 lg:gap-4 justify-center">
                {category.images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={`/${img}`}
                    alt={img.split('.')[0]}
                    className="w-auto lg:w-full lg:h-25 h-auto object-contain bg-no-repeat rounded-md hover:scale-105 transition duration-200 ease-in-out flex items-center justify-center"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Tech;
