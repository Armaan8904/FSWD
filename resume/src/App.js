import React from 'react';

function App() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://your-backend-url.com/download/sample_resume.pdf';
    link.setAttribute('download', 'sample_resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Download Resume</h2>
      <button onClick={downloadResume}>Download</button>
    </div>
  );
}

export default App;
