import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message'; // Import the Message icon from MUI
import Message from '../Components/Message';

const Allbidders = () => {
    const location = useLocation();
    const { freelancer, clientid } = location.state || {}; // Retrieve freelancer data from state
    console.log('freelancer',freelancer);
    const [selectedUser, setSelectedUser] = useState(null); // State to track the selected bidder's ID

    const handleMessageClick = (userId) => {
        setSelectedUser(userId); // Set the selected user ID when the message button is clicked
    };

    return (
        <div className="bg-gray-900 min-h-screen container mx-auto p-8">
            <h1 className="text-3xl font-semibold text-center text-orange-500 mb-8">All Bidders</h1>
            
            {freelancer && freelancer.length > 0 ? (
                freelancer.map((bidder, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded mb-4 flex items-center justify-between">
                        <h2 className="text-xl text-white">Bidder Name: {bidder.name}</h2>
                        
                        {/* Message icon button */}
                        <button
                            className="text-orange-500 hover:text-orange-300 flex items-center"
                            onClick={() => handleMessageClick(bidder._id)} // Set selected user on click
                        >
                            <MessageIcon className="mr-2" />
                            <span>Message</span>
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-white">No bidders found.</p>
            )}
            
            {/* Conditionally render the Message component if a user is selected */}
            {selectedUser && <Message Id={selectedUser} />}
        </div>
    );
};

export default Allbidders;
