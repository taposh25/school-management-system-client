import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signInUser, signInGoogle} = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    console.log("Login Data:", data);
   signInUser(data.email, data.password)
   .then(result => {
    const user = result.user;
    console.log(user);
   })
   .catch(error =>{
    console.log(error.message);
   })
  };

   const handleGoogleSign = ()=>{
    signInGoogle()
    .then(result =>{
        console.log(result.user);
    })
    .catch(error =>{
        console.log(error.message);
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="label">User Email</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
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
          <button className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSign}
          className="btn btn-outline w-full flex items-center gap-2">
          <FaGoogle className="text-red-500" />
          Login with Google
        </button>

        {/* Register Redirect */}
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
