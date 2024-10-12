import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider";
import Navbar from "../Components/Navbar";

function Login() {
  const{getUser,signInUser} = useUser();

  const [getData, setData] = useState({
    email: "",
    password: "",
    appType: "music",
  });

  const [getError, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError("");

    axios.post("https://academics.newtonschool.co/api/v1/user/login", getData)
      .then((response) => {
        localStorage.setItem("token", response.data.token)
       signInUser({name : response.data.data.user.name,status:response.data.status, token:response.data.token})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // Check if response is in HTML format and contains "Unauthorized"
          if (
            typeof error.response.data === "string" &&
            error.response.data.includes("Unauthorized")
          ) {
            setError("Incorrect email or password. Please try again.");
          } else if (error.response.data && error.response.data.message) {
            // Handle JSON error messages if they exist
            setError(error.response.data.message);
          } else {
            setError("An unknown error occurred. Please try again later.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
      });
  };

  return (
    <div>
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Link  to='/'><img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
          className="w-32 mx-auto mb-8"
        /></Link>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Log in to your account
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {getError && <p className="text-red-500 text-center">{getError}</p>}

          <input
            type="email"
            name="email"
            id="email"
            value={getData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-green-500"
            required
            autoComplete="off"
          />

          <input
            type="password"
            name="password"
            id="password"
            value={getData.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-green-500"
            required
            autoComplete="off"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-semibold py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          <a href="#" className="hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
