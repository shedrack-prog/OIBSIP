import React, { useEffect, useState } from 'react';
import CreateForm from '../components/admin/create';
import { getAllCheeses, getAllSauces, getAllVeggies } from '../actions/getData';

const CreatePizza = () => {
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [veggies, setVeggies] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      const res1 = await getAllCheeses();
      const res2 = await getAllSauces();
      const res3 = await getAllVeggies();

      setCheeses([...res1]);
      setSauces([...res2]);
      setVeggies([...res3]);
    };
    getAllData();
  }, []);

  return (
    <div>
      <CreateForm cheeses={cheeses} sauces={sauces} veggies={veggies} />
    </div>
  );
};

export default CreatePizza;
