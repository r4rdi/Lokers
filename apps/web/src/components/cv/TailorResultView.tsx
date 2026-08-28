"use client";

import React, { useState } from "react";

interface TailorResultProps {
  data: {
    atsMatchScore: number;
    matchAnalysis: {
      matchedSkills: string[];
      missingSkills: string[];
    };
    tailoredResume: {
      summary: string;
      skills: string[];
    };
    coverLetter: {
      subject: string;
      body: string;
    };
  };
}

export default function TailorResultView({ data }: TailorResultProps) {
  const [activeTab, setActiveTab] = useState<"resume" | "coverLetter">("resume");

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Left Panel: Analytics & Feedback */}
      <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">ATS Match Analysis</h2>
        
        {/* Match Score Indicator */}
        <div className="mb-6 p-4 bg-white rounded-lg border shadow-sm">
          <span className="text-sm text-gray-500">Match Score</span>
          <div className="text-4xl font-extrabold text-indigo-600">
            {data.atsMatchScore}%
          </div>
        </div>

        {/* Matched Skills */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-700 mb-2">Matched Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.matchAnalysis.matchedSkills.map((skill, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h3 className="text-sm font-semibold text-red-700 mb-2">Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.matchAnalysis.missingSkills.map((skill, idx) => (
              <span key={idx} className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded">
                ✕ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Tailored CV & Cover Letter Preview */}
      <div className="w-2/3 p-6 flex flex-col">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "resume" ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            Tailored Resume
          </button>
          <button
            onClick={() => setActiveTab("coverLetter")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "coverLetter" ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            Cover Letter
          </button>
        </div>

        <div className="flex-1 bg-white p-8 rounded-lg border shadow-sm overflow-y-auto">
          {activeTab === "resume" ? (
            <div>
              <h1 className="text-2xl font-bold mb-2">Professional Summary</h1>
              <p className="text-gray-700 mb-6">{data.tailoredResume.summary}</p>
              
              <h2 className="text-lg font-bold mb-2">Relevant Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.tailoredResume.skills.map((s, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-bold mb-4">{data.coverLetter.subject}</h1>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {data.coverLetter.body}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}