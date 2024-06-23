import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

const StudentList = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  // Sample array of student data
  const studentData = [
    { id: 1, name: 'John Doe', class: 'Class 1' },
    { id: 2, name: 'Alice Smith', class: 'Class 2' },
    { id: 3, name: 'Bob Johnson', class: 'Class 1' },
    { id: 4, name: 'Emma Brown', class: 'Class 2' },
    { id: 5, name: 'Sarah Williams', class: 'Class 1' },
    { id: 6, name: 'Michael Davis', class: 'Class 3' },
    { id: 7, name: 'Olivia Wilson', class: 'Class 3' },
  ];

  // Generate options for classes
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4'];

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Menu Logo */}
      <button
        className={`fixed left-5 top-6 m-4 p-2 bg-gray-900 text-white rounded-full focus:outline-none z-10 ${isSliderOpen ? 'hidden' : ''}`}
        onClick={toggleSlider}
      >
        <span className="text-xl">| | |</span>
      </button>

      {/* Slider */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${isSliderOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          {/* Slider buttons */}
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/dashboard')}>Home</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/admin-registration')}>Admin Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/school-registration')}>School Registration</button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isSliderOpen ? 'ml-64' : 'ml-0'}`}
         onClick={closeSlider}>
        <Navbar />
        <div className="mt-8 w-full">
          <h1 className="text-4xl font-semibold mb-6 text-center">Student List</h1>
          {/* Dropdown for selecting class */}
          <div className="mb-6">
            <label htmlFor="classSelect" className="block text-lg font-semibold">Select Class:</label>
            <select id="classSelect" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="input-field">
              <option value="">All Classes</option>
              {classOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          {/* Student List Table */}
          <div className="overflow-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 py-2 px-4 text-lg font-semibold">ID</th>
                  <th className="border border-gray-300 py-2 px-4 text-lg font-semibold">Name</th>
                  <th className="border border-gray-300 py-2 px-4 text-lg font-semibold">Class</th>
                </tr>
              </thead>
              <tbody>
                {/* Render student data */}
                {studentData.filter(student => selectedClass === '' || student.class === selectedClass).map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="border border-gray-300 py-2 px-4 text-lg">{student.id}</td>
                    <td className="border border-gray-300 py-2 px-4 text-lg">
                      <Link to={`/student/${student.id}`}>{student.name}</Link>
                    </td>
                    <td className="border border-gray-300 py-2 px-4 text-lg">{student.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
