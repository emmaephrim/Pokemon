import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { pokemonArray } from "../api/api";
import Skeleton from "./Skeleton";
import ThemeModel from "./ThemeModel";
import { getDominantColorFromURL } from "../helpers/helper";
import AboutDetails from "./AboutDetails";
import StatsDetails from "./StatsDetails";
import SimilarDetails from "./SimilarDetials";
import CurrentItems from "./CurrentItems";
import EmojiTwo from "./EmojiTwo";
import { v4 as uniqId } from "uuid";

export default function List() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pokemonData, setPokeMonData] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "primaryTheme",
  );
  const [themeModel, setThemeModel] = useState(false);
  const [dominator, setDominator] = useState("bg-primary");
  const [seeDetails, setSeeDetails] = useState(null);
  const [details, setDetails] = useState("about");
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    async function result() {
      const data = await pokemonArray();
      await setPokeMonData(data);
      // return console.log(data);
    }
    result();
  }, []);

  //
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonData?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!pokemonData) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="pb-5 themeBg" data-theme={theme} key={2345683474}>
        <Header themeModel={themeModel} setThemeModel={setThemeModel} />
        <CurrentItems
          currentItems={currentItems}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
          setSeeDetails={setSeeDetails}
        />

        {/* Pokemon Details */}
        {currentItems?.map((item, index) => {
          getDominantColorFromURL(
            item?.sprites?.other?.dream_world?.front_default,
          )
            .then((dominantColor) => {
              if (index === seeDetails) {
                let lighter = `rgb(${Math.min(
                  dominantColor[0] + 50,
                  255,
                )}, ${Math.min(dominantColor[1] + 50, 255)}, ${Math.min(
                  dominantColor[2] + 50,
                  255,
                )})`;
                let deeper = `rgb(${Math.max(
                  dominantColor[0] - 50,
                  0,
                )}, ${Math.max(dominantColor[1] - 50, 0)}, ${Math.max(
                  dominantColor[2] - 50,
                  0,
                )})`;
                setDominator(`linear-gradient(${lighter}, ${deeper})`);
              }

              // Set the dominator state to the gradient
            })
            .catch((error) => {
              console.error("Error getting dominant color:", error);
            });

          return index === seeDetails ? (
            <div className="fixed top-0 left-0 right-0 bg-modelBackground h-screen flex flex-col items-end jus">
              <div
                className="w-72 sm:w-96 h-screen p-4   text-center bg-white flex flex-col justify-between"
                key={uniqId()}
                style={
                  {
                    // transition: "all ease-in-out 20s",
                    // zIndex: 9997,
                  }
                }
              >
                <div>
                  <div
                    style={{ backgroundImage: dominator }}
                    className="rounded-md h-36  justify-between flex flex-col p-2 mx-auto"
                  >
                    <button
                      className="me-auto bg-white p-1 px-2 rounded-sm"
                      onClick={() => setSeeDetails(null)}
                    >
                      <FontAwesomeIcon icon="fa-long-arrow-left " />
                    </button>
                    <img
                      src={item?.sprites?.other?.dream_world?.front_default}
                      alt="Pokemon Img"
                      className="w-32 mx-auto"
                      style={{
                        marginBottom: "-32px",
                      }}
                    />
                  </div>
                  <div className="m-">
                    <p className="clashFont font-bold  text-xl  pt-10 pb-1">
                      {item?.name}
                    </p>
                    <EmojiTwo item={item} />

                    {details === "about" ? (
                      <AboutDetails item={item} />
                    ) : "" || details === "stats" ? (
                      <StatsDetails item={item} />
                    ) : "" || details === "similar" ? (
                      <SimilarDetails item={item} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="rounded-full bg-aboutStatsSimilarBg py-1.5 flex justify-evenly mt-auto">
                  <button
                    className={
                      details === "about"
                        ? "bg-white rounded-full p-2 px-4"
                        : ""
                    }
                    onClick={() => setDetails("about")}
                  >
                    About
                  </button>
                  <button
                    className={
                      details === "stats"
                        ? "bg-white rounded-full p-2 px-4"
                        : ""
                    }
                    onClick={() => setDetails("stats")}
                  >
                    Stats
                  </button>
                  <button
                    className={
                      details === "similar"
                        ? "bg-white rounded-full p-2 px-4"
                        : ""
                    }
                    onClick={() => setDetails("similar")}
                  >
                    Similar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          );
        })}

        {/* Pagination controls */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-primary hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-2"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= pokemonData.length}
            className="bg-primary hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r m-2"
          >
            Next
          </button>
        </div>
      </div>

      {/* Color Model */}
      {themeModel && (
        <ThemeModel
          theme={theme}
          setTheme={setTheme}
          themeModel={themeModel}
          setThemeModel={setThemeModel}
        />
      )}
    </>
  );
}
