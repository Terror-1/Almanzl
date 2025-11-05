import { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authentication/context/AuthContext";
import { useForm } from "react-hook-form";
import LoadingButton from "../../../components/LoadingButton";
import InputError from "../../../components/InputError";
import { emailValidationRegex } from "../../../utils/regexHelpers";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";

  const {
    register: loginForm,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const user = await login(data);
    if (user) {
      if (user.isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...loginForm("email", {
              required: "Email is required",
              pattern: {
                value: emailValidationRegex,
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
            autoComplete="current-password"
            {...loginForm("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <InputError message={errors.password.message} />}
        </div>

        <LoadingButton
          title="Sign in"
          type="submit"
          width="100%"
          disabled={!isValid}
          style={{ margin: "2rem auto" }}
        />
      </form>

      <div className="mt-3 flex justify-between text-sm">
        <Link to="/forgotPassword" className="text-yellow-600 hover:underline">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-yellow-600 hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
