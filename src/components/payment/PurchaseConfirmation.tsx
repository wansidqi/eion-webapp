import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PurchaseConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/payment')
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-center text-black">Purchase Confirmation</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md mt-4"
        onClick={handleButtonClick}
      >
        Go to Payment
      </button>
    </div>
  );
};
