import React, { useState } from "react";
import logo from "../assets/QA-logo.png";
import { Link } from "react-router-dom";


function Nav() {
  const token = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(token);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };
  return (
    <div className="flex bg-gray-100 h-28 sticky top-0 justify-evenly mb-4	">
      <div className="flex">
        <Link to={"/home"}>
          <img src={logo} className="w-44" alt="Logo" />
        </Link>
        <h1 className="text-2xl py-10 font-bold  text-indigo-700">
          QuestionHub
        </h1>
      </div>

      {isLoggedIn ? (
        <div className="mt-3 md:mt-0">
          <button
            className="bg-blue-700  hover:bg-orange-600 mt-7 mr-3 p-2 h-10 text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex mt-4">
          <Link
            to={`/register`}
            className="bg-blue-700  hover:bg-orange-600 mt-5 mr-3 p-2 h-10 text-white px-4 py-2 rounded-md"
          >
            Register
          </Link>
          <Link
            className="bg-blue-700  hover:bg-orange-600 mt-5 mr-3 p-2 h-10 text-white px-4 py-2 rounded-md"
            to={`/`}
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
