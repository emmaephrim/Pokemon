export const getPokemonEmoji = (type) => {
  const emojiMap = {
    normal: "🐻 Normal",
    water: "💧 Water",
    poison: "☠️ Poison",
    grass: "🌿 Grass",
    fire: "🔥 Fire",
    flying: "🦋 Flying",
    bug: "🐞 Bug",
    ground: "🏜️ Ground",
    rock: "🪨 Rock",
    electric: "⚡️ Electric",
    ice: "❄️ Ice",
    fighting: "👊 Fighting",
    psychic: "🌀 Psychic",
    ghost: "👻 Ghost",
    dragon: "🐉 Dragon",
    dark: "🌑 Dark",
    steel: "🛡️ Steel",
    fairy: "🧚‍♀️ Fairy",
  };

  const lowercaseType = type.toLowerCase();
  return emojiMap[lowercaseType] || "";
};
