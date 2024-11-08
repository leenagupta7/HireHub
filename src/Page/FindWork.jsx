import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FindWork = () => {
    const [data, setData] = useState([]); // Array to store fetched data
    const [loading, setLoading] = useState(true); // Loading state to show loader while fetching data
    const [error, setError] = useState(null); // Error state for any request failure
    const navigate = useNavigate();
    // Fetch data from server on component mount
    useEffect(() => {
        axios.get('http://localhost:4000/api/users/getproject') // Replace with your actual API endpoint
            .then((response) => {
                console.log(response.data);
                setData(response.data.projects); // Store fetched data in state
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((err) => {
                setError('Error fetching data'); // Set error if request fails
                setLoading(false);
            });
    }, []);

const handleSubmit = async (clientid, id, freelancer) => {
    const userid = localStorage.getItem('Id');
    // Check if the client is trying to bid on their own project
    if (clientid === userid) {
        Swal.fire({
            title: 'Error!',
            text: 'You must not bid on your own project',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return;
    }

    try {
        // Send the bid request to the server
        const response = await axios.post(`http://localhost:4000/api/users/placebid/${userid}`, {
            clientid,
            id,
        });

        console.log('Bid placed successfully:', response);
        
        // Navigate to the 'allbidder' page with the freelancer data in state
        navigate('/allbidder', { state: { freelancer:response.data.project.freelancer } });
    } catch (error) {
        // Handle any error that occurs during the API call
        console.error('Error placing bid:', error);
        
        // Display an error alert
        Swal.fire({
            title: 'Error!',
            text: 'There was an issue placing your bid. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};

    // Render UI
    return (
        <div className="bg-black min-h-screen container mx-auto p-8">
            <h1 className="text-4xl font-semibold text-center text-orange-500 mb-12">Find Work</h1>

            {loading && <p className="text-center text-xl text-orange-500">Loading...</p>} {/* Show loading text until data is fetched */}
            {error && <p className="text-center text-xl text-orange-500">{error}</p>} {/* Display error message if any */}

            {/* Check if data is available */}
            {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                                <h2 className="text-2xl font-semibold text-orange-500">{item.title || 'Work Title'}</h2>
                                <p className="text-lg text-gray-200">{item.description || 'Dummy description for work'}</p>
                            </div>

                            {/* Skills Bubble */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.skills && item.skills.length > 0 ? (
                                    item.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-orange-500 text-white py-1 px-4 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-300">No skills listed</span>
                                )}
                            </div>

                            {/* File download button */}
                            <div className="flex justify-between items-center">
                                {item.filePath && (
                                    <div>
                                        {/* Download Button */}
                                        <a
                                            href={item.filePath}
                                            download={item.fileName || 'file'} // Provide a default name for the file if it's not specified in the API
                                            className="inline-block mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-orange-400"
                                        >
                                            Attach File
                                        </a>
                                    </div>
                                )}

                                {/* Place Bid Button */}
                                <button onClick={() => handleSubmit(item.client_id, item.id,item.freelancer)} className="text-white border-2 border-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
                                    Place Bid
                                </button>
                            </div>


                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-300">No work available</p>
            )}
        </div>
    );
};

export default FindWork;
