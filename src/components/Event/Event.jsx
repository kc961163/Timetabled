import PropTypes from "prop-types";
import "./Event.css";

const Event = (props) => {
  // Handler for click events
  const handleClick = () => {
    alert(`Clicked on ${props.event}`);
  };

  // Handler for drag start: include the source slot id in the dataTransfer
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", props.event);
    e.dataTransfer.setData("color", props.color);
    if (props.slotId) {
      e.dataTransfer.setData("source", props.slotId);
    }
  };

  return (
    <td
      className={"Event " + props.color}
      onClick={handleClick}
      draggable="true"
      onDragStart={handleDragStart}
    >
      <h5>{props.event}</h5>
    </td>
  );
};

Event.propTypes = {
  event: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  slotId: PropTypes.string, // optional, for tracking the source
};

export default Event;