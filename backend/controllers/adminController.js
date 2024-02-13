import Sauce from '../model/SauceModel.js';
import Cheese from '../model/CheeseModel.js';
import Veggie from '../model/VeggiesModel.js';

// Sauce Controller
const createSauce = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'Please enter a name for the sauce',
    });
  }

  try {
    const sauce = await Sauce.findOne({ name });

    if (sauce) {
      return res.status(400).json({ message: 'Sauce name already exist' });
    }

    await new Sauce({ name }).save();

    return res.status(201).json({ message: 'Sauce created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const getAllSauces = async (req, res) => {
  try {
    const sauces = await Sauce.find();
    return res.status(200).json(sauces);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// Cheese Controller

const createCheese = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'Please enter a name for the cheese',
    });
  }

  try {
    const cheese = await Cheese.findOne({ name });

    if (cheese) {
      return res.status(400).json({ message: 'Cheese name already exist' });
    }
    await new Cheese({ name }).save();

    return res.status(201).json({ message: 'Cheese created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const getAllCheese = async (req, res) => {
  try {
    const allCheese = await Cheese.find({});
    return res.status(200).json(allCheese);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// Veggies Controller

const createVeggie = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'Please enter a name for the Vegetable',
    });
  }
  try {
    const veggie = await Veggie.findOne({ name });

    if (veggie) {
      return res.status(400).json({ message: 'Veggie name already exists' });
    }

    await new Veggie({ name }).save();

    return res.status(201).json({ message: 'Veggie created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const getAllVeggies = async (req, res) => {
  try {
    const allVeggies = await Veggie.find({});
    return res.status(200).json(allVeggies);
  } catch (error) {
    1;
    return res.status(500).json({ message: error });
  }
};

export {
  createSauce,
  getAllSauces,
  getAllCheese,
  getAllVeggies,
  createCheese,
  createVeggie,
};
