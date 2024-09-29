import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip);

export const Chart = ({ early, onTime, late, draft }) => {
  const data = {
    labels: ['Draft', 'Early', 'On Time', 'Late'],
    datasets: [
      {
        label: "Project Status Count",
        data: [draft, early, onTime, late],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)", 
          "rgba(128, 90, 213, 0.8)", 
          "rgba(34, 197, 94, 0.8)", 
          "rgba(248, 113, 113, 0.8)", 
        ],
        borderColor: [
          "rgba(37, 99, 235, 1)",
          "rgba(128, 90, 213, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dataCard categoryCard flex flex-col items-center">
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Project Status",
            },
          },
        }}
        className="shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-full"
      />
      <div className="flex justify-around w-full mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 mr-1"></span> Draft
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-purple-500 mr-1"></span> Early
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 mr-1"></span> On Time
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 mr-1"></span> Late
        </div>
      </div>
    </div>
  );
};

export default Chart;
