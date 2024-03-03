import api from "configs/api.js";

const addCategory = (data) => api.post("category", { ...data });
const getCategory = () => api.get("category");
const deleteCategory = (data) => api.delete(`category/${data}`);

export { addCategory, getCategory, deleteCategory };
