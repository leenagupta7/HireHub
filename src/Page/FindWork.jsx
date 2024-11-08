import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FindWork = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bidAmount, setBidAmount] = useState(0);
    const [showBidModal, setShowBidModal] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const navigate = useNavigate();
    const userid = localStorage.getItem('Id'); // Get user ID from local storage

    useEffect(() => {
        axios.get('http://localhost:4000/api/users/getproject')
            .then((response) => {
                console.log(response.data);
                setData(response.data.projects);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    const handleBidClick = (project) => {
        // Check if user has already placed a bid on this project
        const hasBid = project.freelancer && project.freelancer.some(freelancer => freelancer.freelancerId === userid);

        if (hasBid) {
            Swal.fire({
                title: 'Already Bid',
                text: 'You have already placed a bid on this project.',
                icon: 'info',
                confirmButtonText: 'OK',
            });
            navigate('/allbidder', { state: { freelancer: response.data.project.freelancer, clientid: client_id } });
        } else {
            setCurrentProject(project); // Set the current project for bid
            setShowBidModal(true); // Show the bid modal
        }
    };

    const handleBidSubmit = async () => {
        const { client_id, id } = currentProject;

        // Check if the client is trying to bid on their own project
        if (client_id === userid) {
            Swal.fire({
                title: 'Error!',
                text: 'You cannot bid on your own project.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setShowBidModal(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/api/users/placebid/${userid}`, {
                clientid: client_id,
                id,
                bidAmount,
            });

            console.log('Bid placed successfully:', response);
            setShowBidModal(false);

            navigate('/allbidder', { state: { freelancer: response.data.project.freelancer, clientid: client_id } });
        } catch (error) {
            console.error('Error placing bid:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue placing your bid. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setShowBidModal(false);
        }
    };

    return (
        <div className="bg-black min-h-screen container mx-auto p-8">
            <h1 className="text-4xl font-semibold text-center text-orange-500 mb-12">Find Work</h1>

            {loading && <p className="text-center text-xl text-orange-500">Loading...</p>}
            {error && <p className="text-center text-xl text-orange-500">{error}</p>}

            {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                                <h2 className="text-2xl font-semibold text-orange-500">{item.title || 'Work Title'}</h2>
                                <p className="text-lg text-gray-200">{item.description || 'Dummy description for work'}</p>
                            </div>

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

                            <div className="flex justify-between items-center">
                                {item.filePath && (
                                    <a
                                        href={item.filePath}
                                        download={item.fileName || 'file'}
                                        className="inline-block mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-orange-400"
                                    >
                                        Attach File
                                    </a>
                                )}
                                <button onClick={() => handleBidClick(item)} className="text-white border-2 border-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-300">No work available</p>
            )}

            {showBidModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl mb-4">Enter Your Bid Amount</h2>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Bid Amount"
                        />
                        <button onClick={handleBidSubmit} className="bg-orange-500 text-white py-2 px-6 rounded font-semibold hover:bg-orange-400 mr-2">
                            Submit Bid
                        </button>
                        <button onClick={() => setShowBidModal(false)} className="py-2 px-6 border border-gray-300 rounded font-semibold hover:bg-gray-100">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindWork;
