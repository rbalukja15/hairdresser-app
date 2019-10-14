const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logs/logger');

//Require Items Routes
const items = require('./routes/api/items');
//Require Clients Routes
const clients = require('./routes/api/clients');
//Require User Routes
const users = require('./routes/api/users');
//Require Auth Routes
const auth = require('./routes/api/auth');
//Require Category Routes
const categories = require('./routes/api/category');
//Require Inventory Routes
const Product = require('./routes/api/inventory');
//Require Shitje Routes
const sales = require('./routes/api/sales');
//Require Buyings Routes
const Buyings = require('./routes/api/buyings');
//Require Employees Routes
const Employees = require('./routes/api/employees');
//Require Events Routes
const Events = require('./routes/api/events');

const app = express();

//Body Parser Middleware
app.use(express.json());//The newest version of express includes the body-parser

//DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
        .connect(db, { useNewUrlParser: true,
                       useCreateIndex: true,
                       useFindAndModify: false ,
                       useUnifiedTopology: true
        })
        // .then(() => console.log('MongoDB Connected...') )
        .then( () => logger.info('MongoDB Connected..'))
        .catch( err => logger.info(err) );


//Items Routes
app.use('/api/items', items);
//Client Routes
app.use('/api/clients', clients);
//User Routes
app.use('/api/users', users);
//Auth Routes
app.use('/api/auth', auth);
//Categories Routes
app.use('/api/category', categories);
//Inventory Routes
app.use('/api/products', Product);
//Sale Routes
app.use('/api/sales', sales);
//Buyings Routes
app.use('/api/buyings', Buyings);
//Employees Routes
app.use('/api/employees', Employees);
//Events Routes
app.use('/api/events', Events);

//Define Ports
const port = process.env.PORT || 5000;


app.listen( port, () => console.log(`App listening on port ${port}`) );