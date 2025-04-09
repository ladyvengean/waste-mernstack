



import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleCitizenClick = () => {
    navigate('/auth');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-2">Waste Management System</h1>
        <p className="text-red text-center mb-6 md:mb-8">Choose how you would like to continue</p>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={handleAdminClick}
            className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded"
          >
            Continue as Admin
          </button>
          
          <button 
            onClick={handleCitizenClick}
            className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded"
          >
            Continue as Citizen
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

