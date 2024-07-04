const express = require('express')
const route = express()
const writer_controller = require('../Controller/writer_controller')
const { wr_auth } = require('../authintication')

route.use(express.json())


route.post('/writer_auth', writer_controller.writer_auth)

route.post('/writer_register', writer_controller.writer_register)

route.post('/submit_task', wr_auth, writer_controller.upload, writer_controller.submit_task)

route.patch('/do_task/:taskId', wr_auth, writer_controller.do_task)

route.get('/writer_single_task/:taskId', wr_auth, writer_controller.writer_single_task)

route.get('/get_available_tasks', wr_auth, writer_controller.get_available_tasks)
// route.get('/get_available_tasks', wr_auth, writer_controller.get_available_tasks)

route.get('/download_docs/:taskId' , wr_auth , writer_controller.download_docs)

route.get('/get_my_tasks', wr_auth, writer_controller.get_my_tasks)

route.get('/writer_balance', wr_auth , writer_controller.writer_balance)



module.exports = route