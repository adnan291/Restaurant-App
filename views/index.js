async function saveToDatabase(event) {  
 
  const msg = document.querySelector('.msg');

  try{
       event.preventDefault();
    const price = event.target.price.value;
    const dish = event.target.dish.value;
    const tableNo = event.target.tableNo.value;

    const obj = {
      price,
      dish,
      tableNo
    }

  const res =  await axios.post("http://localhost:4000/order/add-order",obj);

      showNewOrderOnScreen(res.data);

      msg.classList.add('success');
      msg.innerHTML = 'Order Added Successfully';
      setTimeout(() => msg.remove(), 3000);
  
  }catch(err){
      console.log(err);
    }
  

  }

  function showNewOrderOnScreen(order) {

    document.getElementById('dish').value = '';
   document.getElementById('tableNo').value = '';
   document.getElementById('price').value = '';


   const parentNode = document.getElementById('orders');
   const childHTML = ` <li id=${order.id}> ${order.dish} - ${order.price}
   <input class="btn btn-outline-danger" onclick=deleteOrder('${order.id}') value ="Delete" >
   <input class="btn btn-outline-primary" onclick=editOrderDetails('${order.dish}','${order.price}','${order.tableNo}','${order.id}') value ="Edit"> 
                                  </li>`

   parentNode.innerHTML = parentNode.innerHTML + childHTML;
 }

 window.addEventListener("DOMContentLoaded", async () => {
  try{
   const res = await axios.get("http://localhost:4000/order/get-order")

    for(var i=0;i<res.data.length; i++){
    showNewOrderOnScreen(res.data[i]);
    }
    // console.log(res)
  } 
   catch(err){

    console.log(err);
  }
})

function editOrderDetails(dish,price,tableNo,orderId){

  document.getElementById('tableNo').value = tableNo;
 document.getElementById('dish').value = dish;
 document.getElementById('price').value = price;


 deleteOrder(orderId)

}

async function deleteOrder(orderId) {
  try{
       await axios.delete(`http://localhost:4000/order/delete-order/${orderId}`)

        removeOrderFromScreen(orderId)

    } 
      catch(err) {
      console.log(err)
    }

  }

  function removeOrderFromScreen(orderId) {
    const parentNode = document.getElementById('orders');
    const childNodeToBeDeleted = document.getElementById(orderId);

      parentNode.removeChild(childNodeToBeDeleted)


  }