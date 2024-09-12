import { useState } from "react";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 5000);
  };

  return (
    <div className="flex flex-col bg-color items-center font-Poppins">
      <footer className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 bg-color py-10 space-y-8 text-white w-full">
        <div className="flex flex-col justify-center mt-8 items-center">
          <h3 className="font-semibold text-md md:text-lg">Company</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button className="hover:underline">About</button>
            <button className="hover:underline">Blog</button>
            <button className="hover:underline">Jobs</button>
            <button className="hover:underline">Press</button>
            <button className="hover:underline">Partners</button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-semibold text-md md:text-lg">Solutions</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button className="hover:underline">Marketing</button>
            <button className="hover:underline">Analytics</button>
            <button className="hover:underline">Commerce</button>
            <button className="hover:underline">Insights</button>
            <button className="hover:underline">Support</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-md md:text-lg">Documentation</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button className="hover:underline">Guides</button>
            <button className="hover:underline">API Status</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-md md:text-lg">Legal</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button className="hover:underline">Claim</button>
            <button className="hover:underline">Privacy</button>
            <button className="hover:underline">Terms</button>
          </div>
        </div>
      </footer>
      <div className="flex flex-col items-center text-white pb-6">
        <p>&copy; 2024 My Company. All rights reserved</p>
        <p className="flex gap-7 relative">
          <div>
            Made by
            <span className="cursor-pointer select-none" onDoubleClick={handleDoubleClick}>
              {" "}
              Himanshu Dhapola
            </span>
          </div>
          <div>
            {showHeart && (
              <FaHeartCircleExclamation className="w-6 h-6 heart-animate" />
            )}
          </div>
        </p>
      </div>
    </div>
  );
}
