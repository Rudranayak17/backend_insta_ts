import mongoose from "mongoose";

const connectDB = async (uri: string) => {
    try {

        const dbConnect = await mongoose.connect(uri, { dbName: "instagram" })
        console.log("db connect successfuly " + dbConnect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)

    }

}

export default connectDB; 