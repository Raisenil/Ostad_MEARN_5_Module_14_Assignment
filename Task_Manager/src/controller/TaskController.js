import TasksModel from '../model/TasksModel.js';

// task create
export const create = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];
		let reqBody = req.body;
		reqBody.email = email;

		await TasksModel.create(reqBody);

		return res.json({ status: 'success', message: 'Task Create successfully' });
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// task read
export const read = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];
		let data = await TasksModel.find({ email: email });

		return res.json({
			status: 'success',
			message: 'Task Data Retrieved successfully',
			data: data,
		});
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// task update
export const update = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];
		let { id } = req.params;
		let reqBody = req.body;

		await TasksModel.updateOne({ _id: id, email: email }, reqBody);

		return res.json({ status: 'success', message: 'Task Update successfully' });
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// task delete
export const remove = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];
		let { id } = req.params;

		await TasksModel.deleteOne({ _id: id, email: email });

		return res.json({
			status: 'success',
			message: 'Task Deleted successfully',
		});
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// task complete/cancel mark
export const task_status = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];
		let { id } = req.params;

		let result = await TasksModel.find({ _id: id, email: email });

		if (result.length > 0) {
			if (result[0].status.toLowerCase() === 'complete') {
				await TasksModel.updateOne(
					{ email: email, _id: id },
					{ status: 'cancel' }
				);
				return res.json({ status: 'success', message: 'Task Canceled' });
			} else if (
				result[0].status.toLowerCase() === 'new' ||
				result[0].status.toLowerCase() === 'cancel'
			) {
				await TasksModel.updateOne(
					{ email: email, _id: id },
					{ status: 'complete' }
				);

				return res.json({ status: 'success', message: 'Task completed' });
			} else {
				await TasksModel.updateOne(
					{ email: email, _id: id },
					{ status: 'new' }
				);
				return res.json({
					status: 'fail',
					message: 'Changed the Status to New',
				});
			}
		} else {
			res.json({ status: 'fail', message: 'Invalid Request' });
		}
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};

// task complete/cancel list
export const task_list = async (req, res) => {
	try {
		// Your Code Here

		let email = req.headers['email'];

		let new_tasks = await TasksModel.find({
			email: email,
			status: { $regex: 'new', $options: 'i' },
		});

		let complete_tasks = await TasksModel.find({
			email: email,
			status: { $regex: 'complete', $options: 'i' },
		});

		let cancel_tasks = await TasksModel.find({
			email: email,
			status: { $regex: 'cancel', $options: 'i' },
		});

		return res.json({
			tasks: {
				new: { 
					task_status: 'new', 
					count: new_tasks.length, 
					data: new_tasks
				},
				complete: {
					task_status: 'complete',
					count: complete_tasks.length,
					data: complete_tasks
				},
				cancel: {
					task_status: 'cancel',
					count: cancel_tasks.length,
					data: cancel_tasks
				},
			},
		});
	} catch (error) {
		return res.json({ error: error.message || 'Internal Server Error' });
	}
};
