import Sauce from '../model/SauceModel.js';
import Cheese from '../model/CheeseModel.js';
import Veggie from '../model/VeggiesModel.js';
import User from '../model/UserModel.js';
import Order from '../model/OrderModel.js';
import Pizza from '../model/PizzaModel.js';

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

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: 'user' });
    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate({ path: 'user', model: User, select: 'name email image' })
      .populate({
        path: 'products.product',
        model: Pizza,
        select: 'name image price',
      })
      .sort({ createdAt: -1 });
    if (allOrders.length < 1) {
      return res.status(404).json({ message: 'No orders found' });
    }

    let updatedOrders = allOrders.map((order) => {
      return {
        id: order?._id,
        userName: order?.user?.name,
        userEmail: order?.user?.email,
        productName: order?.products.map((product) => {
          return product.product.name;
        }),
        productImage: order?.products.map((product) => {
          return product.product.image;
        }),
        createdAt: order?.createdAt,
        updatedAt: order?.updatedAt,
        paid: order?.isPaid,
        address: order?.shippingAddress.address.line1,
        city: order?.shippingAddress.address.city,
        state: order?.shippingAddress.address.state,
        postalCode: order?.shippingAddress.address.postal_code,
        phone: order?.shippingAddress.address.phone,
        status: order?.status,
      };
    });
    return res.status(200).json(updatedOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const editOrderStatus = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: status,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: 'update successful' });
  } catch (error) {
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
  getAllUsers,
  getAllOrders,
  editOrderStatus,
};
