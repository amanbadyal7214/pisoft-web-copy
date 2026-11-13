"use client";
import {
  Navbar,
  NavBody,
  NavItems,
} from "../ResizableNavbar";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
      children: [
        { name: "About Us", link: "/about#about-us" },
        { name: "Our Vision", link: "/about#our-vision" },
        { name: "Our Mission", link: "/about#our-mission" },
      ],
    },
    {
      name: "ERP Services",
      link: "/ERPSolutions",
      children: [
        { name: "All ERP Solutions", link: "/ERPSolutions" },
        { name: "School Mgmt. System", link: "/ERPservices/Education" },
        { name: "Credit Society Mgmt. System", link: "/ERPservices/Finance" },
        { name: "Clinic Mgmt. System", link: "/ERPservices/Medical&Healthcare" },
        { name: "Vehicle Workshop Mgmt. System", link: "/ERPservices/AutoMobile" },
        { name: "Tours & Travels", link: "/ERPservices/TourTravels" },
      ],
    },
    {
      name: "Our Services",
      link: "/WebApplications",
      children: [
        { name: "Websites", link: "/WebApplications" },
        { name: "Mobile Applications", link: "/MobileApplications" },
        { name: "Digital Marketing", link: "/DigitalMarketing" },
        { name: "ERP Solutions", link: "/ERPSolutions" },
        // { name: "Portals", link: "/WebPortals" },
      ],
    },
    {
      name: "Free Training",
      link: "/free-training",
    },
    {
      name: "Internship",
      link: "/InternshipProgram",
    },
    {
      name: "Gallery",
      link: "/OurGallery",
    },
    {
      name: "Blogs",
      link: "/Blogs",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ]

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavItems items={navItems} />
        </NavBody>
      </Navbar>

    </div>
  );
}
