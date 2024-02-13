import User from '../model/UserModel.js';

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      '-password'
    );

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
};

export { getCurrentUser };
