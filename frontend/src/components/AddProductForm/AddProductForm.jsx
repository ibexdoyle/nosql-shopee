import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { createProduct } from "../../services/ProductService";

const AddProductForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    stock: "",
    category: "",
    images: [],
    shopId: "1",
  });

  const maxNumber = 9;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onImageChange = (imageList) => {
    setForm((prev) => ({
      ...prev,
      images: imageList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        images: form.images.map((img) => img.data_url), // chuyển mỗi object thành string base64
      };

      const result = await createProduct(payload);
      console.log("Thêm sản phẩm thành công", result);

      // Reset form sau khi submit thành công
      setForm({
        name: "",
        description: "",
        originalPrice: "",
        salePrice: "",
        stock: "",
        category: "",
        images: [],
        shopId: "",
      });

    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium text-emerald-green">Tên sản phẩm</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-grey text-sm"
          placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-emerald-green">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-grey text-sm"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium text-emerald-green">Giá gốc</label>
          <input
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full border-grey text-sm"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium text-emerald-green">Giá bán</label>
          <input
            name="salePrice"
            type="number"
            value={form.salePrice}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full border-grey text-sm"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium text-emerald-green">Số lượng tồn kho</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full border-grey text-sm"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Danh mục</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full border-grey text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Hình ảnh sản phẩm</label>
        <ImageUploading
          multiple
          value={form.images}
          onChange={onImageChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
            <div className="flex flex-wrap gap-3">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={image.data_url}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove(index)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {imageList.length < maxNumber && (
                <div
                  className="flex flex-col justify-center items-center w-24 h-24 border-2 border-dashed rounded cursor-pointer text-red-500 text-sm"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <span>＋</span>
                  <span>Thêm ảnh</span>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>

      <button
        type="submit"
        className="bg-emerald-green text-white px-4 py-2 rounded hover:bg-emerald-green-100"
      >
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default AddProductForm;
