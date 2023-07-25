import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;

const lessonApi = axios.create({
  // baseURL: "/api",
  baseURL: "/api",
});

lessonApi.defaults.headers.common["Content-Type"] = "application/json";

export const getLessonData = async (orderNum: string) => {
  console.log("getLessonData triggered", orderNum);
  const requestUrl = `lesson/${orderNum}`;
  const response = await lessonApi.get(requestUrl);
  return response.data;
};

export const getAllLessons = async () => {
  const { data } = await lessonApi.get("lesson");
  return data;
};
