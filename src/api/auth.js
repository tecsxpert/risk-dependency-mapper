import API from "./axios";

// login API
export const loginUser = (data) => API.post("/login", data);