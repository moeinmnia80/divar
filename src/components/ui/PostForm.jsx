import { postsForm } from "constants/postsForm.js";
import { Fragment, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin.js";
import { addPost } from "services/post.js";

export const PostForm = () => {
  const { data } = useQuery({ queryKey: ["categories"], queryFn: getCategory });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });
  const { mutate, ...others } = useMutation({ mutationFn: addPost });
  console.log({ others });
  const changeDataForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name !== "images") {
      setFormData((formData) => ({ ...formData, [name]: value }));
    } else {
      setFormData({ ...formData, [name]: event.target.files[0] });
    }
  };

  const submitAddPostForm = (event) => {
    event.preventDefault();
    const form = new FormData();
    for (let i in formData) {
      form.append(i, formData[i]);
    }
    mutate(form);
  };
  return (
    <>
      <h4 className={`dashboard-title`}>افزودن اگهی</h4>
      <form
        onChange={changeDataForm}
        onSubmit={submitAddPostForm}
        className={`flex flex-col items-start`}
      >
        {postsForm.map((item) => (
          <Fragment key={item.id}>
            {item.id === "content" ? (
              <>
                <label htmlFor={item.id} className={`dashboard-form-label`}>
                  {item.text}
                </label>
                <textarea
                  name={item.name}
                  id={item.id}
                  className={`w-1/5 text-sm outline-none border-1 border-[#bbb] rounded-extraSmall p-2`}
                />
              </>
            ) : (
              <>
                <label htmlFor={item.id} className={`dashboard-form-label`}>
                  {item.text}
                </label>
                <input
                  type={item.type}
                  name={item.name}
                  id={item.id}
                  className={`dashboard-form-input`}
                />
              </>
            )}
          </Fragment>
        ))}
        <label htmlFor="categories" className={`dashboard-form-label`}>
          دسته بندی
        </label>
        <select name={`category`} id={`categories`} className={`w-1/5`}>
          {data?.data.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="images" className={`dashboard-form-label`}>
          عکس
        </label>
        <input
          type="file"
          name={`images`}
          id={`images`}
          className={`dashboard-form-input`}
          accept="image/jpeg, image/png"
        />
        <button type={"submit"} className={`dashboard-form-button`}>
          ایجاد
        </button>
      </form>
    </>
  );
};
