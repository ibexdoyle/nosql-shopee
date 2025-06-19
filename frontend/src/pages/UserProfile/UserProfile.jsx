import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import AddressManager from "../../components/AddressManager/AddressManager";
import Header from "../../components/Header/Header";
import { Divider } from "@mui/material";

const UserProfile = () => {
    const {user} = useUser();
    const [activeTab, setActiveTab] = useState('profile');

    if(!user){
        return <Navigate to="/auth" replace/>
    }

    return(
        <div className="container">
            <Header/>
            <div className="flex max-w-6xl mx-auto mt-5 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold">{user.username || user.name}</p>
                        </div>
                    </div>
                    <Divider/>
                    <div className="mt-3">
                        <div className="flex items-center gap-2">
                            <i className="fi fi-sr-user text-emerald-green"></i>
                            <p>Tài Khoản Của Tôi</p>
                        </div>
                        
                        <div
                        onClick={() => setActiveTab('profile')}
                        className={`cursor-pointer px-2 py-1 rounded ${
                            activeTab === 'profile' ? 'text-mint' : 'hover:text-mint'
                        }`}
                        >
                            Hồ Sơ
                        </div>
                        <div
                        onClick={() => setActiveTab('address')}
                        className={`cursor-pointer px-2 py-1 rounded ${
                            activeTab === 'address' ? 'text-mint' : 'hover:text-mint'
                        }`}
                        >
                            Địa Chỉ
                        </div>
                    </div>
                </div>
                <div className="flex-1 shadow-md rounded p-6 bg-white">
                        {activeTab === 'profile' && <ProfileForm />}
                        {activeTab === 'address' && <AddressManager />}
                </div>
            </div>
        </div>    
    )
}

export default UserProfile;