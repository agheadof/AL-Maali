const express = require('express')
const { verify } = require('jsonwebtoken')
const route = express()
const dataentry_controller = require('../Controller/dataentry_controller')
const { DE_auth } = require('../authintication')


route.use(express.json())


route.post('/dataentry_auth', dataentry_controller.dataentry_auth)


route.post('/dataentry_register', dataentry_controller.dataentry_register)

route.get('/get_de_acc', DE_auth, dataentry_controller.get_de_acc)

route.get('/get_w_acc', DE_auth, dataentry_controller.get_w_acc)

route.delete('/del_de_acc/:deId', DE_auth, dataentry_controller.del_de_acc)

route.delete('/del_w_acc/:wId', DE_auth, dataentry_controller.del_w_acc)


route.post('/create_task', DE_auth, dataentry_controller.upload, dataentry_controller.create_task)

route.get('/get_tasks_in_review', DE_auth, dataentry_controller.get_tasks_in_review)

route.get('/get_de_tasks', DE_auth, dataentry_controller.get_de_tasks)

route.get('/get_single_task/:taskId', DE_auth, dataentry_controller.get_single_task)

route.patch('/needs_modifying', DE_auth, dataentry_controller.needs_modifying)

route.patch('/mark_as_done', DE_auth, dataentry_controller.mark_as_done)

route.delete('/delete_task/:taskId', DE_auth, dataentry_controller.delete_task)

// route.patch('/edit_task/:taskId', DE_auth, dataentry_controller.upload, dataentry_controller.edit_task)

route.get('/download_comp_task/:taskId', DE_auth, dataentry_controller.download_comp_task)

route.get('/get_w_log/:writerId', DE_auth, dataentry_controller.get_w_log)


route.post('/cash_out/:writerId', DE_auth, dataentry_controller.cash_out)



module.exports = route