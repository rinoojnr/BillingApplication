const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search');
const searchResults = document.getElementById('searchResults');
const addstockButton = document.getElementById('addstock');
const viewStocksList = document.getElementById('viewstocks-orderd-list');
const searchClear = document.getElementById('close');
const searchClearFilter = document.getElementById('closefilter');
const filterCategory = document.getElementById('filterCategory');


window.addEventListener('DOMContentLoaded',getStocks);
searchClear.addEventListener('click',getStocks);
searchClearFilter.addEventListener('click',getStocks);

function getCategories(){
    const item_category = document.getElementById('itemCategory');
    const filterCategory = document.getElementById('filterCategory')
    const otherInput = document.getElementById('otherInput');
    otherInput.style.display = 'none';
    item_category.innerHTML = "";
    filterCategory.innerHTML = "";
    let  selectOption1 = document.createElement('option');
    let  selectOption2 = document.createElement('option');
         selectOption1.value = "other";
         selectOption1.disabled = true;
         selectOption2.disabled = true;
         selectOption1.selected = true;
         selectOption2.selected = true;
         let text1 = "Category";
         let text2 = "Category";
         selectOption1.append(text1);
         selectOption2.append(text1);
        item_category.append(selectOption1);
        filterCategory.append(selectOption2);
    axios.get(`http://localhost:3000/getcategories`)
    .then((response)=>{
        for(let i=0;i<response.data.categories.length;i++){
            let  selectOption = document.createElement('option');
            let  selectOption1 = document.createElement('option');
             selectOption.value = response.data.categories[i].item_category;
             selectOption1.value = response.data.categories[i].item_category;
             let text = response.data.categories[i].item_category;
             let text1 = response.data.categories[i].item_category;
             selectOption.append(text);
             selectOption1.append(text1);
             item_category.append(selectOption);
             filterCategory.append(selectOption1);
         }
         let  selectOption = document.createElement('option');
         selectOption.value = "other";
         let text = "Other";
         selectOption.append(text);
        item_category.append(selectOption);

    }); 
    item_category.addEventListener('change', function() {
        if (item_category.value === 'other') {
          otherInput.style.display = 'block';
        } else {
          otherInput.style.display = 'none';
        }
      });
}

function getStocks(){
    getCategories()
    document.getElementById('close').style.visibility = "hidden";
    document.getElementById('closefilter').style.visibility = "hidden";
    document.getElementById('searchInput').value ='';
    let viewstocksInnerHTML = `<tr>
    <th>S.NO</th>
    <th>Item Name</th>
    <th>Stocks</th>
    <th>Category</th>
    <th>SRP</th>
    <th>MRP</th>
    <th>Expired</th>
    <th>Offer</th>
    <th></th>
  </tr>`;
    axios.get(`http://localhost:3000/viewallstocks`)
    .then((res)=>{
        for(let i=0;i<res.data.stocks.length;i++){
            const timestamp = res.data.stocks[i].item_expiry;
            const date = new Date(timestamp);
            const newDate = new Date();
            
            const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            // hour: 'numeric', 
            // minute: 'numeric', 
            // second: 'numeric',
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            const nowDate = newDate.toLocaleDateString('en-US', options);
            const daysRemining = date-newDate;
            const millisecondsInDay = 1000 * 60 * 60 * 24;
            const expiring = daysRemining/millisecondsInDay;
            viewstocksInnerHTML+=`<tr id=${res.data.stocks[i]._id}>`+`<td>`+ (i+1) +`</td>`+
            `<td>`+ res.data.stocks[i].item_name +`</td>`+
            `<td>`+ res.data.stocks[i].item_quantity +`</td>`+
            `<td>`+ res.data.stocks[i].item_category.item_category +`</td>`+
            `<td>`+ res.data.stocks[i].item_srp +`</td>`+
            `<td>`+ res.data.stocks[i].item_mrp +`</td>`;

            if(expiring<0){
                viewstocksInnerHTML+= `<td bgcolor="red">`+ formattedDate +`(Expird)</td>`
            }else if(expiring < 10){
                viewstocksInnerHTML+= `<td bgcolor="#FF474C"><font color="white">`+ formattedDate +`(Expiring Soon)</td>`
            }else{
                viewstocksInnerHTML+= `<td>`+ formattedDate +`</td>`
            }
            
            viewstocksInnerHTML+=`<td>`+ res.data.stocks[i].user_saving +`</td>`
            +`<td>`+ `<center><button id= ${res.data.stocks[i]._id} type="button" class="btn btn-warning" onClick="editStock(id)">Edit</button>
            <button id=${res.data.stocks[i]._id} type="button" class="btn btn-danger" onClick="deleteStock(id)">Delete</button>
            ` +`</td>`
            +`<tr>`
        }
        document.getElementById('viewstocks-orderd-list').innerHTML = viewstocksInnerHTML;
    })
}

addstockButton.addEventListener('click',addStock);

function addStock(){
    const item_name = document.getElementById('itemName').value;
    const item_quantity = document.getElementById('itemQuantity').value;
    const item_mrp = document.getElementById('itemMRP').value;
    const item_srp = document.getElementById('itemSRP').value;
    let item_category = document.getElementById('itemCategory');
    const otherInput = document.getElementById('otherInput');
    if (item_category.value === 'other'){
        item_category = otherInput.value;
    }else{
        item_category = document.getElementById('itemCategory').value;
    }
    const item_expiry = document.getElementById('itemExpiry').value;
    axios.post(`http://localhost:3000/addstocksitem`,{item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry})
    .then((res)=>{
        const item_name = document.getElementById('itemName').value = '';
        const item_quantity = document.getElementById('itemQuantity').value = '';
        const item_mrp = document.getElementById('itemMRP').value = '';
        const item_srp = document.getElementById('itemSRP').value = '';
        const item_category = document.getElementById('itemCategory').value = '';
        const item_expiry = document.getElementById('itemExpiry').value = '';
        getStocks();
    });
}       

searchButton.addEventListener('click',searchButtonfunction);
let viewstocksInnerHTML;
function searchButtonfunction(closefilter){
    viewstocksInnerHTML = `<tr>
    <th>S.NO</th>
    <th>Item Name</th>
    <th>Stocks</th>
    <th>Category</th>
    <th>SRP</th>
    <th>MRP</th>
    <th>Expired</th>
    <th>Offer</th>
    <th></th>
  </tr>`;
  let searchInputs;
  if(!searchInput.value){
    searchInputs = ' ';
  }else{
    searchInputs = searchInput.value;
  }
  if(closefilter){
    axios.post(`http://localhost:3000/filteritems/${filterCategory.value}`)
    .then((res)=>{
        showfiltered(res,true);
    });
  }else{
    axios.post(`http://localhost:3000/searchitems/${searchInputs}`)
    .then((res)=>{
        showfiltered(res);
    });
  }
    

}


function deleteStock(id,search,filter){
    if(confirm("Are you want to delete this stock item")){
        axios.post(`http://localhost:3000/deletestockitem/${id}`)
        .then(()=>{
            alert("Stock item deleted");
            if(filter){
                searchButtonfunction(filter);
            }
            if(search){
                searchButtonfunction();
            }else{
                getStocks();
            }
        })
        .catch((err)=>{
            alert("Stock item is not deleted");
        })
    }
}

function editStock(id,search,closefilter){
    axios.get(`http://localhost:3000/viewonestockitem/${id}`)
    .then((res)=>{
        const d = new Date(res.data.item.item_expiry);
        date = [
            d.getFullYear(),
            ('0' + (d.getMonth() + 1)).slice(-2),
            ('0' + d.getDate()).slice(-2)
          ].join('-'); 
    const item_name = document.getElementById('itemName').value = res.data.item.item_name;
    const item_quantity = document.getElementById('itemQuantity').value = res.data.item.item_quantity;
    const item_mrp = document.getElementById('itemMRP').value = res.data.item.item_mrp;
    const item_srp = document.getElementById('itemSRP').value = res.data.item.item_srp;
    const item_category = document.getElementById('itemCategory').value = res.data.item.item_category.item_category;
    const item_expiry = document.getElementById('itemExpiry').value = date;
    
    if(confirm("Are you wanted to edit?")){
        document.getElementById('addstock').style.visibility ="hidden";
        editButtonInnerHtml = ``;
        editButtonInnerHtml+=`<input type="button" class="editbutton" id="editstock" value="Edit Item">`;
        document.getElementById('editbutton').innerHTML = editButtonInnerHtml;
        const editstockButton = document.getElementById('editstock');
        editstockButton.addEventListener('click',()=>{
            const item_name = document.getElementById('itemName').value;
            const item_quantity = document.getElementById('itemQuantity').value;
            const item_mrp = document.getElementById('itemMRP').value;
            const item_srp = document.getElementById('itemSRP').value;
            let item_category = document.getElementById('itemCategory').value;
            const otherInput = document.getElementById('otherInput');
            if (item_category === 'other'){
                item_category = otherInput.value;
            }else{
                item_category = document.getElementById('itemCategory').value;
            }
            const item_expiry = document.getElementById('itemExpiry').value;
            axios.patch(`http://localhost:3000/editstockitem/${id}`,{ item_name,item_quantity,item_mrp,item_srp,item_category,item_expiry })  
            .then((res)=>{
                document.getElementById('editstock').style.visibility ="hidden";
                let addButtonInnerHtml = ``;
                addButtonInnerHtml+=`<input type="button" class="addbutton" id="addstock" value="Add Item" onClick=addStock()>`;
                document.getElementById('editbutton').innerHTML = addButtonInnerHtml;
                alert("Edited Successfully");
                const item_name = document.getElementById('itemName').value = '';
                const item_quantity = document.getElementById('itemQuantity').value = '';
                const item_mrp = document.getElementById('itemMRP').value = '';
                const item_srp = document.getElementById('itemSRP').value = '';
                const item_category = document.getElementById('itemCategory').value = '';
                const item_expiry = document.getElementById('itemExpiry').value = '';
                if(closefilter){
                    searchButtonfunction(closefilter);
                }
                if(search){
                    searchButtonfunction();
                }else{
                    getStocks();
                }
                
            })    
            .catch((err)=>{
                console.log(err)
                alert("Editing failed")
            });
        })
    }  
    })
}




filterCategory.addEventListener('change',()=>{
    viewstocksInnerHTML = `<tr>
    <th>S.NO</th>
    <th>Item Name</th>
    <th>Stocks</th>
    <th>Category</th>
    <th>SRP</th>
    <th>MRP</th>
    <th>Expired</th>
    <th>Offer</th>
    <th></th>
  </tr>`;
    axios.post(`http://localhost:3000/filteritems/${filterCategory.value}`)
    .then((res)=>{
        showfiltered(res,true);
    });
});


function showfiltered(res,closefilter){
        if(closefilter){
            document.getElementById('closefilter').style.visibility = "visible";
        }else{
            document.getElementById('close').style.visibility = "visible";
        }
        for(let i=0;i<res.data.length;i++){
            const timestamp = res.data[i].item_expiry;
            const date = new Date(timestamp);
            const newDate = new Date();
            
            const options = { 
            weekday: 'short',   
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            // hour: 'numeric', 
            // minute: 'numeric', 
            // second: 'numeric',
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            const nowDate = newDate.toLocaleDateString('en-US', options);
            const daysRemining = date-newDate;
            const millisecondsInDay = 1000 * 60 * 60 * 24;
            const expiring = daysRemining/millisecondsInDay;

            viewstocksInnerHTML+=`<tr id=${res.data[i]._id}>`+`<td>`+ (i+1) +`</td>`+
            `<td>`+ res.data[i].item_name +`</td>`+
            `<td>`+ res.data[i].item_quantity +`</td>`+
            `<td>`+ res.data[i].item_category.item_category +`</td>`+
            `<td>`+ res.data[i].item_srp +`</td>`+
            `<td>`+ res.data[i].item_mrp +`</td>`;

            if(expiring<0){
                viewstocksInnerHTML+= `<td bgcolor="red">`+ formattedDate +`(Expird)</td>`
            }else if(expiring < 10){
                viewstocksInnerHTML+= `<td bgcolor="#FF474C"><font color="white">`+ formattedDate +`(Expiring Soon)</td>`
            }else{
                viewstocksInnerHTML+= `<td>`+ formattedDate +`</td>`
            }
            
            viewstocksInnerHTML+=`<td>`+ res.data[i].user_saving +`</td>`
            +`<td>`+ `<center><button id= ${res.data[i]._id} type="button" class="btn btn-warning" onClick="editStock(id,true,closefilter)">Edit</button>
            <button id=${res.data[i]._id} type="button" class="btn btn-danger" onClick="deleteStock(id,true,closefilter)">Delete</button>
            ` +`</td>`
            +`<tr>`
        }
        const c = document.getElementById('viewstocks-orderd-list').innerHTML = viewstocksInnerHTML;
}