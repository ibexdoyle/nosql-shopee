const API_BASE = ""

export const login = async(email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {'Content Type': 'application/json'},
        body: JSON.stringify(email, password)
    });
    if(!res.ok) throw new Error('Đăng nhập thất bại! Vui lòng thử lại');
    
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
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

export const getToken = () => localStorage.getItem();

export const logout = () => localStorage.removeItem('token');