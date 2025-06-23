




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  
  useEffect(() => {
    // Get result from localStorage and parse it
    const resultString = localStorage.getItem('result');
    if (resultString) {
      try {
        
        const parsedResult = JSON.parse(resultString);
        setResultData(parsedResult);
      } catch (error) {
        console.error('Error parsing result as JSON:', error);
        
        // If it's not valid JSON, try to extract information from the text
        const result = resultString.trim();
        
        // Extract classification (assuming it follows a pattern like "That's **electric_waste**")
        let classification = "Unknown";
        const classMatch = result.match(/That's \*\*(.*?)\*\*/);
        if (classMatch && classMatch[1]) {
          classification = classMatch[1].replace(/_/g, ' ');
        }
        
        // Extract description (everything after the classification)
        let description = result;
        if (classMatch) {
          const descriptionStart = result.indexOf('.', result.indexOf(classMatch[0]));
          if (descriptionStart !== -1) {
            description = result.substring(descriptionStart + 1).trim();
          }
        }
        
        // Create a structured object from the text
        setResultData({
          classification: classification.charAt(0).toUpperCase() + classification.slice(1),
          description: description,
          // Default values for other fields
          recyclable: classification.includes('plastic') || classification.includes('paper') || classification.includes('glass'),
        });
      }
    }
  }, []);

  
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

  const displayData = resultData || mockData;

  const goToHome = () => {
    navigate('/main');
  };

  if (!displayData) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

 
  const formattedClassification = displayData.classification 
    ? displayData.classification.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    : 'Unknown';

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
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Type:</span>
                    <span className="font-semibold text-lg text-gray-700 block">{formattedClassification}</span>
                  </div>
                  
                  {displayData.wasteType && (
                    <div>
                      <span className="text-gray-600 font-medium block mb-1">Specific Type:</span>
                      <span className="font-medium block text-gray-700">{displayData.wasteType}</span>
                    </div>
                  )}
                  
                  {displayData.confidence && (
                    <div>
                      <span className="text-gray-600 font-medium block mb-1">Confidence:</span>
                      <span className="font-medium block text-gray-700">{displayData.confidence}%</span>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Recyclable:</span>
                    <span className={`font-medium block ${displayData.recyclable ? 'text-green-600' : 'text-red-600'}`}>
                      {displayData.recyclable !== undefined ? (displayData.recyclable ? 'Yes' : 'No') : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Disposal Instructions</h3>
                
                {displayData.description ? (
                  <p className="text-gray-700 mb-4">{displayData.description}</p>
                ) : (
                  <p className="text-gray-700 mb-4">
                    This item is classified as {formattedClassification}
                    {displayData.wasteType ? ` (${displayData.wasteType})` : ''}. 
                    {displayData.recyclable 
                      ? ' It can be recycled at the nearby collection centers listed below.' 
                      : displayData.recyclable === false 
                        ? ' This type of waste should be disposed of in general waste bins.'
                        : ' Please check local guidelines for disposal instructions.'}
                  </p>
                )}
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800">Additional Tips:</h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {formattedClassification.toLowerCase().includes('electric') || formattedClassification.toLowerCase().includes('electronic') ? (
                      <>
                        <li>Take to an e-waste collection center</li>
                        <li>Never dispose of in regular trash</li>
                        <li>Many electronics stores offer recycling programs</li>
                      </>
                    ) : formattedClassification.toLowerCase().includes('plastic') ? (
                      <>
                        <li>Rinse the container before recycling</li>
                        <li>Remove any labels or film if possible</li>
                        <li>Check for recycling number at the bottom</li>
                      </>
                    ) : (
                      <>
                        <li>Ensure the item is clean and dry before recycling</li>
                        <li>Remove any non-recyclable parts</li>
                        <li>Check local guidelines for specific instructions</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nearest collectors */}
          {displayData.nearestCollectors && displayData.nearestCollectors.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Nearest Collection Centers</h2>
              
              <div className="space-y-4">
                {displayData.nearestCollectors.map(collector => (
                  <div key={collector.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">{collector.name}</h3>
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
          )}
        </div>
      </main>
    </div>
  );
}

export default ResultPage;