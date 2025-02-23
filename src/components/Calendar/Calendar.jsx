import { useState } from "react";
import "./Calendar.css";
import Event from "../Event/Event";

const initialSlots = {
  "8am-sunday": { event: "Starbucks ☕️", color: "green" },
  "8am-thursday": { event: "Yolk 🍳", color: "green" },
  "9am-tuesday": { event: "Subway 🚊", color: "pink" },
  "9am-saturday": { event: "The Bean 🫘", color: "blue" },
  "10am-sunday": { event: "Fancy Dinner 🎩", color: "green" },
  // Other slots are empty (undefined)
};

function Calendar() {
  const times = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const colorOptions = ["green", "pink", "blue"];

  // Use state to store slot mappings. Empty cells are undefined.
  const [slots, setSlots] = useState(initialSlots);

  // New state for creating a customizable event
  const [newEvent, setNewEvent] = useState({
    time: "8am",
    day: "Sunday",
    event: "",
    color: colorOptions[0]
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // When an event is dropped, update state accordingly.
  const handleDrop = (e, targetSlotId) => {
    e.preventDefault();
    const eventData = e.dataTransfer.getData("text/plain");
    const color = e.dataTransfer.getData("color");
    const sourceSlotId = e.dataTransfer.getData("source");
  
    setSlots((prevSlots) => {
      const updatedSlots = { ...prevSlots };
      const targetEvent = updatedSlots[targetSlotId];
      updatedSlots[targetSlotId] = { event: eventData, color };
      if (sourceSlotId && sourceSlotId !== targetSlotId) {
        updatedSlots[sourceSlotId] = targetEvent;
      }
      return updatedSlots;
    });
  };

  // Handle creating a new event.
  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    const slotId = `${newEvent.time}-${newEvent.day.toLowerCase()}`;
    setSlots((prevSlots) => ({
      ...prevSlots,
      [slotId]: { event: newEvent.event, color: newEvent.color }
    }));
    // Clear the form.
    setNewEvent({ time: "8am", day: "Sunday", event: "", color: colorOptions[0] });
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Render a calendar cell.
  const renderCell = (time, day) => {
    const slotId = `${time}-${day.toLowerCase()}`;
    return (
      <td
        key={slotId}
        onDrop={(e) => handleDrop(e, slotId)}
        onDragOver={handleDragOver}
      >
        {slots[slotId] ? (
          <Event
            event={slots[slotId].event}
            color={slots[slotId].color}
            slotId={slotId}
          />
        ) : null}
      </td>
    );
  };

  return (
    <div className="Calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="time">{time}</td>
              {days.map((day) => renderCell(time, day))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* New Event Form */}
      <div className="new-event">
        <h3>Create a New Event</h3>
        <form onSubmit={handleNewEventSubmit}>
          <label>
            Time:
            <select name="time" value={newEvent.time} onChange={handleNewEventChange}>
              {times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
          <label>
            Day:
            <select name="day" value={newEvent.day} onChange={handleNewEventChange}>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
          <label>
            Event Name:
            <input
              type="text"
              name="event"
              value={newEvent.event}
              onChange={handleNewEventChange}
              placeholder="Enter event name"
              required
            />
          </label>
          <label>
            Color:
            <select name="color" value={newEvent.color} onChange={handleNewEventChange}>
              {colorOptions.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default Calendar;