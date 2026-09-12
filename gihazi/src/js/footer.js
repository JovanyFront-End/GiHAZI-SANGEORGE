/**
 * footer.js
 * Gihazi (جهازي) - Spacious & Minimalist Monochrome Footer Component
 */

// ─── Data ────────────────────────────────────────────────────────────────────

const BROWSE_LINKS = [
  { href: '/products.html?category=refrigerators',    label: 'ثلاجات بيكو وسامسونج' },
  { href: '/products.html?category=washing-machines', label: 'غسالات ملابس أوتوماتيك' },
  { href: '/products.html?category=kitchen',          label: 'أفران وغسالات أطباق' },
  { href: '/products.html?category=screens',          label: 'شاشات QLED و4K' },
  { href: '/products.html?category=air-conditioners', label: 'تكييفات إنفرتر' },
];

const SERVICE_LINKS = [
  { href: '/compare.html',  label: 'مقارنة المواصفات' },
  { href: '/branches.html', label: 'فروعنا ومراكز المعاينة' },
  { href: '/contact.html',  label: 'الدعم الفني بالسويس' },
  { href: '/cart.html',     label: 'سلة المشتريات' },
];

// ─── HTML Builder ─────────────────────────────────────────────────────────────

function buildFooter() {
  const browseItems = BROWSE_LINKS
    .map(l => `<li><a href="${l.href}" class="hover:text-white transition-colors">${l.label}</a></li>`)
    .join('\n            ');

  const serviceItems = SERVICE_LINKS
    .map(l => `<li><a href="${l.href}" class="hover:text-white transition-colors">${l.label}</a></li>`)
    .join('\n            ');

  return `
  <footer class="bg-black text-slate-300 text-sm border-t border-neutral-800 pt-20 pb-12 mt-24">
    <div class="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

        <!-- Brand Information -->
        <div class="space-y-5">
          <a href="/" aria-label="جهازي — الرئيسية" class="inline-block">
            <img src="/logo/logo.png" alt="جهازي" class="h-12 w-auto brightness-0 invert" />
          </a>
          <p class="leading-relaxed text-slate-300 text-sm">
            جهازي (شركة سان جورج للأجهزة المنزلية) — الوكيل المعتمد لبيكو وسامسونج في السويس. أجهزة أصلية بضمان كامل مع خدمات التوصيل والتركيب المعتمدة.
          </p>
          <div class="flex items-center gap-3 pt-3">
            <a href="https://www.facebook.com/SanGeorge4Homeappliances"
               target="_blank" rel="noopener noreferrer"
               aria-label="صفحة Facebook"
               class="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-slate-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://wa.me/201003043640"
               target="_blank" rel="noopener noreferrer"
               aria-label="واتساب"
               class="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-slate-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Browse Categories -->
        <div class="space-y-5">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider">تصفح الأجهزة</h4>
          <ul class="space-y-3.5 text-slate-300 text-sm">
            ${browseItems}
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-5">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider">خدمة العملاء</h4>
          <ul class="space-y-3.5 text-slate-300 text-sm">
            ${serviceItems}
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="space-y-5">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider">تواصل معنا</h4>
          <ul class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-400 shrink-0 mt-0.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>فرع شارع الجيش، برج بلال، الأربعين، السويس</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-400 shrink-0 mt-0.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>فرع شارع ناصر، أمام صن سيتي، السلام، السويس</span>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <div class="flex items-center gap-3">
                <a href="tel:+201003043640" class="hover:text-white transition-colors">01003043640</a>
                <span class="text-slate-600">•</span>
                <a href="tel:+201006076226" class="hover:text-white transition-colors">01006076226</a>
              </div>
            </li>
            <li class="text-slate-400 text-xs pt-1">مواعيد العمل: يومياً من 10:00 صباحاً حتى 11:00 مساءً</li>
          </ul>
        </div>

      </div>

      <!-- Footer Bottom Bar -->
      <div class="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <span>© 2026 جهازي (JIHAZI) — سان جورج للأجهزة الكهربائية بالسويس. جميع الحقوق محفوظة.</span>
        <span class="text-slate-300 font-semibold">الوكيل المعتمد لبيكو وسامسونج في السويس</span>
      </div>

    </div>
  </footer>`;
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function initFooter() {
  const placeholder = document.getElementById('site-footer');
  if (!placeholder) return;

  placeholder.outerHTML = buildFooter();
}