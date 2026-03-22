import React from "react";
import CodeBlock from "../components/docs/CodeBlock.jsx";

const DocsPage = () => {
  const curlCode = `curl "${import.meta.env.VITE_JAVA_URL}/messages/query" \\
  -H "x-api-key: YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -X POST \\
  -d '{
    "query": "Explain how AI works in a few words"
  }'`;

  const jsonCode = `POST ${import.meta.env.VITE_JAVA_URL}/messages/query

Headers:
  x-api-key: YOUR_SECRET_KEY
  Content-Type: application/json

Body:
{
  "query": "What is AI?"
}`;

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 pb-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/*  Hero */}
        <div>
          <h1 className="text-4xl font-bold mb-3">RAG API Docs 🚀</h1>
          <p className="text-gray-400 text-lg">
            Query your RAG system using a simple API and get intelligent
            responses instantly.
          </p>
        </div>

        {/*  API Key */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">🔑 Get Your API Key</h2>

          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Sign in using Google</li>
            <li>
              • Click{" "}
              <span className="text-indigo-400 font-medium">Get API Key</span>{" "}
              in the navbar
            </li>
            <li>• Copy your key from dashboard</li>
          </ul>

          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 p-3 rounded-lg text-sm">
            ⚠️ Never expose your API key in frontend code or public repos.
          </div>
        </div>

        {/*  Endpoint */}
        <div>
          <h2 className="text-xl font-semibold mb-3">🌐 Endpoint</h2>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-sm text-gray-300">
            POST {import.meta.env.VITE_JAVA_URL}/messages/query
          </div>
        </div>

        {/* Request */}
        <div>
          <h2 className="text-xl font-semibold mb-3">📦 Request Format</h2>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <CodeBlock code={jsonCode} />
          </div>

          <p className="text-gray-400 mt-3 text-sm">
            <span className="text-white font-medium">query</span> → Your
            question or input text.
          </p>
        </div>

        {/*  Example */}
        <div>
          <h2 className="text-xl font-semibold mb-3">⚡ Example (cURL)</h2>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <CodeBlock code={curlCode} />
          </div>
        </div>

        {/* 📤 Response */}
        <div>
          <h2 className="text-xl font-semibold mb-3">📤 Response</h2>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-sm text-gray-300">
            {`{
  "success": true,
  "response": "AI works by learning patterns from data..."
}`}
          </div>
        </div>

        {/* 💡 Best Practices */}
        <div className="bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">💡 Best Practices</h2>

          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Always send API key in headers</li>
            <li>• Handle API errors gracefully</li>
            <li>• Avoid sending large unnecessary text</li>
            <li>• Cache responses if needed</li>
          </ul>
        </div>

        {/*  Try it */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">🚀 Ready to Build?</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Start integrating your RAG system in minutes.
          </p>

          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-lg text-sm">
            Get API Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
