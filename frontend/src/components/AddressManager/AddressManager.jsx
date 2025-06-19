import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import AddressSelector from '../AddressSelector/AddressSelector';

const AddressManager = () => {
  const { user, setUser } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    detail: '',
    ward: '',
    district: '',
    city: '',
    isDefault: false,
  });
  const [addressResetKey, setAddressResetKey] = useState(0);

  const addresses = user.addresses;

  const updateAddresses = (newAddresses) => {
    const updatedUser = { ...user, addresses: newAddresses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      detail: '',
      ward: '',
      district: '',
      city: '',
      isDefault: false,
    });
    setAddressResetKey(prev => prev + 1); // tăng key để reset AddressSelector
  };

  const handleAdd = () => {
    const newAddress = {
      ...formData,
      id: Date.now(),
    };

    const updated = formData.isDefault
      ? [newAddress, ...addresses.map((a) => ({ ...a, isDefault: false }))]
      : [...addresses, newAddress];

    updateAddresses(updated);
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    updateAddresses(updated);
  };

  const setDefault = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    updateAddresses(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Địa chỉ của tôi</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-green text-white px-4 py-2 rounded text-sm"
        >
          + Thêm địa chỉ mới
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-[15px]">
                {addr.name}
                <span className="ml-2 text-smoke text-sm">(+84) {addr.phone}</span>
              </p>
              <p className="text-[14px] text-smoke mt-1 whitespace-pre-line">
                {addr.detail}
                {'\n'}
                {addr.ward}, {addr.district}, {addr.city}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {addr.isDefault && (
                  <span className="border text-xs text-red border-red-500 px-1 rounded">
                    Mặc định
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-sm text-mint space-y-2">
              <div className="space-x-3">
                <button className="hover:underline">Cập nhật</button>
                <button onClick={() => handleDelete(addr.id)} className="hover:underline">
                  Xoá
                </button>
              </div>
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="border text-xs px-2 py-1 mt-2 rounded"
                >
                  Thiết lập mặc định
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] space-y-4">
            <h3 className="text-lg font-semibold">Địa chỉ mới</h3>

            <input
              type="text"
              placeholder="Họ và tên"
              className="border border-smoke w-full px-3 py-2 rounded text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="border border-smoke w-full px-3 py-2 rounded text-sm"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Địa chỉ chi tiết"
              className="border border-smoke w-full px-3 py-2 rounded text-sm"
              value={formData.detail}
              onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
            />

            <AddressSelector
              onSelect={(address) => setFormData({ ...formData, ...address })}
              resetSignal={addressResetKey}
            />

            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              />
              Đặt làm địa chỉ mặc định
            </label>

            <div className="flex justify-between mt-4">
              <button onClick={() => { setShowForm(false); resetForm(); }} className="text-smoke text-sm">
                Trở lại
              </button>
              <button
                onClick={handleAdd}
                className="bg-emerald-green text-white px-4 py-2 rounded text-sm"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;