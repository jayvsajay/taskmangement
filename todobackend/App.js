const express=require('express');
const cors = require('cors');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

const todoRoutes = require('./routes/todoRoutes');
app.use("/api/todo/",todoRoutes);
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`work on ${PORT}`);
})