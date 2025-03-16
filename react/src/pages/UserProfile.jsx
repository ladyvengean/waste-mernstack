
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  
 
  const [userData] = useState({
    name: 'Shruti Pathak',
    email: 'shrutipaglu@gmail.com',
    joinDate: '11 March, 2025',
    totalReports: 12
  });
  
//history
  const [reports] = useState([
    { id: 1, date: 'March 10, 2025', type: 'Plastic', status: 'Recycled', location: 'Eco-waste Collectors' },
    { id: 2, date: 'March 5, 2025', type: 'Paper', status: 'Recycled', location: 'Green Earth Keepers' },
    { id: 3, date: 'February 28, 2025', type: 'Glass', status: 'Recycled', location: 'Green Earth Keepers' },
    { id: 4, date: 'February 20, 2025', type: 'Electronic', status: 'Pending', location: 'Not Delivered' },
    { id: 5, date: 'February 15, 2025', type: 'Metal', status: 'Recycled', location: 'City Waste' },
  ]);

  const goToHome = () => {
    navigate('/main');
  };

  const handleLogout = () => {
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          <div className="space-x-4">
            <button 
              onClick={goToHome}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Back to Home
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 mt-8">
        <div className="max-w-4xl mx-auto">
          {/* User information card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Total Reports</p>
                    <p className="font-medium">{userData.totalReports}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Report history */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Waste Report History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Waste Type</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Drop-off Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{report.date}</td>
                      <td className="py-3 px-4">{report.type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Recycled' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{report.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {reports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                You haven't reported any waste yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;