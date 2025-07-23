"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import { generateCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleGenerate = async () => {
    if (!jobTitle || !companyName) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setLetter("");

    try {
      const result = await generateCoverLetter({
        jobTitle,
        companyName,
        jobDescription: "", // Optional for now
      });

      setLetter(result.content);
      toast.success("Cover letter created successfully!");
      router.push(`/ai-cover-letter/${result.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-black border p-4 border-gray-500 text-white">
          <CardContent>
            <h1 className="text-3xl font-bold mb-6">Generate a Cover Letter</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., SAP Labs"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 mx-auto block"
              >
                {loading ? "Generating..." : "Generate Letter"}
              </Button>
            </div>

            {letter && (
              <div className="mt-6 bg-gray-100 border border-gray-300 p-4 rounded-lg whitespace-pre-line text-gray-800">
                <h2 className="text-lg font-semibold mb-2">Generated Letter</h2>
                <p>{letter}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
