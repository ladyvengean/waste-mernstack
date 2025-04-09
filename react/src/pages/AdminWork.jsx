import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AdminWork() {
    const navigate = useNavigate();
    //we have the list of the entries
    const [entries] = useState([
        { id: 1, date: 'March 10', type: 'Plastic', Collector: 'Green Planet Keepers', Status: 'Not-Picked'},
        { id: 2, date: 'March 10', type: ' Electric', Collector: 'Urban Collectors', Status: 'Picked'},
        { id: 3, date: 'March 10', type: 'Wet', Collector: 'BBC', Status: 'Not-Picked'},
        { id: 4, date: 'March 10', type: 'Dry', Collector: 'Green Planet Keepers', Status: 'Not-Picked'},
        { id: 5, date: 'March 10', type: 'Plastic', Collector: 'Urban Collectors', Status: 'Picked'}

    ]);

    const goBack = () => {
        navigate(-1);
    }


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Waste Collection Dashboard</h1>
                    <button 
                        onClick={goBack}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                    >
                        Back
                    </button>
                </div>
            </header>
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-xl font-semibold mb-4">Collection Entries</h2>
                            
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collector</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {entries.map((entry) => (
                                            <tr key={entry.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Collector}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        entry.Status === 'Picked' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {entry.Status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default AdminWork;


// table	Main table container
// thead	Header section (column titles)
// tr	Table row
// th	Table heading cell
// tbody	Body of table (data rows)
// td	Table data cell
// .map()	Loops over array to dynamically render rows