import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "services/admin.js";
import { TrashIcon } from "assets/icons/TrashIcon.jsx";
import { useQueryRefetch } from "hooks/useQueryRefetch.js";

export const CategoryList = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
  useQueryRefetch("categories");
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
  });
  const deleteCategoryList = (id) => {
    mutate(id);
  };
  return (
    <>
      <section className={`category-list`}>
        {data?.data.map((category) => (
          <div key={category._id} className={`category-list-container`}>
            <h4 className={`category-list-title`}>
              <img
                src={`${category.icon}.svg`}
                alt={category.icon}
                className={`w-5 h-5 object-contain ml-4`}
              />
              {category.name}
            </h4>
            <span className={`category-list-part`}>
              آیکون:
              <span>{category.icon}</span>
            </span>
            <span className={`category-list-part`}>
              اسلاگ:
              <span>{category.slug}</span>
            </span>
            <span className={`w-1/6 text-sm border-l-1 border-[#bbb] px-5`}>
              <button
                onClick={() => deleteCategoryList(category._id)}
                className={`group flex hover:text-primary duration-300`}
              >
                delete
                <TrashIcon style={`w-4 h-4 mr-2`} />
              </button>
            </span>
          </div>
        ))}
      </section>
    </>
  );
};
