import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route"
import { connectDB } from "./lib/db"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route"
import chatRoutes from "./routes/chat.route"
import cors from "cors"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true, 
}))
app.use(express.json())

app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})

