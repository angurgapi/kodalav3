import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const lessonApi = axios.create({
  baseURL: `/api/`,
});

lessonApi.defaults.headers.common["Content-Type"] = "application/json";

export const getLessonData = async (orderNum: string) => {
  console.log("getLessonData triggered", orderNum);
  console.log("api url:", apiUrl);
  const response = await lessonApi.get(`lesson/${orderNum}`);
  return response.data;
};
