import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaLocationDot,} from 'react-icons/fa6';

const SocialLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      id: 1,
      name: 'Instagram',
      icon: <FaInstagram size={18} />,
      href: 'https://www.instagram.com/pisoftinformatics/?hl=en',
      style: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400',
    },
    {
      id: 2,
      name: 'Facebook',
      icon: <FaFacebookF size={18} />,
      href: 'https://www.facebook.com/pisoftinformatics',
      style: 'bg-blue-600',
    },
    {
      id: 3,
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={18} />,
      href: 'https://www.linkedin.com/company/pisoft-informatics/',
      style: 'bg-blue-700',
    },{
      id: 4,
      name: 'Location',
      icon: <FaLocationDot size={18} />,
      href: '/location',
      style: 'bg-orange-400',
    },
  ];

  return (
    <div className="fixed bottom-20 right-0 z-50 group">

      <div
        className={`flex flex-col items-end transition-transform duration-300 ease-in-out
          ${isOpen
            ? 'translate-x-0'
            : 'translate-x-[85%]'
          } 
          lg:group lg:translate-x-[85%] lg:group-hover:translate-x-0`}
      >
        <div className="px-10 py-4 flex flex-col gap-3">
          {links.map(({ id, name, icon, href, style }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center text-white gap-2 px-3 py-3 rounded-full ${style} hover:scale-105 transition-transform duration-200 shadow-md`}
              title={name}
            >
              <span>{icon}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Peek tab */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 bg-gradient-to-b from-blue-900 to-blue-950 rounded-l-md flex items-center justify-center text-white text-xs font-semibold shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="-rotate-90 tracking-widest">SOCIAL</span>
      </div>
    </div>
  );
};

export default SocialLinks;
