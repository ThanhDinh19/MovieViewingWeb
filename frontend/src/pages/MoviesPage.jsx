import { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../services/movieService";
import { getGenresForMovies } from "../services/genreService";
import Select from "react-select";
import { normalizeThumbnailUrl, normalizeVideoUrl } from "../utils/path";

const MoviesPage = () => {
  const [movies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewMovie, setViewMovie] = useState(null);
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    genres: [],
    thumbnailFile: null,
    videoFile: null,
    oldThumbnail: "",
    oldVideo: ""
  });


  const handleSubmit = async () => {
    if (!form.title ||!form.year ||form.genres.length === 0) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if(!editingId){
      if(!form.thumbnailFile || !form.oldThumbnail){
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("year", form.year);
      formData.append("description", form.description);

      form.genres.forEach(id => {
        formData.append("genres[]", id);
      });

      formData.append("thumbnail", form.thumbnailFile);
      formData.append("video", form.videoFile);


      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }


      if (editingId) {
        await updateMovie(editingId, formData);
      } else {
        await addMovie(formData);
      }

      alert(editingId ? "Cập nhật thành công" : "Thêm phim thành công");

      setEditingId(null);

      // reset form
      setForm({
        title: "",
        year: "",
        description: "",
        genres: [],
        thumbnailFile: null,
        videoFile: null
      });

      getMovies().then(res => setAllMovies(res.data));

    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = (movie) => {
    setEditingId(movie._id);

    setForm({
      title: movie.title || "",
      year: movie.year || "",
      description: movie.description || "",
      genres: movie.genres?.map(g => g._id || g) || [],
      thumbnailFile: null,
      videoFile: null,
      oldThumbnail: movie.thumbnail,
      oldVideo: movie.videoUrl
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn chắc chắn muốn xóa phim này?");
    if (!ok) return;

    await deleteMovie(id);

    if (editingId === id) {
      setEditingId(null);
      setForm({
        title: "",
        year: "",
        description: "",
        genres: [],
        thumbnail: "",
        videoUrl: ""
      });
    }

    setAllMovies(movies.filter(m => m._id !== id));

  };

  const genreOptions = genres.map(g => ({
    value: g._id,
    label: g.name
  }));

  useEffect(() => {
    getMovies().then(res => setAllMovies(res.data));
    getGenresForMovies().then(res => setGenres(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Quản lý phim</h1>

      {/* ADD MOVIE */}
      <div style={styles.card}>
        <h3>Thêm phim mới</h3>

        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Tên phim"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Năm xuất bản"
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            onChange={e =>
              setForm({ ...form, thumbnailFile: e.target.files[0] })
            }
          />

          {editingId && form.oldThumbnail && (
            <img
              src={normalizeThumbnailUrl(form.oldThumbnail)}
              alt="thumbnail"
              style={{ width: 120, marginBottom: 8 }}
            />
          )}

          <input
            type="file"
            accept="video/*"
            onChange={e =>
              setForm({ ...form, videoFile: e.target.files[0] })
            }
          />

          {editingId && form.oldVideo && (
            <video
              src={normalizeVideoUrl(form.oldVideo)}
              controls
              width={200}
            />
          )}
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Mô tả phim"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <Select
          isMulti
          options={genreOptions}
          placeholder="Chọn thể loại"
          value={genreOptions.filter(opt =>
            form.genres.includes(opt.value)
          )}
          onChange={(selected) =>
            setForm({
              ...form,
              genres: selected ? selected.map(s => s.value) : []
            })
          }
        />

        <button
          style={{
            ...styles.button,
            background: editingId ? "#16a34a" : "#4f46e5"
          }}
          onClick={handleSubmit}
        >
          {editingId ? "Cập nhật phim" : "Thêm phim"}
        </button>
      </div>


      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ảnh</th>
            <th style={styles.th}>Tên phim</th>
            <th style={styles.thCenter}>Năm</th>
            <th style={styles.thCenter}>Loại</th>
            <th style={styles.th}>Thể loại</th>
            <th style={styles.thCenter}>Rating</th>
            <th style={styles.thCenter}>Lượt xem</th>
            <th style={styles.th}>Mô tả</th>
            <th style={styles.thCenter}>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {movies.map(movie => (
            <tr key={movie._id} style={styles.tr}>
              <td style={styles.tdCenter}>
                <img
                  src={normalizeThumbnailUrl(movie.thumbnail)}
                  alt={movie.title}
                  style={styles.tableThumb}
                />
              </td>

              <td style={styles.td}><strong>{movie.title}</strong></td>
              <td style={styles.tdCenter}>{movie.year}</td>
              <td style={styles.tdCenter}>{movie.type}</td>

              <td style={styles.td}>
                {movie.genres?.map(g => g.name).join(", ")}
              </td>

              <td style={styles.tdCenter}>⭐ {movie.rating}</td>
              <td style={styles.tdCenter}>👁 {movie.views}</td>

              <td style={styles.descCell}>{movie.description}</td>

              <td style={styles.tdCenter}>
                <button
                  style={styles.btnEdit}
                  onClick={() => handleEdit(movie)}
                >
                  ✏️ Edit
                </button>

                <button
                  style={styles.btnDelete}
                  onClick={() => handleDelete(movie._id)}
                >
                  🗑️ Xóa
                </button>

                <button
                  style={styles.btnView}
                  onClick={() => setViewMovie(movie)}
                >
                  👁 Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {viewMovie && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{viewMovie.title}</h2>

            <video
              src={normalizeVideoUrl(viewMovie.videoUrl)}
              style={styles.modalVideo}
              controls
              autoPlay
              poster={normalizeThumbnailUrl(viewMovie.thumbnail)}
            />

            <p><b>Năm:</b> {viewMovie.year}</p>
            <p><b>Loại:</b> {viewMovie.type}</p>
            <p><b>Thể loại:</b> {viewMovie.genres?.map(g => g.name).join(", ")}</p>
            <p><b>Rating:</b> ⭐ {viewMovie.rating}</p>
            <p><b>Lượt xem:</b> 👁 {viewMovie.views}</p>

            <p><b>Mô tả:</b></p>
            <p>{viewMovie.description}</p>

            <button
              style={styles.btnClose}
              onClick={() => setViewMovie(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: 30
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 12
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  textarea: {
    width: "100%",
    height: 80,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 12
  },
  button: {
    marginTop: 12,
    padding: "10px 16px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed"
  },

  th: {
    textAlign: "left",
    padding: "10px 8px",
    background: "#f3f4f6",
    borderBottom: "2px solid #e5e7eb",
    fontSize: 14
  },

  thCenter: {
    textAlign: "center",
    padding: "10px 8px",
    background: "#f3f4f6",
    borderBottom: "2px solid #e5e7eb",
    fontSize: 14
  },

  tr: {
    borderBottom: "1px solid #e5e7eb"
  },

  td: {
    padding: "10px 8px",
    verticalAlign: "middle",
    fontSize: 14
  },

  tdCenter: {
    padding: "6px",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 13,
    whiteSpace: "nowrap"
  },

  tableThumb: {
    width: 60,
    height: 80,
    objectFit: "cover",
    borderRadius: 6,
  },

  descCell: {
    padding: "10px 8px",
    maxWidth: 260,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 14
  },


  btnEdit: {
    padding: "6px 10px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13
  },

  btnDelete: {
    padding: "6px 10px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    marginLeft: 6
  },

  btnView: {
    padding: "4px 8px",
    fontSize: 12,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginLeft: 6
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 500,
    maxHeight: "90vh",
    overflowY: "auto"
  },

  modalVideo: {
    width: "100%",
    height: 280,
    borderRadius: 8,
    marginBottom: 12,
    background: "#000"
  },

  btnClose: {
    marginTop: 12,
    padding: "8px 14px",
    background: "#374151",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }



};

export default MoviesPage;
