import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../authentication/context/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext);

  const [form, setForm] = useState({ password: "", passwordConfirm: "" });
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    if (!form.password || !form.passwordConfirm) {
      toast.error("Please fill both fields");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    const isSuccess = await resetPassword(token, { password: form.password });
    if (isSuccess) {
      setMsg("Password reset successful. You can now log in.");

      setTimeout(() => navigate("/login"), 1200);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Reset password</h1>
      {msg && <div className="text-green-700 mb-2">{msg}</div>}

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="New password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          autoComplete="new-password"
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Confirm new password"
          type="password"
          value={form.passwordConfirm}
          onChange={(e) =>
            setForm((f) => ({ ...f, passwordConfirm: e.target.value }))
          }
          autoComplete="new-password"
        />
        <LoadingButton
          title="Reset password"
          onClick={submit}
          width="100%"
          style={{
            margin: "2rem auto",
          }}
        />
      </div>

      <div className="mt-3 text-sm">
        <Link to="/login" className="text-yellow-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
