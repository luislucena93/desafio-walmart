const mongoose = require("mongoose");
const productSchema = require('../schemas/product');
const discountSchema = require('../schemas/discount');

const connection = process.env.NODE_ENV === 'development'
    ? "mongodb://brandDiscountsUser:brandDiscountsPassword@mongo:27017/desafio_walmart?authSource=admin"
    : "mongodb+srv://luislucena93:Luis.1193@cluster0.ml2ye.mongodb.net/desafio_walmart?retryWrites=true&w=majority";

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
    console.log(process.env.NODE_ENV);
})

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`)
    setTimeout(connectWithRetry, 5000)
    // process.exit(-1)
})

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(connection)
}

const connectDb = () => {
    connectWithRetry();
};

module.exports = connectDb;

