import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { register } from '../../services/AuthService';
import AddressSelector from '../AddressSelector/AddressSelector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState(''); 
  const [fullName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({ city: '', district: '', ward: '' });
  const [detailAddress, setDetailAddress] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
        e.preventDefault();
        try {

            const fullAddress = [
              address.city,
              address.district,
              address.ward,
              detailAddress,
            ].filter(Boolean).join(', '); 
            console.log(fullAddress);
            const userData = await register(username, fullName, phone, email, password, fullAddress);
            toast.success('Đăng ký thành công!');
            navigate('/');
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

      <TextField
        fullWidth
        label="Địa chỉ chi tiết (số nhà, tên đường...)"
        variant="outlined"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
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

      <div>
        <label className="font-medium">Chọn địa chỉ</label>
        <AddressSelector onSelect={(val) => setAddress(val)} resetSignal={false} />
      </div>

      <Button type="submit" fullWidth variant="contained" className="text-white bg-emerald-green">
        Đăng ký
      </Button>
    </form>
  );
};

export default RegisterForm;