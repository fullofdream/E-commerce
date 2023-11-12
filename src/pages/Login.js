import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const togglePasswordVisibility = () => setIsPassVisible(!isPassVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    window.localStorage.setItem(
      "user",
      JSON.stringify({ name: "jon", username: username, password: password })
    );
    navigate("/", { replace: true });
  };
  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <form
        className="border shadow-md w-[90%] border-gray-300 md:w-[50%] h-fit p-5 rounded-md text-xs"
        onSubmit={handleSubmit}
      >
        <fieldset className="text-xl font-bold text-center uppercase">
          {isSignUp ? "Create Account" : "Login"}
        </fieldset>
        {isSignUp && (
          <>
            <label className="block my-2">Name</label>
            <input
              id="name"
              type="text"
              className="px-3 py-2 w-full border-[1px] border-gray-300 rounded text-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}
        <label className="block my-2">Username</label>
        <input
          id="email"
          type="email"
          className="px-3 py-2 w-full border-[1px] border-gray-300 rounded text-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="block my-2">Password</label>
        <div className="relative">
          <input
            id="password"
            type={isPassVisible ? "text" : "password"}
            className="px-3 py-2 w-full border-[1px] border-gray-300 rounded text-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={`absolute top-[50%] right-[10px] -translate-y-[50%] cursor-pointer ${
              isPassVisible ? "text-red-500" : "text-black"
            }`}
            onClick={togglePasswordVisibility}
          >
            {isPassVisible ? (
              <i className="fa fa-eye-slash text-xs pb-1" /> // Close eye icon
            ) : (
              <i className="fa fa-eye text-xs pb-1 " /> // Open eye icon
            )}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center my-2">
          <button
            type="submit"
            className="text-base font-semibold bg-red-500 text-white my-3 w-full py-2 rounded"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          <div
            className="text-sm text-black mt-2"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? (
              <span className="text-blue-700 hover:underline cursor-pointer">
                Already have account?
              </span>
            ) : (
              <>
                Don't have account ?{" "}
                <span className="text-blue-700 hover:underline cursor-pointer">
                  Sign up
                </span>
              </>
            )}
          </div>
          {!isSignUp && (
            <NavLink className="text-sm text-blue-700 hover:underline">
              Forgot Password
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
