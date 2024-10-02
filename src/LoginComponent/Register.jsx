import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [getData, setData] = useState({
    email: "",
    name: "",
    password: "",
    appType: "music",
  });

  const [getError, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectid': 'f104bi07c490',  // Include project ID in headers
        },
        body: JSON.stringify(getData),  // Send the user data in the request body
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        navigate("/Login");  // Navigate to login page upon success
      } else {
        setError(result.message || "Unknown error, try again later.");
      }
    } catch (error) {
      console.log(error);
      setError("Unknown error, try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Link  to='/'><img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
          className="w-32 mx-auto mb-8"
        /></Link>
        <h1 className="text-3xl font-bold mb-4 text-center">Sign up to start listening</h1>
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
            type="text"
            name="name"
            id="name"
            value={getData.name}
            onChange={onChangeHandler}
            placeholder="User name"
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
            Submit
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          <a href="#" className="hover:underline">Use phone number instead</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
