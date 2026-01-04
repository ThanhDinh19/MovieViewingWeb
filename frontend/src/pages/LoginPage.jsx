import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import "./LoginPage.css";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validate = () => {
        const err = {};
        if (!email) {
            err.email = "Email không được để trống";
        }
        else if (!isValidEmail(email)) {
            err.email = "Email không hợp lệ";
        }

        if (!password) {
            err.password = "Mật khẩu không được để trống";
        }
        else if (password.length < 6) {
            err.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        try {
            const res = await login(email, password);
            localStorage.setItem("token", res.data.token);
            navigate('/admin');
        }
        catch (err) {
            const message = err.response?.data?.message || "Đã xảy ra lỗi";
            alert(message);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Đăng nhập</h2>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                <button onClick={handleSubmit} className="login-button">
                    Đăng nhập
                </button>
            </div>
        </div>

    )
}

export default LoginPage;