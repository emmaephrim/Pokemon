import { getSimilarPoke } from "../api/api";
import { useEffect, useState } from "react";
import { v4 as uniqId } from "uuid";

function SimilarDetails({ item }) {
  const [currentItems, setCurrentItems] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const similarPokemon = await getSimilarPoke(item?.id);
        setCurrentItems(similarPokemon);
      } catch (error) {
        console.error("Error fetching similar Pokemon:", error);
      }
    };

    fetchData();
  }, [item?.id]);

  return (
    <>
      <div className="text-xl font-bold p-1" key={uniqId()}>
        Similar
      </div>
      <div
        className="mx-auto"
        style={{
          background: `linear-gradient(270deg, #FFFFFF -20%, rgba(217, 217, 217, 0.27) 45.3%, #FFFFFF 102.92%)`,
        }}
      >
        <div className="h-40 flex justify-evenly  items-center">
          {currentItems === null && (
            <span className="loading loading-spinner text-primary my-auto w-16"></span>
          )}
          {currentItems?.map((item, index) => (
            <div
              className="bg-white text-center rounded-2xl w-28 p-1  h-28 flex flex-col items-center"
              key={index}
            >
              {item?.sprites?.other?.dream_world?.front_default ? (
                <div className="w-24 h-24 bg-pokemonImgBg justify-center flex rounded-2xl">
                  <img
                    src={item?.sprites?.other?.dream_world?.front_default}
                    alt=""
                    className=""
                    style={{ marginTop: "-30px" }}
                  />
                </div>
              ) : (
                <span className="loading loading-spinner text-primary my-auto w-16"></span>
              )}

              {item?.sprites?.other?.dream_world?.front_default && (
                <p className="clashFont font-medium pt-2 capitalize">
                  {item?.name}
                </p>
              )}

              {/* <div className="w-24 h-24 bg-pokemonImgBg justify-center flex rounded-2xl">
                <img
                  src={item?.sprites?.other?.dream_world?.front_default}
                  alt=""
                  className=""
                  style={{ marginTop: "-30px" }}
                />
              </div>
              <p className="clashFont font-medium pt-2 capitalize">
                {item?.name}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SimilarDetails;
