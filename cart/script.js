let cart = localStorage.getItem("cart");
cart = JSON.parse(card);
console.log(cart);
function loadData(data){
 
   

    let items = document.getElementById("azmat");
    if(card.length<1){
        items.innerHTML="";
    }
    else{
        let title = document.getElementById("title");
        title.innerText="All";
         for(let i=0;i<data.length;i++){
             let div = document.createElement("div");
             div.className="item";
             div.id= data[i].id;
             div.innerHTML=` <img src=${data[i].image} alt="Item" />
             <div class="info">
               <div class="row">
                 <div class="price">$ ${data[i].price}</div>
                 <div class="sized">${data[i].size}</div>
               </div>
               <div class="colors">
                 Colors:
                 <div class="row">
                   <div class="circle" style="background-color: ${data[i].color}"></div>
                 </div>
               </div>
               <div class="row">Rating: ${data[i].rating.rate}</div>
             </div>
             `
             
             let btn  = document.createElement("button");
             btn.id=data[i].id;
             btn.innerText="Add to Cart"
             btn.addEventListener("click",cart);
             div.append(btn);
             items.append(div);
         }
    }
   
  }
  loadData(cart);