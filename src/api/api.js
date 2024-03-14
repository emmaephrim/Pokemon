export const pokemonArray = async () => {
  let data;
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await response.json();
    data = data?.results;
  } catch (error) {
    console.log("Fetching Error: " + error);
    throw error;
  }

  const pokemonArray = await Promise.all(
    data.map((element) =>
      fetch(element.url).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch single data from array");
        }
        return response.json();
      }),
    ),
  );

  return pokemonArray;
};
