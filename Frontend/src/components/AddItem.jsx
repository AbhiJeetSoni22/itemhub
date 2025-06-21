import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddItem({ showSuccess, onItemAdded }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: [],
  });
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('name', formData.name);
  data.append('type', formData.type);
  data.append('description', formData.description);
  if (formData.coverImage) data.append('coverImage', formData.coverImage);
  formData.additionalImages.forEach(img => data.append('additionalImages', img));


    try {
      const response = await axios.post(`${baseUrl}/api/items`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      console.log('Item added:', response.data);
      showSuccess(true);
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: [],
      });
      onItemAdded();
      setTimeout(() => showSuccess(false), 2000);
      navigate('/view')
    } catch (error) {
      console.error('Error adding item:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Item</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Select Type</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Shoes">Shoes</option>
              <option value="Sports Gear">Sports Gear</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              onChange={e => setFormData({ ...formData, coverImage: e.target.files[0] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
            <input
              type="file"
              multiple
              onChange={e => setFormData({ ...formData, additionalImages: Array.from(e.target.files) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;