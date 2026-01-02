import { useState, useEffect } from "react";
import { getUsers } from "../services/userService";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data))
  }, [])

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Quản lý người dùng</h1>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tên</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Vai trò</th>
              <th style={styles.th}>Phim yêu thích</th>
            </tr>
          </thead>

          <tbody>
            {users.map(item => (
              <tr key={item._id}>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.email}</td>
                <td style={styles.tdCenter}>{item.role}</td>
                <td style={styles.td}>
                  {Array.isArray(item.favorites)
                    ? item.favorites.join(", ")
                    : item.favorites}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 1200,
    margin: "30px auto",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: 20
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    padding: "12px 10px",
    background: "#fff",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 14,
    borderBottom: "2px solid #e5e7eb"
  },

  td: {
    padding: "10px 10px",
    fontSize: 14,
    borderBottom: "1px solid #eee"
  },

  tdCenter: {
    padding: "10px 10px",
    fontSize: 14,
    textAlign: "center",
    verticalAlign: "middle",
    borderBottom: "1px solid #eee"
  }
};


export default UserPage;