import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const db = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/e_commerce", {
        dbName: 'e_commerce',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(()=> {
            console.log("connected to database")
        })
        .catch((err)=> {
            console.log("cant connect to Database", err);
        });
    
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to db...');
        });
    
        mongoose.connection.on('error', err => {
            console.log(err.message);
        });
    
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection is disconnected...');
        });
    
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
            console.log(
                'Mongoose connection is disconnected due to app termination...'
            );
            process.exit(0);
            });
        });
    
} 
export default db