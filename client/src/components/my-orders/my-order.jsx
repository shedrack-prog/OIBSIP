import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../actions/getData';

const MyOrder = ({ visible }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log(orders);
  return (
    <div
      className={`absolute p-3 z-[99999] bg-[#fff] left-[0px] top-0 bottom-0 transition-all duration-300 shadow-md ${
        !visible && 'left-[-200px]  transition-all duration-300'
      } `}
    >
      <div className="">
        <h1 className="text-[26px] font-light">My Orders</h1>
        <div className=" flex flex-col gap-4 mt-[2rem]">
          {orders.length < 1 ? (
            <h1>You have not placed any order yet.</h1>
          ) : (
            orders.map((item) => (
              <div key={item._id} className="shadow-sm rounded-md flex gap-3 ">
                <span>
                  <img
                    src={item.productImage}
                    alt="Pizza image"
                    className="w-[120px]"
                  />
                </span>
                <div>
                  <p className="text-[18px] font-light ">{item.productName}</p>
                  <span className="text-[13px] font-extralight">
                    {item.description}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
