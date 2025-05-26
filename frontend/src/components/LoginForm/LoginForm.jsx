import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const userData = await login(email, password);
            alert('Đăng nhập thành công');
            navigate("/");
        }
        catch(err){
            alert(err.message);
        }
    }
    return (
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" className="bg-blue-500 hover:bg-blue-600 text-white">
                Đăng nhập
            </Button>
        </form>
  );
}

export default LoginForm;