// App.js
import React from 'react';
import './App.css';

function App() {
  const handleDownload = () => {
    window.location.href = 'https://fswd-724n.onrender.com/resume';
  };

  return (
    <div className="container">
      <h2>Download Resume</h2>
      <button onClick={handleDownload}>
        Download Resume
      </button>
    </div>
  );
}

export default App;
