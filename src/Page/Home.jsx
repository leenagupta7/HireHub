import React, { useEffect } from "react";
import Header from "../Components/Header";
import Provide from "../Components/Provide";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="bg-black text-white relative">
      
      {/* Header */}
      <Navbar/>
      <Header />
      <div className="p-8">
        <Provide />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
