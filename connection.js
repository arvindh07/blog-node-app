const mongoose = require("mongoose");

const connectToDb = () => {
    return mongoose.connect(process.env.MONGODB_URI);
}

const disconnectFromDb = () => {
    return mongoose.disconnect();
}

module.exports = {
    connectToDb,
    disconnectFromDb
}