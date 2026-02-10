import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./Context.jsx";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
    <ToastContainer />
  </StrictMode>,
);

