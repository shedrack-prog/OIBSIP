import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { pizzaData } from '../data';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';

export const loader = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/get-current-user`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/login');
  }
};

const HomeLayout = () => {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    const fetchAllPizzas = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/pizzas`,
        {
          withCredentials: true,
        }
      );
      setPizzas(data);
    };
    fetchAllPizzas();
  }, []);

  console.log(pizzas);
  return (
    <div className=" ">
      <div className="">
        <div className="mt-[80px] w-[90%] flex items-center justify-center mx-auto ">
          <Header />
          <div className="w-full flex flex-wrap gap-[3rem] justify-center z-0">
            {pizzas.map((item) => {
              const {
                _id,
                name,
                description,
                price,
                veggies,
                image,
                sauce,
                cheese,
              } = item;

              return (
                <div key={_id} className="flex flex-col items-center">
                  <img
                    src={image}
                    alt="pizza image"
                    className="w-[220px] h-[220px] object-cover z-0 hover:scale-105 transition-all duration-200"
                  />
                  <div className="w-[70%]">
                    <h2 className="text-[20px] font-semibold ">{name}</h2>
                    <span className="text-gray-600 text-[14px]">
                      {description}
                    </span>
                    <div className="flex text-[18px] font-semibold mt-[10px] gap-[1px] mb-[1rem]">
                      $<p className="">{price}</p>
                    </div>
                    <Link
                      to={`/pizzas/${_id}`}
                      className="text-[15px] px-[20px] py-[8px] rounded-md font-medium bg-[#FFD2B3] text-gray-900"
                    >
                      Select
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
