import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

const ProfileForm = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name || '');
  const [gender, setGender] = useState(user.gender || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [avatar, setAvatar] = useState(user.avatar || '/avatars/default.png');

  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [errors, setErrors] = useState({});

   const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = 'Email không hợp lệ.';
    if (!/^\d{9,12}$/.test(phone)) newErrors.phone = 'Số điện thoại không hợp lệ.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const updatedUser = { ...user, name, gender, birthday, avatar, email, phone };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditingEmail(false);
    setIsEditingPhone(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
      <div className="flex justify-between">
        <div className="w-[60%] pr-8 border-r">
          <h2 className="text-xl font-semibold mb-1">Hồ Sơ Của Tôi</h2>
          <p className="text-sm text-dark-grey mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

          <div className="flex gap-3 mb-4 text-sm">
            <label className="text-dark-grey block mb-1 w-20">Tên</label>
            <p className="font-medium">{user.username || user.email}</p>
          </div>

          <div className="flex gap-3 mb-4 text-sm">
            <label className="text-dark-grey block mb-1 w-20">Email</label>
            {isEditingEmail ? (
              <>
                <input
                  type="text"
                  className="border px-3 py-2 rounded w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red text-xs mt-1">{errors.email}</p>}
              </>
            ) : (
              <p>
                {email}{' '}
                <button
                  className="text-blue-500 text-xs ml-2 hover:underline"
                  onClick={() => setIsEditingEmail(true)}
                >
                  Thay Đổi
                </button>
              </p>
            )}
          </div>

          <div className="flex gap-3 mb-4 text-sm">
            <label className="text-dark-grey block mb-1 w-20">Số điện thoại</label>
            {isEditingPhone ? (
              <>
                <input
                  type="text"
                  className="border px-3 py-2 rounded w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </>
            ) : (
              <p>
                {phone}{' '}
                <button
                  className="text-blue-500 text-xs ml-2 hover:underline"
                  onClick={() => setIsEditingPhone(true)}
                >
                  Thay Đổi
                </button>
              </p>
            )}
          </div>

          <div className="flex gap-3 mb-4 text-sm">
            <label className="text-dark-grey block mb-1 w-20">Giới tính</label>
            <div className="space-x-4">
              {['Nam', 'Nữ', 'Khác'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="gender"
                    value={opt}
                    checked={gender === opt}
                    onChange={(e) => setGender(e.target.value)}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 file:mb-6 text-sm">
            <label className="text-dark-grey block mb-1 w-20">Ngày sinh</label>
            <input
              type="date"
              className="border px-3 py-2 rounded"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-emerald-green text-white px-6 py-2 rounded text-sm hover:bg-mint"
          >
            Lưu
          </button>
        </div>

        {/* Avatar bên phải */}
        <div className="w-[35%] flex flex-col items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border mb-3"
          />
          <label className="text-sm text-blue-500 cursor-pointer hover:underline">
            Chọn Ảnh
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <p className="text-xs text-gray-400 text-center mt-2">
            Dung lượng file tối đa 1 MB<br />Định dạng: .JPEG, .PNG
          </p>
        </div>
    </div>
  );
};

export default ProfileForm;
