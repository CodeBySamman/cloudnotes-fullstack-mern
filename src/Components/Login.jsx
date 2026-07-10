import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: json } = await axios.post(
        `${host}/api/auth/login`,
        data,
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
          text: "Login Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });

        setTimeout(() => {
          navigate("/");
        }, 50);
      } else {
        alert(json.error || "Login Failed");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
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
            Login
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base break-words">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1 break-words">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;