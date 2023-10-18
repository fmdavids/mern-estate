import mongoose from 'mongoose'
import config from '../services/config.js'

mongoose.set('strictQuery', false)

const DB_Connection = () => {
    try {
        mongoose.connect(config.MONGO_URI)
        console.log("connection to DB is Successfull")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default DB_Connection 