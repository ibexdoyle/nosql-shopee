import React from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar} from '@mui/material'
import Logo from '../../assets/image/logo-horizontal.png'


const AuthHeader = () =>{
    return(
        <AppBar sx={{ background: 'linear-gradient(to bottom, #00674F, #0A3C30)', boxShadow: 'none' }}>
            <div className="max-w-6xl mx-auto w-full">
                <Toolbar className="flex gap-4 py-3 !px-0">
                    <Link to={"/"}>
                        <img src={Logo} alt="logo" className="h-12 mb-2 mr-5"/>
                    </Link>
                    <p>|</p>
                    <div>
                        <h1 className='text-white text-xl'>Đăng nhập & Đăng ký người dùng</h1>
                    </div>
                </Toolbar>
            </div>
        </AppBar>
    )
}

export default AuthHeader;