import axios, { CanceledError } from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://pfzpanelws.onrender.com",
});

export { CanceledError };
