import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Form from "./pages/Form";


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center"/>
      <Routes>
        <Route  exact path="/" element={<Form />} />
        <Route  path="/home" element={<Home />} />
        <Route path="/add" element={<Add/>} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}
export default App;
