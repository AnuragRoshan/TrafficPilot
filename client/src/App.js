import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Assesment from "./Pages/Assesment";
import Result from "./Pages/Result";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUserStatus } from "./Redux/Features/userSlice";
import { api } from "./Data/env";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./Pages/Profile";

function App() {
  // Empty dependency array ensures that it runs only once when mounted

  const dispatch = useDispatch();
  const user = useSelector(selectUserStatus);
  const getData = async () => {
    try {

      const apiUrl = `${api}getUser`;

      const { data } = await axios.get(apiUrl, { withCredentials: true });
      const userData = {
        id: data._id,
        name: data.name,
        email: data.username,
        isCompleted: data.isCompleted,
      };

      dispatch(addUser(userData));
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures that it runs only once when mounted


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route exact path='/assessment' element={<Assesment />} />
          <Route exact path='/result' element={<Result />} />
          <Route exact path='/signup' element={user ? <Navigate to='/home' /> : <Signup />} />
          <Route exact path='/login' element={user ? <Navigate to='/home' /> : <Login />} />
          <Route exact path='/profile' element={user ? <Profile /> : <Navigate to='/home' />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
