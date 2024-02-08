import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <div className="thank-top">
      <h2>Thank you for taking the assessment!</h2>
      <p>Your results have been generated.</p>
      <p>Navigate to the result page to view your performance.</p>
      <Link to={"/result"}>Go to Result Page</Link>
    </div>
  );
};

export default ThankYou;
