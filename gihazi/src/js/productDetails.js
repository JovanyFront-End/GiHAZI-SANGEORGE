/**
 * productDetails.js
 * Gihazi (جهازي) - Dedicated Product Details Page Controller
 * 
 * Reads ?id=... from URL, retrieves product details, renders gallery,
 * specifications table, features, warranty terms, related products,
 * and handles invalid or missing IDs gracefully.
 */

import { getProductById, getRelatedProducts, formatPrice } from './productData.js';
import { addToCart } from './cart.js';
import { toggleWishlist, isInWishlist } from './wishlist.js';
import { toggleCompare, isInCompare } from './comparison.js';
import { showToast } from './ui.js';
import { renderProductCards } from './productCards.js';

/**
 * Initialize product details page
 */
export async function initProductDetailsPage() {
  const container = document.getElementById('product-details-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    renderMissingProduct(container, 'لم يتم تحديد كود المنتج المطلوب');
    return;
  }

  const product = await getProductById(productId);
  if (!product) {
    renderMissingProduct(container, 'عذراً، هذا المنتج غير متوفر أو تم نقله');
    return;
  }

  // Update page title
  document.title = `${product.name} | جهازي — وكيل بيكو وسامسونج بالسويس`;

  // Render main product page structure
  renderProductDetails(container, product);

  // Render related products
  const relatedContainer = document.getElementById('related-products-grid');
  if (relatedContainer) {
    const related = await getRelatedProducts(product.id, 4);
    renderProductCards(related, relatedContainer);
  }
}

/**
 * Render graceful missing/invalid product view
 * @param {HTMLElement} container 
 * @param {string} msg 
 */
function renderMissingProduct(container, msg) {
  container.innerHTML = `
    <div class="max-w-xl mx-auto py-20 px-4 text-center">
      <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl border border-amber-200">
        ⚠️
      </div>
      <h1 class="text-2xl font-black text-slate-900 mb-2">${msg}</h1>
      <p class="text-sm text-slate-500 mb-8 leading-relaxed">
        قد يكون الرابط الذي استخدمته غير صحيح، أو تم تحديث بيانات الجهاز في الكتالوج. يمكنك تصفح جميع أجهزتنا المنزلية المتاحة بسهولة.
      </p>
      <div class="flex items-center justify-center gap-3">
        <a href="/products.html" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-sm">
          تصفح كتالوج الأجهزة &larr;
        </a>
        <a href="/" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl text-sm transition-colors">
          الصفحة الرئيسية
        </a>
      </div>
    </div>
  `;
}

/**
 * Render complete product information
 * @param {HTMLElement} container 
 * @param {Object} product 
 */
function renderProductDetails(container, product) {
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  let discountBadge = '';
  if (product.oldPrice && product.oldPrice > product.price) {
    const diff = product.oldPrice - product.price;
    discountBadge = `<span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">وفر ${diff.toLocaleString('ar-EG')} ج.م</span>`;
  }

  // Generate WhatsApp inquiry text
  const waText = `مرحباً جهازي، أود الاستفسار عن تفاصيل وشراء الجهاز:\n${product.name}\nموديل: ${product.model}\nالسعر: ${formatPrice(product.price)}`;
  const waUrl = `https://wa.me/201003043640?text=${encodeURIComponent(waText)}`;

  container.innerHTML = `
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6 py-2 overflow-x-auto whitespace-nowrap" aria-label="مسار التنقل">
      <a href="/" class="hover:text-blue-600">الرئيسية</a>
      <span>/</span>
      <a href="/products.html" class="hover:text-blue-600">المنتجات</a>
      <span>/</span>
      <a href="/products.html?category=${product.category}" class="hover:text-blue-600">${product.categoryName}</a>
      <span>/</span>
      <span class="text-slate-800 font-semibold truncate max-w-xs">${product.name}</span>
    </nav>

    <!-- Top Grid: Gallery & Purchase Column -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
      
      <!-- Left (LTR perspective) / Right (RTL): Image Gallery -->
      <div class="lg:col-span-6 space-y-4">
        <!-- Main Image Stage -->
        <div class="relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex items-center justify-center aspect-square overflow-hidden group">
          <div class="absolute top-4 right-4 z-10 flex flex-col items-start gap-2">
            <span class="bg-blue-600 text-white text-xs font-black tracking-wider px-3.5 py-1 rounded-full shadow-sm">${product.brand}</span>
            ${discountBadge}
          </div>
          <img id="main-product-image" src="${product.image}" alt="${product.name}" class="max-h-80 max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>

        <!-- Thumbnails Gallery -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2">
          ${(product.images || [product.image]).map((img, idx) => `
            <button type="button" class="thumb-btn w-20 h-20 rounded-2xl bg-white border-2 ${idx === 0 ? 'border-blue-600 shadow-sm' : 'border-slate-200'} p-2 flex items-center justify-center shrink-0 hover:border-blue-400 transition-colors" data-src="${img}" aria-label="عرض صورة ${idx + 1}">
              <img src="${img}" alt="" class="max-h-full max-w-full object-contain" />
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Information & Actions Column -->
      <div class="lg:col-span-6 space-y-6">
        
        <!-- Header Info -->
        <div>
          <div class="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">${product.categoryName}</span>
            <span>كود الموديل: <strong class="font-mono text-blue-600 dir-ltr">${product.model}</strong></span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-3">
            ${product.name}
          </h1>

          <!-- Reviews & Guarantee -->
          <div class="flex items-center gap-4 text-xs">
            <div class="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg font-bold border border-amber-200/60">
              <span>★</span>
              <span>${product.rating}</span>
              <span class="text-slate-400 font-normal">(${product.reviewsCount} تقييم)</span>
            </div>
            <span class="text-emerald-700 font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              متوفر بالمعرض ومتاح للتسليم الفوري
            </span>
          </div>
        </div>

        <!-- Pricing Card -->
        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
          <div class="flex items-baseline gap-3">
            <span class="text-3xl sm:text-4xl font-black text-blue-700">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="text-base text-slate-400 line-through">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <p class="text-xs text-slate-500 flex items-center gap-2">
            <span>🛡️</span>
            <span>الأسعار رسمية ومعتمدة شاملة ضريبة القيمة المضافة والفاتورة الضريبية</span>
          </p>
        </div>

        <!-- Short Description -->
        <p class="text-sm text-slate-600 leading-relaxed">
          ${product.shortDescription}
        </p>

        <!-- Quantity & Add to Cart -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-3">
            <!-- Stepper -->
            <div class="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden h-12">
              <button id="qty-minus" type="button" class="w-10 h-full text-lg font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors" aria-label="إنقاص الكمية">−</button>
              <input id="detail-qty-input" type="number" min="1" max="10" value="1" readonly class="w-12 h-full text-center font-bold text-slate-800 text-sm focus:outline-none bg-transparent" />
              <button id="qty-plus" type="button" class="w-10 h-full text-lg font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors" aria-label="زيادة الكمية">+</button>
            </div>

            <!-- Add to Cart Primary Button -->
            <button id="detail-add-cart" type="button" class="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm sm:text-base">
              <span>🛒</span>
              <span>أضف إلى سلة المشتريات</span>
            </button>
          </div>

          <!-- Secondary Actions (Wishlist, Compare, WhatsApp) -->
          <div class="grid grid-cols-3 gap-2 text-xs font-semibold">
            <button id="detail-toggle-wishlist" type="button" class="border ${inWishlist ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
              <span>${inWishlist ? '❤️' : '🤍'}</span>
              <span>${inWishlist ? 'في المفضلة' : 'المفضلة'}</span>
            </button>

            <button id="detail-toggle-compare" type="button" class="border ${inCompare ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
              <span>⚖️</span>
              <span>${inCompare ? 'في المقارنة' : 'مقارنة'}</span>
            </button>

            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold shadow-sm">
              <span>💬</span>
              <span>طلب واتساب</span>
            </a>
          </div>
        </div>

        <!-- Authorized Dealer Service Guarantees in Suez -->
        <div class="border-t border-slate-200 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-blue-600 text-base">📍</span>
            <div>
              <strong class="text-slate-800 block">فروعنا في السويس:</strong>
              شارع الجيش & شارع ناصر
            </div>
          </div>
          <div class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-emerald-600 text-base">🛠️</span>
            <div>
              <strong class="text-slate-800 block">ضمان معتمد:</strong>
              ${product.warrantyYears || 5} سنوات مع خدمة التركيب
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Product Tabs: Specifications, Features, Warranty & Description -->
    <div class="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-16">
      <div class="border-b border-slate-200 mb-6 flex gap-6 overflow-x-auto text-sm font-bold text-slate-500" role="tablist">
        <button type="button" class="tab-btn pb-3 border-b-2 border-blue-600 text-blue-600" data-tab="specs">المواصفات الفنية</button>
        <button type="button" class="tab-btn pb-3 border-b-2 border-transparent hover:text-slate-800" data-tab="features">المميزات الرئيسية</button>
        <button type="button" class="tab-btn pb-3 border-b-2 border-transparent hover:text-slate-800" data-tab="warranty">الضمان والتوصيل بالسويس</button>
        <button type="button" class="tab-btn pb-3 border-b-2 border-transparent hover:text-slate-800" data-tab="desc">الوصف الكامل</button>
      </div>

      <!-- Tab Content: Specs -->
      <div id="tab-specs" class="tab-panel">
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm text-right">
            <tbody class="divide-y divide-slate-100">
              ${Object.entries(product.specifications || {}).map(([key, val], idx) => `
                <tr class="${idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}">
                  <th class="py-3 px-4 font-bold text-slate-700 w-1/3">${key}</th>
                  <td class="py-3 px-4 text-slate-600">${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab Content: Features -->
      <div id="tab-features" class="tab-panel hidden">
        <ul class="space-y-3 text-sm text-slate-700">
          ${(product.features || []).map(f => `
            <li class="flex items-start gap-3">
              <span class="text-blue-600 font-bold">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Tab Content: Warranty -->
      <div id="tab-warranty" class="tab-panel hidden space-y-4 text-sm text-slate-600 leading-relaxed">
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-900">
          <h4 class="font-bold text-base mb-1">الضمان الرسمي المعتمد من الوكيل</h4>
          <p class="text-xs text-blue-700">
            بصفتنا الوكيل المعتمد لبيكو وسامسونج في محافظة السويس، نوفر لك ضماناً رسمياً كاملاً ومختوماً مع تفعيل فوري مع الشركة الأم ومراكز الخدمة المعتمدة.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div class="border border-slate-200 rounded-xl p-4">
            <h5 class="font-bold text-slate-800 text-sm mb-1">التوصيل والتركيب في السويس</h5>
            <p class="text-xs text-slate-500">توصيل سريع حتى باب المنزل داخل السويس وجميع أحياء المحافظة (الأربعين، فيصل، السويس، عتاقة، الجناين) مع فنيين معتمدين لتركيب الأجهزة وتفعيل شهادة الضمان.</p>
          </div>
          <div class="border border-slate-200 rounded-xl p-4">
            <h5 class="font-bold text-slate-800 text-sm mb-1">خدمة ما بعد البيع والدعم الفني</h5>
            <p class="text-xs text-slate-500">فريق الدعم الفني جاهز لمساعدتك في أي استفسار أو بلاغ صيانة دورية بالتنسيق المباشر مع مراكز الصيانة الرسمية لبيكو وسامسونج.</p>
          </div>
        </div>
      </div>

      <!-- Tab Content: Description -->
      <div id="tab-desc" class="tab-panel hidden">
        <div class="prose max-w-none text-sm text-slate-600 leading-relaxed">
          <p>${product.description}</p>
        </div>
      </div>
    </div>
  `;

  // Bind Gallery Thumbnails
  const mainImg = container.querySelector('#main-product-image');
  container.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('border-blue-600', 'shadow-sm'));
      btn.classList.add('border-blue-600', 'shadow-sm');
      const src = btn.getAttribute('data-src');
      if (mainImg && src) mainImg.src = src;
    });
  });

  // Bind Quantity Controls
  const qtyInput = container.querySelector('#detail-qty-input');
  const qtyMinus = container.querySelector('#qty-minus');
  const qtyPlus = container.querySelector('#qty-plus');

  qtyMinus.addEventListener('click', () => {
    let cur = parseInt(qtyInput.value, 10) || 1;
    if (cur > 1) qtyInput.value = cur - 1;
  });

  qtyPlus.addEventListener('click', () => {
    let cur = parseInt(qtyInput.value, 10) || 1;
    if (cur < 10) qtyInput.value = cur + 1;
  });

  // Bind Add to Cart
  const addCartBtn = container.querySelector('#detail-add-cart');
  addCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    addToCart(product.id, qty);
    showToast(`تمت إضافة ${qty} من "${product.name}" إلى السلة`);
  });

  // Bind Wishlist
  const wishlistBtn = container.querySelector('#detail-toggle-wishlist');
  wishlistBtn.addEventListener('click', () => {
    const added = toggleWishlist(product.id);
    wishlistBtn.classList.toggle('border-red-400', added);
    wishlistBtn.classList.toggle('bg-red-50', added);
    wishlistBtn.classList.toggle('text-red-600', added);
    wishlistBtn.innerHTML = `<span>${added ? '❤️' : '🤍'}</span><span>${added ? 'في المفضلة' : 'المفضلة'}</span>`;
    showToast(added ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة', added ? 'success' : 'info');
  });

  // Bind Compare
  const compareBtn = container.querySelector('#detail-toggle-compare');
  compareBtn.addEventListener('click', async () => {
    const res = await toggleCompare(product.id);
    compareBtn.classList.toggle('border-blue-400', res.added);
    compareBtn.classList.toggle('bg-blue-50', res.added);
    compareBtn.classList.toggle('text-blue-600', res.added);
    compareBtn.innerHTML = `<span>⚖️</span><span>${res.added ? 'في المقارنة' : 'مقارنة'}</span>`;
    showToast(res.message, res.added ? 'success' : 'info');
  });

  // Bind Tabs
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      container.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600');
        b.classList.add('border-transparent');
      });
      btn.classList.add('border-blue-600', 'text-blue-600');
      btn.classList.remove('border-transparent');

      container.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
      const activePanel = container.querySelector(`#tab-${target}`);
      if (activePanel) activePanel.classList.remove('hidden');
    });
  });
}
