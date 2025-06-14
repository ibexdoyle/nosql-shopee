import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {AppBar, Toolbar, IconButton, InputBase, Box, Badge, Menu, Avatar} from '@mui/material'
import {Notifications, Search, ShoppingCart} from '@mui/icons-material'
import Logo from '../../assets/image/logo-horizontal.png'
import { useUser } from '../../context/UserContext';

const Header = () =>{
    const quickLinks = [ "Máy Quạt Cầm Tay", "Áo Kiểu Babydoll", "Dép Nữ Màu Đen",
    "Ốp iPhone Xinh Cute","Quần Dsquared2 Nam Size 24", "Đồ ăn vặt", "Áo hoodie"];
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const {user, logout} = useUser();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/');
    };

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/search?query=${encodeURIComponent(keyword.trim())}`);
        }
    };

    const isHomepage = useLocation().pathname === '/';

    return(
        <AppBar position={isHomepage ? 'sticky' : 'static'} sx={{ background: 'linear-gradient(to bottom, #00674F, #0A3C30)', boxShadow: 'none' }}>
            <div className="max-w-[1200px] mx-auto w-full">
                <Toolbar className="flex justify-between text-sm text-white !min-h-[48px] !p-0">
                    <div className="flex items-center gap-2">
                        <a href="#" className="text-white no-underline hover:underline">Kênh người bán</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Trở thành người bán</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton size="small" sx={{'&:hover': {backgroundColor: 'transparent', },color: 'white', }}>
                            <Notifications className="text-white text-sm" fontSize='small'/>
                            <span className="text-white text-sm ml-1">Thông báo</span>
                        </IconButton>
                        {user ? (
                            <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose} className="relative flex items-center">
                                <IconButton>
                                    <Avatar src={user.avatar}/>
                                    <span>{user.username}</span>
                                </IconButton>
                                <Menu>

                                </Menu>
                            </div>
                        ):(
                            <>
                                <a href="/auth" className="hover:underline">Đăng ký</a>
                                <span>|</span>
                                <a href="/auth" className="hover:underline">Đăng nhập</a>
                            </>
                        )}
                        
                    </div>
                </Toolbar>

                <Toolbar className="flex justify-between pb-3 !px-0">
                    <Link to={"/"}>
                        <img src={Logo} alt="logo" className="h-12 mb-2 mr-5"/>
                    </Link>
                    <div>
                        <div className="bg-white rounded flex items-center w-full overflow-hidden">
                            <InputBase placeholder='Hè Cháy Cùng Lifebuoy Dưỡng Da'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                            className="bg-white px-4 py-2 rounded-md flex-1 text-black"
                            sx={{
                                '& input': {
                                    padding: 0,
                                },
                            }}/>
                            <button className="bg-[#3EBB9E] text-white px-4 py-1 mr-1 rounded-sm font-semibold" onClick={handleSearch}>
                                <Search/>
                            </button>
                        </div>
                            <Box className="flex flex-wrap gap-4 text-white text-sm mt-1">
                            {quickLinks.map((text, index) => (
                            <a key={index} href="#">
                                {text}
                            </a>
                            ))}
                            </Box>
                    </div>
                    <IconButton>
                        <Badge>
                            <ShoppingCart sx={{ color: 'white' }} />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </div>
        </AppBar>
    )
}

export default Header;