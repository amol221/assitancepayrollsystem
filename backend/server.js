const express = require('express');
const dotenv =require('dotenv')
const connectDB = require("./config/DB");
const userRoutes=require('./routes/userRoutes');
const { notFound, errorHandlers } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

//app.get('/',(req,res)=>{
  //  res.send("Api is running..");
//});

app.use('/api/users',userRoutes);

app.use(notFound);
app.use(errorHandlers);


const PORT=5000;




app.listen(5000,console.log("server started on PORT 5000"));