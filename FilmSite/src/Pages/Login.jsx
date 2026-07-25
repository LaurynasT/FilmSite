import React from "react";
import { loginUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../assets/AuthContext";
import BackgroundImage from "../Icons/LoginBackground.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Google from "../Icons/google.svg";
import Facebook from "../Icons/Facebook.png";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        username: data.email,
        password: data.password,
      });
      await login(response);
      navigate("/dashboard");
    } catch (err) {
      setError("root", {
        message: "Invalid login. Please check your credentials.",
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
      <div className="absolute inset-0 bg-black/60 " />

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-black/70 rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-white text-2xl font-bold mb-2 text-center">
          Welcome back
        </h2>
        <h2 className="text-red-500 text-xs font-bold mb-8 text-center">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>
          <button className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded transition flex items-center justify-center gap-2">
            <img src={Google} alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded transition flex items-center justify-center gap-2">
            <img src={Facebook} alt="Facebook" className="w-5 h-5" />
            <span>Continue with Facebook</span>
          </button>
        </form>

        {errors.root && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.root.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
