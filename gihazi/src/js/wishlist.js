/**
 * wishlist.js
 * Gihazi (جهازي) - Wishlist / Favorites State
 * 
 * Manages customer favorites in localStorage and dispatches 'wishlist:updated' events.
 */

import { getProductById } from './productData.js';
import { renderProductCards } from './productCards.js';

const WISHLIST_STORAGE_KEY = 'gihazi_wishlist_v1';

/**
 * Get all product IDs in wishlist
 * @returns {Array<string>}
 */
export function getWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read wishlist:', err);
    return [];
  }
}

/**
 * Save wishlist IDs and fire update event
 * @param {Array<string>} ids 
 */
function saveWishlistIds(ids) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { ids } }));
  } catch (err) {
    console.error('Failed to save wishlist:', err);
  }
}

/**
 * Check if a product is in wishlist
 * @param {string} productId 
 * @returns {boolean}
 */
export function isInWishlist(productId) {
  const ids = getWishlistIds();
  return ids.includes(productId);
}

/**
 * Toggle product in wishlist (add if missing, remove if present)
 * @param {string} productId 
 * @returns {boolean} true if added, false if removed
 */
export function toggleWishlist(productId) {
  let ids = getWishlistIds();
  const exists = ids.includes(productId);

  if (exists) {
    ids = ids.filter(id => id !== productId);
    saveWishlistIds(ids);
    return false;
  } else {
    ids.push(productId);
    saveWishlistIds(ids);
    return true;
  }
}

/**
 * Remove a specific product from wishlist
 * @param {string} productId 
 */
export function removeFromWishlist(productId) {
  let ids = getWishlistIds();
  ids = ids.filter(id => id !== productId);
  saveWishlistIds(ids);
}

/**
 * Get count of wishlist items
 * @returns {number}
 */
export function getWishlistCount() {
  return getWishlistIds().length;
}

/**
 * Get fully hydrated products currently in wishlist
 * @returns {Promise<Array<Object>>}
 */
export async function getWishlistProducts() {
  const ids = getWishlistIds();
  const products = [];

  for (const id of ids) {
    const product = await getProductById(id);
    if (product) {
      products.push(product);
    }
  }

  return products;
}

/**
 * Initialize wishlist.html page
 */
export async function initWishlistPage() {
  const container = document.getElementById('wishlist-page-container');
  if (!container) return;

  async function render() {
    const products = await getWishlistProducts();

    if (products.length === 0) {
      container.innerHTML = `
        <div class="max-w-md mx-auto py-20 px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center text-3xl">
            🤍
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-2">قائمة المفضلة فارغة</h2>
          <p class="text-xs text-slate-500 mb-6 leading-relaxed">
            لم تقم بحفظ أي أجهزة في قائمتك المفضلة حتى الآن. احفظ أجهزتك المفضلة للرجوع إليها ومقارنتها في أي وقت.
          </p>
          <a href="/products.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm">
            استكشف أحدث الأجهزة &larr;
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900">أجهزتك المفضلة</h1>
          <p class="text-xs text-slate-500 mt-1">لديك ${products.length} أجهزة محفوظة في قائمة رغباتك</p>
        </div>
        <button id="btn-clear-wishlist" type="button" class="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3.5 rounded-xl transition-colors">
          إفراغ المفضلة
        </button>
      </div>

      <div id="wishlist-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
    `;

    const grid = container.querySelector('#wishlist-grid');
    renderProductCards(products, grid);

    // Bind Clear All
    const clearBtn = container.querySelector('#btn-clear-wishlist');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveWishlistIds([]);
        render();
      });
    }
  }

  render();
  window.addEventListener('wishlist:updated', render);
}

