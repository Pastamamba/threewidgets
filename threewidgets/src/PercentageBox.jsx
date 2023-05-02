import React from "react";

const PercentageBox = ({ value, color }) => (
  <div
    className="graph-percentage-box"
    style={{
      background: color,
    }}
  >
    {value.toFixed(2)}%
  </div>
);

export default PercentageBox;
