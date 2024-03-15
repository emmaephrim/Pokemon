import Home from "./Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import List from "./List";
import ViewAllPokemon from "./ViewAllPokemon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/lists/:query" Component={List} />
        <Route path="/lists" Component={ViewAllPokemon} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
