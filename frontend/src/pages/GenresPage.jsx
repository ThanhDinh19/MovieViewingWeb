import { useState, useEffect } from "react";
import { getGenres } from "../services/genreService";

const GenresPage = () => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getGenres().then(res => setGenres(res.data))
    })

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Quản lý thể loại phim</h1>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>STT</th>
                        <th style={styles.th}>Tên</th>
                    </tr>
                </thead>

                <tbody>
                    {genres.map((item, index) => (
                        <tr key={item._id} style={styles.tr}>
                            <td style={styles.tdCenter}>{index + 1}</td>
                            <td style={styles.td}>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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