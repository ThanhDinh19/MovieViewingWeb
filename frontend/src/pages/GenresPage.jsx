import { useState, useEffect } from "react";
import { getGenres, addGenres, deleteGenres, updateGenre } from "../services/genreService";

const GenresPage = () => {
  const [genres, setGenres] = useState([])
  const [editingId, setEditingId] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    name: ""
  });

  const handleSubmit = async () => {
    if (!form.name) {
      alert("Vui lòng nhập tên thể loại");
      return;
    }
    try {

      if (!editingId) {
        await addGenres({ name: form.name });
      } else {
        const res = await updateGenre(editingId, { name: form.name });
        console.log("Updated genre:", res.data.name);
        setEditingId(null);
      }

      setForm({ name: "" });
    } catch (err) {
      console.log("Error => : ", err);
    }
  }

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc chắn muốn xóa thể loại này không?");
    if (!ok) return;

    await deleteGenres(id);
    getGenres().then(res => setGenres(res.data));
  }

  const handleEdit = async (genre) => {
    setEditingId(genre._id);
    setForm({ name: genre.name || "" });
  }

  useEffect(() => {
    fetchGenres();
  }, [page]);

  const fetchGenres = async () => {
    const res = await getGenres(page, 5);
    setGenres(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Quản lý thể loại phim</h1>

      <div>
        <h3>Thêm thể loại</h3>
        <input type="text"
          placeholder="Tên thể loại"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <button onClick={handleSubmit}>{editingId ? "Sửa" : "Thêm"}</button>

      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>STT</th>
            <th style={styles.th}>Tên</th>
            <th style={styles.th}>Hành động </th>
          </tr>
        </thead>

        <tbody>
          {genres.map((item, index) => (
            <tr key={item._id} style={styles.tr}>
              <td>{(page - 1) * 5 + index + 1}</td>
              <td style={styles.td}>{item.name}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>
                  Xóa
                </button>

                <button onClick={() => handleEdit(item)}>
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? "bold" : "normal"
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 600,
    margin: "30px auto",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    textAlign: "center",
    marginBottom: 20
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: 8,
    overflow: "hidden"
  },

  th: {
    padding: "12px 10px",
    color: "#000",
    textAlign: "left",
    fontSize: 14,
    borderBottom: "1px solid #eee"
  },

  tr: {
    borderBottom: "1px solid #eee"
  },

  td: {
    padding: "10px",
    fontSize: 14
  },

  tdCenter: {
    padding: "10px",
    textAlign: "center",
    fontSize: 14,
    width: 60
  }
};


export default GenresPage;