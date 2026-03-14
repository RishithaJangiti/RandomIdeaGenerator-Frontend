import axios from "axios";

const API = axios.create({
  baseURL: "/api/ideas"
});

export const getAllIdeas = () => API.get();
export const getIdeaById = (id) => API.get(`/${id}`);
export const getRandomIdea = () => API.get("/random");
export const createIdea = (idea) => API.post("", idea);
export const updateIdea = (id, idea) => API.put(`/${id}`, idea);
export const deleteIdea = (id) => API.delete(`/${id}`);