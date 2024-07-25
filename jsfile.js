const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const check_acc = document.querySelector('.payButton');

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "white",
        img: "./img/img1.png",
      },
      {
        code: "black",
        img: "./img/imgb6.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "red",
        img: "./img/imgr7.png",
      },
      {
        code: "green",
        img: "./img/img2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "black",
        img: "./img/img3.png",
      },
      {
        code: "white",
        img: "./img/blazer.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/img4.png",
      },
       {
         code: "lightgray",
         img: "./img/imgw9.png",

      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "brown",
        img: "./img/img5.png",
      },
      {
        code: "blue",
        img: "./img/imgb10.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
  
    wrapper.style.transform = `translateX(${-100 * index}vw)`;


    choosenProduct = products[index];


    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;


    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});
currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
    cart_add.addEventListener("onclick",()=>{
    addToCart(choosenProduct.title,choosenProduct.price)
  });
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
const cartpage=document.getElementById("cartpage")

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
document.querySelector("#contactus").addEventListener('click',()=>
{
  window.open("./contactpage/contact.html")
})
document.querySelector("#aboutus").addEventListener('click',()=>
{
  window.open("./aboutus/aboutus.html")
})
document.querySelector("#cart-page").addEventListener('click',()=>
{
   window.open("./cartpage/cart.html")
})

products.forEach(values=>{
  function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(values.title===productName){
        cart.push({ name: values.title, price: values.price,});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
    
}
}
)