import mongoose from "mongoose";

const db = async () => {
    try {
        const con = await mongoose.connect(
            `${process.env.CONNECTION_STRING}/proshop`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        );
        console.log(
            `MongoDB connected: http://${con.connection.host}:${con.connection.port}`
                .bgGreen.black
        );
    } catch (err) {
        console.error(`MongoDB error log: ${err.message}`.bgRed.black.bold);
        process.exit(1);
    }
};

export default db;
