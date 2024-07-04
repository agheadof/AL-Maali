const express = require('express')
const app = express()
const path = require('path')
const sequelize = require('../DB/dbservice')
const writer = require('../Model/writer')
const task = require('../Model/task')
const multer = require('multer')
const completed_tasks = require('../Model/completed_tasks')
const { registerSchema, loginSchema } = require('../validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));


exports.writer_auth = (req, res) => {

	let email = req.body.email;
	let password = req.body.password;

	const { error } = loginSchema.validate(req.body)
	if (error) { return res.status(400).json(error.details[0].message) }

	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Check if email exists
		writer.findAll({ where: { email: email } })
			.then(data => {
				if (!data.length) {
					return res.status(400).send("Email is NOT correct, Are you registered ?")
				}
				bcrypt.compare(password, data[0].dataValues.password)
					.then(result => {
						// CREATE AND ASSIGN TOKEN 
						const token = jwt.sign(data[0].dataValues, process.env.JWT_SECRET);
						res.status(200).send(token);
					})

			})
			.catch(err => console.log(err))
	}
}


exports.writer_register = async (req, res) => {
	let full_name = req.body.full_name
	let email = req.body.email
	let password = req.body.password
	let phone = req.body.phone

	const { error } = registerSchema.validate(req.body)
	if (error) { return res.status(400).json(error.details[0].message) }

	// Hashing the password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	try {
		await writer.create({
			full_name: full_name,
			email: email,
			password: hashedPassword,
			phone: phone
		})
		res.status(201).json({ message: 'Registered As Writer successfully !!' })
	}
	catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			res.status(403)
			res.send({ status: 'error', message: "User already exists" });
		} else {
			res.status(500)
			res.send({ status: 'error', message: "Something went wrong" });
		}
	}
}

exports.submit_task = (req, res) => {
	const submitObject = {
		taskId: req.body.taskId,
		file_path: req.file.path
	}
	completed_tasks.create(submitObject)
	task.update({
		// state = 2 => Review
		state: 2
	}, { where: { id: submitObject.taskId } })
		.then(data => res.status(201).json({ data: data, message: "Your task is beeing reviewed" }))
		.catch(err => console.log(err))
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './Files')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

exports.upload = multer({
	storage: storage,
	limits: { fileSize: '100000000' },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|pdf|doc|docx|ppt|pptx|zip/
		const mimeType = fileTypes.test(file.mimetype)
		const extname = fileTypes.test(path.extname(file.originalname))

		if (mimeType && extname) {
			return cb(null, true)
		}
		cb('Give proper files formate to upload')
	}
}).single('file_path')

exports.do_task = (req, res) => {
	let writerId = req.user.id
	let taskId = req.params.taskId
	// state = 1 => taken
	task.update({ writerId: writerId, state: 1 }, { where: { id: taskId } })
		.then(data => res.status(201).send(data))
		.catch(err => console.log(err))
}

exports.writer_single_task = (req, res) => {
	let taskId = req.params.taskId

	task.findAll({ where: { id: taskId } })
		.then(data => {
			res.status(201).json(data)
		})
		.catch(err => console.log(err))
}

exports.get_available_tasks = (req, res) => {
	// state = 0 => available to take
	task.findAll({ where: { state: 0 } })
		.then(data => res.status(201).send(data))
		.catch(err => console.log(err))
}

exports.get_my_tasks = (req, res) => {
	const writerId = req.user.id
	task.findAll({ where: { writerId: writerId } })
		.then(data => res.status(201).send(data))
		.catch(err => console.log(err))
}

exports.download_docs = async (req, res) => {
	const taskId = req.params.taskId
	let data = await task.findAll({ where: { id: taskId } })
	let fileName = path.basename(data[0].dataValues.file)
	const directoryPath = path.join(__dirname, '..', 'Files/')
	res.download(directoryPath + fileName, fileName)

}

exports.writer_balance = (req, res) => {
	const writerId = req.user.id
	writer.findAll({attributes:['balance'], where: { id: writerId } }).then(data => {res.status(200).send(data)}).catch(err => {console.log(err)})
}
