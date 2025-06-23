


import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoConstraints = {
    facingMode: { ideal: "environment" } // "environment" = back camera, "user" = front camera
  };

  const captureImage = useCallback(() => {
    if (!cameraActive) {
      setCameraActive(true);
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setImage(dataURLtoFile(imageSrc, "captured_image.jpg"));
    setCameraActive(false);
  }, [webcamRef, cameraActive]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(","), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const readBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select or capture an image to upload');
      return;
    }
    setUploading(true);
    try {
      const options = {
        maxSizeMB: 0.005, // Reduced from 0.01 to 0.005 (5KB max)
        maxWidthOrHeight: 800, // Reduced from 1200 to 800
        useWebWorker: true,
        quality: 0.4 // Reduced from 0.6 to 0.4
      };
      const compressedFile = await imageCompression(image, options);
      const base64String = await readBase64(compressedFile);

      const result = await axios.post('https://waste-mernstack.onrender.com/api/v1/upload/gemini', {
        imageData: base64String,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      let response = result.data.data.response;
      console.log(result.data.data);
      console.log(response);
      localStorage.setItem('result', response);

      setUploading(false);
      navigate('/results');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Waste Classification</h1>
          <button
            onClick={() => navigate('/profile')}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Profile
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Capture or Upload an image of waste to classify
          </h2>
          {cameraActive ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1.0}
              className="w-full h-56 rounded-lg"
            />
          ) : (
            <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Click "Capture Image" to start camera</p>
              </div>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button onClick={captureImage} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              {cameraActive ? 'Take Photo' : 'Capture Image'}
            </button>
            <input type="file" id="image-upload" onChange={handleImageChange} accept="image/*" className="hidden" />
            <label htmlFor="image-upload" className="flex-1 cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block text-center">
              Upload Image
            </label>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-4">
            {preview && (
              <div className="mb-4">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-md" />
              </div>
            )}
            {!preview && (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!image || uploading}
            className={`w-full py-3 px-4 rounded-md font-medium text-white transition duration-300 ${!image || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {uploading ? 'Uploading...' : 'Classify Waste'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default MainPage;