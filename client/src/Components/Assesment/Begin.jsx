import React from "react";
import { setReady } from "../../Redux/Features/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../Data/env";
import { selectUsers } from "../../Redux/Features/userSlice";

const Begin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUsers);

  const handleStartTest = async () => {
    dispatch(setReady());

    await axios.post(`${api}startAssess`, { userId: user.id });
  };

  return (
    <div
      style={{
        height: "max-content",
        width: "100vw",
        marginBlock: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="begin-inner-top">
        <div className="instruction" style={{ height: "100%" }}>
          <h1>Instructions</h1>
          <ul>
            <li>Welcome to the Driving Assessment Test!</li>
            <li>This test consists of 10 multiple-choice questions.</li>
            <li>You will have 15 minutes to complete the test.</li>
            <li>
              Each question carries +4 marks for a correct answer and -1 mark
              for an incorrect answer.
            </li>
            <li>
              If the test stops due to any reason, it will automatically get
              submitted.
            </li>
            <li>Ensure a stable internet connection throughout the test.</li>
            <li>Do not refresh or close the browser window during the test.</li>
            <li>Answer all questions to the best of your knowledge.</li>
            <li>
              Click the "Start Test" button when you are ready to begin. Good
              luck!
            </li>
          </ul>

          <button onClick={handleStartTest}>Start Test</button>
        </div>
      </div>
    </div>
  );
};

export default Begin;
