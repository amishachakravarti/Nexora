"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { entrySchema } from "@/app/lib/schema";
import { improveWithAI } from "@/actions/resume";
import useFetch from "@/hooks/use-fetch";

import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";

export default function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);
    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    onChange(updated);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    } else if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM", new Date());
    return format(date, "MMM yyyy");
  };

  return (
    <div className="lg:px-20 px-4 space-y-6">
      {/* Existing Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="text-sm font-medium text-white">
                  {entry.title} @ {entry.organization}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardContent>
                <p className="text-sm text-gray-400">
                  {entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`}
                </p>
                <p className="mt-2 text-sm text-white whitespace-pre-wrap">
                  {entry.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Entry */}
      {isAdding ? (
        <Card>
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-white">Add {type}</h3>
          </div>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  placeholder="Title/Position"
                  {...register("title")}
                  className="w-full p-2 border rounded bg-transparent text-white"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  placeholder="Organization/Company"
                  {...register("organization")}
                  className="w-full p-2 border rounded bg-transparent text-white"
                />
                {errors.organization && (
                  <p className="text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="month"
                  {...register("startDate")}
                  className="w-full p-2 border rounded bg-transparent text-white"
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  className="w-full p-2 border rounded bg-transparent text-white disabled:opacity-50"
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) setValue("endDate", "");
                }}
              />
              <label htmlFor="current" className="text-white text-sm">
                Current {type}
              </label>
            </div>

            <div className="space-y-1">
              <textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                {...register("description")}
                className="w-full p-2 border rounded bg-transparent text-white h-32"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>

          <div className="flex justify-end gap-2 p-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
