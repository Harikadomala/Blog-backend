import User from '../../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const userSignup = async (req, res) => {
  try {
    console.log('Incoming signup data:', req.body); 

    const { name, username, password } = req.body;

    
    if (!name || !username || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ msg: 'Server error during signup' });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Generate tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      accessToken,
      refreshToken,
      name: user.name,
      username: user.username
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ msg: 'Server error during login' });
  }
};

