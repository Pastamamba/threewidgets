import "../styles/percentagebox.css";

const PercentageBox = ({ value, color, position }) => {
  const boxStyle = {
    left: position.left,
    top: position.top,
    position: "absolute",
    transform: `translate(${position.transformX}, ${position.transformY})`,
    backgroundColor: color,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="percentageBox" style={boxStyle}>
      {value !== null ? value.toFixed(1) : "-"}%
    </div>
  );
};

export default PercentageBox;
