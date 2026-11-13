
import React, { lazy } from "react";
const MarqueeItem = lazy(()=> import("./MarqueeItem"))

const Marquee = () => {
  const upperMarquee = [
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20330.webp?alt=media&token=8c5efff5-0923-4c66-bff1-5f4c96c5c002",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20349.webp?alt=media&token=ed402841-9b2a-40a0-a6d4-ba8e5f3a6591",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20336.webp?alt=media&token=a83f65c2-ea07-4150-abd7-0073664334e1",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20337.webp?alt=media&token=207ffa11-5271-45dc-a5af-552b8259da0a",
    'https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20355.webp?alt=media&token=2a6c7854-7522-4542-97f4-68cec8a7beff',
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame329.webp?alt=media&token=42ae8b63-9b12-48c9-b23e-e68c359cc04b",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20338.webp?alt=media&token=22e03389-f27d-457a-9074-076d1087210f",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20344.webp?alt=media&token=dc346b30-fc55-48e6-a386-2140d6750698",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20347.webp?alt=media&token=0b8c61f4-5311-47cd-97ba-b11f13b26fa4",
    "https://firebasestorage.googleapis.com/v0/b/carrier-lief.firebasestorage.app/o/bannerVideo%2FLOGOS%2FFrame%20348.webp?alt=media&token=400621b5-9795-4927-9073-62a38e3a1ed0",
  ];

  return (
    <div className="w-screen max-w-[3000px] mx-auto mt-10 mb-10 px-4 sm:px-6 md:px-0">
      <div className="overflow-hidden">
        <MarqueeItem
          images={upperMarquee}
          from={0}
          to={"-100%"}
          imageSize="h-5 w-auto"
          gap="gap-4 sm:gap-6 md:gap-12"
        />
      </div>
    </div>
  );
};

export default Marquee;
