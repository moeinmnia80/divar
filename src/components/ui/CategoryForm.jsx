import categoriesForm from "constants/categoriesForm.js";
import { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "services/admin.js";
import { useQueryRefetch } from "hooks/useQueryRefetch.js";

export const CategoryForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  useQueryRefetch("categories");
  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationFn: addCategory,
  });

  const changeEntriesForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const submitCategoryForm = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };
  return (
    <>
      <h3 className={`category-title`}>دسته بندی جدید</h3>
      <form
        onChange={changeEntriesForm}
        onSubmit={submitCategoryForm}
        className={`flex flex-col justify-start items-start mb-12`}
      >
        {categoriesForm.map((category) => (
          <Fragment key={category.id}>
            <label htmlFor={category.id} className={`category-form-label`}>
              {category.text}
            </label>
            <input
              type={category.type}
              name={category.name}
              id={category.id}
              className={`category-form-input`}
            />
          </Fragment>
        ))}
        <button
          type={"submit"}
          className={`category-form-button`}
          disabled={isPending}
        >
          ایجاد
        </button>
      </form>
    </>
  );
};
