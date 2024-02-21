import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex items-center flex-col ">
        <h1 className="text-[36px] text-gray-900 font-medium">
          Checkout Success
        </h1>
        <span className="text-[18px]">You purchase was successful...</span>
        <p>Your order is being processed.</p>
        <span>Thank you for your purchase</span>
        <Link
          to={'/home'}
          className="text-[16px] text-gray-900 px-[12px] py-[8px] bg-blue-300 mt-[1rem] rounded-md"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
