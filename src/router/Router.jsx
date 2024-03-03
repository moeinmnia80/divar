import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "pages/HomePage.jsx";
import { AuthPage } from "pages/AuthPage.jsx";
import { DashboardPage } from "pages/DashboardPage.jsx";
import { AdminPage } from "pages/AdminPage.jsx";
import { PageNotFound } from "pages/404.jsx";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user.js";
import { Loader } from "components/modules/Loader.jsx";

export const Router = () => {
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log({ isLoading, data, isFetching });

  if (isLoading)
    return (
      <div className={`flex items-center justify-center w-full h-svh `}>
        <Loader />
      </div>
    );
  return (
    <>
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route
          path={`/auth`}
          element={data ? <Navigate to={`/dashboard`} /> : <AuthPage />}
        />
        <Route
          path={`/dashboard`}
          element={data ? <DashboardPage /> : <Navigate to={`/auth`} />}
        />
        <Route
          path={`/admin`}
          element={
            data && data.data.role === "ADMIN" ? (
              <AdminPage />
            ) : (
              <Navigate to={`/`} />
            )
          }
        />
        <Route path={`*`} element={<PageNotFound />} />
      </Routes>
    </>
  );
};
