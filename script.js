let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let discount=document.getElementById('discount');
let ads=document.getElementById('ads');
let count=document.getElementById('count');
let category=document.getElementById('category');
let total=document.getElementById('total');
let sumbit=document.getElementById('sumbit');
let tBody=document.getElementById('tBody');
let mood ='create';
let temp;


//get total
function getTotal()
{
   if (price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
       // total.style.background = '#040';
   }
   else{
    total.innerHTML= '';
   }
}

//create product 

let datapro;
if (localStorage.product !=null){
    datapro= JSON.parse(localStorage.product)
}
else{
    datapro =[];
}


sumbit.onclick = function (){
   
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads:ads.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
//count

//clean code
if (title.value != ''
 && price.value !='' 
 && category.value != ''){
    if(mood === 'create'){

        if (newPro.count > 1){
            for( let i=0; i<newPro.count ;i++ ){
                 datapro.push(newPro);
    
            }
        }
        else{
            datapro.push(newPro)
        }
    }
    else{
        datapro[  temp ]=newPro;
        mood='create'
        sumbit.innerHTML='Create'
        count.style.display ='block'
    }

    clearData();
}

    


    datapro.push(newPro);
    localStorage.setItem(
        'products',JSON.stringify(datapro)
    )

    
    showData();
}


//clear

function clearData(){

    title.value="";
    price.value="";
    taxes.value="";
    discount.value="";
    ads.value="";
    total.innerHTML='';
    count.value='';
    category.value='';

}

function showData(){
    getTotal();
    
    let table ='';
    for(let i =0; datapro.length ;i++){
        table +=
        `
        
        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td> 
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                        
                        </tr> 
        `

         tBody.innerHTML = table

       

    }
   
    //delete all
   
    document.getElementById('tbody').innerHTML = table;
    let btnDelete =document.getElementById("deleteAll")
 
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >Delete All (${datapro.length})</button>
        `
        
    }
    else{
        btnDelete.innerHTML="";
    }

}

//delete function

function deleteDate(i){ 
    datapro.splice(i,1);
    localStorage.product= JSON.stringify(datapro);
    showData();

}
 
//delete All
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();


}

//update
function updateData(i){
    title.value= datapro[i].title;
    price.value= datapro[i].price;
    taxes.value=  datapro[i].taxes;
    discount.value=  datapro[i].discount;
    ads.value=  datapro[i].ads;
    category.value=  datapro[i].category;
    getTotal();
    count.style.display='none';
    sumbit.innerHTML='Update';
    mood ='update';
    temp=i;
    scroll (
        {
            top:0,
            behavior:'smooth',
        }
    )

}


//Mood search


let searchMood ='title';
function getSearchMood(id){
    let search =document.getElementById('search');
  if(id == 'searchTitle'){
    searchMood ='title';
    // document.getElementById("search").placeholder = "Search by title";
  }
  else{
    searchMood ='category';
   
    // document.getElementById("search").placeholder = "Search by Category";
    console.log("time")
  }
  document.getElementById("search").placeholder = "Search by "+searchMood;
  search.focus();
  search.value="";
  showData();
 
}


//search

function searchData(value){

    let table='';

    for( let i=0 ;i<datapro.length ;i++){
    if(searchMood == 'title'){

        // for( let i=0 ;i<datapro.length ;i++){
            if (datapro[i].title.includes(value.toLowerCase())){

                table +=
                `
                
                <tr>
                                     <td>${i}</td>
                                    <td>${datapro[i].title}</td>
                                    <td>${datapro[i].price}</td>
                                    <td>${datapro[i].taxes}</td>
                                    <td>${datapro[i].ads}</td>
                                    <td>${datapro[i].total}</td>
                                    <td>${datapro[i].category}</td> 
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                                
                                </tr> 
                `
        
                 tBody.innerHTML = table
        
                
                
            }

        // }



    }
    else{
        // for( let i=0 ;i<datapro.length ;i++){
            if (datapro[i].category.includes(value.toLowerCase())){

                table +=
                `
                
                <tr>
                                     <td>${i}</td>
                                    <td>${datapro[i].title}</td>
                                    <td>${datapro[i].price}</td>
                                    <td>${datapro[i].taxes}</td>
                                    <td>${datapro[i].ads}</td>
                                    <td>${datapro[i].total}</td>
                                    <td>${datapro[i].category}</td> 
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                                
                                </tr> 
                `
        
                 tBody.innerHTML = table
        
                
                
            }

        }
    // }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data




