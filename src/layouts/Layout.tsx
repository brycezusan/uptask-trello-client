import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer 
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};
