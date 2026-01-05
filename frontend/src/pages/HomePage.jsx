import "./HomePage.css";
import { useState, useEffect } from "react";
import {getMovies} from "../api/moviesAPI";

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getMovies();
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className="home-page">

            {/* MOVIE SECTION */}
            <section className="movie-section">
                <h2>Phim nổi bật</h2>

                <div className="movie-list">
                    {movies.map(item => (
                        <div key={item._id} className="movie-card">
                            <img src={item.thumbnail} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );

}

export default HomePage;