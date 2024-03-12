// Basic Lib Import

import express from 'express';
import mongoose from 'mongoose';
import router from './src/router/api.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

const app = express();

// Cors Origin implementation
app.use(cors());

//security Implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//Database connection Implementation
// local mongodb
// let URL = 'mongodb://127.0.0.1:27017/Task_Manager';

// MongoDB Atlas
let URL =
	'mongodb+srv://Raisenil:ujVbQzFsjGJtMIUX@cluster0.dl7nyx5.mongodb.net/Task_Manager';
let OPTION = { user: '', pass: '', autoIndex: true };
mongoose
	.connect(URL, OPTION)
	.then((res) => {
		console.log('DB Connected Successfully');
	})
	.catch((err) => {
		console.log(err);
	});

// Route Implementation
app.use('/api', router);

// 404 not found Implement
app.use('*', (req, res) => {
	res.status(404).json({ data: 'Not Found' });
});

export default app;
