import axios from "axios";

const API =
  axios.create({
    baseURL:
      "https://desk-guard-three.vercel.app/api",
  });

export default API;