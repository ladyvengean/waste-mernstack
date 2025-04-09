//LAYOUT OF THE ADMIN PAGE 
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLanding() {
    const navigate = useNavigate();
    // it has a button called "open entries"
    const handleEntriesclick = () => {
        navigate('/verify');

    }
    const handlePerformanceclick = () => {
        navigate('/verify');
        

    }


    return (
        <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full max-w-md border border-gray-300">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-2">Welcome OG Admin</h1>
                <div className="flex flex-col space-y-4">
                    <button
                    onClick={handleEntriesclick}
                    className="w-full bg-pink-400 text-white font-bold py-3 px-4 rounded"
                    >
                        Open Enteries 
                    </button>

                    <button
                    onClick={handlePerformanceclick}
                    className="w-full bg-pink-400 text-white font-bold py-3 px-4 rounded"
                    >
                        See Performance 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminLanding;