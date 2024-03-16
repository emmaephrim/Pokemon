import React, { createContext, useState } from "react";
import Home from "./Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import List from "./List";
import ViewAllPokemon from "./ViewAllPokemon";

export const ContentContext = createContext();

export const ContentProvider = (props) => {
  const [themeModel, setThemeModel] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "primaryTheme",
  );

  return (
    <ContentContext.Provider
      value={{ themeModel, setThemeModel, theme, setTheme }}
    >
      {props.children}
    </ContentContext.Provider>
  );
};

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/lists/:query" Component={List} />
          <Route path="/lists" Component={ViewAllPokemon} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
