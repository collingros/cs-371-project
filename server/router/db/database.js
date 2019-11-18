const MongoClient = require('mongodb').mongoClient;
require('dotenv').config({path: path.resolve( __dirname, '../../.env')});

exports.connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            process.env.MONGODB_URL,
            { useNewUrlParser: true },
            (err, client) => {
                if (err) {
                    reject("Unable to connect to MongoDB server");
                    console.log(err);
                }
                resolve(client);
            });
    });
};