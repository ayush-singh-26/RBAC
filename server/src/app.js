import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express();

app.use(cors({
    origin: "https://rbac-livid-xi.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({ extended: true,limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import 
import userRouter from "./routes/user.routes.js"

//routes declaration 
app.use("/api/v1",userRouter)


app.get('/', (req, res) => {
    res.send("Hello developer");
  });

//http://localhost:8000/api/v1/users/register

export {app}

