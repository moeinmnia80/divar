import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost, getPost } from "services/post.js";
import { CameraIcon } from "assets/icons/CameraIcon.jsx";
import { useQueryRefetch } from "hooks/useQueryRefetch.js";
import { TrashIcon } from "assets/icons/TrashIcon.jsx";

export const MyPostsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });
  const { mutate } = useMutation({ mutationFn: deletePost });
  const deletePostList = (id) => {
    mutate(id);
  };
  return (
    <>
      <h4 className={`dashboard-title my-10`}>آگهی های شما</h4>
      <section className={`flex flex-col w-full gap-4`}>
        {data?.data.posts.map((post, index) => (
          <div
            key={post._id}
            className={`flex  justify-between w-full h-24 border-1 border-[#bbb] rounded-md p-2`}
          >
            <div className={`flex gap-4 w-2/3`}>
              <span
                className={`flex items-center justify-center w-24 h-full bg-[#f5f5f5] rounded-extraSmall`}
              >
                <CameraIcon style={`w-5 h-5 text-[#bbb]`} />
              </span>
              {/*<img*/}
              {/*  src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}*/}
              {/*  alt={``}*/}
              {/*  className={`h-full rounded-extraSmall`}*/}
              {/*/>*/}
              <span className={`flex flex-col justify-center h-full w-full`}>
                <p className={`text-xs`}>{post.options?.title}</p>
                <p className={`text-xs text-[#bbb] mt-1`}>
                  {post.options?.content}
                </p>
              </span>
            </div>
            <div className={`flex flex-col justify-center h-full`}>
              <p className={`text-xs`}>{post?.createdAt}</p>
              <p className={`text-xs text-[#bbb] mt-1`}>{post?.amount}</p>
            </div>
            <span className={`grid place-items-center w-max h-full text-sm `}>
              <button
                onClick={() => deletePostList(post._id)}
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
