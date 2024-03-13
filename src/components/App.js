import Home from "./Home";
import "../assets/styles/App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import List from "./List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
