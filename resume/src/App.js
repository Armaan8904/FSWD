import React from 'react';

function App() {
  const handleDownload = () => {
    // Navigate browser to the download endpoint
    window.location.href = 'https://fswd-07fo.onrender.com/resume';
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Download Resume</h2>
      <button onClick={handleDownload} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Download Resume
      </button>
    </div>
  );
}

export default App;
