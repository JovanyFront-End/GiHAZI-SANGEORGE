/**
 * main.js
 * Gihazi (جهازي) - Main Application Orchestrator
 * 
 * Sets up styles, shared UI listeners (badges, mobile menu, search),
 * and dispatches to appropriate page controllers based on current route.
 */

import '../style.css';
import { initBadgeListeners, initMobileMenu, initExpandableSearch } from './ui.js';
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';
import { initSearch } from './search.js';
import { getProducts } from './productData.js';
import { renderProductCards } from './productCards.js';

// Page-specific controllers
import { initProductsPageFilters } from './filters.js';
import { initProductDetailsPage } from './productDetails.js';
import { initComparePage } from './comparison.js';
import { initCartPage } from './cart.js';
import { initWishlistPage } from './wishlist.js';

/**
 * Initialize Home Page features
 */
async function initHomePage() {
  const showcaseContainer = document.getElementById('home-featured-grid');
  const tabs = document.querySelectorAll('.home-category-tab');

  if (showcaseContainer) {
    // Initial render: all products
    const initialProducts = await getProducts();
    renderProductCards(initialProducts.slice(0, 8), showcaseContainer);

    // Bind Category Tabs in Featured Showcase
    tabs.forEach(tab => {
      tab.addEventListener('click', async () => {
        tabs.forEach(t => {
          t.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
          t.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        });
        tab.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        tab.classList.add('bg-blue-600', 'text-white', 'shadow-sm');

        const category = tab.getAttribute('data-category');
        const filtered = await getProducts({ category });
        renderProductCards(filtered.slice(0, 8), showcaseContainer);
      });
    });
  }
}

/**
 * Initialize Contact Page interactions
 */
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'عميلنا العزيز';
      alert(`شكراً لك يا ${name}! تم إرسال رسالتك بنجاح إلى خدمة عملاء جهازي بالسويس، وسنقوم بالرد عليك في أقرب وقت.`);
      form.reset();
    });
  }
}

/**
 * Main application bootstrapper
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inject shared navbar first (creates DOM elements needed by the listeners below)
  initNavbar();
  initFooter();

  // Shared interactions across all pages
  initBadgeListeners();
  initMobileMenu();
  initExpandableSearch();
  initSearch();

  // Route detection based on pathname or body data attribute
  const pathname = window.location.pathname.toLowerCase();

  if (pathname.includes('products.html')) {
    initProductsPageFilters();
  } else if (pathname.includes('product.html')) {
    initProductDetailsPage();
  } else if (pathname.includes('compare.html')) {
    initComparePage();
  } else if (pathname.includes('cart.html')) {
    initCartPage();
  } else if (pathname.includes('wishlist.html')) {
    initWishlistPage();
  } else if (pathname.includes('contact.html')) {
    initContactPage();
  } else {
    // Default to Home Page
    initHomePage();
  }
});

function initHeroCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!track || dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = dots.length;
  let autoplayTimer = null;

  // Touch Swipe state for mobile
  let startX = 0;
  let isDragging = false;

  function updateCarousel(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(${currentIndex * 100}%)`;

    // Active pill indicator styling
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.className = 'carousel-dot w-8 h-2 rounded-full bg-white transition-all duration-300';
      } else {
        dot.className = 'carousel-dot w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300';
      }
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 4000); // 4 seconds interval
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Next / Previous Buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
      startAutoplay();
    });
  }

  // Dots indicator click
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      updateCarousel(idx);
      startAutoplay();
    });
  });

  // Touch Swipe Handling for Mobile Devices
  track.addEventListener('touchstart', (e) => {
    stopAutoplay();
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX < -40) {
      updateCarousel(currentIndex - 1);
    } else if (diffX > 40) {
      updateCarousel(currentIndex + 1);
    }
    startAutoplay();
  });

  // Pause autoplay on mouse hover (Desktop)
  const carouselElem = document.getElementById('hero-carousel');
  if (carouselElem) {
    carouselElem.addEventListener('mouseenter', stopAutoplay);
    carouselElem.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

document.addEventListener('DOMContentLoaded', initHeroCarousel);
