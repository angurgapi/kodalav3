import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const lessonApi = axios.create({
  // baseURL: "/api",
  baseURL: "",
});

lessonApi.defaults.headers.common["Content-Type"] = "application/json";

export const getLessonData = async (orderNum: string) => {
  console.log("getLessonData triggered", orderNum);
  console.log("api url:", apiUrl);
  const response = await lessonApi.get(`/api/lesson/${orderNum}`);
  return response.data;
};

export const getAllLessons = async () => {
  const { data } = await lessonApi.get("/api/lesson");
  return data;
};
