


import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();
  
  //mock data 
  const mockData = {
    classification: 'Plastic',
    confidence: 92,
    recyclable: true,
    wasteType: 'Type 2 - HDPE',
    nearestCollectors: [
      { id: 1, name: 'Green Earth Keepers', distance: '2 kms', address: 'Model Town', phone: '9050686531' },
      { id: 2, name: 'City Waste', distance: '5 kms', address: 'GTB nagar', phone: '984563721' },
      { id: 3, name: 'Eco-waste Collectors', distance: '7 kms', address: 'Patel Chest', phone: '76847463728' },
    ]
  };

  const goToHome = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Classification Results</h1>
          <button 
            onClick={goToHome}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 mt-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Waste Classification</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{mockData.classification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specific Type:</span>
                    <span className="font-medium">{mockData.wasteType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium">{mockData.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recyclable:</span>
                    <span className={`font-medium ${mockData.recyclable ? 'text-green-600' : 'text-red-600'}`}>
                      {mockData.recyclable ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Disposal Instructions</h3>
                <p className="text-gray-700">
                  This item is classified as {mockData.classification} ({mockData.wasteType}). 
                  {mockData.recyclable 
                    ? ' It can be recycled at the nearby collection centers listed below.' 
                    : ' This type of waste should be disposed of in general waste bins.'}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800">Additional Tips:</h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Ensure the item is clean and dry before recycling</li>
                    <li>Remove any non-recyclable parts</li>
                    <li>Check local guidelines for specific instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nearest collectors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Nearest Collection Centers</h2>
            
            <div className="space-y-4">
              {mockData.nearestCollectors.map(collector => (
                <div key={collector.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">{collector.name}</h3>
                      <p className="text-gray-600">{collector.address}</p>
                      <p className="text-gray-600">{collector.phone}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {collector.distance}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300">
                      Get Directions
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm transition duration-300">
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultPage;