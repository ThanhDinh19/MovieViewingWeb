import "./Navbar.css";

const Navbar = () =>{
    return (
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
    )
}

export default Navbar;