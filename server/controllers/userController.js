const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHadler = require('express-async-handler');
const User = require('../models/userModel');

// ! Register a new user
const registerUser = asyncHadler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please provide all required fields');
	}

	const user = await User.findOne({ email });
	if (user) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (newUser) {
		res.status(201).json({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser._id),
		});
	} else {
		res.status(400);
		throw new Error('User could not be created');
	}
});

// ! Login a user
const loginUser = asyncHadler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && bcrypt.compare(password, user.password)) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// ! Get a user
const getUser = asyncHadler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

// ! Generate a token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getUser,
};
