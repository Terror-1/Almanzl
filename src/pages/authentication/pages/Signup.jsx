import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authentication/context/AuthContext";
import { useForm } from "react-hook-form";
import LoadingButton from "../../../components/LoadingButton";
import { Input } from "../../admin-dashboard/components/Input";
import InputError from "../../../components/InputError";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register: signupForm,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const isSuccess = await signup(data);
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >
        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Name"
            {...signupForm("name", { required: "Name is required" })}
          />
          {errors.name && <InputError message={errors.name.message} />}
        </div>

        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Phone"
            {...signupForm("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+2[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && <InputError message={errors.phone.message} />}
        </div>

        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            {...signupForm("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <InputError message={errors.email.message} />}
        </div>

        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            {...signupForm("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                message:
                  "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
              },
            })}
          />
          {errors.password && <InputError message={errors.password.message} />}
        </div>

        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Confirm password"
            type="password"
            autoComplete="new-password"
            {...signupForm("passwordConfirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.passwordConfirm && (
            <InputError message={errors.passwordConfirm.message} />
          )}
        </div>

        <LoadingButton
          title={"Sign up"}
          type="submit"
          width="100%"
          disabled={!isValid}
          style={{ margin: "2rem auto" }}
        />
      </form>

      <div className="mt-3 text-sm">
        Already have an account?
        <Link to="/login" className="text-yellow-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
