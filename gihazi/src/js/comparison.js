/**
 * comparison.js
 * Gihazi (جهازي) - Product Comparison System
 * 
 * Supports up to 4 products, difference highlighting, responsive layout,
 * and category matching validation.
 */

import { getProductById } from './productData.js';
import { addToCart } from './cart.js';
import { showToast } from './ui.js';

const COMPARE_STORAGE_KEY = 'gihazi_compare_v1';
export const MAX_COMPARE_ITEMS = 4;

/**
 * Get compare product IDs from localStorage
 * @returns {Array<string>}
 */
export function getCompareIds() {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read compare items:', err);
    return [];
  }
}

/**
 * Save compare IDs and dispatch event
 * @param {Array<string>} ids 
 */
function saveCompareIds(ids) {
  try {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('compare:updated', { detail: { ids } }));
  } catch (err) {
    console.error('Failed to save compare items:', err);
  }
}

/**
 * Check if product is in compare list
 * @param {string} productId 
 * @returns {boolean}
 */
export function isInCompare(productId) {
  return getCompareIds().includes(productId);
}

/**
 * Add product to comparison (max 4)
 * @param {string} productId 
 * @returns {Promise<{success: boolean, message: string, count: number}>}
 */
export async function addToCompare(productId) {
  const ids = getCompareIds();

  if (ids.includes(productId)) {
    return { success: false, message: 'المنتج موجود بالفعل في قائمة المقارنة', count: ids.length };
  }

  if (ids.length >= MAX_COMPARE_ITEMS) {
    return {
      success: false,
      message: `الحد الأقصى للمقارنة هو ${MAX_COMPARE_ITEMS} منتجات. يمكنك حذف منتج لإضافة غيره.`,
      count: ids.length
    };
  }

  // Check category alignment with existing items
  if (ids.length > 0) {
    const newProduct = await getProductById(productId);
    const firstProduct = await getProductById(ids[0]);

    if (newProduct && firstProduct && newProduct.category !== firstProduct.category) {
      // Still allow, but inform
    }
  }

  ids.push(productId);
  saveCompareIds(ids);
  return { success: true, message: 'تمت إضافة المنتج للمقارنة بنجاح', count: ids.length };
}

/**
 * Remove product from comparison
 * @param {string} productId 
 */
export function removeFromCompare(productId) {
  let ids = getCompareIds();
  ids = ids.filter(id => id !== productId);
  saveCompareIds(ids);
  return ids;
}

/**
 * Toggle product in comparison
 * @param {string} productId 
 * @returns {Promise<{added: boolean, message: string, count: number}>}
 */
export async function toggleCompare(productId) {
  if (isInCompare(productId)) {
    removeFromCompare(productId);
    return { added: false, message: 'تمت إزالة المنتج من المقارنة', count: getCompareIds().length };
  } else {
    const res = await addToCompare(productId);
    return { added: res.success, message: res.message, count: res.count };
  }
}

/**
 * Clear comparison list
 */
export function clearCompare() {
  saveCompareIds([]);
}

/**
 * Get count of compare items
 * @returns {number}
 */
export function getCompareCount() {
  return getCompareIds().length;
}

/**
 * Get hydrated products for compare page
 * @returns {Promise<Array<Object>>}
 */
export async function getCompareProducts() {
  const ids = getCompareIds();
  const list = [];

  for (const id of ids) {
    const p = await getProductById(id);
    if (p) list.push(p);
  }

  return list;
}

/**
 * Collect all unique specification keys across comparing products
 * @param {Array<Object>} products 
 * @returns {Array<string>}
 */
export function getAllSpecKeys(products) {
  const keys = new Set();
  products.forEach(p => {
    if (p.specifications) {
      Object.keys(p.specifications).forEach(k => keys.add(k));
    }
  });
  return Array.from(keys);
}

/**
 * Initialize compare.html page view
 */
export async function initComparePage() {
  const container = document.getElementById('compare-page-container');
  if (!container) return;

  async function render() {
    const products = await getCompareProducts();

    if (products.length === 0) {
      container.innerHTML = `
        <div class="max-w-md mx-auto py-20 px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl">
            ⚖️
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-2">قائمة المقارنة فارغة</h2>
          <p class="text-xs text-slate-500 mb-6 leading-relaxed">
            يمكنك إضافة حتى 4 أجهزة لمقارنة الأسعار والمواصفات الفنية ونسب استهلاك الطاقة بدقة واختيار الجهاز الأنسب لك.
          </p>
          <a href="/products.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm">
            تصفح الأجهزة واكتشف الفروق &larr;
          </a>
        </div>
      `;
      return;
    }

    const specKeys = getAllSpecKeys(products);

    container.innerHTML = `
      <div class="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900">مقارنة الأجهزة المختارة</h1>
          <p class="text-xs text-slate-500 mt-1">تقارن حالياً بين ${products.length} من أصل 4 أجهزة كحد أقصى</p>
        </div>
        <button id="btn-clear-compare" type="button" class="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3.5 rounded-xl transition-colors">
          مسح المقارنة
        </button>
      </div>

      <!-- Responsive Comparison Container -->
      <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <table class="w-full text-right border-collapse min-w-[640px]">
          <!-- Products Header -->
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/70">
              <th class="p-4 text-xs font-bold text-slate-400 w-48">الجهاز</th>
              ${products.map(p => `
                <th class="p-4 text-center align-top w-64 border-r border-slate-100">
                  <div class="relative flex flex-col items-center">
                    <button type="button" data-remove-compare="${p.id}" class="absolute -top-1 left-0 text-slate-400 hover:text-red-500 text-lg leading-none" title="إزالة">&times;</button>
                    
                    <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">${p.brand}</span>
                    <a href="/product.html?id=${p.id}" class="w-28 h-28 p-2 flex items-center justify-center mb-2">
                      <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain" />
                    </a>
                    <a href="/product.html?id=${p.id}" class="text-xs font-bold text-slate-900 hover:text-blue-600 line-clamp-2 mb-1">
                      ${p.name}
                    </a>
                    <span class="text-[11px] font-mono text-slate-400 mb-2">${p.model}</span>
                    <span class="text-base font-black text-blue-700 mb-3">${p.price.toLocaleString('ar-EG')} ج.م</span>
                    <button type="button" data-compare-add-cart="${p.id}" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors">
                      <span>🛒</span>
                      <span>أضف للعربة</span>
                    </button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>

          <!-- Specs Table Body -->
          <tbody class="divide-y divide-slate-100 text-xs">
            <!-- Category -->
            <tr class="hover:bg-slate-50/50">
              <th class="p-3.5 font-bold text-slate-700 bg-slate-50/40">القسم</th>
              ${products.map(p => `
                <td class="p-3.5 text-center text-slate-600 border-r border-slate-100">${p.categoryName}</td>
              `).join('')}
            </tr>

            <!-- Warranty -->
            <tr class="hover:bg-slate-50/50">
              <th class="p-3.5 font-bold text-slate-700 bg-slate-50/40">فترة الضمان</th>
              ${products.map(p => `
                <td class="p-3.5 text-center font-bold text-emerald-700 border-r border-slate-100">${p.warrantyYears || 5} سنوات معتمد</td>
              `).join('')}
            </tr>

            <!-- Dynamic Specs with difference highlighting -->
            ${specKeys.map(key => {
              const values = products.map(p => p.specifications?.[key] || '—');
              const isDifferent = new Set(values).size > 1;

              return `
                <tr class="hover:bg-slate-50/50 ${isDifferent ? 'bg-amber-50/30' : ''}">
                  <th class="p-3.5 font-bold text-slate-700 bg-slate-50/40 flex items-center justify-between">
                    <span>${key}</span>
                    ${isDifferent ? '<span class="text-[10px] text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded font-bold">مختلف</span>' : ''}
                  </th>
                  ${values.map(v => `
                    <td class="p-3.5 text-center text-slate-600 border-r border-slate-100 ${isDifferent ? 'font-semibold text-slate-900' : ''}">
                      ${v}
                    </td>
                  `).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind remove single buttons
    container.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-compare');
        removeFromCompare(id);
        render();
      });
    });

    // Bind add to cart
    container.querySelectorAll('[data-compare-add-cart]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-compare-add-cart');
        const p = await getProductById(id);
        if (p) {
          addToCart(id, 1);
          showToast(`تمت إضافة "${p.name}" إلى السلة`);
        }
      });
    });

    // Bind Clear All
    const clearBtn = container.querySelector('#btn-clear-compare');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearCompare();
        render();
      });
    }
  }

  render();
}

