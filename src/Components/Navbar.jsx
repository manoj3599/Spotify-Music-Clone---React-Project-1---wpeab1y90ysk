import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useUser } from "../UserProvider";
import { Link, useNavigate, useLocation } from "react-router-dom"; // import useLocation
import { Icon } from "@iconify/react/dist/iconify.js";
import IconText from "../navigation/IconText";
import axios from "axios";

const Navbar = () => {
  const { getUser, signOutUser, setList } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  const onSearchDetails = (event) => {
    const queryString = {
      title: event.target.value,
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song?", {
        params: {
          search: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser(null);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold p-4">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Previous"
          />
          <img
            onClick={() => navigate(+1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Next"
          />
        </div>

        <div className="flex items-center gap-2">
          {location.pathname === "/Search" && (
            <div className="relative flex justify-start group mr-0">
              <input
                className="rounded-full border-2 p-3.5 lg:w-96 w-80 pl-12 text-sm font-semibold placeholder-neutral-600 hover:bg-neutral-700 bg-neutral-800 text-white"
                type="text"
                placeholder="What do you want to listen to?"
                onChange={onSearchDetails}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 font-sm text-zinc-400 group-hover:text-white">
                <IconText
                  iconName="mingcute:search-line"
                  active={true}
                  displayText=""
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            <Link to="/Premium">Explore Premium</Link>
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          {/*!getUser && (
            <>
              <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
                <Link to="/Register">Signup</Link>
              </p>
              <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
                <Link to="/Login">Login</Link>
              </p>
            </>
          )*/}

          {/*getUser && getUser.status === "success" && (
            <>
              <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
                <Link to="/" onClick={onChangeHandler}>
                  xyz
                </Link>
              </p>
            </>
          )*/}

          {/* "M" Icon with Dropdown Toggle */}
          <div className="relative">
            <p
              className="bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer"
              onClick={toggleDropdown} // Toggle the dropdown on click
            >
              M
            </p>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-700 rounded-md shadow-lg z-20">
                {!getUser && (
                  <>
                    <Link
                      to="/Login"
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                      onClick={() => setDropdownVisible(false)} // Close dropdown on selection
                    >
                      Login
                    </Link>
                    <Link
                      to="/Register"
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                      onClick={() => setDropdownVisible(false)} // Close dropdown on selection
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {getUser && getUser.status === "success" && (
                  <Link
                    to="/"
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => {
                      onChangeHandler();
                      setDropdownVisible(false); // Close dropdown on logout
                    }}
                  >
                    Logout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {location.pathname === "/Search" ? (
        <div></div>
      ) : (
        <div className="flex items-center gap-2 mt-4">
          <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
            <Link to="/">All</Link>
          </p>
          <p className="text-white px-4 py-1 rounded-2xl cursor-pointer">
            <Link to="/Music">Music</Link>
          </p>
          <p className="text-white px-4 py-1 rounded-2xl cursor-pointer">
            Podcasts
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
