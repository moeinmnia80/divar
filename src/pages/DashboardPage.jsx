import { PostForm } from "components/ui/PostForm.jsx";
import { MyPostsList } from "components/ui/MyPostsList.jsx";

export const DashboardPage = () => {
  return (
    <>
      <section className={`container my-6`}>
        <PostForm />
        <MyPostsList />
      </section>
    </>
  );
};
