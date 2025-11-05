import { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../authentication/context/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import InputError from "../../../components/InputError";
import { toast } from "react-toastify";
import { passwordValidationRegex } from "../../../utils/regexHelpers";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const isSuccess = await resetPassword(token, { password: data.password });
    if (isSuccess) {
      toast.success("Password reset successful. You can now log in.");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Reset password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="New password"
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordValidationRegex,
                message:
                  "Password must include at least one letter, one number, and one special character.",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
          />
          {errors.password && <InputError message={errors.password.message} />}
        </div>

        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Confirm new password"
            type="password"
            autoComplete="new-password"
            {...register("passwordConfirm", {
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
          title={isSubmitting ? "Resetting..." : "Reset password"}
          type="submit"
          width="100%"
          disabled={isSubmitting}
          style={{ margin: "2rem auto" }}
        />
      </form>

      <div className="mt-3 text-sm">
        <Link to="/login" className="text-yellow-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
