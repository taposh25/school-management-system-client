
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

 

  const handleLogin = async (data) => {
  try {
    await signInUser(data.email, data.password);
    navigate("/");
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};



  const handleGoogleSign = async () => {
  try {
    const result = await signInGoogle();
    const user = result.user;

    const userInfo = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    await axiosSecure.post("/users", userInfo);
    navigate("/");
  } catch (error) {
    console.error("Google Login Error:", error.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full pl-10"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pl-10 pr-10"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSign}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FaGoogle className="text-red-500" />
          Login with Google
        </button>

        <p className="text-center text-sm mt-6">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register first
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
