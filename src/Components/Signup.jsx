import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_API_URL;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // onSubmit
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userdata } = data;

      const { data: json } = await axios.post(
        `${host}/api/auth/createuser`,
        userdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (json.authentoken) {
        localStorage.setItem("token", json.authentoken);

        Swal.fire({
          title: "Success!",
          text: "SignUp Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });

        setTimeout(() => {
          navigate("/");
        }, 50);
      } else {
        alert(json.error || "Signup Failed");
      }
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);

      Swal.fire({
        title: "Error!",
        text: "Something Went Wrong!",
        icon: "error",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-8">

      <div className="w-full max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg p-5 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
            Create an Account
          </h2>

          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Join CloudNotes and start managing your notes securely.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1 break-words">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1 break-words">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1 break-words">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 break-words">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;