import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const Auth = () => {
const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-4 bg-[#0A3C30]">
        <CardContent>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Đăng nhập" />
            <Tab label="Đăng ký" />
          </Tabs>

          {tab === 0 ? <LoginForm /> : <RegisterForm />}
        </CardContent>
      </Card>
    </div>
  );
}

export default Auth;
