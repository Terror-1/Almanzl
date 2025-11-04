import { useContext, useState } from "react";
import { AuthContext } from "../../authentication/context/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorBar from "../../../components/Error";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    if (!email) {
      toast.error("Email is required");
      return;
    }
    await forgotPassword({ email });
    setMsg("If that email is registered, a reset link has been sent.");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-2">Forgot password</h1>
      <p className="text-gray-600 mb-3">
        Enter your email; we’ll send a reset link.
      </p>
      {msg && <div className="text-green-700 mb-2">{msg}</div>}

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingButton
          title="Send reset link"
          onClick={submit}
          width="100%"
          style={{
            margin: "2rem auto",
          }}
        />
      </div>
    </div>
  );
}
