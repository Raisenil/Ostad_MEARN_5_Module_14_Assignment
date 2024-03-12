import UsersModel from '../model/UsersModel.js';
import jwt from 'jsonwebtoken';

import EmailSend from '../utility/EmailSend.js';
import OTPModel from '../model/OTPModel.js';

// Controller for User

// Registration Functionality
export const registration = async (req, res) => {
	try {
		let reqBody = req.body;
		await UsersModel.create(reqBody);

		return res.json({ status: 'success', message: 'Registered successfully' });
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Login Functionality
export const login = async (req, res) => {
	try {
		let reqBody = req.body;
		let user = await UsersModel.find(reqBody);

		if (user.length > 0) {
			// JWT token
			let Payload = {
				exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
				data: reqBody['email'],
			};

			let token = jwt.sign(Payload, '123-xyz');

			res.json({ status: 'success', message: 'User Found', token: token });
		} else {
			return res.json({ status: 'fail', message: 'No User Found' });
		}

		// return res.json({ status: 'success', message: 'Logged in successfully' });
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Profile Detail Show
export const profileDetails = async (req, res) => {
	try {
		let email = req.headers['email'];

		let result = await UsersModel.find({ email: email });

		return res.json({
			status: 'success',
			message: 'Profile Data Retrieved successfully',
			data: result,
		});
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Profile Update
export const profileUpdate = async (req, res) => {
	try {
		let email = req.headers['email'];
		let reqBody = req.body;
		await UsersModel.updateOne({ email: email }, reqBody);
		return res.json({
			status: 'success',
			message: 'Profile Updated successfully',
		});
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Verify Mail OTP send
export const verifyEmail = async (req, res) => {
	try {
		const { email } = req.params;
		let user = await UsersModel.find({ email: email });

		if (user.length > 0) {
			let otp = Math.floor(100000 + Math.random() * 900000);

			EmailSend(email, `Your PIN =${otp}`, 'Task Manager OTP');

			await OTPModel.create({ email: email, otp: otp, status: 'active' });

			res.json({ status: 'success', message: 'otp send' });
		} else {
			res.json({ status: 'failed', message: 'No User found' });
		}
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Verify OTP
export const verifyOTP = async (req, res) => {
	try {
		const { email, otp } = req.params;

		let user = await OTPModel.find({
			email: email,
			otp: otp,
			status: 'active',
		});

		if (user.length > 0) {
			await OTPModel.updateOne(
				{ email: email, otp: otp },
				{ status: 'verified' }
			);
			res.json({ status: 'success', message: 'Code Verification Success' });
		} else {
			res.json({ status: 'fail', message: 'Invalid Code' });
		}
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// Password Reset
export const passwordReset = async (req, res) => {
	try {
		const { email, otp, password } = req.params;
		let user = await OTPModel.find({
			email: email,
			otp: otp,
			status: 'verified',
		});
		if (user.length > 0) {
			await OTPModel.deleteOne({ email: email, otp: otp });
			await UsersModel.updateOne({ email: email }, { password: password });
			res.json({ status: 'success', message: 'Password Update Success' });
		} else {
			res.json({ status: 'fail', message: 'Invalid Request' });
		}
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};
