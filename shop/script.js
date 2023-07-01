const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
}

function cart(event){
  let tag = event.target;
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  let data = localStorage.getItem("data");
  data=JSON.parse(data);
  if(cart==null){
    cart=[];
  }
  cart.push(data[tag.id]);
  console.log(cart);
  localStorage.setItem("cart",JSON.stringify(cart));
}
function addColor(){
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  const color = ["red","blue","green","black","white"];
  const size = ["s","m","l","xl"];
  for(let i=0;i<data.length;i++){
    let num = Math.floor(Math.random()*(5-0)+0);
    let num2 =  Math.floor(Math.random()*(4-0)+0);
    data[i].color=color[num];
    data[i].size=size[num2];
    console.log(data[i].size);
  }
  console.log(data);
  localStorage.setItem("data",JSON.stringify(data));
}
function loadData(data){
 

  let items = document.getElementById("azmat");
  items.innerHTML="";
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

let  product = async function Dataload(){
  let response = await fetch("https://fakestoreapi.com/products");
  let Data = await response.json();
  localStorage.setItem("data",JSON.stringify(Data));
  addColor();
  loadData(Data);
}
product();




function checkColor(colorArr,filterData){
 
  let colorData = [];
  
  for(let j =0;j<filterData.length;j++){
  
    for(let i=0;i<colorArr.length;i++){
      if(filterData[j].color==colorArr[i].id&&colorArr[i].checked){
        colorData.push(filterData[j]);
      }
    }
  }
  if(colorData.length<1){
    return filterData;
  }
 return colorData;
}

function checkSize(colorArr,filterData){

  let colorData = [];
  for(let j =0;j<filterData.length;j++){
    for(let i=0;i<colorArr.length;i++){
      if(filterData[j].size==colorArr[i].id&&colorArr[i].checked==true){
        colorData.push(filterData[j]);
      }
    }
  }
  if(colorData.length<1){
    return filterData;
  }
 return colorData;
}

function checkRating(rating,filterData){
  let arr = [];
  for(let i=0;i<filterData.length;i++){
    if(filterData[i].rating.rate>=rating){
      arr.push(filterData[i]);
    }
  }
  if(arr.length<1){
    return filterData;
  }
 return arr;
}

function checkPrice(priceArr,filterData){
  let colorData = [];
  for(let j =0;j<filterData.length;j++){
    for(let i=0;i<priceArr.length;i++){
      if(priceArr[0].checked==true){
        let str = priceArr[0].id.split("-");
        let min = parseInt(str[0]);
        let max = parseInt(str[1]);
        if(priceArr[0].id!="100on"){
          if(min<=filterData[j].price&&max>=filterData[j].price){
            colorData.push(filterData[j]);
           
          }
        }
        else{
          if(100<=filterData[j].price){
            colorData.push(filterData[j]);
           
          }
        }
        console.log(min,max,str);
       
      }
    }
  }
  if(colorData.length<1){
    return filterData;
  }
 return colorData;
}

function filter(){
  console.log("filter");
  let items = document.getElementById("azmat");
  items.innerHTML="";
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  let filterData = [...data];
 
  let colorArr = [];
  colorArr  = document.querySelectorAll("#colorSection input");
   filterData=  checkColor(colorArr,filterData);
  let sizeArr  = document.querySelectorAll("#sizeSection input");
  filterData = checkSize(sizeArr,filterData);

  let rating = document.querySelector("#ratingSection input");
  filterData = checkRating(rating.value,filterData);
  
  let priceArr = document.querySelectorAll("#priceSection input");
  filterData = checkPrice(priceArr,filterData);

  loadData(filterData);
}

document.getElementById("applyfilter").addEventListener("click",filter);