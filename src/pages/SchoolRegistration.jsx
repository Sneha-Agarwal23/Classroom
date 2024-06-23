import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const SchoolRegistration = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Menu Logo */}
      <button
        className={`fixed left-5 top-6 m-4 p-2 bg-gray-900 text-white rounded-full focus:outline-none z-10 ${isSliderOpen ? 'hidden' : ''}`}
        onClick={toggleSlider}
      >
        <span className="text-xl">| | |</span>
      </button>

      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${isSliderOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
          
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/admin/dashboard')
          }} >Home</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/admin/registration')
          }}>Admin Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/school/registration')
          }}>School Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/teacher/registration')
          }}>Teacher Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Admission Form</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/programenroll')
          }}>Program Enrollment</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Attendance</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Assessment</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Lesson Plan</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Children</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Reports</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">Accounts</button>

        </div>
      </div>

      <div
        className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isSliderOpen ? 'ml-64' : 'ml-0'}`}
        onClick={closeSlider}
      >
        <Navbar />
        <div className="mt-8">
          <h1 className="text-4xl font-semibold mb-6 text-center ">Montessori Registration</h1>
          <form className="grid grid-cols-2 gap-6 max-w-4xl mx-auto pt-10">
            <div>
              <label htmlFor="instituteName" className="block text-base font-medium text-gray-700 mb-1">Institution Name</label>
              <input type="text" id="instituteName" name="instituteName" className={inputField} />
            </div>
            <div>
              <label htmlFor="address" className="block text-base font-medium text-gray-700 mb-1">Address</label>
              <input type="text" id="address" name="address" className={inputField} />
            </div>
            <div>
              <label htmlFor="idno" className="block text-base font-medium text-gray-700 mb-1">Identification No</label>
              <input type="text" id="idno" name="idno" className={inputField} />
            </div>
            <div>
              <label htmlFor="pName" className="block text-base font-medium text-gray-700 mb-1">Principal's Name</label>
              <input type="text" id="pName" name="pName" className={inputField} />
            </div>
            <div>
              <label htmlFor="mobileNo" className="block text-base font-medium text-gray-700 mb-1">Mobile Number</label>
              <input type="text" id="mobileNo" name="mobileNo" className={inputField} />
            </div>
            
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputField = `border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`;

export default SchoolRegistration;
