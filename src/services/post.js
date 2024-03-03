import apiMP from "configs/apiMP.js";

const addPost = (formData) => apiMP.post("post/create", { ...formData });
const getPost = () => apiMP.get("post/my");
const deletePost = (id) => apiMP.delete(`post/delete/${id}`);

export { addPost, getPost, deletePost };
