const addQuantity = document.getElementById('add-quantity');
const substractQuantity = document.getElementById('subtract-quantity');
const addToBill = document.getElementById('add-to-bill');
const billItems = document.getElementById('bill-items');
const itemsList = document.getElementById('item-list');
const finishedBill = document.getElementById('finish-bill');
const cancelBill = document.getElementById('cancel-bill')

getStocks();

function getStocks(){
    axios.get(`http://localhost:3000/viewallstocksforselect`)
    .then((response)=>{
        for(let i=0;i<response.data.stocks.length;i++){
           let  selectOption = document.createElement('option');
            selectOption.value = JSON.stringify(response.data.stocks[i]);
            let text = response.data.stocks[i].item_name;
            selectOption.append(text);
            itemsList.append(selectOption);
        }
    })
}

finishedBill.addEventListener('click',()=>{
    if(arr.length == 0){
        alert('Please Add Items')
    }else{
        const idAndQtyArray = [];
        arr.forEach((i)=>{
            idAndQtyArray.push({ _id: i.id,item_quantity: i.quantity })
        })
        axios.post('http://localhost:3000/modifiedstocks',idAndQtyArray)
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            alert("Error: Please Save As Draft");
        })
    }
});
cancelBill.addEventListener('click',()=>{
    if(arr.length == 0){
        alert("Already Cleared");
    }else{
        arr = [];
        showBill(arr);
        totalQty = 0;
        totalMrp = 0;
        totalAmount = 0;
        document.getElementById('qty').innerHTML = totalQty;
        document.getElementById('mrp').innerHTML = totalMrp;
        document.getElementById('amount').innerHTML = totalAmount;
        document.getElementById('saved').innerHTML = totalMrp - totalAmount;
    }
})

addQuantity.addEventListener('click',()=>{
    quantity.value++;
});

substractQuantity.addEventListener('click',()=>{
    let quantity = parseInt(document.getElementById('quantity').value);
    if (quantity > 1) {
        document.getElementById('quantity').value--;
    }
});
let totalQty = 0;
let totalMrp = 0;
let totalAmount = 0;
let arr = [];
let addBillinnerHTML =``;
addToBill.addEventListener('click',()=>{
    let item = document.getElementById('item-list');
    let selectedOption = item.options[item.selectedIndex];
    // let price = selectedOption.getAttribute("price");
    let quantity = document.getElementById('quantity').value;
    let option = JSON.parse(item.value);
    arr.push({id:option._id,item: option.item_name,quantity: quantity,mrp: option.item_mrp,srp:option.item_srp,amount: option.item_srp*quantity});
    showBill(arr);
    totalQty+=parseInt(quantity);
    totalMrp+=parseInt(option.item_mrp)*quantity;
    totalAmount+=parseInt(option.item_srp*quantity);
    document.getElementById('qty').innerHTML = totalQty;
    document.getElementById('mrp').innerHTML = totalMrp;
    document.getElementById('amount').innerHTML = totalAmount;
    document.getElementById('saved').innerHTML = totalMrp - totalAmount;
    // addBillinnerHTML+=
    // `<tr>
    //             <td>${index+=1}</td>
    //             <td>${option.item_name}</td>
    //             <td>${quantity}</td>
    //             <td>${option.item_mrp}</td>
    //             <td>${option.item_srp}</td>
    //             <td>${option.item_srp*quantity}</td>
                
    //             <td class="action-buttons">
    //                 <button class="edit-btn" id=${option._id} onClick="editItem(id)">Edit</button>
    //                 <button class="delete-btn" id=${option._id}  onClick="deleteItem(id)">Delete</button>
    //             </td><tr>`;
    //             document.getElementById('bill-items').innerHTML = addBillinnerHTML;
    document.getElementById('quantity').value = 1;
});


function editItem(id){
    arr.forEach((i,j)=>{
        if((id)==i.id){
            document.getElementById('quantity').value = i.quantity;
            arr.splice(j,1);
        }
    });
    showBill(arr);
}


function deleteItem(id){
    arr.forEach((i,j)=>{
        if((id)==i.id){
            arr.splice(j,1);
            totalQty-=parseInt(i.quantity);
            totalMrp-=parseInt(i.mrp)*i.quantity;
            totalAmount-=parseInt(i.srp*i.quantity);
            document.getElementById('qty').innerHTML = totalQty;
            document.getElementById('mrp').innerHTML = totalMrp;
            document.getElementById('amount').innerHTML = totalAmount;
            document.getElementById('saved').innerHTML = totalMrp - totalAmount;
        }
    });
    showBill(arr);
}

document.getElementById('print-bill').addEventListener('click', function() { 
    if(arr.length == 0){
        alert("Please Add Items");
    }else{
        print();
    }
});

function showBill(arr){
    if(arr.length != 0){
        let item = document.getElementById('item-list');
        let selectedOption = item.options[item.selectedIndex];
        // let option = JSON.parse(item.value);
        let quantity = document.getElementById('quantity').value;
        addBillinnerHTML =``;
        // <button class="edit-btn" id=${i.id} onClick="editItem(id)">Edit</button>  line 121
        arr.forEach((i,j)=>{
            addBillinnerHTML+=
        `<tr>
                    <td>${j+1}</td>
                    <td>${i.item}</td>
                    <td>${i.quantity}</td>
                    <td>${i.mrp}</td>
                    <td>${i.srp}</td>
                    <td>${i.amount}</td>
                    
                    <td class="action-buttons">
                        
                        <button class="delete-btn" id=${i.id}  onClick="deleteItem(id)">Delete</button>
                    </td><tr>`;
                    document.getElementById('bill-items').innerHTML = addBillinnerHTML;
        const element = document.getElementById("saved-price");
        element.scrollIntoView(false);           
        })
    }else{
        addBillinnerHTML =``; 
        document.getElementById('bill-items').innerHTML = addBillinnerHTML;
    }
}
