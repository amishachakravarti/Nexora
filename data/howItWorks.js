import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry and expertise for personalized guidance",
    icon: (
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
        <UserPlus className="w-8 h-8 text-white" />
      </div>
    ),
  },
  {
    title: "Craft Your Documents",
    description: "Create ATS-optimized resumes and compelling cover letters",
    icon: (
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
        <FileEdit className="w-8 h-8 text-white" />
      </div>
    ),
  },
  {
    title: "Prepare for Interviews",
    description:
      "Practice with AI-powered mock interviews tailored to your role",
    icon: (
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
        <Users className="w-8 h-8 text-white" />
      </div>
    ),
  },
  {
    title: "Track Your Progress",
    description: "Monitor improvements with detailed performance analytics",
    icon: (
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
        <LineChart className="w-8 h-8 text-white" />
      </div>
    ),
  },
];

