/**
 * search.js
 * Gihazi (جهازي) - Search Functionality
 * 
 * Provides live search suggestions, header search bar wiring,
 * and search result query resolution across name, brand, model, and category.
 */

import { products, formatPrice } from './productData.js';

/**
 * Perform search against local product data
 * @param {string} query 
 * @returns {Array<Object>}
 */
export function searchProducts(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  return products.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
    );
  });
}

/**
 * Initialize search bar inputs and auto-suggestions dropdown
 */
export function initSearch() {
  const searchInputs = document.querySelectorAll('.header-search-input');

  searchInputs.forEach(input => {
    const form = input.closest('form');
    let dropdown = form?.querySelector('.search-suggestions-dropdown');

    // Create dropdown container if missing
    if (form && !dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-suggestions-dropdown hidden absolute top-full inset-x-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-right';
      form.style.position = 'relative';
      form.appendChild(dropdown);
    }

    let debounceTimer;

    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const val = e.target.value.trim();

      if (val.length < 2) {
        if (dropdown) dropdown.classList.add('hidden');
        return;
      }

      debounceTimer = setTimeout(() => {
        const matches = searchProducts(val);
        renderSuggestions(matches, val, dropdown);
      }, 150);
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (dropdown && !form.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // On submit, navigate to products.html?q=...
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        if (val) {
          window.location.href = `/products.html?q=${encodeURIComponent(val)}`;
        }
      });
    }
  });
}

/**
 * Render quick suggestions in dropdown
 * @param {Array<Object>} matches 
 * @param {string} query 
 * @param {HTMLElement} dropdown 
 */
function renderSuggestions(matches, query, dropdown) {
  if (!dropdown) return;

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-500">
        لا توجد نتائج مطابقة لـ "<span class="font-bold text-slate-700">${query}</span>"
        <div class="mt-1 text-[11px] text-blue-600">جرّب البحث باسم الماركة (بيكو، سامسونج) أو نوع الجهاز</div>
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  const topMatches = matches.slice(0, 5);

  dropdown.innerHTML = `
    <div class="p-2 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 px-3">
      <span>نتائج البحث السريعة (${matches.length})</span>
      <a href="/products.html?q=${encodeURIComponent(query)}" class="text-blue-600 hover:text-blue-800">عرض الكل &larr;</a>
    </div>
    <div class="divide-y divide-slate-100 max-h-72 overflow-y-auto">
      ${topMatches.map(p => `
        <a href="/product.html?id=${p.id}" class="flex items-center gap-3 p-2.5 hover:bg-slate-50 transition-colors">
          <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain p-1 bg-slate-100 rounded-lg shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-slate-800 truncate">${p.name}</div>
            <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span class="font-bold text-blue-600">${p.brand}</span>
              <span>•</span>
              <span class="font-mono">${p.model}</span>
            </div>
          </div>
          <div class="text-xs font-black text-slate-900 shrink-0">
            ${formatPrice(p.price)}
          </div>
        </a>
      `).join('')}
    </div>
  `;

  dropdown.classList.remove('hidden');
}
