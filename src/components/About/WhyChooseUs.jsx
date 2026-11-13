import React, { useEffect, useRef, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { baseURl } from '../../../baseURL';
import { LuFileStack } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";

const iconList = [LuFileStack, FaPeopleGroup, MdMiscellaneousServices, SiFuturelearn];

const WhyUs = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseURl}/org/why-choose-us/modes/OFFLINE`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const jsonData = await response.json();
        setFeatures(jsonData);
      } catch (error) {
        console.error("Error fetching values:", error);
        setFeatures([
          {
            id: 0,
            header: "Error",
            content: "Failed to load content.",
          },
        ]);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="max-w-screen px-4 pt-5 lg:pb-8 md:px-20 bg-white flex flex-col lg:flex-row items-center justify-center ">
      <img
        src="/WhyChooseUs.webp"
        alt="Illustration highlighting reasons why customers should choose our company"
        loading="lazy"
        width="911"
        height="818"
        sizes="(max-width: 1024px) 250px, 320px"
        className="w-[250px] h-[250px] lg:w-[320px] lg:h-[320px] hover:scale-105 transform transition-all ease-in-out object-contain"
      />

      <div className="flex flex-row justify-center items-center gap-12">
        <div className="bg-orange-100 hidden rounded-full w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] lg:flex flex-col items-center justify-center text-gray-800 text-sm md:text-[0.9rem] px-5 text-center shadow-inner hover:scale-105 transform transition-all ease-in-out">
          <p className="mb-2">We provide exceptional service with unmatched dedication.</p>
          <p>Your satisfaction is our mission. Discover the difference.</p>
        </div>

        <div className="flex flex-col gap-6">
          {features.map((feature, index) => {
            const Icon = iconList[index % iconList.length] || FaQuestion;
            const bgColor = ['bg-blue-950', 'bg-orange-400', 'bg-blue-950', 'bg-orange-400'][index % 4];

            return (
              <div key={feature.id || index} className="feature-item flex items-start gap-4">
                <div className={`w-13 h-13 rounded-full flex items-center justify-center text-white ${bgColor}`}>
                  <Icon className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{feature.header}</h4>
                  <p className="text-gray-600 text-sm">{feature.content}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
