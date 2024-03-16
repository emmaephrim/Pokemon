import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uniqId } from "uuid";

function CurrentItems({
  currentItems,
  setHoveredIndex,
  hoveredIndex,
  setSeeDetails,
}) {
  const { normal, water, poison, grass, fire, flying, bug, ground, rock } = {
    normal: "🐻 Normal",
    water: "💧 Water",
    poison: "☠️ Poison",
    grass: "🌿 Grass",
    fire: "🔥 Fire",
    flying: "🦋 Flying",
    bug: "🐞 Bug",
    ground: "🏜️ Ground",
    rock: "🪨 Rock",
  };
  return (
    <div className="pt-20 justify-items-center  grid grid-cols-1 gap-y-16 gap-x-10 md:px-16 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 sm:gap-y-10">
      {currentItems?.map((item, index) => (
        <div
          className="bg-white text-center rounded-2xl w-72 p-2 flex flex-col items-center justify-center h-72"
          onMouseOver={() => setHoveredIndex(index)}
          onMouseOut={() => setHoveredIndex(null)}
          key={uniqId()}
        >
          <div className="w-60 h-32 bg-pokemonImgBg justify-center flex rounded-2xl">
            <img
              src={item?.sprites?.other?.dream_world?.front_default}
              alt=""
              className="w-48"
              style={{ marginTop: "-58px" }}
            />
          </div>
          <div className="m-5">
            <p className="clashFont font-medium p-3">{item?.name}</p>
            <div className="generalSans">
              {item?.types.map((element, index) => {
                const typeName = element?.type?.name;
                return (
                  typeName && (
                    <span
                      className="bg-pokemonImgBg rounded-s-full rounded-e-full px-2 m-1"
                      key={uniqId()}
                    >
                      {typeName === "fire"
                        ? fire
                        : "" || typeName === "water"
                        ? water
                        : "" || typeName === "normal"
                        ? normal
                        : "" || typeName === "poison"
                        ? poison
                        : "" || typeName === "grass"
                        ? grass
                        : "" || typeName === "flying"
                        ? flying
                        : "" || typeName === "bug"
                        ? bug
                        : "" || typeName === "ground"
                        ? ground
                        : "" || typeName === "rock"
                        ? rock
                        : ""}
                    </span>
                  )
                );
              })}
            </div>
          </div>
          {hoveredIndex === index && (
            <button
              key={uniqId()}
              className={
                "bg-primary text-white p-2 justify-between flex  px-5 items-center w-full rounded-e-full rounded-s-full "
              }
              onClick={() => setSeeDetails(index)}
            >
              <span>View Pokemon</span>
              <FontAwesomeIcon icon="fa-solid fa-eye" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CurrentItems;
