import { Outlet } from "react-router-dom";
import Footer from "../component/layouts/Footer";
import Header from "../component/layouts/Header";

export default function Root() {
  return (
    <>
      <div className="bg-gray-100">
        <Header />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
