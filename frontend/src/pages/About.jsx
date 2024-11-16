import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About Museum" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to the Museum Booking System, your trusted platform for discovering and booking visits to museums across the country. We understand the importance of culture and history, and our mission is to make exploring museums easier and more accessible to everyone.</p>
          <p>Our platform is designed to help you find the perfect museum for your interests, schedule your visits effortlessly, and manage your bookings seamlessly. Whether you're a history enthusiast or just looking for a fun day out, we're here to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>We aim to bridge the gap between museums and visitors, creating a seamless experience for museum lovers. Our goal is to inspire more people to engage with history, culture, and art by making museum visits more convenient and enjoyable.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined museum visit scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access a network of museums, with easy booking at your fingertips.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations based on your museum preferences and past visits.</p>
        </div>
      </div>

    </div>
  )
}

export default About
