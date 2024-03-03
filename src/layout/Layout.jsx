import { Header } from "layout/header/Header.jsx";
import { useLocation } from "react-router-dom";
import { Footer } from "layout/footer/Footer.jsx";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.includes("auth") && <Header />}
      {children}
      {!pathname.includes("auth") && <Footer />}
    </>
  );
};
