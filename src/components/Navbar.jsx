import React from 'react';
import imgscr from "/PI-LOGO.webp";

export default function Navbar() {
  return (
    <nav>
      <a href="/">
        <img
          src={imgscr}
          alt="Pisoft primary logo"
          width="200"
          height="80"
          loading="eager"
          sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px"
          className="w-auto max-h-20 sm:max-h-20 md:max-h-28 lg:max-h-37 object-contain"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </a>
    </nav>
  );
}
