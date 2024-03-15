import { v4 as uniqId } from "uuid";

function EmojiTwo({ item }) {
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
    <>
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
      <div
        className="w-56 h-5 mt-2 mx-auto"
        style={{
          background: `linear-gradient(270deg, #FFFFFF -20%, rgba(217, 217, 217, 0.27) 45.3%, #FFFFFF 102.92%)`,
        }}
      ></div>
    </>
  );
}

export default EmojiTwo;
