import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema(
	{
		email: { type:String, require:true },
		title: { type: String, require: true },
		description: { type: String, require: true },
		status: { type: String, require: true },
	},
	{
		timestamps: true,
		versionKey: false 
	}
);

const TasksModel = mongoose.model('tasks', TasksSchema);

export default TasksModel;
