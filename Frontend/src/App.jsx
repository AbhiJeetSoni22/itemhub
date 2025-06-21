import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import ItemModal from './components/ItemModal';
import axios from 'axios';
import Home from './components/Home';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEnquirySuccess, setShowEnquirySuccess] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEnquire = async (item) => {
    try {
      await axios.post(`${baseUrl}/api/enquire`, { itemId: item._id });
      setSelectedItem(null)
      setShowEnquirySuccess(true);
    } catch (error) {
      console.error('Error sending enquiry:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Toast for Item Added */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50">
          Item successfully added
        </div>
      )}

      {/* Toast for Enquiry Sent */}
      {showEnquirySuccess && (
        <div className="fixed top-20 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-lg z-50">
          Enquiry sent successfully!
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/view"
          element={<ViewItems items={items} onItemClick={setSelectedItem} />}
        />
        <Route
          path="/add"
          element={<AddItem showSuccess={setShowSuccess} onItemAdded={fetchItems} />}
        />
      </Routes>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEnquire={handleEnquire}
        />
      )}
    </div>
  );
}

export default App;
