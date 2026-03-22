import React, { useState } from "react";

const ApiKeyCard = ({ apiKey }) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  if (!apiKey) return null;

  const displayKey = visible ? apiKey : apiKey.slice(0, 6) + "••••••••••••••";

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">🔑 API Key</h2>

        <button
          onClick={() => setVisible(!visible)}
          className="text-xs text-indigo-400 hover:text-indigo-300"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {/* Key Box */}
      <div className="bg-[#0f172a] px-3 py-2 rounded-md flex items-center justify-between gap-2">
        <span className="break-all text-xs flex-1">{displayKey}</span>

        <button
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="text-xs bg-indigo-500 hover:bg-indigo-600 px-2 py-1 rounded"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyCard;
