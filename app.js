//app.js

const express = require('express');
const bodyParser = require('body-parser');
// Local Modules
const db = require('./database/models/index');

// Routes
const userRoute = require('./routes/user.route.js');
const roleRoute = require('./routes/role.route.js');
const authRoute = require('./routes/auth.route.js');

const app = express();
const PORT = 3000;

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

// Routes will be written here
app.use('/auth', authRoute);
app.use('/role', roleRoute);
app.use('/user', userRoute);

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
