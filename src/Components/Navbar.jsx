import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="flex justify-between items-center p-4 ">
                <div className="flex gap-8">
                    <span className="font-bold text-lg">HireHub</span>
                    <span className="hidden md:flex hover:text-gray-400 cursor-pointer">Hire Freelancers</span>
                    <span className="hidden md:flex hover:text-gray-400 cursor-pointer">Find Work</span>
                    <span className="hidden md:flex hover:text-gray-400 cursor-pointer">Solutions</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to='/login'><span className="hover:text-gray-400 cursor-pointer">Log In</span></Link>
                    <Link to='/signup'><span className="hover:text-gray-400 cursor-pointer">Sign Up</span></Link>
                    <Link to='/detailproject'><button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Post a Project</button></Link>
                </div>
            </div>
            <hr/>
        </div>

    );
};

export default Navbar;
