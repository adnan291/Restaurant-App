async function saveToDatabase(event) {
  const msg = document.querySelector('.msg');

  try {
    event.preventDefault();
    const price = event.target.price.value;
    const dish = event.target.dish.value;
    const tableNo = event.target.tableNo.value;

    const obj = {
      price,
      dish,
      tableNo
    }

    const res = await axios.post("http://localhost:4000/order/add-order", obj);

    showNewOrderOnScreen(res.data, tableNo);

    msg.innerHTML = 'Order Added Successfully';

    setTimeout(() => {
      msg.innerHTML = '';
    }, 2000);

  } catch (err) {
    console.log(err);
  }
}

function showNewOrderOnScreen(order, tableNo) {
  const { id, dish, price } = order;

  const orderHTML = `
    <li id="${id}">
      ${dish} - ${price}/- 
      <div class="order-buttons">
        <input class="btn btn-outline-danger" onclick="deleteOrder('${id}')" value="Delete">
        <input class="btn btn-outline-primary" onclick="editOrderDetails('${dish}', '${price}', '${tableNo}', '${id}')" value="Edit">
      </div>
    </li>
  `;

  const tableElement = document.getElementById(`${tableNo}`);

    tableElement.innerHTML += orderHTML;
 


  document.getElementById('dish').value = '';
  document.getElementById('tableNo').value = '';
  document.getElementById('price').value = '';
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:4000/order/get-order")
      console.log(res);
    for (let i = 0; i < res.data.length; i++) {
      const order = res.data[i];
      showNewOrderOnScreen(order, order.tableNo);
    }
  } catch (err) {
    console.log(err);
  }
})

function editOrderDetails(dish, price, tableNo, orderId) {
  document.getElementById('tableNo').value = tableNo;
  document.getElementById('dish').value = dish;
  document.getElementById('price').value = price;

  deleteOrder(orderId);
}

async function deleteOrder(orderId) {
  try {
    await axios.delete(`http://localhost:4000/order/delete-order/${orderId}`);
    removeOrderFromScreen(orderId);
  } catch (err) {
    console.log(err);
  }
}

function removeOrderFromScreen(orderId) {
  const orderElement = document.getElementById(orderId);

  if (orderElement) {
    const parentNode = orderElement.parentNode;
    parentNode.removeChild(orderElement);
  }
  
}

