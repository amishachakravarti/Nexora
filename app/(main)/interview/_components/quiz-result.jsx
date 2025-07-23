"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/Button";
import { CardContent } from "@/components/CardContent";

export default function QuizResult({ result, hideStartNew = false, onStartNew }) {
  if (!result) return null;

  return (
    <div className="mx-auto text-white">
      <h1 className="flex items-center gap-2 text-3xl font-bold mb-6 text-yellow-400">
        <Trophy className="h-6 w-6" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${result.quizScore}%` }}
            ></div>
          </div>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-gray-300">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-lg p-4 space-y-3 bg-black"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-sm text-gray-400 space-y-1">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>

              <div className="text-sm bg-gray-800 text-white p-3 rounded border border-gray-700">
                <p className="font-medium mb-1">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        {!hideStartNew && (
          <div className="pt-4">
            <Button onClick={onStartNew} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Start New Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  );
}
