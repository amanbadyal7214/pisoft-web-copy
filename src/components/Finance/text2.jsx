"use client";
import { TypewriterEffectSmooth } from "../TypeWritter";
export function TypewriterEffect() {
  const words = [
    {
      text: "Know",
    },
    {
      text: "More",
    },
    {
      text: "About",
    },
    {
      text: "our",
    },
    {
      text: "Features.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="font-INB flex flex-col items-center justify-center h-auto">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
