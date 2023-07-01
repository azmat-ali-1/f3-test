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
  console.log(tag.id);
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  let data = localStorage.getItem("data");
  data=JSON.parse(data);
  let id= document.cookie;
 
  if(cart==null){
    cart={

    };
  }
  if(cart[id]==undefined){
    cart[id]=[];
  }
  cart[id].push(data[tag.id-1]);
 
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
   
  }
 
  localStorage.setItem("data",JSON.stringify(data));
  loadData(data);
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
      div.innerHTML=`<img src=${data[i].image} alt="Item" />
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
      
       
      }
    }
  }
  if(colorData.length<1){
    return filterData;
  }
 return colorData;
}

function filter(){
  
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
function forGender(category){
  let text = category.slice(0,3);
 
  if(text.toUpperCase()=="MEN"){
    return "MENS";
  }
  return "WOMENS";
}
function update(event){
  let filtersDiv = document.querySelectorAll(".filters .filter");
  for(let i=0;i<filtersDiv.length;i++){
    let tagId = filtersDiv[i];
    tagId.style.backgroundColor="white";
    tagId.style.color="black";
}
  let tag = event.target;
 let tagId = document.getElementById(tag.id);
 tagId.style.backgroundColor="black";
 tagId.style.color="white";


  let items = document.getElementById("azmat");
  items.innerHTML="";
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  let filterData = [...data];
  if(tag.innerText=="All"){
    loadData(filterData);
  }
  else{
    let arr =[];
    let cat = tag.innerText.toUpperCase();
    
    for(let i=0;i<filterData.length;i++){
      let category = filterData[i].category.toUpperCase();
    
      if(category.length>11){
        category=forGender(category);

      }
      if(category.toUpperCase()==cat.toUpperCase()){
        arr.push(filterData[i]);
      }
     
    }
   loadData(arr);
  }
}

document.getElementById("applyfilter").addEventListener("click",filter);
let filtersDiv = document.querySelectorAll(".filters .filter");
for(let i=0;i<filtersDiv.length;i++){
    filtersDiv[i].addEventListener("click",update);
}