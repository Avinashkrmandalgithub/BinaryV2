import React, { useState } from "react";
import axios from "axios";

const UploadDocs = ({ onUploadSuccess, apiKey }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const getFileIcon = (name) => {
    if (name.endsWith(".pdf")) return "📄";
    if (name.endsWith(".docx")) return "📝";
    if (name.endsWith(".txt")) return "📃";
    return "📁";
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    setLoading(true);
    setProgress(0);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${import.meta.env.VITE_JAVA_URL}/uploadData/upload`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        onUploadProgress: (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      setProgress(100);
      onUploadSuccess(file);
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
      <div>
        <h2 className="text-sm sm:text-base font-semibold">
          📂 Upload Documents
        </h2>
        <p className="text-xs text-gray-400">
          Files are linked to your API key
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          setFile(e.dataTransfer.files[0]);
        }}
        className={`border border-dashed rounded-xl p-5 text-center text-xs transition
        ${
          dragActive ? "border-indigo-400 bg-indigo-500/10" : "border-gray-600"
        }`}
      >
        Drag & drop or{" "}
        <label className="text-indigo-400 cursor-pointer underline">
          browse
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

      {/* File Preview */}
      {file && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between">
          <span className="truncate text-xs">{file.name}</span>
          {!loading && <button onClick={() => setFile(null)}>✕</button>}
        </div>
      )}

      {/* Progress */}
      {loading && (
        <div className="w-full bg-gray-800 rounded-full h-1">
          <div
            className="bg-indigo-500 h-1"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-indigo-500 py-2 rounded-xl text-xs disabled:opacity-50"
      >
        {loading ? `Uploading ${progress}%` : "Upload"}
      </button>
    </div>
  );
};

export default UploadDocs;
