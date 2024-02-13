import React, { useEffect, useState } from 'react';
import AdminInput from '../components/admin/AdminInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAllSauces } from '../actions/getData';

const Sauces = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getAll() {
      const res = await getAllSauces();
      setData([...res]);
    }
    getAll();
  }, []);

  // create function handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/sauces`,
        {
          name,
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Sauce created successfully');
      setName('');
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-[2rem]">
      <h1 className="text-xl  font-medium mb-[10px] ">Create Sauce</h1>
      <div className="flex gap-[1rem]">
        <AdminInput
          type="text"
          name={name}
          value={name}
          placeholder={'Sauce name'}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={(e) => handleSubmit(e)}
          className="text-[14px] bg-blue-500 w-[120px] rounded-md px-[14px] py-[8px]"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create'}
        </button>
      </div>
      <div className="mt-[2.5rem]">
        <h1 className="text-2xl text-gray-900 font-semibold mb-[20px] ">
          Available Sauces({data.length})
        </h1>
        <div className="flex flex-col gap-y-[10px] ">
          {data?.map((item, index) => (
            <p
              className="text-[14px] flex gap-[5px] text-gray-600"
              key={item._id}
            >
              <span className="font-medium text-gray-900">{index + 1}.</span>
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sauces;
