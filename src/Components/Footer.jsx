import React from 'react';
import Footercomponent from './Footercomponent';

const Footer = () => {
  return (
    <div className="md:pt-24 md:px-2 lg:px-32">
      <div className="bg-orange-500 p-12 bg-custom-gradient md:px-2 md:py-24 flex flex-col items-center space-y-8 rounded-2xl">
        <span className="text-white text-4xl lg:text-6xl">
          You can grow faster than you think!
        </span>
        <p className="text-white lg:text-2xl text-center pb-8">
          Partner with HireHub to meet today's demand and tomorrow's aspirations. We empower brands of all sizes with the strategies and tools used by global leaders to scale and succeed.
        </p>
        <button className="rounded-full text-3xl bg-black text-white font-bold py-3 px-6 hover:bg-white hover:text-black hover:border border-black">
          Get started with HireHub
        </button>
      </div>
      <Footercomponent />
    </div>
  );
};

export default Footer;
