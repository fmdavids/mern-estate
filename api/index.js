import express from "express"
import config from '../api/services/config.js'
import DB_Connection from './models/model.mongoose.js'
import userRoute from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

const app = express() 
DB_Connection()

const PORT = config.port

app.use(express.json())

app.get('/', (req, res) =>{
    res.status(200).json({message: "Wellcome home"})
} )
app.use('/api/user', userRoute)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(PORT, ()=> console.log("Server is running"))