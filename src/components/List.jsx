import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { pokemonArray } from "../api/api";
import Skeleton from "./Skeleton";

export default function List() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pokemonData, setPokeMonData] = useState(null);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    async function result() {
      const data = await pokemonArray();
      await setPokeMonData(data);
      return console.log(data);
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
      <div>
        <Header />

        <div className="pt-20 justify-items-center  grid grid-cols-1 gap-y-16 gap-x-10 md:px-16 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 sm:gap-y-10 ">
          {currentItems?.map((item, index) => (
            <div
              className="bg-white text-center rounded-2xl w-72 p-2 flex flex-col items-center justify-center h-72"
              onMouseOver={() => setHoveredIndex(index)}
              onMouseOut={() => setHoveredIndex(null)}
              key={index}
            >
              <div className="w-60 h-32 bg-pokemonImgBg justify-center flex rounded-2xl">
                <img
                  src={item?.sprites?.other?.dream_world?.front_default}
                  alt="Pokemon Img"
                  className="w-48"
                  style={{ marginTop: "-58px" }}
                />
              </div>
              <div className="m-5">
                <p className="clashFont font-medium p-3">{item?.name}</p>
                <div className="generalSans">
                  <span className="bg-pokemonImgBg rounded-s-full rounded-e-full px-2 m-1">
                    🔥 {item?.types[0]?.type?.name}
                  </span>
                  <span className="bg-pokemonImgBg rounded-s-full rounded-e-full px-2 m-1">
                    {item?.types[1]?.type?.name && "🦋 "}{" "}
                    {item?.types[1]?.type?.name}
                  </span>
                </div>
              </div>
              <button
                className={
                  hoveredIndex === index
                    ? "bg-primary text-white p-2 justify-between flex  px-5 items-center w-full rounded-e-full rounded-s-full transition duration-1000 ease-in-out z-10"
                    : "hidden"
                }
              >
                <span>View Pokemon</span>
                <FontAwesomeIcon icon="fa-solid fa-eye" />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= pokemonData.length}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
