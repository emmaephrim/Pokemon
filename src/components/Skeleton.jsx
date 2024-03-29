import { ContentContext } from "./App";
import Header from "./Header";
import { useContext } from "react";
import ThemeModel from "./ThemeModel";

function Skeleton() {
  const { themeModel, setThemeModel, theme, setTheme } =
    useContext(ContentContext);

  return (
    <main data-theme={localStorage.getItem("theme")} className="themeBg">
      <Header
        themeModel={themeModel}
        setThemeModel={setThemeModel}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {themeModel && <ThemeModel />}
    </main>
  );
}

export default Skeleton;
