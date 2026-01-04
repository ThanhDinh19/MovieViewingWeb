import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <div className="app-content">
        <Outlet />
      </div>
    </>
  );
}

export default PublicLayout;