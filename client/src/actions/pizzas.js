import axios from 'axios';

const createNewPizza = async ({
  name,
  price,
  description,
  newSauces,
  newCheeses,
  newVeggies,
  image,
}) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/pizzas`,
      {
        name: name,
        price: price,
        description: description,
        sauces: newSauces,
        cheeses: newCheeses,
        veggies: newVeggies,
        image: image,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createNewPizza };
