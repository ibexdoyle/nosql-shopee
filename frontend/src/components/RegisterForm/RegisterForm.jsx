import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { register } from '../../services/AuthService';

const RegisterForm = () => {
  const [username, setUsername] = useState(''); 
  const [fullName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = await register(username, fullName, phone, email, password);
            alert('Đăng ký thành công');
            console.log(userData);
        } catch (err) {
            alert(err.message);
        }
    };

  return (
    <form onSubmit={handleRegister} className="space-y-4 mt-4">
      <TextField
        fullWidth
        label="Tên đầy đủ"
        variant="outlined"
        value={fullName}
        onChange={(e) => setName(e.target.value)}
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
        label="Tên đăng nhập"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          '& label.Mui-focused': { color: '#0A3C30' },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#0A3C30' },
        }}
      />
      <TextField
        fullWidth
        label="Số điện thoại"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <Button type="submit" fullWidth variant="contained" className="text-white bg-emerald-green">
        Đăng ký
      </Button>
    </form>
  );
};

export default RegisterForm;