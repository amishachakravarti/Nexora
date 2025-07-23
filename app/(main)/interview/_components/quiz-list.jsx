"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="bg-black border border-gray-600 text-white">
        <div className="p-6 border-b border-gray-500 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Recent Quizzes</h2>
            <p className="text-sm text-gray-400">
              Review your past quiz performance
            </p>
          </div>
          <Button
            onClick={() => router.push("/interview/mock")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
          >
            Start New Quiz
          </Button>
        </div>

        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer hover:bg-gray-800 transition-colors border border-gray-700"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <div className="p-4 border-b border-gray-600">
                  <h3 className="text-2xl font-semibold">Quiz {i + 1}</h3>
                  <div className="text-sm text-gray-400 flex justify-between mt-1">
                    <span>Score: {assessment.quizScore.toFixed(1)}%</span>
                    <span>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </span>
                  </div>
                </div>
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-gray-400">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quiz Result</h2>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-gray-600 hover:text-black text-sm"
              >
                Close
              </button>
            </div>
            <QuizResult
              result={selectedQuiz}
              hideStartNew
              onStartNew={() => router.push("/interview/mock")}
            />
          </div>
        </div>
      )}
    </>
  );
}

