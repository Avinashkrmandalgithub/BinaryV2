import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import DocsPage from "./pages/DocsPage.jsx";
import ApiPage from "./pages/ApiPage.jsx";
import Pricing from "./pages/Pricing.jsx";
import TryPage from "./pages/TryPage.jsx";
import { useIsLogin } from "./contexts/isLoginContext.jsx";
import { connectSocket, disconnectSocket } from "./socket/socket.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import AdvancedLoadingScreen from "./components/AdvancedLoadingScreen.jsx";

const App = () => {
  const { setIsLogin } = useIsLogin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateCurrentUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromQuery = params.get("token");

      if (tokenFromQuery) {
        localStorage.setItem("token", tokenFromQuery);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }

      const token = tokenFromQuery || localStorage.getItem("token");

      if (!token) {
        disconnectSocket();
        setIsLogin({ isLogin: false, user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_JAVA_URL}/auth/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response?.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("userId", response.data.userId);
          connectSocket(response.data.userId);
          setIsLogin({ isLogin: true, user: { name: response.data.name } });
          return;
        }

        disconnectSocket();
        setIsLogin({ isLogin: false, user: null });
      } catch {
        disconnectSocket();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setIsLogin({ isLogin: false, user: null });
      }
    };

    validateCurrentUser();
  }, [setIsLogin]);

  useEffect(() => {
    const wakeRenderServers = async () => {
      setLoading(true);

      try {
        await axios.get(`${import.meta.env.VITE_PYTHON_SERVER_URL}`)
        await Promise.all([
          axios.get(`${import.meta.env.VITE_SOCKET_SERVER_URL}`),
          axios.get(`${import.meta.env.VITE_JAVA_URL}/api/v2/`),
        ]);
      } catch (error) {
        console.error("Render wake-up failed:", error);
      } finally {
        setLoading(false);
      }
    };

    wakeRenderServers();
  }, []);

  if (loading) {
    return <AdvancedLoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DocsPage />} />
        <Route path="/api-keys" element={<ApiPage />} />
        <Route path="/try" element={<TryPage />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
};

export default App;
