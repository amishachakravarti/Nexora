import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 text-white">
      <div className="flex flex-col gap-4">
        <Link href="/ai-cover-letter">
          <Button className="pl-0 gap-2 text-blue-400 hover:underline bg-transparent border-none shadow-none">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-4xl font-bold">Create Cover Letter</h1>
          <p className="text-gray-400 text-sm">
            Generate a tailored cover letter for your job application
          </p>
        </div>
      </div>

      <CoverLetterGenerator />
    </div>
  );
}
