import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignIn = (userType) => {
    navigate(`/signin/${userType.toLowerCase()}`);
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/photo.jpg')" }}
    >
      <div className="bg-gray-200 bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-black mb-8">Welcome to Montessori Classroom!</h1>
        <p className="text-lg text-black mb-8">Where every child learns, grows, and thrives.</p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button onClick={() => handleSignIn("Admin")} className="btn px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-700 text-lg text-white">Admin</button>
          <button onClick={() => handleSignIn("Teacher")} className="btn px-8 py-4 rounded-full bg-green-500 hover:bg-green-700 text-lg text-white">Teacher</button>
          <button onClick={() => handleSignIn("Parent/Guardian")} className="btn px-8 py-4 rounded-full bg-purple-500 hover:bg-purple-700 text-lg text-white">Parent/Guardian</button>
        </div>
        <p className="text-sm text-gray-600 mt-4">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>.</p>
      </div>
    </div>
  );
};

export default HomePage;
