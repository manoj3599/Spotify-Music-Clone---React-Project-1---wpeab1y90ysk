import React, { useState, useEffect } from "react";
import spt from "../assets/spoti.svg";
import { useUser } from "../UserProvider";
import { Link } from "react-router-dom";
import NavButton from "./NavButton"; // Assuming NavButton is being imported

const Premium = () => {
  const { getUser, signOutUser } = useUser();

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  };

  return (
    <div className="bg-blue-600 min-h-screen w-full flex flex-col">
      {/* Header Section */}
      <div
        className={`w-full ${
          isScreenSmall ? "bg-black" : "bg-zinc-900"
        } flex items-center justify-between p-4`}
      >
        <Link to="/">
          <img
            src={spt}
            alt="Spotify Logo"
            width={isScreenSmall ? 100 : 140} // Responsive width
            className="p-2"
          />
        </Link>
        <div className="navbar h-18 bg-neutral-900 rounded-t-lg bg-opacity-70 flex justify-end items-center space-x-4">
          <Link to="/Premium">
            <NavButton displayText={"Premium"} />
          </Link>
          <Link to="/support">
            <NavButton displayText={"Support"} />
          </Link>
          <Link to="/download">
            <NavButton displayText={"Download"} />
          </Link>
          <div className="h-8 border-r-2 border-zinc-600"></div>

          {!getUser ? (
            <>
              <Link to="/Register">
                <NavButton displayText={"Sign up"} />
              </Link>
              <Link to="/Login">
                <div className="bg-white px-8 py-3 text-base flex items-center justify-center rounded-full font-semibold cursor-pointer hover:scale-105 hover:bg-green-400">
                  Log in
                </div>
              </Link>
            </>
          ) : (
            <Link to="/" onClick={onChangeHandler}>
              <div className="text-zinc-400 px-5 py-3 text-base flex items-center justify-center font-semibold cursor-pointer hover:scale-105 hover:text-white">
                Logout
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-white text-center p-4">
        <h2 className="font-bold text-4xl md:text-5xl mt-40">
          Get Premium free for 1 month
        </h2>
        <h3 className="mt-8 text-lg md:text-xl">
          Just ₹119/month after. Debit and credit cards accepted. Cancel
          anytime.
        </h3>
        <div className="flex justify-center gap-3 mt-8 flex-col md:flex-row">
          <Link to="/support">
            <button className="bg-zinc-900 rounded-full px-5 py-3 font-semibold text-sm hover:scale-105">
              GET STARTED
            </button>
          </Link>
          <Link to="/support">
            <button className="bg-transparent border rounded-full px-5 py-3 font-semibold text-sm hover:scale-105">
              SEE OTHER PLANS
            </button>
          </Link>
        </div>
        <div className="text-xs mt-14">
          Terms and conditions apply. 1 month free not available for those who
          already tried Premium.
        </div>
      </div>
    </div>
  );
};

export default Premium;
