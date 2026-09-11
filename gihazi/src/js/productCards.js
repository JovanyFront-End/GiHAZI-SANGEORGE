/**
 * productCards.js
 * Gihazi (جهازي) - Reusable Dynamic Product Card Component
 * 
 * Generates and binds accessible, high-performance, responsive product cards.
 */

import { formatPrice } from './productData.js';
import { addToCart } from './cart.js';
import { toggleWishlist, isInWishlist } from './wishlist.js';
import { toggleCompare, isInCompare } from './comparison.js';
import { showToast, openQuickViewModal } from './ui.js';

/**
 * Generate a single product card DOM element
 * @param {Object} product 
 * @returns {HTMLElement}
 */
export function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'group relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden';
  card.setAttribute('data-product-id', product.id);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  // Discount calculation badge
  let discountBadge = '';
  if (product.oldPrice && product.oldPrice > product.price) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    discountBadge = `<span class="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-2.5 py-1 rounded-full">خصم ${discount}%</span>`;
  }

  // Stock status indicator
  const stockBadge = product.availability === 'in-stock'
    ? `<span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>متوفر</span>`
    : `<span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400"><span class="w-2 h-2 rounded-full bg-slate-300"></span>غير متوفر</span>`;

  card.innerHTML = `
    <!-- Media Section -->
    <div class="relative bg-slate-50/70 p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
      
      <!-- Top Status Badges -->
      <div class="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
        <span class="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs">${product.brand}</span>
        ${discountBadge}
      </div>

      <!-- Quick Action Buttons -->
      <div class="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
        <button type="button" class="btn-wishlist w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs flex items-center justify-center transition-all active:scale-90 hover:bg-white ${inWishlist ? 'text-red-500' : 'text-slate-900 hover:text-red-500'}" aria-label="أضف للمفضلة" title="${inWishlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}">
          <svg class="wishlist-icon w-4 h-4 stroke-current stroke-2" fill="${inWishlist ? 'currentColor' : 'none'}" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <button type="button" class="btn-compare w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs flex items-center justify-center transition-all active:scale-90 hover:bg-white ${inCompare ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'}" aria-label="أضف للمقارنة" title="${inCompare ? 'في المقارنة' : 'أضف للمقارنة'}">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </button>
      </div>

      <!-- Product Image -->
      <a href="/product.html?id=${product.id}" class="w-full h-full flex items-center justify-center p-2 focus:outline-none" aria-label="${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out" />
      </a>

      <!-- Quick View Floating Bar -->
      <button type="button" class="btn-quick-view absolute bottom-3.5 inset-x-4 bg-slate-900 hover:bg-black text-white text-xs font-medium py-2.5 px-3 rounded-xl backdrop-blur-md shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 flex items-center justify-center gap-2" aria-label="نظرة سريعة">
        <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>نظرة سريعة</span>
      </button>
    </div>

    <!-- Content Body -->
    <div class="p-5 flex flex-col flex-1 justify-between gap-4">
      <div>
        <!-- Category & Rating Row -->
        <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>${product.categoryName}</span>
          <div class="flex items-center gap-1 font-medium text-slate-700">
            <svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>${product.rating}</span>
          </div>
        </div>

        <!-- Product Title -->
        <h3 class="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
          <a href="/product.html?id=${product.id}">${product.name}</a>
        </h3>
      </div>

      <!-- Price & Actions Section -->
      <div class="pt-3 border-t border-slate-100 flex flex-col gap-3.5">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-lg font-black text-slate-900 leading-none">${formatPrice(product.price)}</div>
            ${product.oldPrice ? `<div class="text-xs text-slate-400 line-through mt-1">${formatPrice(product.oldPrice)}</div>` : ''}
          </div>
          ${stockBadge}
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-2.5">
          <button type="button" class="btn-add-cart bg-slate-900 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs" aria-label="أضف إلى السلة">
            <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span>أضف للعربة</span>
          </button>
          <a href="/product.html?id=${product.id}" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center">
            <span>التفاصيل</span>
            <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 rotate-180" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  // Bind Card Interactions
  const addCartBtn = card.querySelector('.btn-add-cart');
  addCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
    showToast(`تمت إضافة "${product.name}" إلى السلة`);
  });

  const wishlistBtn = card.querySelector('.btn-wishlist');
  const wishlistIcon = card.querySelector('.wishlist-icon');
  wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const added = toggleWishlist(product.id);
    wishlistBtn.classList.toggle('text-red-500', added);
    wishlistBtn.classList.toggle('text-slate-900', !added);
    wishlistIcon.setAttribute('fill', added ? 'currentColor' : 'none');
    showToast(added ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة', added ? 'success' : 'info');
  });

  const compareBtn = card.querySelector('.btn-compare');
  compareBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = await toggleCompare(product.id);
    compareBtn.classList.toggle('text-blue-600', res.added);
    compareBtn.classList.toggle('text-slate-900', !res.added);
    showToast(res.message, res.added ? 'success' : 'info');
  });

  const quickViewBtn = card.querySelector('.btn-quick-view');
  quickViewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openQuickViewModal(product.id);
  });

  return card;
}

/**
 * Render a list of products into a container
 * @param {Array<Object>} productsList 
 * @param {HTMLElement} container 
 */
export function renderProductCards(productsList, container) {
  if (!container) return;
  container.innerHTML = '';

  if (!productsList || productsList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 px-4 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <svg class="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-slate-800">لم يتم العثور على أي أجهزة</h3>
        <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">جرب تغيير معايير البحث أو تصفية المنتجات للوصول إلى طلبك.</p>
      </div>
    `;
    return;
  }

  productsList.forEach(product => {
    container.appendChild(createProductCard(product));
  });
}