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

export const fetchCurrentUser = async () => {
  const res = await fetch(`${USER_API}/me`, {
    credentials: "include", 
  });

  if (!res.ok) {
    if (res.status === 401) return null; // session hết hạn
    throw new Error("Lỗi khi kiểm tra phiên đăng nhập");
  }

  return res.json();
};

export const logout = async () => {
  await fetch(`${USER_API}/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/";
};

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




