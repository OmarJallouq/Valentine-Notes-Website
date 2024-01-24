import React from 'react';
import '../styles/resolutionerror.css'; // Create a separate CSS file for styling if needed

function ResolutionError() {
  return (
    <div className="error-container">
      <h1>Screen Resolution Too Small</h1>
      <p>Please use a larger screen to access this website.</p>
    </div>
  );
}

export default ResolutionError;
