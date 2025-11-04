import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authentication/context/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import { toast } from "react-toastify";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const submit = async () => {
    if (!form.name || !form.phone || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    const isSuccess = await signup(form);
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>

      <div className="grid grid-cols-1 gap-3">
        {["name", "phone", "email"].map((k) => (
          <input
            key={k}
            className="w-full border rounded px-3 py-2"
            placeholder={k[0].toUpperCase() + k.slice(1)}
            type={k === "email" ? "email" : "text"}
            value={form[k]}
            onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
          />
        ))}
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          autoComplete="new-password"
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Confirm password"
          type="password"
          value={form.passwordConfirm}
          onChange={(e) =>
            setForm((f) => ({ ...f, passwordConfirm: e.target.value }))
          }
          autoComplete="new-password"
        />
        <LoadingButton
          title="Sign up"
          onClick={submit}
          width="100%"
          style={{
            margin: "2rem auto",
          }}
        />
      </div>

      <div className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
