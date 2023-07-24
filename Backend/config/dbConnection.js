const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.ukoyjjr.mongodb.net/ipangram?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDb = async () => {
    try {

        const connect = await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Database connected at :", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log("error", error);
        process.exit(1);
    }
}
module.exports = connectDb; 