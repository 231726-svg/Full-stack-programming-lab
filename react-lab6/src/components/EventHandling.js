import React, { useState } from 'react';

function EventHandling() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [hoverColor, setHoverColor] = useState('#333');

  const colors = ['#fce4ec', '#e8f5e9', '#e3f2fd', '#fff9c4', '#f3e5f5'];
  let colorIndex = 0;

  const showMessage = () => setMessage('Hello! You clicked the Show Message button!');

  const changeBackground = () => {
    setBgColor(colors[colorIndex % colors.length]);
    colorIndex++;
  };

  const showAlert = () => alert('This is an alert! You triggered the Alert button.');

  return (
    <div className="page" style={{ backgroundColor: bgColor, transition: 'background 0.4s' }}>
      <h1>Event Handling</h1>
      <div className="event-box">
        <button
          className="btn-msg"
          onClick={showMessage}
          onMouseOver={() => setHoverColor('#8e44ad')}
          onMouseOut={() => setHoverColor('#333')}
          style={{ color: hoverColor === '#8e44ad' ? 'yellow' : 'white' }}
        >
          Show Message
        </button>

        <button className="btn-bg" onClick={changeBackground}>
          Change Background Color
        </button>

        <button className="btn-alert" onClick={showAlert}>
          Show Alert
        </button>

        {message && <div className="event-message">{message}</div>}
      </div>
    </div>
  );
}

export default EventHandling;
