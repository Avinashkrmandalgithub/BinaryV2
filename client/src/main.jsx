import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import IsLoginContextProvider from "./contexts/isLoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IsLoginContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </IsLoginContextProvider>
  </StrictMode>
);
