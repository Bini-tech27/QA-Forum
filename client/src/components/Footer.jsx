import React from "react";
import logo from "../assets/QA-logo.png";

function Footer() {
  return (
    <div className="bg-gray-700 flex flex-col md:flex-row justify-evenly md:items-center">
      <div className="mb-6 md:mb-0">
        <div className="flex flex-col md:flex-row items-center py-6">
          <a href="/">
            <img src={logo} className="w-36" alt="Logo" />
          </a>
          <h1 className="text-2xl md:py-0 md:pl-4 font-bold text-indigo-700">
            QuestionHub
          </h1>
        </div>
      </div>
      <div className="py-6">
        <h1 className="text-white">Useful Links</h1>
        <h2 className="text-gray-300">How it works</h2>
        <h2 className="text-gray-300">Terms of Service</h2>
        <h2 className="text-gray-300">Privacy policy</h2>
      </div>
      <div className="py-6">
        <h1 className="text-white">Contact Info</h1>
        <h2 className="text-gray-300">QuestionHub</h2>
        <h2 className="text-gray-300">binilulseged@gmail.com</h2>
        <h2 className="text-gray-300">+251921165470</h2>
      </div>
    </div>
  );
}

export default Footer;
