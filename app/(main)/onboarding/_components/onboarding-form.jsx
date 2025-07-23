// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useFetch from "@/hooks/use-fetch";
// import { onboardingSchema } from "@/app/lib/schema";
// import { updateUser } from "@/actions/user";

// const OnboardingForm = ({ industries }) => {
//   const router = useRouter();
//   const [selectedIndustry, setSelectedIndustry] = useState(null);

//   const {
//     loading: updateLoading,
//     fn: updateUserFn,
//     data: updateResult,
//   } = useFetch(updateUser);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: zodResolver(onboardingSchema),
//   });

//   const onSubmit = async (values) => {
//     try {
//       const formattedIndustry = `${values.industry}-${values.subIndustry
//         .toLowerCase()
//         .replace(/ /g, "-")}`;

//       await updateUserFn({
//         ...values,
//         industry: formattedIndustry,
//       });
//     } catch (error) {
//       console.error("Onboarding error:", error);
//     }
//   };

//   useEffect(() => {
//     if (updateResult?.success && !updateLoading) {
//       toast.success("Profile completed successfully!");
//       router.push("/dashboard");
//       router.refresh();
//     }
//   }, [updateResult, updateLoading]);

//   const watchIndustry = watch("industry");

//   return (
//     <div className="flex items-center justify-center bg-background">
//       <Card className="w-full max-w-lg mt-10 mx-2">
//         <CardHeader>
//           <CardTitle className="gradient-title text-4xl">
//             Complete Your Profile
//           </CardTitle>
//           <CardDescription>
//             Select your industry to get personalized career insights and
//             recommendations.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="industry">Industry</Label>
//               <Select
//                 onValueChange={(value) => {
//                   setValue("industry", value);
//                   setSelectedIndustry(
//                     industries.find((ind) => ind.id === value)
//                   );
//                   setValue("subIndustry", "");
//                 }}
//               >
//                 <SelectTrigger id="industry">
//                   <SelectValue placeholder="Select an industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Industries</SelectLabel>
//                     {industries.map((ind) => (
//                       <SelectItem key={ind.id} value={ind.id}>
//                         {ind.name}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.industry && (
//                 <p className="text-sm text-red-500">
//                   {errors.industry.message}
//                 </p>
//               )}
//             </div>

//             {watchIndustry && (
//               <div className="space-y-2">
//                 <Label htmlFor="subIndustry">Specialization</Label>
//                 <Select
//                   onValueChange={(value) => setValue("subIndustry", value)}
//                 >
//                   <SelectTrigger id="subIndustry">
//                     <SelectValue placeholder="Select your specialization" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Specializations</SelectLabel>
//                       {selectedIndustry?.subIndustries.map((sub) => (
//                         <SelectItem key={sub} value={sub}>
//                           {sub}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 {errors.subIndustry && (
//                   <p className="text-sm text-red-500">
//                     {errors.subIndustry.message}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="experience">Years of Experience</Label>
//               <Input
//                 id="experience"
//                 type="number"
//                 min="0"
//                 max="50"
//                 placeholder="Enter years of experience"
//                 {...register("experience")}
//               />
//               {errors.experience && (
//                 <p className="text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="skills">Skills</Label>
//               <Input
//                 id="skills"
//                 placeholder="e.g., Python, JavaScript, Project Management"
//                 {...register("skills")}
//               />
//               <p className="text-sm text-muted-foreground">
//                 Separate multiple skills with commas
//               </p>
//               {errors.skills && (
//                 <p className="text-sm text-red-500">{errors.skills.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bio">Professional Bio</Label>
//               <Textarea
//                 id="bio"
//                 placeholder="Tell us about your professional background..."
//                 className="h-32"
//                 {...register("bio")}
//               />
//               {errors.bio && (
//                 <p className="text-sm text-red-500">{errors.bio.message}</p>
//               )}
//             </div>

//             <Button type="submit" className="w-full" disabled={updateLoading}>
//               {updateLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Complete Profile"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OnboardingForm;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import IndustryDropdown from "@/components/IndustryDropdown";
import SubIndustryDropdown from "@/components/SubIndustryDropdown";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <Card className="pt-3 px-3 w-full max-w-lg mt-10 bg-[#1e293b] border border-gray-400">
        <CardContent>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Complete Your Profile
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Select your industry to get personalized career insights and
            recommendations.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry Dropdown */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium mb-1"
              >
                Industry
              </label>
              <IndustryDropdown
                industries={industries}
                selected={watch("industry")}
                onSelect={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              />
              {errors.industry && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div>
                <label
                  htmlFor="subIndustry"
                  className="block text-sm font-medium mb-1"
                >
                  Specialization
                </label>
                <SubIndustryDropdown
                  options={selectedIndustry?.subIndustries || []}
                  selected={watch("subIndustry")}
                  onSelect={(value) => setValue("subIndustry", value)}
                />
                {errors.subIndustry && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium mb-1"
              >
                Years of Experience
              </label>
              <input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
                className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2"
              />
              {errors.experience && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium mb-1"
              >
                Skills
              </label>
              <input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
                className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2"
              />
              <p className="text-sm text-gray-400 mt-1">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Professional Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="w-full border border-gray-600 bg-transparent text-white rounded-md p-2 h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
