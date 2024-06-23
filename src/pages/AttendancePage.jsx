import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AttendancePage = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  // Sample array of student names (Consider fetching from database)
  const students = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Emma Brown', 'Alex Karev', 'Meredith Grey' , 'Monica Geller', 'Chandler Bing', 'Ross Geller', 'Rachel Green'];

  // Generate options for classes (Consider fetching from database)
  const classOptions = ['Pre-Mont/Toddlers', 'Montessori 1/Nursery', 'Montessori 2/LKG', 'Montessori 3/UKG'];

  // Generate options for months
  const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Generate options for years
  const yearOptions = ['2022', '2023', '2024', '2025'];

  return (
    <div className="flex h-screen">
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
      <div className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isSliderOpen ? 'ml-64' : 'ml-0'}`} onClick={closeSlider}>
        <Navbar />
        <div className="mt-8 w-full pr-5 overflow-auto">
          <h1 className="text-4xl font-semibold mb-6 text-center">Attendance</h1>
                    {/* Dropdowns for class, month, and year */}
                    <div className="flex justify-center mb-6">
            <div className="w-[300px]">
              <label htmlFor="classSelect" className="block text-lg font-semibold mb-2">Select Class:</label>
              <select id="classSelect" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="">Select Class</option>
                {classOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="w-[300px]">
              <label htmlFor="monthSelect" className="block text-lg font-semibold mb-2">Select Month:</label>
              <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="">Select Month</option>
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="w-[300px]">
              <label htmlFor="yearSelect" className="block text-lg font-semibold mb-2">Select Year:</label>
              <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="">Select Year</option>
                {yearOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendance Table (Proper Spacing, Scrolling) */}
          <div className="overflow-x-auto overflow-y-auto w-full lg:w-[1480px] rounded-md shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th scope="col" className="px-4 py-2 text-left text-lg font-semibold min-w-[150px] border border-gray-300">Student Name</th> {/* Set min-width for student name column */}
                  {/* Dynamically generate columns for each date in the month */}
                  {[...Array(31)].map((_, index) => (
                    <th scope="col" key={index} className="px-4 py-2 text-left text-lg font-semibold border border-gray-300">{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Dynamically generate rows for each student */}
                {students.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="px-4 py-2 border border-gray-300">{student}</td>
                    {/* Dynamically generate cells for each date in the month */}
                    {[...Array(31)].map((_, index) => (
                      <td key={index} className="px-4 py-2 text-center border border-gray-300">
                        <input type="checkbox" className="attendance-checkbox" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
            <button type="submit" className="btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// You can add custom styling classes for the table and checkboxes here
const attendanceCheckbox = `
  appearance-none w-4 h-4 border border-gray-300 rounded-full bg-white checked:bg-green-500 focus:outline-none
`;

// Add a class for the primary button
const btnPrimary = `
  bg-indigo-500 text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hover:bg-indigo-700 transition duration-300 ease-in-out
`;

export default AttendancePage;

