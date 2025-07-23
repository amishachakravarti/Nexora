import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/Button"; // ← Your Tailwind-based button
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">My Cover Letters</h1>

        <Link href="/ai-cover-letter/new">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
