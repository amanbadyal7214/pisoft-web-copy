import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <div className="fixed top-16 right-4 z-100 group">
        <button
          onClick={scrollToTop}
          className="p-2 bg-white text-blue-950 rounded-full hover:text-blue-800 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-blue-950 text-sm  py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll to top
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      <div className="fixed bottom-6 right-4 z-50 group">
        <button
          onClick={scrollToBottom}
          className="p-2 bg-white text-blue-950 rounded-full hover:text-blue-800 transition"
          aria-label="Scroll to bottom"
        >
          <FaArrowDown size={18} />
        </button>
         <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-blue-950 text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll to bottom
        </div>
      </div>
    </>
  );
};

export default ScrollButtons;
