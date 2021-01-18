const mongoose = require("mongoose");

const connection = process.env.NODE_ENV === 'development'
    ? "mongodb://brandDiscountsUser:brandDiscountsPassword@mongo:27017/desafio_walmart?authSource=admin"
    : process.env.DB_URI;

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
    console.log(process.env.NODE_ENV);
})

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`)
    setTimeout(connectWithRetry, 5000)
})

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(connection)
}

const connectDb = () => {
    connectWithRetry();
};

module.exports = connectDb;

