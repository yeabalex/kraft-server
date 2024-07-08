import express from 'express'
import { userRoute } from "./routes/user";


const app = express()
const PORT: any = process.env.PORT?process.env.PORT:3000

app.use(express.json())
app.use(userRoute)



app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})