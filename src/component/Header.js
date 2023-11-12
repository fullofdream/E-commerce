import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import alien from "../assets/alien.png";
const Header = () => {
  const navigation = useNavigate();
  const Name =
    window.localStorage.getItem("user") &&
    JSON.parse(window.localStorage.getItem("user")).name;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    localStorage.clear();
    navigation("/", { replace: true });
  };

  //handle to close profile drop down menu onclick screen
  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (isOpen && !e.target.closest("#profile-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-wrap bg-[#ff4d4d] py-2 md:py-1 px-2 text-white justify-between items-center">
      <Link
        to="/"
        className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] overflow-hidden object-contain"
      >
        <img src={alien} alt="" className="w-full h-full object-contain" />
      </Link>
      <div className="w-[500px] order-last md:order-none mt-2 md:mt-0">
        <div className="flex bg-white text-center rounded-md px-2 ">
          <button className=" text-black mr-2">
            <BiSearch />
          </button>
          <input
            className=" rounded-md focus:outline-0 text-black text-sm py-1"
            type="text"
            placeholder="Search for products"
          />
        </div>
      </div>
      <div >
        {Name ? (
          <div id="profile-menu" className=" flex flex-row gap-4 items-center justify-center">
            {Name && (
              <div className="flex items-center text-center self-center">
                Cart{" "}
                <div className="ml-2 text-black bg-white inline-block w-[30px] h-[30px] rounded-full text-center">
                  0
                </div>
              </div>
            )}
            <div className="cursor-pointer" onClick={toggleDropdown}>
              {Name}
            </div>
            <div className="cursor-pointer text-xs relative">
              <i
                onClick={toggleDropdown}
                className="fa-solid fa-angle-down"
              ></i>
              <div
                className={` absolute text-sm text-gray-700 font-light right-0 mt-4 p-1 w-48 bg-white border-[2px] border-gray-300 rounded-lg shadow-lg z-10 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul>
                  <li
                    className="hover:bg-gray-100 rounded-t-lg py-1 px-2 cursor-pointer font-normal"
                    onClick={() => {
                      setIsOpen(false);
                      navigation("/profile");
                    }}
                  >
                    <i className="fa-regular fa-user"></i> Profile
                  </li>

                  <li
                    className="hover:bg-gray-100 rounded-b-lg py-1 px-2 cursor-pointer font-normal"
                    onClick={closeDropdown}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Log
                    Out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
