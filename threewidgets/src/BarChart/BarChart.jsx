import React from "react";
import "../styles/barchart.css";

// BarChart component accepts data, maxValue, and an optional barWidth prop
const BarChart = ({ data, maxValue, barWidth = 60 }) => {
  const chartHeight = 200;

  // Function to calculate the height of each bar based on the value and maxValue
  const calculateHeight = (value) => {
    const percentage = (value / maxValue) * 100;
    return (percentage / 100) * chartHeight; // Skaalaa korkeus kaavion korkeuden mukaan
  };

  // Calculate the total width of the bar chart based on the number of bars and the barWidth
  const totalWidth = data.length * barWidth;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "k";
    } else {
      return num;
    }
  };

  return (
    // Set the width of the bar-chart container using the calculated totalWidth
    <div
      className="bar-chart"
      style={{ width: totalWidth, height: chartHeight }}
    >
      {/* Y-axis container */}
      <div className="y-axis">
        {/* Display the maximum value on the Y-axis */}
        <div className="max-value">{formatNumber(maxValue)}</div>
        {/* Display the zero value on the Y-axis */}
        <div className="zero-value">0</div>
      </div>
      {/* Render each bar-chart-item */}
      {data.map((item, index) => (
        <div key={index} className="bar-chart-item">
          {/* Set the height of the bar using the calculated height */}
          <div
            className="bar"
            style={{ height: `${calculateHeight(item.value)}px` }}
          ></div>
          {/* Display the label for each bar-chart-item */}
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
