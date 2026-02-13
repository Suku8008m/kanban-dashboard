import "./index.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useApp } from "../../Context";
import "./index.css";

export const TaskprogressChart = () => {
  const { tasks, defaultStatus, isLight } = useApp();

  const totalTasks = tasks.length;

  const todoCount = tasks.filter(
    (task) => task.status === defaultStatus.todo,
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.status === defaultStatus.inprogress,
  ).length;

  const doneCount = tasks.filter(
    (task) => task.status === defaultStatus.done,
  ).length;

  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((doneCount / totalTasks) * 100);

  const barData = [
    { name: "Todo", count: todoCount },
    { name: "In Progress", count: inProgressCount },
    { name: "Done", count: doneCount },
  ];

  const pieData = [
    { name: "Completed", value: doneCount },
    { name: "Remaining", value: totalTasks - doneCount },
  ];

  const COLORS = ["#152e42", "#e5e7eb2b"];

  return (
    <div
      className={`${isLight ? "task-progress-container" : "task-progress-container light"}`}
    >
      <h3>Task Progress</h3>

      <div className="charts">
        {/* BAR CHART */}
        <div className="chart-box">
          <p>Tasks by Status</p>
          <ResponsiveContainer width="100%" height={220} className="bar">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "none" }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#5d5b5b" }}
                cursor={{ fill: "rgba(92, 92, 92, 0.1)" }}
              />

              <Bar dataKey="count" fill=" #152e42" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-box">
          <p>Completion</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fontWeight="600"
                fill={isLight ? "#fff" : "#152e42"}
              >
                {completionPercent}%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
