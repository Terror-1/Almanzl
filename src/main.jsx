import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        success: { duration: 3000 },
        error: {
          duration: 4000,
          style: { background: "#fee2e2", color: "#b91c1c" },
        },
      }}
    />
  </StrictMode>
);
