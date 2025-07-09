import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';

const LoginForm = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const handleLogin = async (e) =>{ 
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Đăng nhập thành công!');
            window.location.href = "/";
        } catch (err) {
            console.error(err.message);
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
                sx={{
                    '& label.Mui-focused': {
                        color: '#0A3C30',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#0A3C30',
                        },
                    },
                }}
            />
            <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    '& label.Mui-focused': {
                        color: '#0A3C30',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#0A3C30',
                        },
                    },
                }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{color: "white", backgroundColor: "#0A3C30"}}>
                Đăng nhập
            </Button>
        </form>
  );
}

export default LoginForm;