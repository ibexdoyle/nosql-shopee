const USER_API = "http://localhost:8082/api/users"

export const login = async(email, password) => {
    const res = await fetch(`${USER_API}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Đăng nhập thất bại");
    return await res.json();
}

export const register = async (username, fullName, phone, email, password, address) => {
  const res = await fetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      fullName,
      phone,
      email,
      password,
      address
    }),
    credentials: "include",
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Đăng ký thất bại");
  }

  return res.json();
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem();

export const logout = () => localStorage.removeItem('token');
