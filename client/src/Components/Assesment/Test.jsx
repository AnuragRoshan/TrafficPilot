import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { api, formatTime } from "../../Data/env";
import axios from "axios";
import { selectUsers } from "../../Redux/Features/userSlice";

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(900);
  const [questions, setQuestions] = useState([]);
  const user = useSelector(selectUsers);
  useEffect(() => {
    fetchQuestions();

    const startTimestamp = user.startTimestamp;
    const parsedTimestamp = new Date(startTimestamp);
    // const timeDifference = currentTime - startUnixTimestamp;
    const initializeTimer = () => {
      const startTimestamp = user.startTimestamp;
      if (!startTimestamp) {
        // Timer starts from 900 seconds if startTimestamp is not present
        setTimer(900);
      } else {
        // Parse the startTimestamp string into a Date object
        const parsedTimestamp = new Date(startTimestamp);

        // Calculate the time difference between current time and startTimestamp
        const currentTime = Math.floor(Date.now() / 1000);
        const startUnixTimestamp = Math.floor(parsedTimestamp.getTime() / 1000);
        const timeDifference = currentTime - startUnixTimestamp;

        if (timeDifference < 900) {
          // Timer starts from the remaining time if less than 900 seconds
          setTimer(900 - timeDifference);
        } else {
          // Timer exceeds 900 seconds, end the test
          // endTest();
        }
      }
    };

    initializeTimer();

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [user]);

  // useEffect(() => { }, [timer, dispatch]);
  useEffect(() => {
    if (timer === 0) {
      endTest();
    }
  }, [timer]);

  const endTest = async () => {
    console.log("Done With Test");
    await axios.post(`${api}endAssessment`, { userId: user.id }).then((res) => {
      window.location.reload();
    });
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${api}getQuestions`);
      setQuestions(response.data);
      // console.log(response.data);
      // Initialize selected options for each question
      const initialSelectedOptions = {};
      response.data.forEach((question) => {
        initialSelectedOptions[question._id] = ""; // Initialize each question with an empty string
      });
      setSelectedOptions(initialSelectedOptions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questions[currentQuestionIndex]._id]: option,
    }));
    axios
      .post(`${api}toggleAnswer`, {
        userId: user.id,
        questionId: questions[currentQuestionIndex]._id,
        answer: option,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-top">
      <div className="timer">
        <i style={{ fontSize: "2rem" }} className="fa-regular fa-clock"></i>
        <p>{formatTime(timer)}</p>
      </div>
      <div className="test-inner-top">
        <h1>Question {currentQuestionIndex + 1}</h1>
        {currentQuestion ? (
          <>
            <p>{currentQuestion.question}</p>

            <RadioGroup
              name={`question-${currentQuestionIndex}-options`}
              value={selectedOptions[currentQuestion._id]}
              onChange={(e) => handleOptionChange(e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <div className="end-button">
                <button onClick={endTest}>End Test</button>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>Loading......</>
        )}
      </div>
    </div>
  );
};

export default Test;
