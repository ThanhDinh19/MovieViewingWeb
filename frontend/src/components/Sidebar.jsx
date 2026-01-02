
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Movies", path: "/admin/movies" },
    { name: "Users", path: "/admin/users" },
    { name: "Genres", path: "/admin/genres"},
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
