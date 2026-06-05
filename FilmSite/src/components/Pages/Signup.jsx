import React from "react";
import { registerUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackgroundImage from "../Icons/LoginBackground.png";
import Google from "../Icons/google.svg";
import Facebook from "../Icons/Facebook.png";

const SignupSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters long, have a number, and a special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("root", {
        message: err.response?.data?.message || "Signup failed.",
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-black/70 rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-white text-2xl font-bold mb-2 text-center">
          Create your account
        </h2>
        <h2 className="text-red-500 text-xs font-bold mb-6 text-center">
          Join our community and start your journey
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("name")}
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-600 rounded bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-600 rounded bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-600 rounded bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-600 rounded bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>
          <button className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded transition flex items-center justify-center gap-2">
            <img src={Google} alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>

          <button className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded transition flex items-center justify-center gap-2">
            <img src={Facebook} alt="Facebook" className="w-5 h-5" />
            <span>Sign up with Facebook</span>
          </button>
        </form>

        {errors.root && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.root.message}
          </p>
        )}

        {isSubmitSuccessful && !errors.root && (
          <p className="text-green-500 text-sm text-center mt-2">
            Signup successful! Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
