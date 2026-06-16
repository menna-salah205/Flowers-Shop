/* ===================== FLOWERS SHOP - MAIN JS ===================== */

// ---- DATA ----
const PRODUCTS = [
  { id: 1, name: "Pink Rose Bouquet", category: "roses", price: 47, oldPrice: 60, rating: 5, reviews: 42, badge: "Best Seller", desc: "A stunning bouquet of fresh pink roses, perfect for any romantic occasion. Hand-picked and arranged by our expert florists.", img: "images/product-1-Bq2UkAJN.jpg" },
  { id: 2, name: "Daisy Dream", category: "seasonal", price: 35, oldPrice: null, rating: 4, reviews: 28, badge: null, desc: "Cheerful daisies arranged in a charming bouquet that brightens any room with natural joy and freshness.", img: "images/product-daisies-K-o_is6L.jpg" },
  { id: 3, name: "Purple Orchid", category: "orchids", price: 65, oldPrice: 80, rating: 5, reviews: 36, badge: "Sale", desc: "Exotic purple orchids that bring elegance and sophistication to your space. Long-lasting and beautiful.", img: "images/product-orchids-7PNN1a1p.jpg" },
  { id: 4, name: "Tulip Garden", category: "tulips", price: 42, oldPrice: null, rating: 4, reviews: 19, badge: "New", desc: "A vibrant mix of seasonal tulips in rich colors. Fresh from local growers for maximum longevity.", img: "images/product-tulips-DZToiz-P.jpg" },
  { id: 5, name: "Lavender Fields", category: "seasonal", price: 38, oldPrice: null, rating: 5, reviews: 54, badge: "Popular", desc: "Soothing lavender bundles that fill your home with a calming fragrance and natural beauty.", img: "images/product-lavender-CN8W53RS.jpg" },
  { id: 6, name: "White Rose Set", category: "roses", price: 55, oldPrice: 70, rating: 4, reviews: 31, badge: "Sale", desc: "Pure white roses symbolizing new beginnings and pure love. Ideal for weddings and special moments.", img: "images/product-peonies-B8UaWEA3.jpg" },
  { id: 7, name: "Orchid Crown", category: "orchids", price: 78, oldPrice: null, rating: 5, reviews: 22, badge: null, desc: "A royal arrangement of mixed orchids creating a crown-like centerpiece for your most special occasions.", img: "images/product-roses-Cw4VXQYb.jpg" },
  { id: 8, name: "Spring Mix", category: "seasonal", price: 44, oldPrice: 55, rating: 4, reviews: 47, badge: "Sale", desc: "A delightful seasonal mix capturing the spirit of spring with colorful blooms and lush greenery.", img: "images/product-sunflowers-CozeKVrd.jpg" },
];

// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('flowers_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('flowers_favs') || '[]');
let user = JSON.parse(localStorage.getItem('flowers_user') || 'null');
let appliedDiscount = 0;


// ---- SAVE STATE ----
function saveCart() { localStorage.setItem('flowers_cart', JSON.stringify(cart)); updateBadges(); }
function saveFavs() { localStorage.setItem('flowers_favs', JSON.stringify(favorites)); updateBadges(); }
function saveUser() { localStorage.setItem('flowers_user', JSON.stringify(user)); }

// ---- BADGES ----
function updateBadges() {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const favCount = favorites.length;
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('.fav-badge').forEach(el => {
    el.textContent = favCount;
    el.style.display = favCount > 0 ? 'flex' : 'none';
  });
}

// ---- TOAST ----
function showToast(msg, type = 'green') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type === 'pink' ? 'pink' : ''}`;
  toast.innerHTML = `<i class="fa-solid fa-${type === 'pink' ? 'heart' : 'check-circle'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- CART OPERATIONS ----
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; }
  else { cart.push({ ...product, qty }); }
  saveCart();
  showToast(`${product.name} added to cart!`);
  animateCartIcon();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartPage();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  if (item.qty === 0) { removeFromCart(productId); return; }
  saveCart();
  renderCartPage();
}

function animateCartIcon() {
  document.querySelectorAll('.cart-icon-btn').forEach(btn => {
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 300);
  });
}

// ---- FAVORITES OPERATIONS ----
function toggleFavorite(productId) {
  const idx = favorites.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast(`${product.name} added to favorites!`, 'pink');
  } else {
    favorites.splice(idx, 1);
    showToast(`${product.name} removed from favorites!`, 'pink');
  }
  saveFavs();
  document.querySelectorAll(`.fav-btn[data-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', favorites.includes(productId));
  });
  if (document.getElementById('favorites-grid')) renderFavoritesPage();
}

function isFav(id) { return favorites.includes(id); }

// ---- NAVBAR ----
function initNavbar() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.querySelector('.mobile-close-btn');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });

  function openMobileMenu() {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobileMenu);
  hamburger?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openMobileMenu(); });
  closeBtn?.addEventListener('click', closeMobileMenu);

  // Close on overlay click (outside the inner panel)
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close when a nav link is clicked
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Set active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') ||
        (href && page.includes(href.replace('.html', '')))) {
      link.classList.add('active');
    }
  });
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- PRODUCT CARD HTML ----
function productCardHTML(p) {
  const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
  return `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="img-wrapper">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn fav-btn ${isFav(p.id)?'active':''}" data-id="${p.id}" title="Add to favorites" onclick="toggleFavorite(${p.id})">
            <i class="fa-${isFav(p.id)?'solid':'regular'} fa-heart"></i>
          </button>
          <button class="action-btn" title="Quick view" onclick="openQuickView(${p.id})">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h5>${p.name}</h5>
        <div class="category">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</div>
        <div class="stars">${stars} <span style="color:var(--gray);font-family:'Poppins',sans-serif;font-size:0.75rem">(${p.reviews})</span></div>
        <div class="product-bottom">
          <span class="product-price">
            $${p.price}
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ''}
          </span>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

// ---- QUICK VIEW MODAL ----
function openQuickView(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.querySelector('.modal-body').innerHTML = `
    <div class="quick-view-content">
      <img src="${p.img}" alt="${p.name}" class="quick-view-img">
      <div class="quick-view-info">
        <h4>${p.name}</h4>
        <div class="qv-price">$${p.price} ${p.oldPrice?`<span style="font-size:0.9rem;color:#bbb;text-decoration:line-through">$${p.oldPrice}</span>`:''}</div>
        <p>${p.desc}</p>
        <div class="qty-selector">
          <label>Qty:</label>
          <button class="qty-btn" onclick="this.nextElementSibling.value=Math.max(1,+this.nextElementSibling.value-1)">−</button>
          <input type="number" value="1" min="1" max="20" id="qv-qty" style="width:50px;text-align:center;border:1.5px solid #e0e0e0;border-radius:8px;padding:6px;font-family:'Poppins',sans-serif;">
          <button class="qty-btn" onclick="this.previousElementSibling.value=Math.min(20,+this.previousElementSibling.value+1)">+</button>
        </div>
        <div class="quick-view-btns">
          <button class="qv-add-btn" onclick="addToCart(${p.id}, parseInt(document.getElementById('qv-qty').value)); closeModal('quick-view-modal')">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <button class="qv-fav-btn ${isFav(p.id)?'active':''}" onclick="toggleFavorite(${p.id}); this.classList.toggle('active')">
            <i class="fa-${isFav(p.id)?'solid':'regular'} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>`;
  modal.classList.add('open');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

// ---- AUTH MODAL ----
function openAuthModal() {
  document.getElementById('auth-modal')?.classList.add('open');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t => t.style.display = 'none');
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(`${tab}-form`)?.style.setProperty('display', 'block');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = e.target.querySelector('input[type="password"]').value;
  if (!email || !password) {
    showToast('Please fill in all fields', 'pink');
    return;
  }
  const name = email.split('@')[0];
  user = { name: name.charAt(0).toUpperCase() + name.slice(1), email, avatar: name.charAt(0).toUpperCase() };
  saveUser();
  closeModal('auth-modal');
  showToast(`Welcome back, ${user.name}!`);
  updateUserUI();
  if (document.getElementById('profile-section')) renderUserPage();
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = e.target.querySelector('input[type="password"]').value;
  if (!name || !email || !password) {
    showToast('Please fill in all fields', 'pink');
    return;
  }
  user = { name, email, avatar: name.charAt(0).toUpperCase() };
  saveUser();
  closeModal('auth-modal');
  showToast(`Welcome, ${user.name}!`);
  updateUserUI();
  if (document.getElementById('profile-section')) renderUserPage();
}

function handleLogout() {
  user = null;
  saveUser();
  showToast('Logged out successfully!');
  updateUserUI();
  if (document.getElementById('profile-section')) renderUserPage();
}

function updateUserUI() {
  const userIcon = document.getElementById('user-icon-display');
  if (!userIcon) return;
  if (user) {
    const avatarSpan = `<span style="background:var(--pink);color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-family:'Poppins',sans-serif;font-weight:700">${user.avatar}</span>`;
    userIcon.innerHTML = avatarSpan;
  } else {
    userIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`;
  }
}

// ---- HOME PAGE PRODUCTS ----
function renderHomeProducts() {
  const grid = document.getElementById('home-products-grid');
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 4);
  grid.innerHTML = featured.map(productCardHTML).join('');
}

// ---- PRODUCTS PAGE ----
let currentPage = 1;
const PER_PAGE = 6;
let filteredProducts = [...PRODUCTS];

  function setSidebarCat(btn) {
    document.querySelectorAll('.sidebar-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  let saleOnly = false;
  function filterSale(checked) {
    saleOnly = checked;
    if (checked) {
      filteredProducts = PRODUCTS.filter(p => p.oldPrice);
    } else {
      filteredProducts = [...PRODUCTS];
    }
    currentPage = 1;
    renderProductsPage();
  }

function renderProductsPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const start = (currentPage - 1) * PER_PAGE;
  const pageProducts = filteredProducts.slice(start, start + PER_PAGE);
  grid.innerHTML = pageProducts.length
    ? pageProducts.map(p => `<div class="col-md-6 col-lg-4">${productCardHTML(p)}</div>`).join('')
    : `<div class="col-12 text-center py-5"><p style="font-family:'Poppins',sans-serif;color:var(--gray)">No products found.</p></div>`;
  renderPagination();
  document.getElementById('products-count').textContent = `Showing ${pageProducts.length} of ${filteredProducts.length} products`;
}

function renderPagination() {
  const pag = document.getElementById('pagination');
  if (!pag) return;
  const total = Math.ceil(filteredProducts.length / PER_PAGE);
  pag.innerHTML = Array.from({length: total}, (_, i) => `
    <button class="page-btn ${i+1===currentPage?'active':''}" onclick="goToPage(${i+1})">${i+1}</button>
  `).join('');
}

function goToPage(p) { currentPage = p; renderProductsPage(); window.scrollTo({top:0,behavior:'smooth'}); }

function filterByCategory(cat) {
  filteredProducts = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);
  currentPage = 1;
  renderProductsPage();
}

function sortProducts(val) {
  if (val === 'price-asc') filteredProducts.sort((a,b) => a.price - b.price);
  else if (val === 'price-desc') filteredProducts.sort((a,b) => b.price - a.price);
  else if (val === 'rating') filteredProducts.sort((a,b) => b.rating - a.rating);
  else filteredProducts = [...PRODUCTS];
  renderProductsPage();
}

function filterByPrice(max) {
  filteredProducts = PRODUCTS.filter(p => p.price <= max);
  document.getElementById('price-max-display').textContent = `$${max}`;
  currentPage = 1;
  renderProductsPage();
}

// ---- CART PAGE ----
// ---- CART PAGE ----

function renderCartPage() {
  const cartList = document.getElementById('cart-list');
  const cartSummaryEl = document.getElementById('cart-summary-area');
  const emptyState = document.getElementById('cart-empty');
  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (cartSummaryEl) cartSummaryEl.style.display = 'none';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';
  if (cartSummaryEl) cartSummaryEl.style.display = 'block';

  cartList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h6>${item.name}</h6>
        <span class="cat">${item.category}</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  const rawSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmount = appliedDiscount > 0 ? (rawSubtotal * appliedDiscount) / 100 : 0;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const shipping = subtotalAfterDiscount > 60 ? 0 : 8;
  const total = subtotalAfterDiscount + shipping;

  document.getElementById('subtotal-val').textContent = `$${rawSubtotal.toFixed(2)}`;
  document.getElementById('shipping-val').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  document.getElementById('total-val').textContent = `$${total.toFixed(2)}`;
}

// ---- FAVORITES PAGE ----
function renderFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  const emptyEl = document.getElementById('favs-empty');
  if (!grid) return;
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  if (favProducts.length === 0) {
    grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  grid.innerHTML = favProducts.map(p => `<div class="col-sm-6 col-md-4 col-lg-3">${productCardHTML(p)}</div>`).join('');
}

// ---- USER PAGE ----
function renderUserPage() {
  const section = document.getElementById('profile-section');
  if (!section) return;
  if (!user) {
    section.innerHTML = `
      <div class="text-center py-5">
        <span class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1f4d20" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rose-icon lucide-rose"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span>
        <h4 style="font-family:'Island Moments',cursive;font-size:2.5rem;color:var(--green);margin-bottom:10px">Welcome!</h4>
        <p style="font-family:'Poppins',sans-serif;color:var(--gray);margin-bottom:25px">Sign in to view your profile, orders and saved addresses.</p>
        <button class="btn-primary-custom" style="border:none;cursor:pointer;display:inline-block" onclick="openAuthModal()">
          <i class="fa-solid fa-right-to-bracket"></i> Sign In
        </button>
      </div>`;
    return;
  }
  section.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="profile-card">
          <div class="profile-avatar">
            ${user.avatar}
            <div class="avatar-edit"><i class="fa-solid fa-pen"></i></div>
          </div>
          <h4>${user.name}</h4>
          <p class="user-email">${user.email}</p>
          <div class="profile-stats">
            <div class="profile-stat"><strong>${cart.length}</strong><span>Cart</span></div>
            <div class="profile-stat"><strong>${favorites.length}</strong><span>Saved</span></div>
            <div class="profile-stat"><strong>3</strong><span>Orders</span></div>
          </div>
        </div>
        <div style="background:#fff;border-radius:20px;padding:24px;box-shadow:var(--shadow)">
          <button class="submit-btn" onclick="handleLogout()"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</button>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="user-tabs">
          <div class="user-tab-nav">
            <button class="user-tab-btn active" onclick="switchUserTab('orders',this)">My Orders</button>
            <button class="user-tab-btn" onclick="switchUserTab('addresses',this)">Addresses</button>
            <button class="user-tab-btn" onclick="switchUserTab('settings',this)">Settings</button>
          </div>
          <div class="user-tab-content active" id="tab-orders">
            ${[
              {name:"Pink Rose Bouquet",date:"Jun 10, 2026",status:"Delivered",img:"images/product-lavender-CN8W53RS.jpg",price:"$47"},
              {name:"Purple Orchid",date:"Jun 5, 2026",status:"Processing",img:"images/product-orchids-7PNN1a1p.jpg",price:"$65"},
              {name:"Spring Mix",date:"May 28, 2026",status:"Delivered",img:"images/product-daisies-K-o_is6L.jpg",price:"$44"},
            ].map(o => `
              <div class="order-item">
                <img src="${o.img}" alt="${o.name}">
                <div class="order-item-info">
                  <h6>${o.name}</h6>
                  <span>${o.date} · ${o.price}</span>
                </div>
                <span class="order-status status-${o.status.toLowerCase()}">${o.status}</span>
              </div>`).join('')}
          </div>
          <div class="user-tab-content" id="tab-addresses">
            <div style="background:#fafafa;border-radius:14px;padding:20px;margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <strong style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:var(--green)">Home</strong>
                <span style="background:var(--light-pink);color:var(--pink);font-size:0.72rem;padding:3px 10px;border-radius:10px;font-family:'Poppins',sans-serif">Default</span>
              </div>
              <p style="font-family:'Poppins',sans-serif;font-size:0.85rem;color:var(--gray);margin:0">123 Garden Street, Bloom City, FL 33101</p>
            </div>
            <button class="btn-outline-custom" style="font-size:0.85rem;padding:10px 22px" onclick="showToast('Address feature coming soon!')">+ Add Address</button>
          </div>
          <div class="user-tab-content" id="tab-settings">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" value="${user.name}" id="settings-name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" value="${user.email}" id="settings-email">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="+1 (555) 000-0000">
            </div>
            <button class="submit-btn" onclick="saveSettings()">Save Changes</button>
          </div>
        </div>
      </div>
    </div>`;
}

function switchUserTab(tab, btn) {
  document.querySelectorAll('.user-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.user-tab-content').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
  document.getElementById(`tab-${tab}`)?.classList.add('active');
}

function saveSettings() {
  const name = document.getElementById('settings-name').value;
  const email = document.getElementById('settings-email').value;
  user = { ...user, name, email, avatar: name.charAt(0).toUpperCase() };
  saveUser();
  showToast('Settings saved!');
  renderUserPage();
  updateUserUI();
}

// ---- TESTIMONIALS SWIPER ----
function initTestimonialsSwiper() {
  if (!document.querySelector('.swiper-testimonial')) return;
  if (typeof Swiper === 'undefined') return;
  new Swiper('.swiper-testimonial', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
}

// ---- HERO SWIPER (if exists) ----
function initHeroSwiper() {
  if (!document.querySelector('.swiper-hero')) return;
  if (typeof Swiper === 'undefined') return;
  new Swiper('.swiper-hero', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.hero-pagination', clickable: true },
  });
}

// ---- CONTACT FORM ----
function handleContactForm(e) {
  e.preventDefault();
  showToast('Your message has been sent! We\'ll be in touch soon. 🌸');
  e.target.reset();
}

// ---- SUBSCRIBE FORM ----
function handleSubscribeForm(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`You're now subscribed with ${input.value}! 🌷`);
  input.value = '';
}

// ---- PRICE RANGE ----
function initPriceRange() {
  const slider = document.getElementById('price-slider');
  const display = document.getElementById('price-max-display');
  if (!slider || !display) return;
  slider.addEventListener('input', () => {
    display.textContent = `$${slider.value}`;
    filterByPrice(Number(slider.value));
  });
}

// ---- PAGE LOADER ----
function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 300);
    setTimeout(() => loader.remove(), 800);
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  hideLoader();
  initNavbar();
  initReveal();
  updateBadges();
  // updateUserUI runs after components.js injects the nav (same DOMContentLoaded tick but queued after)
  setTimeout(updateUserUI, 0);

  // Page-specific
  renderHomeProducts();
  renderProductsPage();
  renderCartPage();
  renderFavoritesPage();
  renderUserPage();

  // Swipers (loaded after lib)
  setTimeout(() => {
    initTestimonialsSwiper();
    initHeroSwiper();
  }, 300);



  // Price range
  initPriceRange();

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const newContactForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newContactForm, contactForm);
    newContactForm.addEventListener('submit', handleContactForm);
  }

  document.querySelectorAll('.subscribe-form').forEach(form => {
    form.removeAttribute('onsubmit');
    form.addEventListener('submit', handleSubscribeForm);
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  });
});