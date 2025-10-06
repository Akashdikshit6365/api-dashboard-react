import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

export const getCatFact = async () => {
  const response = await axios.get(`${BASE_URL}/catfact`);
  return response.data;
};

export const getJoke = async () => {
  const response = await axios.get(`${BASE_URL}/joke`);
  return response.data;
};

export const getRandomUser = async (count = 1) => {
  const response = await axios.get(`${BASE_URL}/randomuser?count=${count}`);
  return response.data;
};
