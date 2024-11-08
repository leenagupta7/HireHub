import React from 'react'
import Header from '../Components/Header'
import Provide from '../Components/Provide'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className="bg-black text-white">
      <Header/>
     <div className="p-8">
     <Provide/>
     <Footer/>
     </div>
    </div>
  )
}

export default Home
