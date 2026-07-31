import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BackgroundImage from "../components/assets/LoginBackground.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginUser } from "../interfaces/user/LoginUser";
import LoginForm from "../components/forms/LoginForm";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });
      await login();
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
        <LoginForm
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />

        {errors.root && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.root.message}
          </p>
        )}
      </div>
    </div>
  );
}
