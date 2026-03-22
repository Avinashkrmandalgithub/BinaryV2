import React, { useState } from "react";
import axios from "axios";

const UploadUrl = ({ onUploadSuccess }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return alert("Enter a valid URL");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required. Token not found.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_JAVA_URL}/uploadData/upload-web-url`,
        { url: trimmedUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      onUploadSuccess({ name: trimmedUrl, type: "url" });
      setUrl("");
    } catch (error) {
      console.error("URL upload failed:", error);
      alert("Failed to process URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-sm sm:text-base font-semibold">
          🌐 Add Website URL
        </h2>
        <p className="text-xs text-gray-400">Crawl and embed website content</p>
      </div>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-[#020617] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      {/* Info */}
      <p className="text-[10px] text-gray-500">
        This will extract and embed content from the URL
      </p>
    </div>
  );
};

export default UploadUrl;
