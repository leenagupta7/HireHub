import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="min-h-screen flex flex-col gap-20 relative bg-black overflow-hidden">
      {/* Gradient Circle */}
      <div className="absolute inset-0 flex justify-center items-center -mt-48">
        <div
          className="w-[700px] h-[700px] rounded-full -z-1 "
          style={{
            background:
              "linear-gradient(30deg, #fd5800 1%, black 50%, #fd5800 150%)",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="pt-48 flex flex-col items-center justify-center p-10 text-center relative z-10">
        <h4 className="text-7xl mb-6 max-w-6xl text-white font-montserrat">
          Hire the <span className="text-[#e55b00]">best</span> freelancers for
          any job <span className="text-[#e55b00]">online</span>
        </h4>

        <div className="mb-8 space-y-4 text-gray-300 max-w-3xl text-xl">
          <p>
            With freelancers from all over the world, you have the freedom to choose
            who you work with, and you only pay when you’re 100% satisfied with the
            work done. Hire the right talent today and see the difference they can make.
          </p>
        </div>

        <div className="flex gap-8">
          {/* First Button */}
          <button className="border-2 m-4 border-white text-white text-lg px-8 py-4 rounded-md hover:bg-orange-600 hover:border-orange-600 font-bold">
            <Link to="detailproject">Hire a Freelancer</Link>
          </button>

          {/* Second Button with matching color as "best" */}
          <button className="bg-[#e55b00] m-4 border-orange-600 border-2 text-white text-lg px-8 py-4 rounded-md hover:bg-transparent hover:border-white hover:border-2 font-bold">
            <Link to="findWork">Earn Money Freelancing</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
