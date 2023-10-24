import { Character, StarWarsApi, StarWarsFilteredData } from "../types";

export const fetchData = async (url: string): Promise<StarWarsApi> => {
  const response = await fetch(url);
  return response.json();
};

export const getIdAndUrlImage = (url: string): [number, string] => {
  const Id = Number(url.split("/").at(-2)!);
  return [
    Id,
    `https://starwars-visualguide.com/assets/img/characters/${Id}.jpg`,
  ];
};

export const starWarsApiToData = (
  starWarsApi: StarWarsApi,
): StarWarsFilteredData => {
  const data = {
    nextUrl: starWarsApi.next,
    previousUrl: starWarsApi.previous,
    characters: starWarsApi.results.map((result): Character => {
      const [id, picture] = getIdAndUrlImage(result.url);

      return {
        id: id,
        name: result.name,
        height: Number(result.height),
        mass: Number(result.mass),
        birthYear: result.birth_year,
        picture: picture,
      };
    }),
  };
  return data;
};

export const getStarWarsData = async (
  url: string,
): Promise<StarWarsFilteredData> => {
  const starWarsApi = (await fetchData(url)) as StarWarsApi;
  return starWarsApiToData(starWarsApi);
};