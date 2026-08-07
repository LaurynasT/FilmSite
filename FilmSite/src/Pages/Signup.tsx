import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackgroundImage from "../components/assets/LoginBackground.png";
import { RegisterUser } from "../interfaces/user/RegisterUser";
import { useNotificationStore } from "../store/errorStore";
import SignupForm from "../components/forms/SignupForm";

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

export default function Signup() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterUser>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      await registerUser(data);
      setTimeout(() => navigate("/login"), 2000);
      showSuccess("User was created.");
    } catch (err) {
      showError("Signup failed.");
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
        <SignupForm
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

        {isSubmitSuccessful && !errors.root && (
          <p className="text-green-500 text-sm text-center mt-2">
            Signup successful! Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
}
