import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 text-white">
      <div className="flex flex-col gap-4">
        <Link href="/ai-cover-letter">
          <Button
            className="pl-0 gap-2 text-blue-400 hover:underline bg-transparent border-none shadow-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-4xl font-bold">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <div className="mt-6">
        <CoverLetterPreview content={coverLetter?.content} />
      </div>
    </div>
  );
}
