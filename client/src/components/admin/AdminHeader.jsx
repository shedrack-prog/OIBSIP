import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div
      className=" flex items-center justify-center h-[60px] shadow-sm
    fixed  top-0 right-0 left-[300px] z-[9999] bg-white"
    >
      <div className="flex justify-between items-center px-[20px] w-[98%]">
        <h2 className="text-[#FF6900] text-[30px] font-bold ">X</h2>
        <div className="flex items-center font-light gap-x-[4rem]">
          <Link to={'/'} className="text-[#FF6900] text-[18px] font-semibold">
            Exit
          </Link>
          <button
            className="bg-[#FF6900] text-white text-[16px]
          px-[13px] py-[8px] font-semibold rounded-full text-center"
          >
            Welcome
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
