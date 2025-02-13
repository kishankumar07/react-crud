import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItem = async (item: { name: string; email: string, address:string }) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const deleteItem = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateItem = async (id: number, item: { title: string; body: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};
