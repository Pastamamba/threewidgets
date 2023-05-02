import React, { useRef, useEffect, useState } from "react";
import "./styles/graphcharts.css";
import PercentageBox from "./PercentageBox";

// GraphChart component accepts data1 and data2 as props
const GraphChart = ({ data1, data2 }) => {
  const canvasRef = useRef();
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  // Handle changes to the slider input
  const handleSliderChange = (event) => {
    setSliderValue(parseFloat(event.target.value));
  };

  // Normalize data points based on the canvas dimensions and maxValue
  const normalizeData = (data, maxValue) => {
    const canvasHeight = canvasRef.current.height;
    return data.map((point) => {
      return {
        x: point.x * canvasRef.current.width,
        y: canvasHeight - (point.y / maxValue) * canvasHeight,
      };
    });
  };

  // Calculate the percentage of a data point at the sliderValue position
  const calculatePercentage = (data, maxValue, sliderValue) => {
    const lastValue =
      data.find((point) => point.x >= sliderValue)?.y ||
      data[data.length - 1].y;
    return (lastValue / maxValue) * 100;
  };

  // Draw a line on the canvas using the provided data and color
  const drawLine = (ctx, data, color) => {
    ctx.beginPath();
    ctx.moveTo(data[0].x, data[0].y);

    data.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = color;
    ctx.stroke();
  };

  // Draw a vertical line on the canvas at the specified x position with the provided color
  const drawVerticalLine = (ctx, x, color) => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasRef.current.height);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  // Draw axis labels on the canvas with the specified maxValue
  const drawAxisLabels = (ctx, maxValue) => {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("0", 5, canvasRef.current.height - 5);
    ctx.fillText(maxValue, 5, 20);
  };

  // Calculate the position of the value label based on the sliderValue
  const valueLabelPosition = () => {
    const sliderWidth = 600;
    return sliderValue * sliderWidth - 25;
  };

  // Use useEffect to draw the graph lines and update the percentages whenever the data or sliderValue changes
  useEffect(() => {
    const maxValue = Math.max(
      ...data1.map((point) => point.y),
      ...data2.map((point) => point.y)
    );
    const normalizedData1 = normalizeData(data1, maxValue);
    const normalizedData2 = normalizeData(data2, maxValue);

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawLine(ctx, normalizedData1, "#9657a2");
    drawLine(ctx, normalizedData2, "#ee72f1");
    drawVerticalLine(ctx, sliderValue * canvasRef.current.width, "gray");
    drawAxisLabels(ctx, maxValue);

    // Update percentage state values based on the data and sliderValue
    setPercentage1(calculatePercentage(data1, maxValue, sliderValue));
    setPercentage2(calculatePercentage(data2, maxValue, sliderValue));
  }, [data1, data2, sliderValue]);

  return (
    <div className="graphchart-container">
      {/* Render PercentageBox components with percentage values and colors */}
      <div className="graphchart-percentages">
        <PercentageBox value={percentage1} color="#9657a2" />
        <PercentageBox value={percentage2} color="#ee72f1" />
      </div>
      {/* Canvas element for drawing the graph lines */}
      <canvas ref={canvasRef} width={600} height={400} />
      {/* Slider input for changing the vertical line position on the graph */}
      <div className="graphchart-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        {/* Value label showing the current sliderValue */}
        <span
          className="graphchart-value-label"
          style={{ left: valueLabelPosition() }}
        >
          {sliderValue.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default GraphChart;
