import React, { useEffect, useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsers } from "../Redux/Features/userSlice";
import { api } from "../Data/env";
import axios from "axios";

const Result = () => {
  const [result, setResult] = useState();
  // const [pass, setPass] = useState(false);
  const pass = false;
  useEffect(() => {
    // console.log(user.id);
    getResult();
  }, []);
  const getResult = async () => {
    const res = await axios.get(`${api}getUser`, { withCredentials: true });
    const userId = res.data._id;
    const data = await axios.post(`${api}getResults`, { userId: userId });
    setResult(data.data);
  };

  return (
    <div className="result-top">
      <div className="result-inner-top">
        <div className="result-message">
          {result ? (
            <>
              {(result.correctCount / 10) * 100 >= 60 ? (
                <>
                  <div className="result-img">
                    <img
                      src="https://ik.imagekit.io/i3divn77k/vector/undraw_celebration_re_kc9k.svg?updatedAt=1707381452057"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div className="result-desc">
                    {" "}
                    Congarts ! You Have Cleared The Assessment{" "}
                  </div>
                </>
              ) : (
                <>
                  <div className="result-img">
                    <img
                      src="https://ik.imagekit.io/i3divn77k/vector/undraw_modern_professional_re_3b6l.svg?updatedAt=1707381518785"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div className="result-desc">
                    {" "}
                    Sorry ! You Haven't Cleared The Assessment{" "}
                  </div>
                </>
              )}
            </>
          ) : (
            <>Loading . . . . </>
          )}
        </div>
        {result ? (
          <>
            {" "}
            <div className="result-detail">
              <div className="result-det">
                <div className="result-nos">10</div>
                <div className="result-type">Total Question</div>
              </div>
              <div className="result-det">
                <div className="result-nos" style={{ color: "green" }}>
                  {result.correctCount}
                </div>
                <div className="result-type">Correct Answers</div>
              </div>
              <div className="result-det">
                <div className="result-nos" style={{ color: "red" }}>
                  {result.wrongCount}
                </div>
                <div className="result-type">Wrong Answers</div>
              </div>
              <div className="result-det">
                <div className="result-nos" style={{ color: "#242424" }}>
                  {result.skippedQuestions}
                </div>
                <div className="result-type">Skipped Answers</div>
              </div>
            </div>
          </>
        ) : (
          <>Loading . . . .</>
        )}

        {/* <div className="score">
          <div>60%</div>
          <div>Score</div>
        </div> */}

        {result && (result.correctCount / 10) * 100 >= 60 ? (
          <Link style={{ textDecoration: "none" }} to={"/license"}>
            {" "}
            <div className="result-links">Get License</div>
          </Link>
        ) : (
          <>Try Again Next Time</>
        )}
      </div>
    </div>
  );
};

export default Result;
