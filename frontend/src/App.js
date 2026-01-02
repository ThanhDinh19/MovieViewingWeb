import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import MoviesPage from "./pages/MoviesPage";
import UserPage from "./pages/UsersPage";
import GenresPage from "./pages/GenresPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
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
