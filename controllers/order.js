const Orders = require('../models/orders')    
 
exports.getAddOrders =( async (req,res,next)=>{

    try{
        const data = await  Orders.findAll();
        res.json(data);
    }
    catch(err){
        console.log(err)}
});

exports.postAddOrders=( async (req,res,next) => {
    try{
    const price=req.body.price;
    const tableNo=req.body.tableNo;
    const dish=req.body.dish;

    const data = await Orders.create({
        price : price,
        tableNo : tableNo,
        dish : dish
    })
     res.json(data);
     }


    catch(err)   {
        console.log(err)
    };

})

exports.postDeleteOrders=( async (req, res,  next) => {


     try {
           const ordersId = req.params.id;
   const data = await Orders.destroy({ where: {id:ordersId}});
      res.sendStatus(200); 
    } 
     catch(err){
        console.log(err);
     }
});