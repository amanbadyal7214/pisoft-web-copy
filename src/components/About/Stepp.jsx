import React from 'react';
import Stepper, { Step } from '../Stepper';

function Stepp() {

  return (
    <div className="flex max-w-[100rem] flex-col md:flex-row w-full h-auto px-4 sm:px-6">
      <div className="w-full flex items-center justify-center">
        <Stepper
          initialStep={1}
          onStepChange={(step) => console.log(step)}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
          stepContainerClassName="justify-center"
          contentClassName="text-center"
        >
          <Step>
            <div className="flex flex-col items-center space-y-4">
              <img
                src="meeting.avif"
                alt="Center Illustration"
                loading="lazy"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 250px"
                className="w-auto max-w-[250px] h-[90px] sm:h-[90px] object-contain rounded-full"
              />
              <div className="text-2xl sm:text-3xl md:text-[29px] font-in text-gray-800">
                We Start By Listening
              </div>
              <p className="text-black font-in text-sm text-justify md:text-center sm:text-base md:text-lg max-w-[90%] sm:max-w-[700px]">
                We begin by actively listening to our clients through open dialogue and detailed discussions, we gather all requirements to align our solutions with their vision.
              </p>
            </div>
          </Step>

          <Step>
            <div className="flex flex-col items-center space-y-4">

              <img
                src="Plan.webp"
                alt="Next Step"
                loading="lazy"
                sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 120px"
                className="w-auto max-w-[120px] h-[80px] sm:h-[100px] object-contain"
              />
              <div className="text-2xl sm:text-3xl md:text-[32px] font-in text-black">
                Planning & Strategy
              </div>
              <p className="text-black font-in text-sm text-justify md:text-center sm:text-base md:text-lg max-w-[90%] sm:max-w-[700px]">
                We create a tailored plan and strategy to align the project goals with the client’s vision and timeline.
              </p>
            </div>
          </Step>

          <Step>
            <div className="flex flex-col items-center space-y-4">
              <img
                src="Develop.webp"
                alt="Final Step"
                loading="lazy"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 200px"
                className="w-auto max-w-[200px] h-[80px] sm:h-[90px] object-contain rounded-full"
              />
              <div className="text-2xl sm:text-3xl md:text-[32px] font-in text-gray-800">
                Development
              </div>
              <p className="text-black font-in text-sm text-justify md:text-center sm:text-base md:text-lg max-w-[90%] sm:max-w-[700px]">
                We transform ideas into reality through intuitive design and robust development tailored to client needs.
              </p>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col items-center space-y-4">
              <img
                src="test.avif"
                alt="Final Step"
                loading="lazy"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 200px"
                className="w-auto max-w-[200px] h-[80px] sm:h-[90px] object-contain rounded-full"
              />
              <div className="text-2xl sm:text-3xl md:text-[32px] font-in text-gray-800">
                Testing and Optimizations
              </div>
              <p className="text-black font-in text-sm text-justify md:text-center sm:text-base md:text-lg max-w-[90%] sm:max-w-[700px]">
                We ensure quality through thorough testing and optimize performance for a seamless user experience.
              </p>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col items-center space-y-4">

              <img
                src="Support.webp"
                alt="Support Step"
                loading="lazy"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 200px"
                className="w-auto max-w-[200px] h-[80px] sm:h-[90px] object-contain rounded-full"
              />
              <div className="text-2xl sm:text-3xl md:text-[32px] font-in text-gray-800">
                Ongoing Support
              </div>
              <p className="text-black font-in text-sm text-justify md:text-center sm:text-base md:text-lg max-w-[90%] sm:max-w-[700px]">
                We deliver the final product on time and provide ongoing support to ensure long-term success and client satisfaction.
              </p>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

export default Stepp;