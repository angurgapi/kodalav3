import axios from "axios";

const lessonApi = axios.create({
  baseURL: `/api`,
});

lessonApi.defaults.headers.common["Content-Type"] = "application/json";

export const getLessonData = async (orderNum: string) => {
  console.log("getLessonData triggered", orderNum);
  const response = await lessonApi.get(`lesson/${orderNum}`);
  return response.data;
};
