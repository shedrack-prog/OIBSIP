import { BadRequestError } from '../errors/customError.js';
import { sendVerificationEmail } from '../helpers/mailer.js';
import { createToken } from '../helpers/tokens.js';
import { validateEmail, validateLength } from '../helpers/validations.js';
import User from '../model/UserModel.js';
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isFirstUser = (await User.countDocuments()) === 0;
  let role = isFirstUser ? 'admin' : 'user';
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please enter a name, email and password',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address',
      });
    }
    const userAlreadyRegistered = await User.findOne({ email });
    if (userAlreadyRegistered) {
      return res.status(400).json({
        message: 'User already exist with this email address',
      });
    }

    if (!validateLength(name, 3, 50)) {
      return res.status(400).json({
        message: 'name length must be between 3 and 50 characters',
      });
    }
    if (!validateLength(password, 5, 50)) {
      ('Password length must be between 5 and 50 characters');
      return res.status(400).json({
        message: 'Password length must be between 5 and 50 characters',
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    }).save();

    const emailVerificationToken = createToken({ id: newUser._id }, '5d');
    const url = `${process.env.FRONTEND_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(newUser.email, newUser.name, url);

    const token = createToken(
      { userId: newUser._id, role: newUser.role },
      '7d'
    );

    return res.status(201).json({
      message:
        'Account created! check your email to activate and continue. The verification link will expire in five(5) days.',
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error });
  }
};
// Login Functionality

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password.' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No account found with email provided.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const token = createToken({ userId: user._id, role: user.role }, '7d');
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + oneDay),
    });
    return res.status(200).json({
      message: 'Login successful.',
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error });
  }
};

const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({
    message: 'Logout successful.',
  });
};
export { registerUser, loginUser, logout };
