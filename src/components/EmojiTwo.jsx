import { v4 as uniqId } from "uuid";
import { getPokemonEmoji } from "../helpers/findEmojiHelper";

function EmojiTwo({ item }) {
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
                {getPokemonEmoji(typeName)}
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
