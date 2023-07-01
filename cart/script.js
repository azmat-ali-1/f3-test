let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);
card = cart[document.cookie];
console.log(cart);
let total =0;

function remove(event){
    let tag = event.target;
    for(let i=0;i<card.length;i++){
        if(card[i].id==tag.id){
            card.splice(i,1);
            break;
        }
    }
    cart[document.cookie]=card;
    localStorage.setItem("cart",JSON.stringify(cart));
    total=0;
    let table = document.getElementById("list");
    table.innerHTML=` <h3 style="text-align: center;">CheckOut List</h3>`;

    let totaldiv = document.getElementById("total");
    let tr1 = document.createElement("tr");
       tr1.innerHTML=`<td>Total</td><td>$ ${total}</td>`
       totaldiv.innerText="";
       totaldiv.append(tr1);

    loadData(cart[document.cookie]);
}
function loadData(data){
    let id = document.cookie;
    let items = document.getElementById("azmat");
    if(cart.length<1){
        items.innerHTML="";
    }
    else{
        let title = document.getElementById("title");
        items.innerHTML="";
        title.innerText="My Cart";
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
             btn.innerText="Remove"
             btn.addEventListener("click",remove);
             div.append(btn);
             items.append(div);
             let tr = document.createElement("tr");
             let str = data[i].title.trim().split(" ");
             let name = str[str.length-1];
             let price = data[i].price;
             tr.innerHTML=`<td>${name}</td><td>$ ${price}</td>`;
             let table = document.getElementById("list");
             table.append(tr);
             total+=price;
             let totaldiv = document.getElementById("total");
             let tr1 = document.createElement("tr");
                tr1.innerHTML=`<td>Total</td><td>$ ${total}</td>`
                totaldiv.innerText="";
                totaldiv.append(tr1);
         }
    }
   
  }
  loadData(cart[document.cookie]);