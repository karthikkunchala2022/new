import React from 'react';
import bgImage from '../assets/cseiith2.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/70 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Welcome to Admin Module
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
          Manage tasks, assign responsibilities, and handle staff leave details — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/add-leave')}
            className="bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-100 px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
          >
            Add Leave
          </button>
          <button
            onClick={() => navigate('/create-task')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
