import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "../services/userService";
import "./LoginPage.css";
import { GoogleLogin } from "@react-oauth/google";
import {useAuth} from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const {setUser} = useAuth();

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
            const user = res.data.user;
            if (user.role === 'user') {
                navigate("/");
            } else {
                navigate("/admin");
            }
            localStorage.setItem("token", res.data.token);
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

                <div className="login-divider">
                    <span>Hoặc đăng nhập bằng</span>
                </div>

                {/* Google login */}
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const res = await googleLogin(credentialResponse.credential);
                        localStorage.setItem("token", res.data.token);
                        console.log("Name:", res.data.user.name)
                        setUser(res.data.user);
                        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                        navigate("/");                         
                    }
                    }
                />
            </div>
        </div>

    )
}

export default LoginPage;





