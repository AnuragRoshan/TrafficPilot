import React, { useState, useEffect } from "react";
import { setTestComplete } from "../../Redux/Features/statusSlice";
import { useDispatch } from "react-redux";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { api } from "../../Data/env";
import axios from "axios";

const Test = () => {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(900);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      dispatch(setTestComplete());
    }
  }, [timer, dispatch]);

  const endTest = () => {
    dispatch(setTestComplete());
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${api}getQuestions`);
      setQuestions(response.data);
      console.log(response.data);
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
  };

  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

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
