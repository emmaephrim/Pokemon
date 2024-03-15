import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ThemeModel({ theme, setTheme, themeModel, setThemeModel }) {
  const isTheme = "border-2 border-themeBorder rounded-full";
  const notTheme = "border-themeBorder rounded-full";

  function handleTheme(T) {
    setTheme(T);
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-modelBackground h-screen  flex justify-center items-center  flex-col">
      <button>
        <FontAwesomeIcon
          icon={"fa fa-times-circle"}
          className="text-3xl text-white rounded-full"
          onClick={() => setThemeModel(false)}
        />
      </button>
      <div className="font-bold bg-white py-2 px-12 rounded-t-xl ">
        Choose Theme
      </div>
      <div className="flex gap-3 p-9 bg-colorsBg rounded-b-xl">
        <button
          className={theme === "primaryTheme" ? isTheme : notTheme}
          onClick={() => handleTheme("primaryTheme")}
        >
          <div className="theme bg-firstColor h-7 w-7 rounded-full m-1"></div>
        </button>
        <button
          className={theme === "secondaryTheme" ? isTheme : notTheme}
          onClick={() => handleTheme("secondaryTheme")}
        >
          <div className="theme bg-secondColor h-7 w-7 rounded-full m-1"></div>
        </button>{" "}
        <button
          className={theme === "tertiaryTheme" ? isTheme : notTheme}
          onClick={() => handleTheme("tertiaryTheme")}
        >
          <div className="theme bg-thirdColor h-7 w-7 rounded-full m-1"></div>
        </button>
      </div>
    </div>
  );
}

export default ThemeModel;
