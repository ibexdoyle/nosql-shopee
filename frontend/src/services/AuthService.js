const API_BASE = ""

export const login = async(email, password) => {
    // const res = await fetch(`${API_BASE}/login`, {
    //     method: 'POST',
    //     headers: {'Content Type': 'application/json'},
    //     body: JSON.stringify(email, password)
    // });
    // if(!res.ok) throw new Error('Đăng nhập thất bại! Vui lòng thử lại');
    
    // const data = await res.json();
    // localStorage.setItem('token', data.token);
    // return data;
    if (email === 'dora@example.com' && password === '123456') {
        const data = {
        token: 'fake-jwt-token',
        user: {
            id: 1,
            username: 'Dũng Lê',
            email: 'dora@example.com',
            gender: 'Nam',
            dob: '10/12/2003',
            phone: '01122334455',
            avatar: '../assets/image/user.jpg',
            balance: 1200000,
            addresses: [
              {
                  id: 1,
                  name: 'Lê Phan Xuân Dũng',
                  phone: '0384340684',
                  detail: 'Số 38, Đường 39, Khu dân cư Vạn Phúc',
                  ward: 'Phường Hiệp Bình Phước',
                  district: 'Thành Phố Thủ Đức',
                  city: 'TP. Hồ Chí Minh',
                  isDefault: true,
              },
              {
                  id: 2,
                  name: 'Lê Phan Xuân',
                  phone: '0384340684',
                  detail: 'Số 40, Đường 39, Khu dân cư Vạn Phúc',
                  ward: 'Phường Hiệp Bình Phước',
                  district: 'Thành Phố Thủ Đức',
                  city: 'TP. Hồ Chí Minh',
                  isDefault: false,
              },
            ]
        },
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
        } else {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
  }
}

export const register = async(fullName, phone, email, password) =>{
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {'Content Type': 'application/json'},
        body: JSON.stringify(fullName, phone, email, password)
    });

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem();

// export const logout = () => localStorage.removeItem('token');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};