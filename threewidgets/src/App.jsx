import "./App.css";
import BarChart from "./BarChart";
import GraphChart from "./GraphChart";
import ProgressBar from "./ProgressBar";

const App = () => {
  // Bar chart data
  const barChartData = [
    { label: "Positive", value: 90 },
    { label: "Negative", value: 60 },
  ];

  // Maximum value for bar chart
  const barChartMaxData = 100;

  // Line graph data for the first line
  const graphData1 = [
    { x: 0, y: 10 },
    { x: 0.1, y: 20 },
    { x: 0.2, y: 30 },
    { x: 0.3, y: 40 },
    { x: 0.4, y: 60 },
    { x: 0.5, y: 65 },
    { x: 0.6, y: 70 },
    { x: 0.7, y: 80 },
    { x: 0.8, y: 90 },
    { x: 0.9, y: 100 },
    { x: 1, y: 115 },
  ];

  // Line graph data for the second line
  const graphData2 = [
    { x: 0, y: 115 },
    { x: 0.1, y: 100 },
    { x: 0.2, y: 80 },
    { x: 0.3, y: 60 },
    { x: 0.4, y: 55 },
    { x: 0.5, y: 53 },
    { x: 0.6, y: 51 },
    { x: 0.7, y: 30 },
    { x: 0.8, y: 20 },
    { x: 0.9, y: 10 },
    { x: 1, y: 5 },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: "5em",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <h1>Expected</h1>
          <img
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            src={"/widgets-cropped.png"}
          />
        </div>

        {/* Bar Chart Example */}
        <h1>Bar Chart Example</h1>
        {/* BarChart component with data and maximum value */}
        <BarChart data={barChartData} maxValue={barChartMaxData} />

        {/* Progress Bar Examples */}
        <h1>Progress bar examples</h1>
        {/* ProgressBar components with different values, goals, and maximums */}
        <ProgressBar value={80} goal={100} max={150} />
        <ProgressBar value={110} goal={100} max={150} />
        <ProgressBar value={90} goal={100} max={150} />
        <ProgressBar value={60} goal={40} max={150} />
        <ProgressBar value={60} goal={100} max={110} />

        {/* Graph Chart Example */}
        <h1>Graph chart example</h1>
        {/* GraphChart component with two sets of data for two lines */}
        <GraphChart data1={graphData1} data2={graphData2} />
      </div>
    </>
  );
};

export default App;
