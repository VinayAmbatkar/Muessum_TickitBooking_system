import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Museum Booking System" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Explore and book tickets to over 100 museums across the India. Discover cultural heritage and art collections in just a few clicks.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>EXPLORE</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Available Museums</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>CONTACT US</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-987-654-3210</li>
            <li>support@museumbookingsystem.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© 2024 MuseumBookingSystem.com - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
