import React, { useState } from "react";
import UploadDocs from "../components/apiKey/UploadDocs.jsx";
import ApiKeyCard from "../components/apiKey/ApiKeyCard.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ApiPage = () => {
  const [apiKey, setApiKey] = useState("sk-rag-user-demo-key");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, using demo API key");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_JAVA_URL}/auth/api-key`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiKey(response.data.apiKey);

      }catch (error) {
        console.error("Failed to fetch API key:", error);
      }
    }
    fetchApiKey();
  }, [])
  

  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleUploadSuccess = (file) => {
    setDocuments((prev) => [...prev, { name: file.name, status: "ready" }]);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">RAG Dashboard 🚀</h1>
          <p className="text-gray-400">
            Upload documents and use your API key.
          </p>
        </div>

        {/* Upload */}
        <UploadDocs apiKey={apiKey} onUploadSuccess={handleUploadSuccess} />

        {/* API Key */}
        <ApiKeyCard apiKey={apiKey} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/try", { state: { apiKey } })}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 py-2 rounded-xl"
          >
            💬 Try Chat
          </button>

          <button
            onClick={() => navigate("/docs")}
            className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-xl"
          >
            📘 View API Docs
          </button>
        </div>

        {/* Docs List */}
        <div className="space-y-2">
          {documents.length === 0 && (
            <p className="text-gray-500 text-sm">No documents uploaded</p>
          )}

          {documents.map((doc, i) => (
            <div
              key={i}
              className="bg-white/5 p-3 rounded text-sm flex justify-between"
            >
              <span className="truncate">{doc.name}</span>
              <span className="text-green-400 text-xs">Ready</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiPage;
