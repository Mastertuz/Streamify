import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route"
import { connectDB } from "./lib/db"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route"
import chatRoutes from "./routes/chat.route"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
const PORT = process.env.PORT

// Правильное получение __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:5174", 
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://streamify-beige.vercel.app",
        "https://*.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

// For Vercel deployment
export default app;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})

