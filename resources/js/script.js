import data from "./data.js"

const itemsContainer = document.getElementById("items");
const itemList = document.getElementById("item-list");
const cartQty = document.getElementById("cart-qty");
const cartTotal = document.getElementById("cart-total");

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

const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach(elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute("id"), elt.getAttribute("data-price"));
  showItems()
}))

const cart = [];

// ----------------------------------------
// Handle Clicks on Add and Remove Buttons
itemList.onclick = function (e) {
  const name = e.target.dataset.name;
  if (e.target && e.target.classList.contains("remove-all")) {
    removeItem(name);
  } else if (e.target && e.target.classList.contains("add-one")) {
    addItem(name);
  } else if (e.target && e.target.classList.contains("remove-one")) {
    removeItem(name, 1);
  }
}

// ----------------------------------------
// Handle Change Events on Update Input
itemList.onchange = function (e) {
  const name = e.target.dataset.name;
  const qty = parseInt(e.target.value);
  if (e.target && e.target.classList.contains("update")) {
    updateCart(name, qty);
  }
}

// ----------------------------------------
// Get Qty
function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i++) {
    qty += cart[i].qty;
  }
  return qty;
}

// ----------------------------------------
// Get Total
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2);
}

// ----------------------------------------
// Show Items
function showItems() {
  const qty = getQty();
  const total = getTotal();

  let itemStr = "";
  cart.forEach(function (item) {
    const {name, price, qty} = item;
    itemStr += `<li>
    ${name} $${price} x ${qty} = ${(price * qty).toFixed(2)}
    <button class="remove-all" data-name="${name}">Remove</button>
    <button class="add-one" data-name="${name}">+</button>
    <button class="remove-one" data-name="${name}">-</button>
    <input class="update" type="number" data-name="${name}">
    </li>`;
  })

  cartQty.innerHTML = `You have ${qty} items in your cart`;
  itemList.innerHTML = itemStr;
  cartTotal.innerHTML = `Total in cart: $${total}`;
}

// ----------------------------------------
// Add Item
function addItem(name, price) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty++;
      showItems();
      return;
    }
  }
    const item = {name, price, qty: 1};
    cart.push(item);
    showItems();
}

// ----------------------------------------
// Remove Item 
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name){
      if (qty > 0) {
        cart[i].qty -= qty;
      }
      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1)
      }
      showItems();
      return;
    }
  }
}

// ----------------------------------------
// Update Cart
function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name);
        return
      }
      cart[i].qty = qty;
      showItems();
      return
    }
  }
}
