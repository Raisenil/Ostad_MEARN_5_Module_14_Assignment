import express from 'express';
import * as UserController from '../controller/UserController.js';
import * as TaskController from '../controller/TaskController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

// User Registration
router.post('/registration', UserController.registration);
// User login
router.post('/login', UserController.login);

// User auth by JWT token

// User profile read
router.get('/profileDetails', AuthMiddleware, UserController.profileDetails);
// User profile update
router.post('/profileUpdate', AuthMiddleware, UserController.profileUpdate);

// User otp send to email
router.get('/verifyEmail/:email', UserController.verifyEmail);
// User otp verify
router.get('/verifyOTP/:email/:otp', UserController.verifyOTP);

// User password reset based on otp
router.get('/passwordReset/:email/:otp/:password', UserController.passwordReset);

// Task api

// User to-do list create
router.post('/task/create', AuthMiddleware, TaskController.create);

// User to-do list read
router.get('/task/read', AuthMiddleware, TaskController.read);

// User to-do list update
router.post('/task/update/:id', AuthMiddleware, TaskController.update);

// User to-do list delete
router.get('/task/delete/:id', AuthMiddleware, TaskController.remove);

// User to-do list complete/cancel mark
router.get('/task/task_status/:id', AuthMiddleware, TaskController.task_status);

// User to-do list complete/cancel mark
router.get('/task/task_list', AuthMiddleware, TaskController.task_list);

export default router;
