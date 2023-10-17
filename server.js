import dotenv from "dotenv";
import mongoose from "mongoose";
import {app} from "./app.js";


dotenv.config({path: './config.env'})

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD)



mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected'))
    .catch((err) => console.log(`db connect error ${err}`))


const port = process.env.PORT || 5000

app.listen(port,() => console.log(`app is running on port ${port}`))