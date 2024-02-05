import React, { useState, useEffect } from "react";
import { setTestComplete } from "../../Redux/Features/statusSlice";
import { useDispatch } from "react-redux";

const Test = ({ questions }) => {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // State to track selected options

  useEffect(() => {
    // Initialize selected options for each question
    const initialSelectedOptions = {};
    questions.forEach((question, index) => {
      initialSelectedOptions[index] = "";
    });
    setSelectedOptions(initialSelectedOptions);
  }, [questions]);

  questions = [
    {
      question: "What does a yellow traffic light indicate?",
      options: ["Stop", "Proceed with caution", "Speed up", "Go back"],
      correctAnswer: "Proceed with caution",
    },
    {
      question: "What does a red octagonal sign mean?",
      options: ["Stop", "Yield", "Go", "Merge"],
      correctAnswer: "Stop",
    },
    {
      question: "What is the purpose of road signs with a blue background?",
      options: [
        "Danger or caution",
        "Regulatory information",
        "Tourist information",
        "Construction zone",
      ],
      correctAnswer: "Regulatory information",
    },
    {
      question:
        "What does a white diamond-shaped sign with an orange symbol indicate?",
      options: [
        "Road work ahead",
        "Stop ahead",
        "Yield ahead",
        "Railroad crossing ahead",
      ],
      correctAnswer: "Road work ahead",
    },
    {
      question: "When should you use your turn signals?",
      options: [
        "Only when turning left",
        "Only when turning right",
        "When changing lanes",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What does a green traffic light indicate?",
      options: ["Stop", "Proceed with caution", "Go", "Slow down"],
      correctAnswer: "Go",
    },
    {
      question:
        "What is the safe following distance in ideal driving conditions?",
      options: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
      correctAnswer: "3 seconds",
    },
    {
      question: "What does a yield sign mean?",
      options: [
        "Stop and wait for traffic to clear",
        "Merge with oncoming traffic",
        "Slow down and be prepared to stop",
        "Proceed without stopping",
      ],
      correctAnswer: "Slow down and be prepared to stop",
    },
    {
      question: "What does a double yellow line on the road indicate?",
      options: [
        "No passing allowed",
        "Passing allowed with caution",
        "Passing allowed in both directions",
        "Passing allowed only on the right",
      ],
      correctAnswer: "No passing allowed",
    },
    {
      question: "What should you do if your vehicle starts to skid?",
      options: [
        "Accelerate",
        "Brake hard",
        "Steer in the direction you want to go",
        "Close your eyes",
      ],
      correctAnswer: "Steer in the direction you want to go",
    },
  ];

  const endTest = () => {
    dispatch(setTestComplete());
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
      [currentQuestionIndex]: option,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-top">
      <div className="test-inner-top">
        <h1>Question {currentQuestionIndex + 1}</h1>
        <p>{currentQuestion.question}</p>
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-${currentQuestionIndex}-options`}
              value={option}
              checked={selectedOptions[currentQuestionIndex] === option}
              onChange={() => handleOptionChange(option)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}

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
      </div>
    </div>
  );
};

export default Test;
