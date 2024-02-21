import axios from 'axios';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ClipLoader, ScaleLoader } from 'react-spinners';
const TableActions = ({
  params,
  rowId,
  setRowId,
  dbStatus,
  setLoading,
  loading,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleStatusChange = async (e) => {
    setLoading(true);
    setSelectedOption(e.target.value);
    const orderId = params.id;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/orders/${orderId}`,
        {
          status: e.target.value,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   console.log(selectedOption);
  const status = [
    {
      name: 'Dispatched',
      value: 'Dispatched',
    },
    {
      name: 'Not Processed',
      value: 'Not Processed',
    },
    {
      name: 'In the Kitchen',
      value: 'In the Kitchen',
    },
    {
      name: 'Delivered',
      value: 'Delivered',
    },
    {
      name: 'Canceled',
      value: 'Canceled',
    },
  ];
  return (
    <div>
      {loading ? (
        <ClipLoader color="#36d7b7" size={'24px'} />
      ) : (
        <select
          className=""
          defaultValue={dbStatus}
          onChange={handleStatusChange}
        >
          {status.map((stat, index) => (
            <>
              <option key={index} className="w-full h-full" value={stat.value}>
                {stat.name}
              </option>
              <IoIosArrowDown size={25} />
            </>
          ))}
        </select>
      )}
    </div>
  );
};

export default TableActions;
