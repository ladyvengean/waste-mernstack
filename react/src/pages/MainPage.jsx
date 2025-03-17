
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

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setImage(dataURLtoFile(imageSrc, "captured_image.jpg"));
  }, [webcamRef]);

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

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
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        quality: 0.6
      };
      const compressedFile = await imageCompression(image, options);
      const base64String = await readBase64(compressedFile);

      await axios.post('http://localhost:8000/api/v1/upload/gemini', {
        imageData: base64String,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

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
        </div>
      </header>
      <main className="container mx-auto p-4 mt-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Capture or Upload an image of waste to classify
          </h2>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1.0}
            className="w-full h-56 rounded-lg"
          />
          <button onClick={captureImage} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full">
            Capture Image
          </button>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-4">
            {preview && (
              <div className="mb-4">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-md" />
              </div>
            )}
            {/* <input type="file" id="image-upload" onChange={handleImageChange} accept="image/*" className="hidden" />
            <label htmlFor="image-upload" className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 inline-block">
              Select Image
            </label> */}
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
