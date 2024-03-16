export const findPokemon = async (query) => {
  query = query.toLowerCase();
  console.log("Lower :", query);
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

export const getSimilarPoke = async (query) => {
  let pokemonDetails, similarByType, similarByEvolution;
  // Fetch Pokémon details
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      console.log("Failed Find Pokemon Error: ", Error);
    }

    pokemonDetails = await response.json();
    if (pokemonDetails == null) {
      console.log("No pokemon found");
    }
  } catch (error) {
    console.log("Finding Pokemon Catch Error: ", error);
  }

  // Fetch similar Pokémon by type
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${pokemonDetails.types[0].type.name}`,
    );
    // console.log(
    //   "Similar By Type: ",
    //   `https://pokeapi.co/api/v2/type/${pokemonDetails.types[0].type.name}`,
    // );
    if (!response.ok) {
      console.log("Failed Find Pokemon Error: ", Error);
    }

    similarByType = await response.json();
    if (similarByType == null) {
      console.log("No pokemon found");
    }
  } catch (error) {
    console.log("Finding Pokemon Catch Error: ", error);
  }
  // Fetch similar Pokémon by evolution chain
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${
        pokemonDetails.species.url.split("/")[6]
      }`,
    );

    if (!response.ok) {
      console.log("Failed Find Pokemon Error: ", Error);
    }

    similarByEvolution = await response.json();
    if (similarByEvolution == null) {
      console.log("No pokemon found");
    }
  } catch (error) {
    console.log("Finding Pokemon Catch Error: ", error);
  }

  // Select two Pokémon to display as "similar"
  const similarPokemon1 =
    similarByType.pokemon[
      Math.floor(Math.random() * similarByType.pokemon.length)
    ];
  const similarPokemon2 =
    similarByEvolution.chain.evolves_to[
      Math.floor(Math.random() * similarByEvolution.chain.evolves_to.length)
    ];

  const pokeByType1 = await findPokemon(similarPokemon1?.pokemon.name);
  const pokeByEvolution1 = await findPokemon(similarPokemon2?.species.name);
  console.log("Similar Pokes: ", [...pokeByType1, ...pokeByEvolution1]);
  return [...pokeByType1, ...pokeByEvolution1];
};
