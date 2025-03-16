

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!image) {
      alert('Please select an image to upload');
      return;
    }
    
    setUploading(true);
    
    
    setTimeout(() => {
      setUploading(false);
      
      navigate('/results');
    }, 2000);
    
    
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header*/}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Waste Classification</h1>
          <button 
            onClick={goToProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            My Profile
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto p-4 mt-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Upload an image of waste to classify
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {preview ? (
                <div className="mb-4">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded-md"
                  />
                </div>
              ) : (
                <div className="text-gray-500 mb-4">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p>Click to select or drag and drop an image</p>
                </div>
              )}
              
              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <label 
                htmlFor="image-upload" 
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block"
              >
                Select Image
              </label>
            </div>
            
            <button
              type="submit"
              disabled={!image || uploading}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition duration-300 
                ${!image || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {uploading ? 'Uploading...' : 'Classify Waste'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default MainPage;