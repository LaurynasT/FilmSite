import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginUser } from "../../interfaces/user/LoginUser";
import Google from "../assets/google.svg";
import Facebook from "../assets/Facebook.png";

type Props = {
  register: UseFormRegister<LoginUser>;
  errors: FieldErrors<LoginUser>;
  isSubmitting: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function LoginForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
  );
}
