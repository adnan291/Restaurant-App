const express=require('express');    
const bodyParser=require('body-parser');
const cors=require('cors');


const app=express();
const orderRoutes=require('./routes/order')

app.use(bodyParser.json({ extended: false }));
app.use(cors())


const sequelize=require('./util/database');
 
app.use('/order',orderRoutes);

sequelize.sync().then((result) => {
    app.listen(4000);
}).catch((err) => {
    console.log(err)
});

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})