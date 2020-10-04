import data from "./data.js"

const itemsContainer = document.getElementById("items");

//ES6 forEach method:
data.forEach(function (mood) {
  // Make a new div element and give it a class name
  let newDiv = document.createElement("div");
  newDiv.className = "item";

  // Make an image element
  let img = document.createElement("img");
  img.src = mood.image;
  img.width = 300;
  img.height = 300;
  newDiv.appendChild(img);

  // Make element for description
  let desc = document.createElement("p");
  desc.innerText = mood.desc;
  newDiv.appendChild(desc);

  // Make element for price
  let price = document.createElement("p");
  price.innerText = mood.price;
  newDiv.appendChild(price);

  // Make 'Add to Cart' button
  let button = document.createElement("button");
  button.id = mood.name;
  button.innerHTML = "Add to Cart";
  button.dataset.price = mood.price;
  newDiv.appendChild(button)

  itemsContainer.appendChild(newDiv);
});

// // For loop method (**DOES NOT INCLUDE STEPS AFTER IMAGE, DESC, AND PRICE**):
// // The length of our data determines how many times this loop cycles
// for (let i = 0; i < data.length; ++i) {
//   // Make a new div element and give it a class name
//   let newDiv = document.createElement("div");
//   newDiv.className = "item";

//   // Make an image element
//   let img = document.createElement("img");
//   // This will change each time we go through the loop
//   img.src = data[i].image;
//   img.width = 300;
//   img.height = 300;

//   // Add the image to the div
//   newDiv.appendChild(img);
//   // Put new div inside items container

//   let desc = document.createElement("p");
//   desc.innerText = data[i].desc;
//   newDiv.appendChild(desc);

//   let price = document.createElement("p");
//   price.innerText = data[i].price;
//   newDiv.appendChild(price);

//   itemsContainer.appendChild(newDiv)
// }

const cart = [];

function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    if (name === cart[i].name) {
      cart[i].qty++;
      return;
    }
  }
    const item = {name: name, price: price, qty: 1};
    cart.push(item);
}

function showItems() {
  console.log(`You have ${getQty()} items in your cart`);
  cart.forEach(function (item) {
    console.log(`- ${item.name} $${item.price} x ${item.qty}`);
  })
  console.log(`Total in cart: $${getTotal().toFixed(2)}`)
}

function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i++) {
    qty += cart[i].qty;
  }
  return qty;
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

addItem("Apple", 0.99);
addItem("Orange", 1.29);
addItem("Opinion", 0.02);
addItem("Apple", 0.99);
addItem("Frisbee", 9.92);
addItem("Apple", 0.99);
addItem("Orange", 1.29);
showItems();
