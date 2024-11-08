import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="min-h-screen flex flex-col gap-20">
            <Navbar />
            <div className="flex flex-col items-center justify-center p-10 text-center">
                <h1 className="text-4xl font-bold mb-6 max-w-xl leading-tight">
                    Hire the best freelancers for any job, online
                </h1>
                <div className="mb-8 space-y-2 text-gray-300">
                    <span className="block">World's largest freelance marketplace</span>
                    <span className="block">Any job you can possibly think of</span>
                    <span className="block">Save up to 90% & get quotes for free</span>
                    <span className="block">Pay only when you're 100% happy</span>
                </div>
                <div className="flex gap-4">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
                        <Link to='detailproject'>Hire a Freelancer</Link>
                    </button>
                    <button className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-orange-400 hover:border-orange-400">
                       <Link to='findWork'>Earn Money Freelancing</Link> 
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Header;
