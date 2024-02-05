import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Assesment from "./Pages/Assesment";
import Result from "./Pages/Result";
import "./App.css";

function App() {
  // Empty dependency array ensures that it runs only once when mounted

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/assessment' element={<Assesment />} />
          <Route exact path='/result' element={<Result />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
