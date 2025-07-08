import React, { useState } from 'react';
import { Card, CardContent, Tabs, Tab } from '@mui/material';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader'

const Auth = () => {
const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="container">
      <AuthHeader/>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-xl rounded-2xl p-4">
          <CardContent>
            <Tabs value={tab} onChange={handleTabChange} centered slotProps={{
              indicator: {
                sx: {
                  backgroundColor: '#0A3C30',
                },
              },
            }}>
              <Tab label="Đăng nhập" className="text-[#3EBB9E]"/>
              <Tab label="Đăng ký" className="text-[#3EBB9E]"/>
            </Tabs>
            {tab === 0 ? <LoginForm /> : <RegisterForm />}
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
}

export default Auth;
