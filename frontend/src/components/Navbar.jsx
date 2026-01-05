import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    🎬 <span className="logo-text">Movie Viewing</span>
                </div>

                <div className="navbar-center">
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim..."
                        className="search-input"
                    />
                </div>

                <div className="navbar-right">
                    <a href="/login" className="login-link">Đăng nhập</a>
                </div>
            </nav>
            <nav className="navbar-menu">
                <NavLink to="/" className="menu-item">Trang chủ</NavLink>
                <div>Phim mới</div>
                <div>Phim bộ</div>
                <div>Phim lẻ</div>
                <div>Phim chiếu rạp</div>
            </nav>
        </div>
    )
}

export default Navbar;