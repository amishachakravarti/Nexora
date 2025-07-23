"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import Button from "@/components/Button";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
      setOpenDialogId(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-bold">No Cover Letters Yet</h2>
          <p className="text-gray-400">
            Create your first cover letter to get started.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="relative group">
          <div className="p-6 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {letter.jobTitle} at {letter.companyName}
              </h3>
              <p className="text-sm text-gray-400">
                Created {format(new Date(letter.createdAt), "PPP")}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpenDialogId(letter.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent>
            <p className="text-gray-400 text-sm line-clamp-3">
              {letter.jobDescription}
            </p>
          </CardContent>

          {/* Alert Dialog */}
          {openDialogId === letter.id && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-900">
                <h2 className="text-lg font-semibold mb-2">Delete Cover Letter?</h2>
                <p className="text-sm mb-4">
                  This action cannot be undone. This will permanently delete your
                  cover letter for <strong>{letter.jobTitle}</strong> at{" "}
                  <strong>{letter.companyName}</strong>.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 text-sm border rounded-md"
                    onClick={() => setOpenDialogId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(letter.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
