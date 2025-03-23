import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col min-h-[100vh]'>
      <Header/>
      <div className=" w-[75%] m-auto mt-20">
        <div className=" flex-1">
             <h1 className='text-6xl font-bold'>Welcome To The Blog Brew</h1>
             <h2 className='text-xl mt-5 font-medium '>The Blog Brew: Exploring webTech, Space,Science Frontiers and Bizare Facts </h2>
             <p className='text-gray-500 mt-4'>"Welcome to the Web Universe, where programming prowess meets cosmic curiosity. Dive into cutting-edge insights across Bizare Facts, programming, space exploration, computer science, and web development, unlocking the frontiers of innovation"</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
