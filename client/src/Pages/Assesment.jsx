import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsReady,
  selectIsTestComplete,
} from "../Redux/Features/statusSlice";
import ThankYou from "../Components/Assesment/ThankYou";
import Already from "../Components/Assesment/Already";
import Test from "../Components/Assesment/Test";
import Begin from "../Components/Assesment/Begin";
import { selectUsers } from "../Redux/Features/userSlice";

const Assessment = () => {
  const isReady = useSelector(selectIsReady);
  const isTestComplete = useSelector(selectIsTestComplete);

  //request camera on page load

  // Assuming alreadyCompleted is a variable you have in your state
  const alreadyCompleted = false; // Set this based on your actual state

  const user = useSelector(selectUsers);
  console.log(user);
  return (
    <div>
      {/* <div className="video-preview"></div> */}
      {user.isCompleted ? (
        <>
          <Already />
        </>
      ) : (
        <>
          {!isReady && !isTestComplete && !alreadyCompleted && <Begin />}

          {isReady && !isTestComplete && !alreadyCompleted && <Test />}

          {isTestComplete && !alreadyCompleted && <ThankYou />}

          {alreadyCompleted && <Already />}
        </>
      )}
    </div>
  );
};

export default Assessment;
