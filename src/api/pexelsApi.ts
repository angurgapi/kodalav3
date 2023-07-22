import axios from "axios";

const pexelsApi = axios.create({
  baseURL: "https://api.pexels.com/v1/search",
});

const pexelsKey = import.meta.env.VITE_PEXELS_KEY;
pexelsApi.defaults.headers.common["Authorization"] = `${
  import.meta.env.VITE_PEXELS_KEY
}`;

export const getWordPicture = async (word: string) => {
  console.log(pexelsKey);
  const response = await pexelsApi.get(`?query=${word}`);
  return response.data;
};
