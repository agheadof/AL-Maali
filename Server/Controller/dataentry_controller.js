const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const log = require('../Model/log')
const data_entry = require('../Model/data_entry')
const task = require('../Model/task')
const completed_tasks = require('../Model/completed_tasks')
const writer = require('../Model/writer')
const { registerSchema, loginSchema } = require('../validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

exports.dataentry_auth = (req, res) => {
	// Capture the input fields
	let email = req.body.email;
	let password = req.body.password;

	const { error } = loginSchema.validate(req.body)
	if (error) { return res.status(400).json(error.details[0].message) }


	// Ensure the input fields exists and are not empty
	if (email && password) {
		data_entry.findAll({ where: { email: email } })
			.then(data => {
				if (!data.length) {
					return res.status(400).send("Email is NOT correct, Are you registered ?")
				}
				bcrypt.compare(password, data[0].dataValues.password)
					.then(result => {
						// CREATE AND ASSIGN TOKEN 
						const token = jwt.sign(data[0].dataValues, process.env.JWT_SECRET_dataEntry);
						res.status(200).send(token);
					})

			})
			.catch(err => console.log(err))
	}
}



exports.dataentry_register = async (req, res) => {
	let full_name = req.body.full_name
	let email = req.body.email
	let password = req.body.password
	let phone = req.body.phone
	let admin = req.body.admin

	// Validating register input
	const { error } = registerSchema.validate(req.body)
	if (error) { return res.status(400).json(error.details[0].message) }

	// Hashing the password
	const sallt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, sallt)

	try {
		await data_entry.create({
			full_name: full_name,
			email: email,
			password: hashedPassword,
			phone: phone,
			Admin: admin
		})
		res.status(201).json({ message: 'Registered a new Data Entry successfully !!' })
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

//get de accounts
exports.get_de_acc = (req, res) => {
	data_entry.findAll().then(data => res.status(200).send(data)).catch(err => { console.log(err) })
}

//get writer accounts
exports.get_w_acc = (req, res) => {
	writer.findAll().then(data => res.status(200).send(data)).catch(err => { console.log(err) })
}

//destroy de accounts
exports.del_de_acc = (req, res) => {
	const deId = req.params.deId
	data_entry.destroy({ where: { id: deId } }).then(data => res.status(200).json({ data })).catch(err => { console.log(err) })
}

//destroy writer accounts
exports.del_w_acc = (req, res) => {
	const wId = req.params.wId
	writer.destroy({ where: { id: wId } })
	log.destroy({ where: { writerId: wId } })
		.then(data => res.status(200).json({ data })).catch(err => { console.log(err) })
}

exports.create_task = (req, res) => {

	let taskObject = {
		file: req.file.path,
		title: req.body.title,
		deadline: req.body.deadline,
		deadline_time: req.body.deadline_time,
		pages: req.body.pages,
		price: req.body.price,
		details: req.body.details,
		state: req.body.state,
		dataEntryId: req.DE_user.id,
		client: req.body.client
	}

	task.create(taskObject)
		.then(data => res.status(201).json(data))
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
}).single('file')

//get de tasks
exports.get_de_tasks = (req, res) => {
	let dataEntryId = req.DE_user.id
	task.findAll({ where: { dataEntryId: dataEntryId } })
		.then(data => res.status(201).json(data))
		.catch(err => console.log(err))
}

//get a single task
exports.get_single_task = (req, res) => {
	let dataEntryId = req.DE_user.id
	let taskId = req.params.taskId

	task.findAll({ where: { id: taskId, dataEntryId: dataEntryId } })
		.then(data => res.status(200).json({ data: data, message: "succeed !!" }))
		.catch(err => console.log(err))
}

//get task in review
exports.get_tasks_in_review = (req, res) => {
	let dataEntryId = req.DE_user.id

	task.findAll({ where: { dataEntryId: dataEntryId, state: 2 } })
		.then(data => {
			res.status(201).json(data)
		})
		.catch(err => console.log(err))
}

//needs modifying
exports.needs_modifying = (req, res) => {
	let taskId = req.body.taskId
	let note = req.body.note
	// state 3 needs modifying
	task.update({ state: 3, note: note }, { where: { id: taskId } })
		.then(data => res.status(201).json({ data: data, message: "task has been marked as 'needs to modify' !" }))
		.catch(err => console.log(err))
}

//mark as done
exports.mark_as_done = (req, res) => {
	let taskId = req.body.taskId
	let writerId = req.body.writerId
	let price = req.body.price
	let pages = req.body.pages
	let newBalance

	writer.findAll({ attributes: ['balance'] }, { where: { id: writerId } })
		.then(data => {
			newBalance = (parseFloat(price) * parseFloat(pages)) + parseFloat(data[0].balance)
			writer.update({ balance: newBalance }, { where: { id: writerId } })
		})
		// state = 4 => done
		.then(task.update({ state: 4 }, { where: { id: taskId } })
			.then(data => res.status(201).json({ data: data, message: "task has been marked as done !" }))
			.catch(err => console.log(err)))
}

//delete Task
exports.delete_task = async (req, res) => {
	let taskId = req.params.taskId
	let data = await task.findAll({ where: { id: taskId } })
	let data2 = await completed_tasks.findAll({ where: { taskId: taskId } })

	try {
		completed_tasks.destroy({ where: { taskId: taskId } })
		task.destroy({ where: { id: taskId } })
		if (data2[0]) {

			let compfilePath = path.basename(data2[0].dataValues.file_path)
			const secondFile = path.join(__dirname, '..', 'Files/', compfilePath)
			fs.unlinkSync(secondFile);
		}
		let docPath = path.basename(data[0].dataValues.file)
		const firstFile = path.join(__dirname, '..', 'Files/', docPath)

		fs.unlinkSync(firstFile);

		res.send("Delete File successfully.");
	} catch (error) {
		console.log(error);
	}
}

//edit task
// exports.edit_task = (req, res) => {
// 	const taskId = req.params
// 	let taskObject = {
// 		file: req.file.path,
// 		title: req.body.title,
// 		deadline: req.body.deadline,
// 		pages: req.body.pages,
// 		price: req.body.price,
// 		details: req.body.details,
// 		dataEntryId: req.DE_user.id
// 	}

// 	task.update(taskObject , {where:{id:taskId}})
// 		.then(res.status(201).json({ message: 'Task Edited Successfully !!' }))
// 		.catch(err => console.log(err))
// }

//download_comp_task
exports.download_comp_task = async (req, res) => {
	const taskId = req.params.taskId
	try {
		let data = await completed_tasks.findAll({ where: { taskId: taskId } })
		let fileName = path.basename(data[0].dataValues.file_path)
		const directoryPath = path.join(__dirname, '..', 'Files/')
		res.download(directoryPath + fileName, fileName)
	} catch (err) {
		console.log(err)
	}
}

exports.cash_out = async (req, res) => {
	const writerId = req.params.writerId
	const moveData = await task.findAll({ attributes: ['title', 'pages', 'price'], where: { writerId: writerId, state: 4 } })
	try {
		moveData.forEach(task => {
			logObj = {
				title: task.dataValues.title,
				pages: task.dataValues.pages,
				price: task.dataValues.price,
				writerId: writerId
			}
			log.create(logObj)
		});
		task.destroy({ where: { writerId: writerId, state: 4 } })
		writer.update({ balance: 0 }, { where: { id: writerId } })
			.then(data => res.status(200).send(data))
	}
	catch (err) { console.log(err) }
}

exports.get_w_log = (req, res) => {
	const writerId = req.params.writerId
	log.findAll({ where: { writerId: writerId } }).then(() => res.status(200)).catch(err => console.log(err))
}