import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/components/Home";
import About from "@/components/About";
import Connect from "@/components/Connect";
import Navbar from "@/components/Navbar";

function App(){

  return(
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/arman-58" element={<Connect/>}/>

        </Routes>
      </Router>
    </>
  );
}
export default App;