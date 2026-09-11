/**
 * filters.js
 * Gihazi (جهازي) - Product Catalog Filtering & Sorting
 * 
 * Handles category, brand, price range, stock availability filters,
 * sorting criteria, active filter chips, and URL sync.
 */

import { getProducts, getCategories, getBrands } from './productData.js';
import { renderProductCards } from './productCards.js';

let currentFilters = {
  category: 'all',
  brand: 'all',
  minPrice: '',
  maxPrice: '',
  inStockOnly: false,
  search: '',
  sortBy: 'featured'
};

/**
 * Initialize catalog page filters and attach listeners
 */
export async function initProductsPageFilters() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  // Read URL search params on page load
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) currentFilters.category = params.get('category');
  if (params.get('brand')) currentFilters.brand = params.get('brand');
  if (params.get('q')) currentFilters.search = params.get('q');
  if (params.get('sort')) currentFilters.sortBy = params.get('sort');

  // Populate dynamic category and brand lists in filter sidebar
  renderFilterOptions();

  // Bind controls
  bindFilterInputs();

  // Initial filter execution
  await applyFiltersAndRender();
}

/**
 * Render category and brand options in the sidebar
 */
function renderFilterOptions() {
  const categoryContainer = document.getElementById('filter-categories-list');
  const brandContainer = document.getElementById('filter-brands-list');

  if (categoryContainer) {
    const categories = getCategories();
    categoryContainer.innerHTML = `
      <label class="flex items-center justify-between text-xs font-semibold py-1.5 cursor-pointer hover:text-blue-600 text-slate-700">
        <span class="flex items-center gap-2">
          <input type="radio" name="filter-category" value="all" ${currentFilters.category === 'all' ? 'checked' : ''} class="accent-blue-600" />
          <span>جميع الأقسام</span>
        </span>
      </label>
      ${categories.map(c => `
        <label class="flex items-center justify-between text-xs font-semibold py-1.5 cursor-pointer hover:text-blue-600 text-slate-700">
          <span class="flex items-center gap-2">
            <input type="radio" name="filter-category" value="${c.id}" ${currentFilters.category === c.id ? 'checked' : ''} class="accent-blue-600" />
            <span>${c.name}</span>
          </span>
          <span class="text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">${c.count}</span>
        </label>
      `).join('')}
    `;
  }

  if (brandContainer) {
    const brands = getBrands();
    brandContainer.innerHTML = `
      <label class="flex items-center justify-between text-xs font-semibold py-1.5 cursor-pointer hover:text-blue-600 text-slate-700">
        <span class="flex items-center gap-2">
          <input type="radio" name="filter-brand" value="all" ${currentFilters.brand === 'all' ? 'checked' : ''} class="accent-blue-600" />
          <span>جميع الماركات</span>
        </span>
      </label>
      ${brands.map(b => `
        <label class="flex items-center justify-between text-xs font-semibold py-1.5 cursor-pointer hover:text-blue-600 text-slate-700">
          <span class="flex items-center gap-2">
            <input type="radio" name="filter-brand" value="${b.name}" ${currentFilters.brand.toLowerCase() === b.name.toLowerCase() ? 'checked' : ''} class="accent-blue-600" />
            <span>${b.name}</span>
          </span>
          <span class="text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">${b.count}</span>
        </label>
      `).join('')}
    `;
  }
}

/**
 * Bind DOM inputs for filtering and sorting
 */
function bindFilterInputs() {
  // Category radio change
  document.addEventListener('change', (e) => {
    if (e.target.name === 'filter-category') {
      currentFilters.category = e.target.value;
      applyFiltersAndRender();
    }
    if (e.target.name === 'filter-brand') {
      currentFilters.brand = e.target.value;
      applyFiltersAndRender();
    }
  });

  // Price range inputs
  const minPriceInput = document.getElementById('filter-min-price');
  const maxPriceInput = document.getElementById('filter-max-price');
  const applyPriceBtn = document.getElementById('filter-apply-price');

  if (applyPriceBtn) {
    applyPriceBtn.addEventListener('click', () => {
      currentFilters.minPrice = minPriceInput?.value || '';
      currentFilters.maxPrice = maxPriceInput?.value || '';
      applyFiltersAndRender();
    });
  }

  // In-stock toggle
  const inStockCheckbox = document.getElementById('filter-instock-only');
  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', (e) => {
      currentFilters.inStockOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    if (currentFilters.sortBy) sortSelect.value = currentFilters.sortBy;
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Reset filters button
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilters = {
        category: 'all',
        brand: 'all',
        minPrice: '',
        maxPrice: '',
        inStockOnly: false,
        search: '',
        sortBy: 'featured'
      };
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      if (inStockCheckbox) inStockCheckbox.checked = false;
      if (sortSelect) sortSelect.value = 'featured';
      renderFilterOptions();
      applyFiltersAndRender();
    });
  }
}

/**
 * Filter products, update URL, render active chips, and display cards
 */
async function applyFiltersAndRender() {
  const container = document.getElementById('products-grid');
  const countBadge = document.getElementById('products-count-badge');
  const activeChipsContainer = document.getElementById('active-filters-chips');

  const filtered = await getProducts(currentFilters);

  if (countBadge) {
    countBadge.textContent = `${filtered.length} جهاز`;
  }

  renderActiveChips(activeChipsContainer);
  renderProductCards(filtered, container);

  // Update query params without reload
  const url = new URL(window.location.href);
  if (currentFilters.category !== 'all') url.searchParams.set('category', currentFilters.category);
  else url.searchParams.delete('category');

  if (currentFilters.brand !== 'all') url.searchParams.set('brand', currentFilters.brand);
  else url.searchParams.delete('brand');

  if (currentFilters.search) url.searchParams.set('q', currentFilters.search);
  else url.searchParams.delete('q');

  window.history.replaceState({}, '', url.toString());
}

/**
 * Render active filter chips that can be clicked to remove
 * @param {HTMLElement} container 
 */
function renderActiveChips(container) {
  if (!container) return;
  container.innerHTML = '';

  const chips = [];

  if (currentFilters.category !== 'all') {
    const cats = getCategories();
    const catName = cats.find(c => c.id === currentFilters.category)?.name || currentFilters.category;
    chips.push({ key: 'category', label: `القسم: ${catName}` });
  }

  if (currentFilters.brand !== 'all') {
    chips.push({ key: 'brand', label: `الماركة: ${currentFilters.brand}` });
  }

  if (currentFilters.search) {
    chips.push({ key: 'search', label: `بحث: "${currentFilters.search}"` });
  }

  if (currentFilters.minPrice || currentFilters.maxPrice) {
    chips.push({ key: 'price', label: `السعر: ${currentFilters.minPrice || 0} - ${currentFilters.maxPrice || '∞'} ج.م` });
  }

  if (currentFilters.inStockOnly) {
    chips.push({ key: 'inStock', label: 'المتوفر فقط' });
  }

  if (chips.length === 0) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="flex items-center gap-2 flex-wrap text-xs">
      <span class="text-slate-400 font-semibold">الفلاتر المفعلة:</span>
      ${chips.map(chip => `
        <span class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold border border-blue-200">
          <span>${chip.label}</span>
          <button type="button" data-chip-key="${chip.key}" class="hover:text-red-500 font-black text-sm leading-none">&times;</button>
        </span>
      `).join('')}
      <button id="clear-all-chips" type="button" class="text-xs text-red-600 hover:underline font-bold px-1">إلغاء الكل</button>
    </div>
  `;

  // Bind chip removal
  container.querySelectorAll('[data-chip-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-chip-key');
      if (key === 'category') currentFilters.category = 'all';
      if (key === 'brand') currentFilters.brand = 'all';
      if (key === 'search') currentFilters.search = '';
      if (key === 'price') { currentFilters.minPrice = ''; currentFilters.maxPrice = ''; }
      if (key === 'inStock') currentFilters.inStockOnly = false;
      renderFilterOptions();
      applyFiltersAndRender();
    });
  });

  const clearAll = container.querySelector('#clear-all-chips');
  if (clearAll) {
    clearAll.addEventListener('click', () => {
      currentFilters = {
        category: 'all',
        brand: 'all',
        minPrice: '',
        maxPrice: '',
        inStockOnly: false,
        search: '',
        sortBy: 'featured'
      };
      renderFilterOptions();
      applyFiltersAndRender();
    });
  }
}
