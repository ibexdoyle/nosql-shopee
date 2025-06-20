import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import { registerSeller } from "../../services/ShopService";
import AddressSelector from "../../components/AddressSelector/AddressSelector";
import { toast } from "react-toastify";

const SellerRegister = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState(`Shop ${user?.username || ""}`);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    city: "",
    district: "",
    ward: "",
    detail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shopName.trim() || !phone.trim() || !address.detail.trim()) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    const phoneRegex = /^[0-9]{9,12}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ.");
      return;
    }

    registerSeller({
      userId: user.id,
      shopName: shopName.trim(),
      phone,
      email: user.email,
      address,
    });

    toast.success("Bạn đã đăng ký trở thành người bán thành công!");
    navigate("/seller");
  };

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto bg-white mt-6 p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-emerald-green">Đăng ký trở thành người bán</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm">Tên shop <span className="text-red">*</span></label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Số điện thoại <span className="text-red">*</span></label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full border px-3 py-2 rounded bg-grey text-sm"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Tỉnh / Quận / Phường <span className="text-red">*</span></label>
            <AddressSelector
              onSelect={(value) =>
                setAddress((prev) => ({ ...prev, ...value }))
              }
              resetSignal={false}
            />
          </div>

          <div>
            <label className="block font-medium mt-2 text-sm">Địa chỉ chi tiết <span className="text-red">*</span></label>
            <input
              type="text"
              placeholder="VD: Số 12, Đường 3/2"
              value={address.detail}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, detail: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => {navigate("/")}} className="border border-emerald-green text-emerald-green px-6 py-2 rounded">
                Hủy
            </button>
            <button type="submit" className="bg-emerald-green text-white px-6 py-2 rounded hover:bg-mint">
                Đăng ký
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
