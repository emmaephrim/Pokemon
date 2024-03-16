import { Link } from "react-router-dom";
import Header from "./Header";
import ThemeModel from "./ThemeModel";
import { useContext } from "react";
import { ContentContext } from "./App";

function PageNotFond() {
  const { themeModel, setThemeModel, theme, setTheme } =
    useContext(ContentContext);

  return (
    <main data-theme={localStorage.getItem("theme")}>
      <div className="themeBg">
        <Header
          // setThemeModel={localStorage.getItem("setThemeModel")}
          // themeModel={localStorage.getItem("themeModel")}
          themeModel={themeModel}
          setThemeModel={setThemeModel}
        />
        <div className="flex items-center pt-5 flex-col h-screen">
          <div className="flex flex-col w-full">
            <div className="divider divider-primary">Error</div>
          </div>
          <h1 className="p-5 font-bold text-xl">Pokemon Not Found</h1>
          <div className="flex flex-col gap-4 w-52">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
          <Link to={"/lists"}>
            <button className="btn btn-primary mt-5">Back</button>
          </Link>
        </div>
        {themeModel && (
          <ThemeModel
            theme={theme}
            setTheme={setTheme}
            themeModel={themeModel}
            setThemeModel={setThemeModel}
          />
        )}
      </div>
    </main>
  );
}

export default PageNotFond;
