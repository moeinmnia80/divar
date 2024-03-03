import { CategoryForm } from "components/ui/CategoryForm.jsx";
import { CategoryList } from "components/ui/CategoryList.jsx";

export const AdminPage = () => {
  return (
    <>
      <section className={`container w-full pr-4`}>
        <CategoryList />
        <CategoryForm />
      </section>
    </>
  );
};
