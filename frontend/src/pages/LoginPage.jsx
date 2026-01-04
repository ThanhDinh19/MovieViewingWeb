import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/userService";

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
        if(!email){
            err.email = "Email không được để trống";
        }
        else if(!isValidEmail(email)){
            err.email = "Email không hợp lệ";
        }

        if(!password){
            err.password = "Mật khẩu không được để trống";
        }
        else if(password.length < 6){
            err.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    const handleSubmit = async () => {
        if(!validate()){
            return;
        }

        try{
            const res = await login(email, password);

            console.log("Login response:", res);

            navigate('/admin');
        }
        catch(err){
            const message = err.response?.data?.message || "Đã xảy ra lỗi";
            alert(message);
        }
    }

    return (
        <div>
            <h2>Đăng nhập</h2>
            <input type="text" placeholder  ="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
            <button onClick={handleSubmit}>Đăng nhập</button>
        </div>
    )
}

export default LoginPage;