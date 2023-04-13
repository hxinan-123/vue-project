import axios from "axios";
export const getTodoList = () => {
  return axios.get("/todo/list");
};

export const addTodo = () => {
  return axios.post("/todo/addTodo").then(res => res.data);
};

export const getTodo = params => {
  return axios.get("/todo/listId", {
    params: params
  });
};

export const addRecord = params => {
  return axios.post("/todo/addRecord", params).then(res => res.data);
};
