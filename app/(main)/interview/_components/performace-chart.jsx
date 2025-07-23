"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-black border border-gray-500 text-white">
      <div className="p-6 border-b border-gray-600">
        <h2 className="text-3xl font-bold">Performance Trend</h2>
        <p className="text-sm text-gray-400">Your quiz scores over time</p>
      </div>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tick={{ fill: "#ccc", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#ccc"
                tick={{ fill: "#ccc", fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-white border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium text-black">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-gray-600">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#60a5fa" // Tailwind's blue-400
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
