import React from "react";
import "./styles/progressbar.css";

const ProgressBar = ({ value, goal, max }) => {
  // Calculate the percentage based on the value and max
  const percentage = (value / max) * 100;

  // Calculate the goal percentage based on the goal and max
  const goalPercentage = (goal / max) * 100;

  // Determine if the goal has been achieved
  const achieved = value >= goal;

  return (
    <div
      className="progress-bar"
      // Set the background color based on whether the goal has been achieved
      style={{
        backgroundColor: `${achieved ? "#9657a2" : "#3d3b52"}`,
      }}
    >
      {/* Render the progress bar value with a dynamic width based on the percentage */}
      <div
        className={`progress-value ${achieved ? "achieved" : "not-achieved"}`}
        style={{ width: `${percentage}%` }}
      />
      {/* Render the goal line with a dynamic position based on the goal percentage */}
      <div className="goal-line" style={{ left: `${goalPercentage}%` }} />
    </div>
  );
};

export default ProgressBar;
