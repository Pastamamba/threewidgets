import React, { useRef, useEffect, useState } from "react";
import "../styles/graphcharts.css";
import PercentageBox from "./PercentageBox";

// GraphChart component accepts data1 and data2 as props
const GraphChart = ({ data1, data2 }) => {
  const canvasRef = useRef();
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [position1, setPosition1] = useState({
    left: 0,
    top: "20px",
  });
  const [position2, setPosition2] = useState({
    left: 0,
    top: "20px",
  });

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

    ctx.lineWidth = 7; // Added: Increase the line width
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  // Draw a vertical line on the canvas at the specified x position with the provided color
  const drawVerticalLine = (ctx, x, color) => {
    ctx.beginPath();
    ctx.setLineDash([10, 14]);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasRef.current.height);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
  };

  // Calculate the position of the value label based on the sliderValue
  const valueLabelPosition = () => {
    if (canvasRef.current) {
      const sliderWidth = canvasRef.current.clientWidth;
      return sliderValue * sliderWidth - 25;
    }
    return 0;
  };

  // Draw the x-axis on the canvas
  const drawXAxis = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, canvasRef.current.height);
    ctx.lineTo(canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = "#3d3b52";
    ctx.lineWidth = 20;
    ctx.stroke();
  };

  // Draw the y-axis on the canvas
  const drawYAxis = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvasRef.current.height);
    ctx.strokeStyle = "#3d3b52";
    ctx.stroke();
  };

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const newSliderValue = x / canvasRef.current.width;
    setSliderValue(newSliderValue);
  };

  const interpolatePoint = (data, x, offsetX) => {
    const indexBefore = data.findIndex((point) => point.x >= x) - 1;
    const indexAfter = indexBefore + 1;

    if (indexBefore < 0 || indexAfter >= data.length) {
      return null;
    }

    const pointBefore = data[indexBefore];
    const pointAfter = data[indexAfter];

    const t = (x - pointBefore.x) / (pointAfter.x - pointBefore.x);
    const y = pointBefore.y + t * (pointAfter.y - pointBefore.y);

    return {
      x: x + offsetX,
      y: y,
    };
  };

  const redrawGraph = () => {
    setSliderValue((prevSliderValue) => prevSliderValue + 0.00000001);
  };

  useEffect(() => {
    const handleResize = () => {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      requestAnimationFrame(redrawGraph);
    };

    // Call handleResize here to set the canvas dimensions on initial load
    handleResize();

    window.addEventListener("resize", handleResize);

    // Use a Promise to ensure the DOM is fully loaded before updating the sliderValue state
    Promise.resolve().then(() => {
      setSliderValue(0.5);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Use useEffect to draw the graph lines and update the percentages whenever the data or sliderValue changes
  useEffect(() => {
    const maxValue = Math.max(
      ...data1.map((point) => point.y),
      ...data2.map((point) => point.y)
    );
    const normalizedData1 = normalizeData(data1, maxValue);
    const normalizedData2 = normalizeData(data2, maxValue);

    // Calculate the position of the percentage box based on the sliderValue
    const percentageBoxPosition = (point) => {
      return {
        left: point.x,
        top: "20px",
        transformX: "-50%",
        transformY: "-100%",
      };
    };
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Call the new functions to draw the x-axis and y-axis
    drawXAxis(ctx);
    drawYAxis(ctx);

    drawLine(ctx, normalizedData1, "#9657a2");
    drawLine(ctx, normalizedData2, "#ee72f1");
    drawVerticalLine(ctx, sliderValue * canvasRef.current.width, "#3d3b52");

    // Update percentage state values based on the data and sliderValue
    setPercentage1(calculatePercentage(data1, maxValue, sliderValue));
    setPercentage2(calculatePercentage(data2, maxValue, sliderValue));

    // Pass the position prop to the PercentageBox components
    const interpolatedPoint1 = interpolatePoint(
      normalizedData1,
      sliderValue * canvasRef.current.width,
      -40
    );
    const interpolatedPoint2 = interpolatePoint(
      normalizedData2,
      sliderValue * canvasRef.current.width,
      40
    );

    if (interpolatedPoint1) {
      setPosition1(percentageBoxPosition(interpolatedPoint1));
    }

    if (interpolatedPoint2) {
      setPosition2(percentageBoxPosition(interpolatedPoint2));
    }
  }, [data1, data2, sliderValue]);

  return (
    <div className="graphchart-container" style={{ position: "relative" }}>
      {/* Render PercentageBox components with percentage values and colors */}
      <PercentageBox value={percentage1} color="#9657a2" position={position1} />
      <PercentageBox value={percentage2} color="#ee72f1" position={position2} />
      {/* Canvas element for drawing the graph lines */}
      <canvas
        ref={canvasRef}
        className="graph-chart-canvas"
        style={{ width: "100%", height: 300 }}
        onClick={handleCanvasClick}
      />
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
