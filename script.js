// Market-HuB demo interactions. No real payments or backend are connected.
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 18500, icon: "🎧" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 24000, icon: "⌚" },
  { id: 3, name: "Everyday Sneakers", category: "Fashion", price: 22000, icon: "👟" },
  { id: 4, name: "Classic Backpack", category: "Fashion", price: 16000, icon: "🎒" },
  { id: 5, name: "Home Desk Lamp", category: "Home", price: 12500, icon: "💡" },
  { id: 6, name: "Coffee Mug Set", category: "Home", price: 8500, icon: "☕" },
  { id: 7, name: "Sunglasses", category: "Accessories", price: 9500, icon: "🕶️" },
  { id: 8, name: "Wristwatch", category: "Accessories", price: 19500, icon: "⌚" }
];

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty-message");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartItemsElement = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutButton = document.getElementById("checkout-button");
const checkoutBackdrop = document.getElementById("checkout-backdrop");
const toast = document.getElementById("toast");

let selectedCategory = "All";
let cart = [];

function money(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
    return categoryMatch && searchMatch;
  });

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">${product.icon}</div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">${money(product.price)}</span>
          <button class="add-button" data-add="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filtered.length !== 0;
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = money(total);
  checkoutTotal.textContent = money(total);
  checkoutButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItemsElement.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div class="cart-row-art">${item.icon}</div>
      <div><h4>${item.name}</h4><small>${item.quantity} × ${money(item.price)}</small></div>
      <button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">Remove</button>
    </div>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}
function closeCheckout() {
  checkoutBackdrop.classList.remove("show");
  checkoutBackdrop.setAttribute("aria-hidden", "true");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.add));
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  renderCart();
  showToast(product.name + " added to cart");
});

cartItemsElement.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  cart = cart.filter(item => item.id !== Number(button.dataset.remove));
  renderCart();
});

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".category.active")?.classList.remove("active");
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  checkoutBackdrop.classList.add("show");
  checkoutBackdrop.setAttribute("aria-hidden", "false");
});
document.getElementById("close-checkout").addEventListener("click", closeCheckout);
checkoutBackdrop.addEventListener("click", event => {
  if (event.target === checkoutBackdrop) closeCheckout();
});

document.getElementById("checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  showToast("Demo order received. No payment was made.");
  cart = [];
  renderCart();
  event.currentTarget.reset();
  closeCheckout();
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeCheckout();
  }
});

renderProducts();
renderCart();
