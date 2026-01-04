import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import MoviesPage from "./pages/MoviesPage";
import UserPage from "./pages/UsersPage";
import GenresPage from "./pages/GenresPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>

    {/* Trang khach */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/movies"
        element={
          <AdminLayout>
            <MoviesPage />
          </AdminLayout>
        }
      />

     <Route
        path="/admin/genres"
        element={
          <AdminLayout>
            <GenresPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <UserPage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
