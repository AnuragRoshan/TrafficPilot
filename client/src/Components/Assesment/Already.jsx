import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const Already = () => {
  return (
    <div className="thank-top">
      <h2>You have already completed the assessment!</h2>
      <p>Your results have been generated.</p>
      <p>Navigate to the result page to view your performance.</p>
      <Link to="/result">Go to Result Page</Link>
    </div>
  );
};

export default Already;
