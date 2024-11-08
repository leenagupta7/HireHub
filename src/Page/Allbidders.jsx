import React from 'react';
import { useLocation } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message'; // Import the Message icon from MUI

const Allbidders = () => {
    const location = useLocation();
    const { freelancer } = location.state || {}; // Retrieve freelancer data from state
    
    return (
        <div className="bg-gray-900 min-h-screen container mx-auto p-8">
            <h1 className="text-3xl font-semibold text-center text-orange-500 mb-8">All Bidders</h1>
            
            {freelancer && freelancer.length > 0 ? (
                freelancer.map((bidder, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded mb-4 flex items-center justify-between">
                        <h2 className="text-xl text-white">Bidder Name: {bidder.name}</h2>
                        
                        {/* Message icon */}
                        <button className="text-orange-500 hover:text-orange-300 flex items-center">
                            <MessageIcon className="mr-2" />
                            <span>Message</span>
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-white">No bidders found.</p>
            )}
        </div>
    );
};

export default Allbidders;
