import Home from "./Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import List from "./List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/lists" Component={List} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
