// Cart functionality for both product page and cart page
function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  if (!cartList || !cartTotal) return;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-img" />
      <span class="cart-name">${item.name}</span>
      <span class="cart-price">${item.price}</span>
      <button class="remove-btn" data-idx="${idx}">Remove</button>
    `;
    cartList.appendChild(li);
    total += parseInt(item.price.replace(/[^\d]/g, ''));
  });
  cartTotal.textContent = `Total: ₹${total}`;
  // Remove item
  cartList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons (on products page)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h2').textContent;
      const price = card.querySelector('.price').textContent;
      const img = card.querySelector('img').src;
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ name, price, img });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });

  // Render cart if on cart page
  if (document.getElementById('cart-list')) {
    renderCart();
  }
}); 