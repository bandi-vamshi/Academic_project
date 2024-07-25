// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const clearCartButton = document.getElementById('clear-cart');
  const btnclick = document.getElementById("add-to-cart-btn");

  let cart = [];

  function addItemToCart(id, name, price, image) {
      const existingItemIndex = cart.findIndex(item => item.id === id);
      if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
      } else {
          cart.push({ id, name, price, image, quantity: 1 });
      }
      renderCartItems();
      updateTotalPrice();
  }

  function removeItemFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      renderCartItems();
      updateTotalPrice();
  }

  function renderCartItems() {
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          cartItemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-info">
                  <h4>${item.name}</h4>
                  <p>$${item.price} x ${item.quantity}</p>
              </div>
              <button class="cart-item-remove" data-id="${item.id}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItemElement);
      });

      const removeButtons = document.querySelectorAll('.cart-item-remove');
      removeButtons.forEach(button => {
          button.addEventListener('click', () => {
              const id = button.getAttribute('data-id');
              removeItemFromCart(id);
          });
      });
  }

  function updateTotalPrice() {
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  clearCartButton.addEventListener('click', () => {
      cart = [];
      renderCartItems();
      updateTotalPrice();
  });
});

function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsDiv = document.getElementById('cart-items');
  let totalPrice = 0;

  if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
  } else {
      let items = '';
      cart.forEach((item, index) => {
          items += `<div class="cart-item">
              <p>${item.name} - Rs. ${item.price}</p>
              <p>${item.description}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
          </div>`;
          totalPrice += item.price * item.quantity;
      });
      cartItemsDiv.innerHTML = items;
  }
  document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  displayCart();
}

document.getElementById('clear-cart').addEventListener('click', clearCart);

window.onload = displayCart;
