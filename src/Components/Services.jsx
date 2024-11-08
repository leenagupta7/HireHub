import React from 'react';

const Services = ({ icon, heading, para }) => {
  return (
    <div className="bg-white-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105">
      <div className="text-orange-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{heading}</h3>
      <p className="text-gray-600 text-sm">{para}</p>
    </div>
  );
};

export default Services;
