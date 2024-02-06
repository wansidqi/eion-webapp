import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ReceivedCard: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/store');
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-center text-4xl font-bold text-black">Received Card Information and confirmation</h1>
      <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white" onClick={handleButtonClick}>
        Store
      </button>
    </div>
  );
};
