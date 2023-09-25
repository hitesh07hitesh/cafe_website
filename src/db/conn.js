const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/coffee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});


// const mongoClient = require('mongodb').MongoClient
// const url = 'mongodb://127.0.0.1:27017'
// const database = 'coffee'
// const clint = new mongoClient(url)

// async function connectData() {
//     let result = await clint.connect();
//     let db = result.db(database);
//     return db.collection('user')

// }

// module.exports = connectData

