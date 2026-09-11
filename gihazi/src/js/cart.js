/**
 * cart.js
 * Gihazi (جهازي) - Shopping Cart State & Management
 * 
 * Manages cart in localStorage, provides reactive updates via custom events,
 * and maintains clear integration points for future backend/checkout APIs.
 */

import { getProductById } from './productData.js';

const CART_STORAGE_KEY = 'gihazi_cart_v1';

/**
 * Read current cart items from localStorage
 * @returns {Array<{productId: string, quantity: number}>}
 */
export function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read cart from localStorage:', err);
    return [];
  }
}

/**
 * Save cart items to localStorage and emit 'cart:updated' event
 * @param {Array<{productId: string, quantity: number}>} items 
 */
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
}

/**
 * Add a product to the cart or increase its quantity
 * @param {string} productId 
 * @param {number} quantity 
 */
export function addToCart(productId, quantity = 1) {
  const items = getCartItems();
  const existing = items.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }

  saveCartItems(items);
  return items;
}

/**
 * Remove an item completely from the cart
 * @param {string} productId 
 */
export function removeFromCart(productId) {
  let items = getCartItems();
  items = items.filter(item => item.productId !== productId);
  saveCartItems(items);
  return items;
}

/**
 * Update quantity for a specific product
 * @param {string} productId 
 * @param {number} newQuantity 
 */
export function updateCartQuantity(productId, newQuantity) {
  let items = getCartItems();
  if (newQuantity <= 0) {
    return removeFromCart(productId);
  }

  const existing = items.find(item => item.productId === productId);
  if (existing) {
    existing.quantity = newQuantity;
    saveCartItems(items);
  }
  return items;
}

/**
 * Clear the entire cart
 */
export function clearCart() {
  saveCartItems([]);
}

/**
 * Get total quantity count of all items in cart
 * @returns {number}
 */
export function getCartCount() {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Hydrate cart items with complete product details
 * @returns {Promise<Array<{product: Object, quantity: number, subtotal: number}>>}
 */
export async function getCartDetails() {
  const items = getCartItems();
  const hydrated = [];

  for (const item of items) {
    const product = await getProductById(item.productId);
    if (product) {
      hydrated.push({
        product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      });
    }
  }

  return hydrated;
}

/**
 * Calculate grand total and delivery info
 * @returns {Promise<{subtotal: number, delivery: number, total: number, freeDeliveryThresholdMet: boolean}>}
 */
export async function getCartSummary() {
  const details = await getCartDetails();
  const subtotal = details.reduce((sum, item) => sum + item.subtotal, 0);
  
  // Free delivery inside Suez if order >= 5,000 EGP, otherwise standard delivery 150 EGP
  const delivery = subtotal >= 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + delivery;

  return {
    subtotal,
    delivery,
    total,
    freeDeliveryThresholdMet: subtotal >= 5000
  };
}

/**
 * Format WhatsApp order message link with current cart items
 * Directly connects customer with Gihazi showroom in Suez (+201003043640)
 * @param {Object} customerInfo - { name, phone, address, notes }
 * @returns {Promise<string>} WhatsApp direct URL
 */
export async function generateWhatsAppOrderUrl(customerInfo = {}) {
  const details = await getCartDetails();
  const summary = await getCartSummary();

  let text = `مرحباً جهازي (وكيل بيكو وسامسونج بالسويس) 🌟\nأود تأكيد طلب شراء للأجهزة التالية:\n\n`;

  details.forEach((item, index) => {
    text += `${index + 1}. ${item.product.name} (موديل: ${item.product.model})\n`;
    text += `   الكمية: ${item.quantity} | السعر: ${item.product.price.toLocaleString('ar-EG')} ج.م | الإجمالي: ${item.subtotal.toLocaleString('ar-EG')} ج.م\n`;
  });

  text += `\nإجمالي المنتجات: ${summary.subtotal.toLocaleString('ar-EG')} ج.م`;
  text += `\nمصاريف التوصيل والتركيب بالسويس: ${summary.delivery === 0 ? 'مجاناً 🎁' : `${summary.delivery} ج.م`}`;
  text += `\nالإجمالي النهائي: ${summary.total.toLocaleString('ar-EG')} ج.م\n`;

  if (customerInfo.name) text += `\nالاسم: ${customerInfo.name}`;
  if (customerInfo.phone) text += `\nالهاتف: ${customerInfo.phone}`;
  if (customerInfo.address) text += `\nالعنوان بالسويس: ${customerInfo.address}`;
  if (customerInfo.notes) text += `\nملاحظات: ${customerInfo.notes}`;

  const phone = '201003043640';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Initialize cart.html page
 */
export async function initCartPage() {
  const container = document.getElementById('cart-page-container');
  if (!container) return;

  async function render() {
    const details = await getCartDetails();
    const summary = await getCartSummary();

    if (details.length === 0) {
      container.innerHTML = `
        <div class="max-w-md mx-auto py-20 px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl">
            🛒
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-2">سلة المشتريات فارغة</h2>
          <p class="text-xs text-slate-500 mb-6 leading-relaxed">
            لم تقم بإضافة أي أجهزة إلى سلتك حتى الآن. تصفح أحدث أجهزة بيكو وسامسونج وتمتع بضمان الوكيل المعتمد في السويس.
          </p>
          <a href="/products.html" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm">
            ابدأ التسوق الآن &larr;
          </a>
        </div>
      `;
      return;
    }

    // Free delivery progress calculation (threshold: 5,000 EGP)
    const freeDeliveryThreshold = 5000;
    const progressPercent = Math.min(100, Math.round((summary.subtotal / freeDeliveryThreshold) * 100));
    const remainingForFree = Math.max(0, freeDeliveryThreshold - summary.subtotal);

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Items Column -->
        <div class="lg:col-span-8 space-y-4">
          
          <!-- Free Delivery In Suez Alert -->
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs">
            <div class="flex items-center justify-between font-bold text-blue-950 mb-1.5">
              <span> التوصيل المجاني داخل محافظة السويس</span>
              <span>${summary.freeDeliveryThresholdMet ? 'مستحق مجاناً! ' : `باقي ${remainingForFree.toLocaleString('ar-EG')} ج.م`}</span>
            </div>
            <div class="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
            </div>
            <p class="text-[11px] text-blue-700 mt-1.5">
              ${summary.freeDeliveryThresholdMet 
                ? 'تهانينا! طلبك مؤهل للتوصيل والتركيب المجاني داخل محافظة السويس.' 
                : 'أضف منتجات بقيمة 5,000 ج.م أو أكثر لتستفيد من التوصيل والتركيب المجاني بالسويس.'}
            </p>
          </div>

          <!-- Items List Card -->
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-200/80">
            <div class="p-4 bg-slate-50/70 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>المنتجات في السلة (${details.length})</span>
              <button id="btn-clear-cart" type="button" class="text-red-500 hover:text-red-700 font-semibold">إفراغ السلة</button>
            </div>

            ${details.map(item => `
              <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-item-id="${item.product.id}">
                <div class="flex items-center gap-4 flex-1 min-w-0">
                  <a href="/product.html?id=${item.product.id}" class="w-20 h-20 p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0">
                    <img src="${item.product.image}" alt="${item.product.name}" class="max-h-full max-w-full object-contain" />
                  </a>
                  <div class="min-w-0">
                    <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">${item.product.brand}</span>
                    <h3 class="text-sm font-bold text-slate-900 truncate mt-1">
                      <a href="/product.html?id=${item.product.id}" class="hover:text-blue-600">${item.product.name}</a>
                    </h3>
                    <div class="text-[11px] text-slate-400 font-mono mt-0.5">${item.product.model}</div>
                    <div class="text-xs font-bold text-blue-700 mt-1 sm:hidden">
                      ${item.product.price.toLocaleString('ar-EG')} ج.م
                    </div>
                  </div>
                </div>

                <!-- Quantity & Price & Delete -->
                <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  <!-- Stepper -->
                  <div class="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden h-9">
                    <button type="button" data-qty-action="minus" data-id="${item.product.id}" class="w-8 h-full text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm">−</button>
                    <span class="w-9 text-center font-bold text-xs text-slate-800">${item.quantity}</span>
                    <button type="button" data-qty-action="plus" data-id="${item.product.id}" class="w-8 h-full text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm">+</button>
                  </div>

                  <!-- Subtotal for this item -->
                  <div class="text-left min-w-22.5">
                    <div class="text-sm font-black text-slate-900">${item.subtotal.toLocaleString('ar-EG')} ج.م</div>
                    <div class="text-[10px] text-slate-400">${item.product.price.toLocaleString('ar-EG')} × ${item.quantity}</div>
                  </div>

                  <!-- Remove item button -->
                  <button type="button" data-remove-item="${item.product.id}" class="text-slate-400 hover:text-red-500 text-lg leading-none p-1" title="حذف">&times;</button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Suez Branches Pick-up Note -->
          <div class="bg-slate-100/80 rounded-xl p-3.5 text-xs text-slate-600 flex items-center gap-3">
            <span class="text-lg">🏪</span>
            <span>يمكنك أيضاً استلام أجهزتك ومعاينتها شخصياً في فروعنا بالسويس: فرع شارع الجيش أو فرع شارع ناصر.</span>
          </div>

        </div>

        <!-- Checkout & Summary Column -->
        <div class="lg:col-span-4 space-y-4">
          
          <!-- Summary Card -->
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <h2 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">ملخص الطلب</h2>

            <div class="space-y-2 text-xs text-slate-600">
              <div class="flex justify-between">
                <span>إجمالي المنتجات:</span>
                <span class="font-bold text-slate-800">${summary.subtotal.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <div class="flex justify-between items-center">
                <span>مصاريف التوصيل والتركيب بالسويس:</span>
                <span class="font-bold ${summary.delivery === 0 ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded' : 'text-slate-800'}">
                  ${summary.delivery === 0 ? 'مجاناً' : `${summary.delivery.toLocaleString('ar-EG')} ج.م`}
                </span>
              </div>
              <div class="flex justify-between">
                <span>الضريبة:</span>
                <span class="text-slate-400 font-medium">مشمولة بالفاتورة</span>
              </div>
            </div>

            <div class="border-t border-slate-200 pt-3 flex justify-between items-baseline">
              <span class="text-sm font-bold text-slate-900">الإجمالي النهائي:</span>
              <span class="text-2xl font-black text-blue-700">${summary.total.toLocaleString('ar-EG')} ج.م</span>
            </div>

            <!-- Customer Checkout Form -->
            <form id="checkout-form" class="space-y-3 pt-2 border-t border-slate-100">
              <h3 class="text-xs font-bold text-slate-800">بيانات التوصيل والتواصل بالسويس:</h3>
              
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">الاسم الكامل *</label>
                <input type="text" id="order-name" required placeholder="مثال: أحمد محمود" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">رقم الهاتف (واتساب) *</label>
                <input type="tel" id="order-phone" required placeholder="010xxxxxxxx" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">العنوان داخل السويس بالتفصيل *</label>
                <input type="text" id="order-address" required placeholder="الحي، اسم الشارع، رقم العمارة" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>

              <!-- Payment Method Selection UI (Presentation) -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1.5">طريقة الدفع المفضلة:</label>
                <div class="space-y-1.5 text-xs">
                  <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="order-payment" value="cod" checked class="accent-blue-600" />
                    <span>الدفع عند الاستلام والمعاينة</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="order-payment" value="instapay" class="accent-blue-600" />
                    <span>تحويل عبر إنستاباي InstaPay</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="order-payment" value="vodafone-cash" class="accent-blue-600" />
                    <span>محافظ إلكترونية (فودافون كاش)</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="order-payment" value="installments" class="accent-blue-600" />
                    <span>تقسيط (valU / سهولة / أمان)</span>
                  </label>
                </div>
              </div>

              <!-- Integration Notice -->
              <div class="p-2.5 bg-slate-50 rounded-lg text-[10px] text-slate-500 leading-relaxed border border-slate-100">
                 يتم تأكيد طلبك ومراجعته مع مسؤولي خدمة عملاء جهازي بالسويس لترتيب موعد الشحن والتركيب.
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <span>تأكيد الطلب الآن</span>
                <span>&larr;</span>
              </button>

              <!-- WhatsApp Quick Order Button -->
              <button id="btn-whatsapp-checkout" type="button" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm">
                <span>إرسال الطلب عبر واتساب مباشرة</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    `;

    // Bind Steppers
    container.querySelectorAll('[data-qty-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-qty-action');
        const id = btn.getAttribute('data-id');
        const currentItem = details.find(d => d.product.id === id);
        if (!currentItem) return;

        if (action === 'plus') {
          updateCartQuantity(id, currentItem.quantity + 1);
        } else if (action === 'minus') {
          updateCartQuantity(id, currentItem.quantity - 1);
        }
        render();
      });
    });

    // Bind Remove Single
    container.querySelectorAll('[data-remove-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-item');
        removeFromCart(id);
        render();
      });
    });

    // Bind Clear All
    const clearBtn = container.querySelector('#btn-clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearCart();
        render();
      });
    }

    // Bind Checkout Form Submit (Integration Point)
    const form = container.querySelector('#checkout-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#order-name')?.value;
        const phone = container.querySelector('#order-phone')?.value;
        const address = container.querySelector('#order-address')?.value;
        const payment = container.querySelector('input[name="order-payment"]:checked')?.value;

        // Display Success Modal or Notification with details
        alert(`شكراً لك يا ${name}! تم تسجيل طلبك المبدئي بنجاح لدى جهازي (وكيل بيكو وسامسونج بالسويس).\nسيتواصل معك فرع السويس على الرقم (${phone}) لتأكيد موعد التوصيل.`);
        clearCart();
        window.location.href = '/';
      });
    }

    // Bind WhatsApp Checkout
    const waBtn = container.querySelector('#btn-whatsapp-checkout');
    if (waBtn) {
      waBtn.addEventListener('click', async () => {
        const name = container.querySelector('#order-name')?.value || '';
        const phone = container.querySelector('#order-phone')?.value || '';
        const address = container.querySelector('#order-address')?.value || '';
        const url = await generateWhatsAppOrderUrl({ name, phone, address });
        window.open(url, '_blank');
      });
    }
  }

  render();
}

