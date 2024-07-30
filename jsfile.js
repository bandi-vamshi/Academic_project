const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const check_acc = document.querySelector('.payButton');

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 1999,
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
    price: 1149,
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
    price: 2100,
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
    price: 2999,
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
    price: 1599,
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
    currentProductPrice.textContent =  choosenProduct.price;
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
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.searchInput');
  const products = document.querySelectorAll('.sliderItem');
  const suggestionsBox = document.querySelector('.suggestions');
  const searchIcon = document.querySelector('.searchIcon');

  function searchProduct(query) {
      const matchedProduct = Array.from(products).find(product => {
          const productName = product.dataset.productName.toLowerCase();
          return productName.includes(query.toLowerCase());
      });

      if (matchedProduct) {
          matchedProduct.scrollIntoView({ behavior: 'smooth' });
          matchedProduct.style.border = '2px solid #ff0000';
          setTimeout(() => {
              matchedProduct.style.border = 'none';
          }, 2000);
      } else {
          alert('Product not found');
      }
  }

  searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
          const suggestions = Array.from(products)
              .map(product => product.dataset.productName)
              .filter(productName => productName.toLowerCase().includes(query));
          displaySuggestions(suggestions);
      } else {
          suggestionsBox.innerHTML = '';
      }
  });

  searchIcon.addEventListener('click', function () {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
          searchProduct(query);
      }
  });
});

function loadVideo(videoId, containerId) {
  var container = document.getElementById(containerId);
  var iframe = document.createElement('iframe');
  iframe.width = '560';
  iframe.height = '315';
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  container.innerHTML = '';
  container.appendChild(iframe);
}
function onPlayButtonClick() {
  loadVideo('VIDEO_ID_HERE', 'videoContainerId');
}
function handleCheckout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let lastItem = cart[cart.length - 1];
  const trackingData = {
      name: lastItem.name,
      price: lastItem.price,
      description: lastItem.description,
      status: 'Processing',
      estimatedDelivery: calculateEstimatedDelivery()
  };
  
  localStorage.setItem('trackingData', JSON.stringify(trackingData));
  window.alert("Order placed successfully")
}

function calculateEstimatedDelivery() {
  let today = new Date();
  today.setDate(today.getDate() + 7);
  return today.toDateString();
}

const orders_btn = document.querySelector('#orders');
orders_btn.addEventListener('click',()=>{
  window.open("./orders/tracking.html")
});
