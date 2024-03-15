export const findPokemon = async (query) => {
  if (query !== null) {
    let pokemonArray = [];
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`,
      );
      if (!response.ok) {
        console.log("Failed Find Pokemon Error: ", Error);
      }

      const data = await response.json();
      if (data == null) {
        console.log("No pokemon found");
      }
      pokemonArray.push(data);
      return pokemonArray;
    } catch (error) {
      console.log("Finding Pokemon Catch Error: ", error);
      return false;
    }
  } else {
  }
};

export const getAllPokemon = async () => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0",
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
            // throw new Error
            console.log("Feting all pokemon error :", Error);
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
};
