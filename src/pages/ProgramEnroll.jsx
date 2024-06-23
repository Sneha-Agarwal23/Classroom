import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ProgramEnroll = () => {
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
            navigate('/admin/admin-registration')
          }}>Admin Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/admin/school-registration')
          }}>School Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => {
            navigate('/programenroll')
          }}>Program Enrollment</button>

        </div>
      </div>

      <div
        className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isSliderOpen ? 'ml-64' : 'ml-0'}`}
        onClick={closeSlider}
      >
        <Navbar />
        <div className="mt-8">
          <h1 className="text-4xl font-semibold mb-6 text-center">Program Enrollment</h1>
          <form className="grid grid-cols-2 gap-6 max-w-4xl mx-auto pt-5">
            <div>
              <label htmlFor="childName" className="block text-base font-medium text-gray-700 mb-1">Child Name</label>
              <input type="text" id="childName" name="childName" className={inputField} />
            </div>
            <div>
              <label htmlFor="admissionNumber" className="block text-base font-medium text-gray-700 mb-1">Admission Number</label>
              <input type="text" id="admissionNumber" name="admissionNumber" className={inputField} />
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input id="preMont" name="programType" type="radio" value="Pre-Mont/Toddlers/Playgroup" className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded" />
                <label htmlFor="preMont" className="ml-2 block text-base text-gray-900">
                  Pre-Mont/Toddlers/Playgroup
                  <span className="text-base text-gray-500 block">(1.8 Years Onwards)</span>
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input id="mont1" name="programType" type="radio" value="Montessori 1/Nursery" className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded" />
                <label htmlFor="mont1" className="ml-2 block text-base text-gray-900">
                  Montessori 1/Nursery
                  <span className="text-base text-gray-500 block">(2.5 Years Onwards)</span>
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input id="mont2" name="programType" type="radio" value="Montessori 2/LKG" className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded" />
                <label htmlFor="mont2" className="ml-2 block text-base text-gray-900">
                  Montessori 2/LKG
                  <span className="text-base text-gray-500 block">(3.5 Years Onwards)</span>
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input id="mont3" name="programType" type="radio" value="Montessori 3/UKG" className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded" />
                <label htmlFor="mont3" className="ml-2 block text-base text-gray-900">
                  Montessori 3/UKG
                  <span className="text-base text-gray-500 block">(4.5 Years Onwards)</span>
                </label>
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Enroll</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputField = `border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`;

export default ProgramEnroll;
