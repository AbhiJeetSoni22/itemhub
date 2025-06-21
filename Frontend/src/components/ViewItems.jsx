function ViewItems({ items, onItemClick }) {
  console.log('ViewItems items:', items);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Items</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items available. Add some items to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <img
                src={`http://localhost:5000${item.coverImage}`}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewItems;