import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to ItemHub</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover and manage your favorite items with ease. Add new items, explore our collection, and enquire about products that catch your eye.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/view"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
          >
            View Items
          </Link>
          <Link
            to="/add"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
          >
            Add Item
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;