import { Brain, Target, Trophy } from "lucide-react";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Average Score</h2>
          <Trophy className="h-4 w-4 text-gray-400" />
        </div>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-xs text-gray-400">Across all assessments</p>
        </CardContent>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Questions Practiced</h2>
          <Brain className="h-4 w-4 text-gray-400" />
        </div>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-gray-400">Total questions</p>
        </CardContent>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Latest Score</h2>
          <Target className="h-4 w-4 text-gray-400" />
        </div>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-gray-400">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
