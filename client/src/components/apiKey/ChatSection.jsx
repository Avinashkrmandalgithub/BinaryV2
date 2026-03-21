import React, { useState, useEffect, useRef } from "react";
import ApiKeyModal from "./ApiKeyModal.jsx";
import { connectSocket, socket } from "../../socket/socket.js";

const ChatSection = ({ externalApiKey = null }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState(externalApiKey);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    connectSocket(userId);

    const handleReceiveMessage = (payload) => {
      const responsePayload = payload?.response;
      const botText =
        responsePayload?.response ||
        responsePayload?.message ||
        (typeof responsePayload === "string"
          ? responsePayload
          : JSON.stringify(responsePayload || {}));

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botText || "No response",
        },
      ]);

      setLoading(false);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SOCKET_SERVER_URL}/api/message/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Request failed");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Error fetching response",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/*  Modal */}
      {!apiKey && <ApiKeyModal onSave={setApiKey} />}

      {/* Header */}
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h2 className="text-lg sm:text-xl font-semibold">
          💬 Intelligence Chat
        </h2>

        {apiKey && <span className="text-xs text-green-400">Connected ✓</span>}
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto min-h-0 space-y-3 p-3 rounded-xl 
      bg-white/5 backdrop-blur-lg border border-white/10"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">
            Ask about your documents...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl text-sm max-w-[80%] wrap-break-word ${
              msg.role === "user"
                ? "bg-linear-to-r from-indigo-500 to-blue-500 ml-auto text-white"
                : "bg-white/10 text-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="text-gray-400 text-sm">Typing...</div>}

        {/* 🔥 Auto scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your documents..."
          disabled={!apiKey}
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={!apiKey || loading}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
