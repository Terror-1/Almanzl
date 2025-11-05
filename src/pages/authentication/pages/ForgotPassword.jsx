import { useContext } from "react";
import { AuthContext } from "../../authentication/context/AuthContext";
import { useForm } from "react-hook-form";
import LoadingButton from "../../../components/LoadingButton";
import InputError from "../../../components/InputError";
import { toast } from "react-toastify";
import { emailValidationRegex } from "../../../utils/regexHelpers";

export default function ForgotPassword() {
  const { forgotPassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await forgotPassword(data);
    toast.success("If that email is registered, a reset link has been sent.");
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-2">Forgot password</h1>
      <p className="text-gray-600 mb-3">
        Enter your email; we’ll send a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailValidationRegex,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <InputError message={errors.email.message} />}
        </div>

        <LoadingButton
          title={"Send reset link"}
          type="submit"
          width="100%"
          disabled={!isValid}
          style={{ margin: "2rem auto" }}
        />
      </form>
    </div>
  );
}
