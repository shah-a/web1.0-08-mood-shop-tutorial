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
  img.width = 400;
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