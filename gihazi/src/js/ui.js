/**
 * ui.js
 * Gihazi (جهازي) - Shared UI Interactions & Components
 * 
 * Manages toasts, mobile navigation drawer, native quick-view dialog modal,
 * counter badges synchronization, and reusable UI behaviors.
 */

import { getProductById, formatPrice } from './productData.js';
import { addToCart, getCartCount } from './cart.js';
import { toggleWishlist, isInWishlist, getWishlistCount } from './wishlist.js';
import { toggleCompare, isInCompare, getCompareCount } from './comparison.js';

/**
 * Display a modern toast notification
 * @param {string} message 
 * @param {'success'|'info'|'warning'|'error'} type 
 * @param {number} duration 
 */
export function showToast(message, type = 'success', duration = 3200) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all duration-300 transform translate-y-3 opacity-0 text-white`;

  let iconSvg = '';
  if (type === 'success') {
    toast.classList.add('bg-slate-900', 'border', 'border-emerald-500/40');
    iconSvg = `<span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">✓</span>`;
  } else if (type === 'warning') {
    toast.classList.add('bg-slate-900', 'border', 'border-amber-500/40');
    iconSvg = `<span class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">!</span>`;
  } else {
    toast.classList.add('bg-slate-900', 'border', 'border-blue-500/40');
    iconSvg = `<span class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">ℹ</span>`;
  }

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      ${iconSvg}
      <span class="leading-snug">${message}</span>
    </div>
    <button type="button" class="text-slate-400 hover:text-white text-base leading-none px-1" aria-label="إغلاق">&times;</button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => removeToast(toast));

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  const timer = setTimeout(() => removeToast(toast), duration);

  function removeToast(el) {
    clearTimeout(timer);
    el.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => el.remove(), 250);
  }
}

/**
 * Update all counter badges in header & mobile drawer (deprecated - badges removed per design)
 */
export function updateBadges() {
  // Number badges removed from navbar per user request
}

/**
 * Initialize reactive badge synchronization across pages
 */
export function initBadgeListeners() {
  // Kept for backward compatibility
}

/**
 * Initialize expandable search bar toggle
 */
export function initExpandableSearch() {
  const toggleBtn = document.getElementById('search-toggle-btn');
  const searchBar = document.getElementById('expandable-search-bar');
  const closeBtn = document.getElementById('search-bar-close');

  if (!toggleBtn || !searchBar) return;

  function openSearch() {
    searchBar.classList.remove('hidden');
    const input = searchBar.querySelector('.header-search-input');
    if (input) {
      setTimeout(() => input.focus(), 50);
    }
  }

  function closeSearch() {
    searchBar.classList.add('hidden');
    const dropdown = searchBar.querySelector('.search-suggestions-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchBar.classList.contains('hidden')) {
      openSearch();
    } else {
      closeSearch();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSearch();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchBar.classList.contains('hidden')) {
      closeSearch();
    }
  });
}

/**
 * Initialize mobile navigation menu drawer
 */
export function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (!drawer) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      requestAnimationFrame(() => backdrop.classList.add('opacity-100'));
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    if (backdrop) {
      backdrop.classList.remove('opacity-100');
      setTimeout(() => backdrop.classList.add('hidden'), 200);
    }
    document.body.classList.remove('overflow-hidden');
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/**
 * Open native Quick-View modal for a product
 * @param {string} productId 
 */
export async function openQuickViewModal(productId) {
  const product = await getProductById(productId);
  if (!product) return;

  let modal = document.getElementById('quick-view-dialog');
  if (!modal) {
    modal = document.createElement('dialog');
    modal.id = 'quick-view-dialog';
    modal.className = 'fixed inset-0 m-auto max-w-2xl w-[92%] p-0 rounded-2xl shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm z-50 bg-white overflow-hidden text-slate-800';
    document.body.appendChild(modal);
  }

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  modal.innerHTML = `
    <div class="relative max-h-[90vh] overflow-y-auto p-5 sm:p-7">
      <button id="close-quick-view" type="button" class="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-lg font-bold transition-colors" aria-label="إغلاق">&times;</button>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <!-- Image & Badges -->
        <div class="relative bg-slate-50 rounded-xl p-4 flex items-center justify-center aspect-square border border-slate-100">
          <span class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">${product.brand}</span>
          <img src="${product.image}" alt="${product.name}" class="max-h-56 max-w-full object-contain" />
        </div>

        <!-- Information -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>${product.categoryName}</span>
            <span>•</span>
            <span class="font-mono text-blue-600">${product.model}</span>
          </div>

          <h3 class="text-lg font-bold text-slate-900 leading-snug">${product.name}</h3>

          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-blue-700">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="text-sm text-slate-400 line-through">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">${product.shortDescription}</p>

          <!-- Key Specs Preview -->
          <div class="bg-slate-50 rounded-lg p-2.5 text-xs space-y-1 border border-slate-100">
            ${Object.entries(product.specifications || {}).slice(0, 3).map(([k, v]) => `
              <div class="flex justify-between text-slate-600">
                <span class="font-semibold text-slate-700">${k}:</span>
                <span>${v}</span>
              </div>
            `).join('')}
          </div>

          <!-- Actions -->
          <div class="pt-2 space-y-2">
            <button id="modal-add-to-cart" type="button" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
              <span>🛒</span>
              <span>أضف إلى السلة</span>
            </button>

            <div class="grid grid-cols-2 gap-2 text-xs">
              <button id="modal-toggle-wishlist" type="button" class="border ${inWishlist ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <span>${inWishlist ? '❤️' : '🤍'}</span>
                <span>${inWishlist ? 'في المفضلة' : 'أضف للمفضلة'}</span>
              </button>
              <button id="modal-toggle-compare" type="button" class="border ${inCompare ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <span>⚖️</span>
                <span>${inCompare ? 'في المقارنة' : 'قارن'}</span>
              </button>
            </div>

            <a href="/product.html?id=${product.id}" class="block text-center text-xs text-blue-600 hover:text-blue-800 font-bold pt-1">
              عرض المواصفات الكاملة والتفاصيل &larr;
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.showModal();

  // Modal events
  modal.querySelector('#close-quick-view').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  const modalCartBtn = modal.querySelector('#modal-add-to-cart');
  modalCartBtn.addEventListener('click', () => {
    addToCart(product.id, 1);
    showToast(`تمت إضافة "${product.name}" إلى سلة المشتريات`);
    modal.close();
  });

  const modalWishlistBtn = modal.querySelector('#modal-toggle-wishlist');
  modalWishlistBtn.addEventListener('click', () => {
    const added = toggleWishlist(product.id);
    showToast(added ? 'تمت الإضافة إلى المفضلة' : 'تم الحذف من المفضلة', added ? 'success' : 'info');
    modalWishlistBtn.innerHTML = `<span>${added ? '❤️' : '🤍'}</span><span>${added ? 'في المفضلة' : 'أضف للمفضلة'}</span>`;
  });

  const modalCompareBtn = modal.querySelector('#modal-toggle-compare');
  modalCompareBtn.addEventListener('click', async () => {
    const res = await toggleCompare(product.id);
    showToast(res.message, res.added ? 'success' : 'info');
    modalCompareBtn.innerHTML = `<span>⚖️</span><span>${res.added ? 'في المقارنة' : 'قارن'}</span>`;
  });
}
