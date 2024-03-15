export const pokemonArray = async (query) => {
  query
    ? console.log("query argument: " + query)
    : console.log("no name argument");
  if (query) {
    let pokemonArray = [];
    let data;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await response.json();
      pokemonArray.push(data);
      return pokemonArray;
    } catch (error) {
      console.log("Fetching Error: " + error);
      // throw error;
    }
  } else {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0",
      );
      if (!response.ok) {
        console.log("Failed to fetch data");
      }
      const data = await response.json();
      const pokemonUrls = data?.results.map((element) => element.url);

      // Fetch data for each Pokemon URL
      const pokemonArray = await Promise.all(
        pokemonUrls.map((url) =>
          fetch(url).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data for a Pokemon");
            }
            return response.json();
          }),
        ),
      );

      return pokemonArray;
    } catch (error) {
      console.error("Fetching Error:", error.message);
      // throw error;
    }
  }
};

export const searchPokemon = async (name) => {
  let pokemonArray = [];
  let data;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await response.json();
    pokemonArray.push(data);
    return pokemonArray;
  } catch (error) {
    console.log("Fetching Error: " + error);
    throw error;
  }
};
