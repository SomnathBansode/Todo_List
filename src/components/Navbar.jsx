import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-gray-900 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-8">iTask</span>
      </div>
      <div className="flex items-center gap-4 mx-9">
        <span className="text-sm">Made by SomnathBansode</span>
        <a
          href="https://www.linkedin.com/in/somnath-bansode-sb88/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl cursor-pointer hover:text-blue-500 transition-all"
        >
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
