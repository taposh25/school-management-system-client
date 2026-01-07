import { useState } from "react";
import { useForm} from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaImage, FaLock, FaUser } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios"; 



const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {registerUser, updateUserProfile, signInGoogle} = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  
  
  const handleRegistration = async (data) => {
  try {
    const imageFile = data.image[0];

    // 1. Firebase Register
    const result = await registerUser(data.email, data.password);
    const user = result.user;
     console.log(user);
    // 2. Upload Image to imgbb (NORMAL AXIOS)
    const formData = new FormData();
    formData.append("image", imageFile);

    const image_API_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const imgRes = await axios.post(image_API_url, formData);
    const photoURL = imgRes.data.data.url;

    // 3. Update Firebase Profile
    await updateUserProfile({
      displayName: data.name,
      photoURL: photoURL,
    });

    // 4. Save User to MongoDB
    const userInfo = {
      email: data.email,
      displayName: data.name,
      photoURL: photoURL,
    };

    await axiosSecure.post("/users", userInfo);

    // 5. Navigate Home
    navigate("/");

  } catch (error) {
    console.error("Register Error:", error.message);
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

    // backend already checks duplicate
    await axiosSecure.post("/users", userInfo);

    navigate("/");
  } catch (error) {
    console.error("Google Login Error:", error.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full pl-10"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full pl-10"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">Profile Image</label>
            <div className="relative">
              <FaImage className="absolute top-3 left-3 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full pl-10"
                {...register("image", { required: "Image is required" })}
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full pl-10 pr-10"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Sign In */}
        <button
        onClick={handleGoogleSign}
        className="btn btn-outline w-full flex items-center gap-2">
          <FaGoogle className="text-red-500" />
          Sign up with Google
        </button>
        <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <span className="font-medium">Please</span>{" "}
        <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
        >
            Login
        </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;






