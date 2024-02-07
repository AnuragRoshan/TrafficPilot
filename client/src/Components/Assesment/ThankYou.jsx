import React, { useEffect } from "react";

const ThankYou = () => {
  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <div className="thank-top">
      <h2>Thank you for taking the assessment!</h2>
      <p>Your results have been generated.</p>
      <p>Navigate to the result page to view your performance.</p>
      <a href="/result">Go to Result Page</a>
    </div>
  );
};

export default ThankYou;
