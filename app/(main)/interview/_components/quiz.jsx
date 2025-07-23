"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Button from "@/components/Button";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  // When quizData changes, reset answers
  useEffect(() => {
    if (Array.isArray(quizData)) {
      setAnswers(Array(quizData.length).fill(null));
      setCurrentQuestion(0);
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    return (
      (answers.filter(
        (answer, index) => answer === quizData[index].correctAnswer
      ).length /
        quizData.length) *
      100
    );
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error?.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setShowExplanation(false);
    setAnswers([]);
    setResultData(null);
    generateQuizFn();
  };

  // Loading state
  if (generatingQuiz) {
    return <BarLoader className="mt-4 mx-auto" width="100%" color="gray" />;
  }

  //  If quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  //  Start screen (quiz not yet generated)
  if (!Array.isArray(quizData)) {
    return (
      <Card className="mx-2 bg-black text-white border border-gray-700">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Ready to test your knowledge?</h2>
          <p className="text-gray-400 mb-6">
            This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best answer for each question.
          </p>
          <Button
            onClick={generateQuizFn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  //  Main quiz UI
  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 bg-black text-white border border-gray-700">
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Question {currentQuestion + 1} of {quizData.length}
          </h2>
        </div>

        {question ? (
          <>
            <p className="text-lg font-medium">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={() => handleAnswer(option)}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-300">{option}</span>
                </label>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <p className="font-medium text-white mb-1">Explanation:</p>
                <p className="text-gray-300">{question.explanation}</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-red-400">Question not found</p>
        )}

        <div className="flex justify-between pt-4">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              className="border border-gray-400 text-white bg-transparent hover:bg-gray-700"
              disabled={!answers[currentQuestion]}
            >
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentQuestion < quizData.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
