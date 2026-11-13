import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Internship from "./pages/internship";
import { SidebarDemo } from "./components/Intern/ChoosenTechnology";
import Gallery from "./pages/Gallery";

// Lazy load all page components
const Firstt = lazy(() => import("./components/Firstt"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ERPEducation = lazy(() => import("./pages/ERPEducation"));
const ERPFinance = lazy(() => import("./pages/ERPFinance"));
const ERPAutomobile = lazy(() => import("./pages/ERPAutomobile"));
const ERPMedHealth = lazy(() => import("./pages/ERPMed&Health"));
const ERPTourTravels = lazy(() => import("./pages/ERPTourTravels"));
const LoginUser = lazy(() => import("./pages/InternshipEnquiry"));
const LoginRegisterUser = lazy(() => import("./pages/Login&Register"));
const RegisterUser = lazy(() => import("./pages/Register"));
const WebApplication = lazy(() => import("./pages/WebApplication"));
const MobileApplication = lazy(() => import("./pages/MobileApplication"));
const Bolgs = lazy(() => import("./pages/Bolgs"));
const CareerWithUs = lazy(() => import("./pages/CareerWithUs"));
const CareerApply = lazy(() => import("./pages/CareerApply"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Location = lazy (()=> import("./pages/Location"))
const Tutorial = lazy (()=>import("./../src/Tutorial/Tpages/THome"))
const Ttechnology = lazy (()=>import("./../src/Tutorial/Tpages/Ttechnology"))
const AllProjects = lazy(() => import("./pages/AllProjects"));
const ERPSolutions = lazy(()=> import("./pages/ERPSolutions"))
const WebPortals = lazy(()=> import("./pages/WebPortals"))
const FreeTraining = lazy(() => import("./pages/FreeTraining"));
const FreeTraining2 = lazy(() => import("./pages/FreeTraining2"));

import PageNotFound from "./pages/NotFound";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import RegistrationForm from "./pages/ClientRegister";
import TermsAndConditions from "./pages/TandC";
import PrivacyPolicy from "./pages/Privacy";
// import CompilerPage from "./Tutorial/Tpages/CompilerPage";
// import TAuth from "./Tutorial/TComponents/tAUTH.JSX";
// import TQuiz from "./Tutorial/Tpages/TQuiz";
import TForm from "./Tutorial/Tpages/Tform";
import POPquiz from "./Tutorial/Tpages/POPquiz";
import DigitalMarketing from "./pages/DigitalMarketing";

// A simple loading fallback component
const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <DotLottieReact
      src='https://lottie.host/4ce43db8-2aa2-4617-96f0-aad2bb51dc7b/0FITZztajf.lottie'
      loop
      autoplay
      className='h-20 w-20'
    />
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Firstt />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/InternshipProgram" element={<Internship />} />
        <Route path="/free-training" element={<FreeTraining />} />
        <Route path="/FreeTraining" element={<FreeTraining />} />
        <Route path="/Free" element={<FreeTraining2 />} />
        <Route path="/ERPservices/Education" element={<ERPEducation />} />
        <Route path="/ERPservices/Finance" element={<ERPFinance />} />
        <Route path="/ERPservices/AutoMobile" element={<ERPAutomobile />} />
        <Route path="/ERPservices/Medical&Healthcare" element={<ERPMedHealth />} />
        <Route path="/ERPservices/TourTravels" element={<ERPTourTravels />} />
        <Route path="/Alltechnologies/:id/:name" element={<SidebarDemo />} />
        {/* <Route path="/applyforInternship" element={<LoginUser />} /> */}
        <Route path="/LoginRegisterUser" element={<LoginRegisterUser />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/WebApplications" element={<WebApplication />} />
        <Route path="/DigitalMarketing" element={<DigitalMarketing />} />
        <Route path="/MobileApplications" element={<MobileApplication />} />
        <Route path="/ERPSolutions" element={<ERPSolutions />} />
        <Route path="/WebPortals" element={<WebPortals />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/OurGallery" element={<Gallery />} />
        <Route path="/Blogs" element={<Bolgs />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/T&C" element={<TermsAndConditions />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        {/* <Route path="/Tutorials" element={<Tutorial />} />
       <Route path="/Tutorials/:techId" element={<Ttechnology />} />
       <Route path="/Tquiz" element={<TQuiz />} />
       <Route path="/Compiler/:techId" element={<CompilerPage />} />  
       <Route path="/TAuth" element={<TAuth />} /> */}
       <Route path="/POP" element={<TForm />} />
       <Route path="/POPQuiz" element={<POPquiz />} /> 
       
       
    
        <Route
          path="/blogs/:technologySlug/:blogId"
          element={<BlogDetail />}
        />
        <Route path="/CareerWithUs" element={<CareerWithUs />} />
        <Route path="/applyforCareer" element={<CareerApply />} />
        <Route path="/ClientRegister" element={<RegistrationForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;