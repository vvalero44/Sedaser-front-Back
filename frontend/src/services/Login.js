import axios from "axios";

const loginUrl = "http://localhost:4000/api/auth/login";

export const login = async (credentials) => {
  const { data } = await axios.post(loginUrl, credentials);
  return data;
};
