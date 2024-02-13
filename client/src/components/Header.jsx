import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className=" flex items-center justify-center h-[60px] shadow-md
    fixed z-[9999] top-0 right-0 left-0 bg-white"
    >
      <div className="flex justify-between items-center px-[20px] w-[80%]">
        <h2 className="text-[#FF6900] text-[30px] font-bold ">Shaggy Pizza</h2>
        <div className="flex items-center font-light gap-x-[4rem]">
          <Link
            to={'/admin/dashboard'}
            className="text-[#FF6900] text-[18px] font-semibold"
          >
            Admin
          </Link>
          <button
            className="bg-[#FF6900] text-white text-[16px]
          px-[13px] py-[8px] font-semibold rounded-full text-center"
          >
            My order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;