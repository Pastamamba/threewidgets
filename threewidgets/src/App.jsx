import "./App.css";
import BarChart from "./BarChart/BarChart";
import GraphChart from "./GraphChart/GraphChart";
import ProgressBar from "./ProgressBar/ProgressBar";

const App = () => {
  // Define different sets of bar chart data
  const barChartData = [
    { label: "Positive", value: 100 },
    { label: "Negative", value: 60 },
  ];

  const barChartData2 = [
    { label: "Voting 1", value: 90 },
    { label: "Voting 2", value: 60 },
    { label: "Voting 3", value: 70 },
  ];

  const barChartData3 = [
    { label: "Voting 1", value: 10000 },
    { label: "Voting 2", value: 7500 },
    { label: "Voting 3", value: 5000 },
    { label: "Voting 3", value: 15000 },
  ];

  const barChartData4 = [
    { label: "Voting 1", value: 2000000 },
    { label: "Voting 2", value: 250000 },
    { label: "Voting 3", value: 320000 },
    { label: "Voting 3", value: 42000 },
  ];

  // Define line graph data for the first line
  const graphData1 = [
    { x: 0.01, y: 2 },
    { x: 0.05, y: 10 },
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

  // Define line graph data for the second line
  const graphData2 = [
    { x: 0.01, y: 115 },
    { x: 0.05, y: 110 },
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
      <div style={{ marginBottom: "5em" }}>
        <div style={{ width: "100%" }}>
          <h1>Expected</h1>
          <img
            style={{ maxWidth: "100%", height: "auto" }}
            src={"/widgets-cropped.png"}
          />
        </div>

        {/* Render Bar Chart examples */}
        <h1>Bar Chart Example</h1>
        {/* Render BarChart components with different data sets and maximum values */}
        <BarChart data={barChartData} maxValue={100} />
        <BarChart data={barChartData2} maxValue={100} />
        <BarChart data={barChartData3} maxValue={15000} />
        <BarChart data={barChartData4} maxValue={2000000} />

        {/* Render Progress Bar examples */}
        <h1>Progress bar examples</h1>
        {/* Render ProgressBar components with different values, goals, and maximums */}
        <ProgressBar value={80} goal={100} max={150} />
        <ProgressBar value={110} goal={100} max={150} />
        <ProgressBar value={90} goal={100} max={150} />
        <ProgressBar value={60} goal={40} max={150} />
        <ProgressBar value={60} goal={100} max={110} />

        {/* Render Graph Chart example */}
        <h1>Graph chart example</h1>
        {/* Render GraphChart component with two sets of data for two lines */}
        <GraphChart data1={graphData1} data2={graphData2} />
      </div>
    </>
  );
};

export default App;
