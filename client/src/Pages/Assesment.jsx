import React, { useEffect, useState } from "react";
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
  const [testComplete, setTestComplete] = useState(false);
  const isReady = useSelector(selectIsReady);
  const isTestComplete = useSelector(selectIsTestComplete);
  const user = useSelector(selectUsers);
  useEffect(() => {
    setTestComplete(user.isCompleted);
  }, [user]);

  return (
    <div>
      {/* <div className="video-preview"></div> */}
      {testComplete ? (
        <ThankYou />
      ) : user.startTimestamp !== undefined ? (
        <Test />
      ) : (
        <>
          {!isReady && !isTestComplete && <Begin />}
          {isReady && !isTestComplete && <Test />}
          {isTestComplete && <ThankYou />}
        </>
      )}
    </div>
  );
};

export default Assessment;
