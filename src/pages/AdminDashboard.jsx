import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
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
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          
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
      </div>
    </div>
  );
};

export default AdminDashboard;
