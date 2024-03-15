import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { findPokemon, getAllPokemon } from "../api/api";
import Skeleton from "./Skeleton";
import ThemeModel from "./ThemeModel";
import { getDominantColorFromURL } from "../helpers/helper";
import AboutDetails from "./AboutDetails";
import StatsDetails from "./StatsDetails";
import SimilarDetails from "./SimilarDetials";
import CurrentItems from "./CurrentItems";
import EmojiTwo from "./EmojiTwo";
import { v4 as uniqId } from "uuid";
import { useParams } from "react-router-dom";
import PageNotFond from "./PageNotFound";

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
  const [itemsPerPage, setItemsPerPage] = useState(12);
  //
  const { query } = useParams();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  };

  useEffect(() => {
    if (query) {
      async function result() {
        const data = await findPokemon(query);
        !data ? setPokeMonData("empty") : await setPokeMonData(data);
        // return console.log(data);
      }
      result();
    } else {
      async function result() {
        const data = await getAllPokemon();
        await setPokeMonData(data);
        // return console.log(data);
      }
      result();
    }
  }, [query]);

  if (pokemonData === "empty") {
    return <PageNotFond />;
  }

  if (!pokemonData) {
    return <Skeleton />;
  }
  //
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonData?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div
        className="pb-5 themeBg flex flex-col justify-between h-screen"
        data-theme={theme}
      >
        <div>
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
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between mt-3 p-7 sm:px-16">
          <div>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-primary hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1"
            >
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= pokemonData.length}
              className="bg-primary hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r m-1"
            >
              Next
            </button>
          </div>
          <div>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="block w-full bg-primary border border-gray-300  hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 pr-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline m-1"
            >
              <option value="8" className=" bg-black">
                8
              </option>
              <option value="12" className="hover:bg-red">
                12
              </option>
              <option value="16">16</option>
              <option value="24">24</option>
            </select>
          </div>
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
