import { useEffect, useState } from 'react';

function ItemModal({ item, onClose, onEnquire }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [item.coverImage, ...(item.additionalImages || [])];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full m-4 p-8 relative transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{item.name}</h2>

        {/* Image Section */}
        <div className="mb-6">
          <img
            src={`http://localhost:5000${images[currentImage]}`}
            alt={`${item.name} preview ${currentImage + 1}`}
            className="w-full h-80 object-cover rounded-lg transition duration-300"
          />
          {images.length > 1 && (
            <>
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevImage}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextImage}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImage(index)}
                    className={`w-12 h-12 object-cover rounded-lg cursor-pointer border-2 ${
                      currentImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <p className="text-gray-700 mb-2">
          <strong>Type:</strong> {item.type}
        </p>
        <p className="text-gray-700 mb-6">
          <strong>Description:</strong> {item.description}
        </p>

        {/* Enquire Button */}
        <button
          onClick={() => onEnquire(item)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
