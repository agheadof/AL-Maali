// importing packages
const express = require('express');
const app = express();
const sequelize = require('./DB/dbservice')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


// importing models
const data_entry = require('./Model/data_entry')
const task = require('./Model/task')
const log = require('./Model/log')
const writer = require('./Model/writer')
const completed_tasks = require('./Model/completed_tasks')

// importing Routs
const writer_routs = require('./Routers/writer_router')
const dataentry_routs = require('./Routers/dataentry_router')


// correcting cors errors 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});
dotenv.config();

// using controllers
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(dataentry_routs)
app.use(writer_routs)
app.use('/files', express.static('./Files'))

task.belongsTo(data_entry)
data_entry.hasMany(task)
task.belongsTo(writer)
writer.hasMany(task)
task.hasOne(completed_tasks, { foreignKey: { unique: true } })
completed_tasks.belongsTo(task, { foreignKey: { unique: true } })

// sequelize.sync()
// log.sync({alter:true})
const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`Server started on port ${port}`) })
