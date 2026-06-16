// ---- SHARED COMPONENTS ----

const NAV_HTML = `
<div class="mobile-menu" id="mobile-menu">
  <div class="mobile-menu-inner">
    <div class="mobile-menu-header">
      <span class="mobile-brand">Flowers</span>
      <button class="mobile-close-btn" aria-label="Close menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <nav class="mobile-nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="products.html">Products</a>
      <a href="contact.html">Contact</a>
    </nav>
  </div>
</div>

<nav>
  <a href="index.html" class="brand">Flowers</a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-icons">
    <a href="favorites.html" title="Favorites" style="position:relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>      <span class="badge-count fav-badge" style="display:none">0</span>
    </a>
    <a href="cart.html" title="Cart" style="position:relative" class="cart-icon-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>      <span class="badge-count cart-badge" style="display:none">0</span>
    </a>
    <a href="user.html" title="Account" id="user-icon-display">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>      </a>
  </div>
  <div class="hamburger" aria-label="Open menu" role="button" tabindex="0">
    <span></span><span></span><span></span>
  </div>
</nav>

<div id="toast-container" class="toast-container"></div>

<!-- Quick View Modal -->
<div class="modal-overlay" id="quick-view-modal">
  <div class="modal-box" style="max-width:700px">
    <button class="modal-close" onclick="closeModal('quick-view-modal')">✕</button>
    <div class="modal-body"></div>
  </div>
</div>

<!-- Auth Modal -->
<div class="modal-overlay" id="auth-modal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('auth-modal')">✕</button>
    <h3>Welcome Back</h3>
    <p>Sign in to your account or create a new one</p>
    <div class="modal-tabs">
      <button class="modal-tab-btn active" data-tab="login" onclick="switchAuthTab('login')">Sign In</button>
      <button class="modal-tab-btn" data-tab="register" onclick="switchAuthTab('register')">Register</button>
    </div>
    <div class="auth-tab" id="login-form" style="display:block">
      <form onsubmit="handleLogin(event)">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="login-email" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="submit-btn">Sign In</button>
      </form>
    </div>
    <div class="auth-tab" id="register-form" style="display:none">
      <form onsubmit="handleRegister(event)">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="reg-name" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="reg-email" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required minlength="6">
        </div>
        <button type="submit" class="submit-btn">Create Account</button>
      </form>
    </div>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div>
      <span class="footer-brand">Flowers</span>
      <p>We bring nature's beauty to your doorstep. Every bouquet is crafted with love by our expert florists using the freshest blooms from sustainable farms.</p>
      <div class="footer-socials">
        <a href="#" class="social-link"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="social-link"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" class="social-link"><i class="fa-brands fa-pinterest-p"></i></a>
        <a href="#" class="social-link"><i class="fa-brands fa-tiktok"></i></a>
      </div>
    </div>
    <div>
      <h5>Quick Links</h5>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">Our Story</a></li>
        <li><a href="products.html">Shop</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h5>Categories</h5>
      <ul class="footer-links">
        <li><a href="products.html">Roses</a></li>
        <li><a href="products.html">Orchids</a></li>
        <li><a href="products.html">Tulips</a></li>
        <li><a href="products.html">Seasonal</a></li>
      </ul>
    </div>
    <div>
      <h5>Get in Touch</h5>
      <div class="footer-contact-item"><i class="fa-solid fa-location-dot"></i><span>123 Garden Street, Bloom City, FL 33101</span></div>
      <div class="footer-contact-item"><i class="fa-solid fa-phone"></i><span>+1 (555) 123-4567</span></div>
      <div class="footer-contact-item"><i class="fa-solid fa-envelope"></i><span>hello@flowersshop.com</span></div>
      <div class="footer-contact-item"><i class="fa-solid fa-clock"></i><span>Mon–Sat: 8am – 8pm</span></div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Flowers Shop. All rights reserved.</p>
    <div class="footer-bottom-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Shipping Info</a>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
});
