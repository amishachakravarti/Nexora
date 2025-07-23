
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

// ✅ Local reusable components
function Card({ className = "", children, ...props }) {
  return (
    <div className={`rounded-lg border text-white bg-black shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-400 text-white",
    secondary: "bg-gray-700 text-white",
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

function Progress({ value, className = "" }) {
  return (
    <div className={`w-full h-2 bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

// ✅ Main Dashboard View
const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), {
    addSuffix: true,
  });

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Market Outlook</h4>
              <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
            </div>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-gray-400">Next update {nextUpdateDistance}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Industry Growth</h4>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Demand Level</h4>
              <BriefcaseIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Top Skills</h4>
              <Brain className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Chart */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Salary Ranges by Role</h3>
          <p className="text-sm text-gray-400 mb-4">
            Displaying minimum, median, and maximum salaries (in thousands)
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-black border text-white p-2 rounded shadow-md">
                          <p className="font-semibold">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ₹{item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trends & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">Key Industry Trends</h3>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">Recommended Skills</h3>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;




