"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import Button from "@/components/Button";
import EntryForm from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { saveResume } from "@/actions/resume";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        email: "",
        mobile: "",
        linkedin: "",
        twitter: "",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${
          user.fullName
        }</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    const formattedContent = previewContent
      .replace(/\n/g, "\n")
      .replace(/\n\s*\n/g, "\n\n")
      .trim();
    await saveResumeFn(formattedContent);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold text-4xl md:text-5xl text-white">
          Resume Builder
        </h1>
        <div className="space-x-2">
          <Button onClick={handleSubmit(onSubmit)}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isGenerating ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "edit" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Form
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "preview" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Markdown
        </button>
      </div>

      {activeTab === "edit" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="lg:px-20 px-4 space-y-4">
            <input
              placeholder="Email"
              {...register("contactInfo.email")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
            <input
              placeholder="Mobile"
              {...register("contactInfo.mobile")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
            <input
              placeholder="LinkedIn"
              {...register("contactInfo.linkedin")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
            <input
              placeholder="Twitter"
              {...register("contactInfo.twitter")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
            <textarea
              placeholder="Professional Summary"
              {...register("summary")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
            <textarea
              placeholder="Skills (comma separated)"
              {...register("skills")}
              className="w-full p-2 border rounded bg-transparent text-white"
            />
          </div>

          <EntryForm
            type="Experience"
            entries={formValues.experience}
            onChange={(updated) => setValue("experience", updated)}
          />
          <EntryForm
            type="Education"
            entries={formValues.education}
            onChange={(updated) => setValue("education", updated)}
          />
          <EntryForm
            type="Projects"
            entries={formValues.projects}
            onChange={(updated) => setValue("projects", updated)}
          />
        </form>
      ) : (
        <div className="space-y-2">
          <Button
            type="button"
            className="mb-2"
            onClick={() =>
              setResumeMode(resumeMode === "preview" ? "edit" : "preview")
            }
          >
            {resumeMode === "preview" ? (
              <>
                <Edit className="h-4 w-4" /> Edit Resume
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4" /> Show Preview
              </>
            )}
          </Button>
          {resumeMode !== "preview" && (
            <div className="flex items-center gap-2 border border-yellow-500 text-yellow-500 p-2 rounded">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose edited markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{ background: "white", color: "black" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
