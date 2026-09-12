/**
 * navbar.js
 * Gihazi (جهازي) - Fixed Top Sticky Header & Mobile Navigation Drawer
 */

// ─── Nav Link Definitions ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { 
    href: '/', 
    label: 'الرئيسية', 
    drawerLabel: 'الرئيسية',
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
  },
  { 
    href: '/products.html', 
    label: 'الأجهزة', 
    drawerLabel: 'كتالوج جميع الأجهزة',
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`
  },
  { 
    href: '/compare.html', 
    label: 'المقارنة', 
    drawerLabel: 'مقارنة الأجهزة',
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`
  },
  { 
    href: '/wishlist.html', 
    label: 'المفضلة', 
    drawerLabel: 'قائمة المفضلة',
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`
  },
  { 
    href: '/branches.html', 
    label: 'فروع السويس', 
    drawerLabel: 'معارض السويس (شارع الجيش & شارع ناصر)', 
    secondary: true,
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
  },
  { 
    href: '/contact.html', 
    label: 'اتصل بنا', 
    drawerLabel: 'تواصل معنا', 
    secondary: true,
    icon: `<svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`
  },
];

function isActive(href) {
  const path = window.location.pathname.toLowerCase();
  if (href === '/') {
    return path === '/' || path === '/index.html' || path === '';
  }
  return path.includes(href.replace('/', '').toLowerCase());
}

// ─── HTML Builders ────────────────────────────────────────────────────────────

function buildDesktopNavLinks() {
  return NAV_LINKS.map(link => {
    const active = isActive(link.href);
    const cls = active
      ? 'text-black font-bold border-b-2 border-black pb-1 transition-all'
      : 'text-slate-600 hover:text-black transition-colors';
    return `<a href="${link.href}" class="${cls}">${link.label}</a>`;
  }).join('\n          ');
}

function buildHeader() {
  const cartActive = isActive('/cart.html');
  const cartCls = cartActive
    ? 'text-black bg-slate-100'
    : 'text-slate-800 hover:text-black hover:bg-slate-100';

  return `
  <!-- Fixed Header locked to the top of screen -->
  <header class="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between h-16 sm:h-20 gap-4">

        <!-- Right: Brand Logo -->
        <a href="/" class="shrink-0 flex items-center" aria-label="جهازي — الصفحة الرئيسية">
          <img src="/logo/logo.png" alt="جهازي - الوكيل المعتمد لبيكو وسامسونج في السويس" class="h-10 sm:h-14 w-auto object-contain" />
        </a>

        <!-- Center: Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-8 text-sm font-bold">
          ${buildDesktopNavLinks()}
        </nav>

        <!-- Left: Action Icons -->
        <div class="flex items-center gap-1.5 sm:gap-3">

          <!-- Search Toggle Button -->
          <button id="search-toggle-btn" type="button" class="p-2.5 rounded-xl text-slate-800 hover:text-black hover:bg-slate-100 transition-colors flex items-center justify-center" aria-label="البحث" title="البحث في الأجهزة">
            <svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          <!-- Cart Icon -->
          <a href="/cart.html" class="p-2.5 rounded-xl ${cartCls} transition-colors flex items-center justify-center" aria-label="سلة المشتريات" title="سلة المشتريات">
            <svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </a>

          <!-- Mobile Menu Hamburger -->
          <button id="mobile-menu-open" type="button" class="lg:hidden p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center" aria-label="فتح القائمة الجانبية" title="القائمة">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

      </div>

      <!-- Expandable Search Bar -->
      <div id="expandable-search-bar" class="hidden pb-4 pt-1 border-t border-slate-100 transition-all">
        <form class="relative w-full" role="search">
          <div class="relative flex items-center">
            <input type="search" placeholder="ابحث باسم الجهاز، الماركة (بيكو، سامسونج)، أو الموديل..." class="header-search-input w-full bg-slate-100 focus:bg-white border border-slate-200 focus:border-black rounded-2xl py-3 pr-12 pl-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" />
            <span class="absolute right-4 text-slate-400 pointer-events-none">
              <svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
            <button type="button" id="search-bar-close" class="absolute left-3 text-slate-400 hover:text-slate-800 text-xl font-bold leading-none p-1 transition-colors" aria-label="إغلاق البحث">&times;</button>
          </div>
        </form>
      </div>
    </div>
  </header>`;
}

function buildDrawerLinks() {
  const primaryLinks = NAV_LINKS.filter(l => !l.secondary);
  const secondaryLinks = NAV_LINKS.filter(l => l.secondary);

  const renderPrimary = (link) => {
    const active = isActive(link.href);
    const activeCls = active ? 'bg-black text-white font-bold' : 'text-slate-900 hover:bg-slate-100';
    return `<a href="${link.href}" class="flex items-center gap-3.5 py-3.5 px-4 rounded-xl ${activeCls} transition-colors text-sm">
        <span class="shrink-0">${link.icon}</span>
        <span>${link.drawerLabel || link.label}</span>
      </a>`;
  };

  const cartActive = isActive('/cart.html');
  const cartActiveCls = cartActive ? 'bg-black text-white font-bold' : 'text-slate-900 hover:bg-slate-100';
  const cartHtml = `<a href="/cart.html" class="flex items-center gap-3.5 py-3.5 px-4 rounded-xl ${cartActiveCls} transition-colors text-sm">
        <span class="shrink-0">
          <svg class="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </span>
        <span>سلة المشتريات</span>
      </a>`;

  const renderSecondary = (link) => {
    const active = isActive(link.href);
    const activeCls = active
      ? 'bg-black text-white font-bold'
      : 'text-slate-700 hover:text-black hover:bg-slate-100';
    return `<a href="${link.href}" class="flex items-center gap-3.5 py-3 px-4 text-xs ${activeCls} rounded-xl transition-colors">
        <span class="shrink-0">${link.icon}</span>
        <span>${link.drawerLabel || link.label}</span>
      </a>`;
  };

  return primaryLinks.map(renderPrimary).join('\n      ') +
    '\n      ' + cartHtml +
    `
      <div class="py-2 px-3">
        <div class="h-px bg-slate-200 w-full"></div>
      </div>
      ` +
    secondaryLinks.map(renderSecondary).join('\n      ');
}

function buildDrawer() {
  return `
  <!-- Mobile Slide Drawer (Layered above fixed header) -->
  <div id="mobile-drawer-backdrop" class="hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] transition-opacity duration-200 opacity-0"></div>
  <aside id="mobile-drawer" class="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-[60] shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col justify-between" aria-label="القائمة الجانبية">

    <!-- Drawer Header -->
    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
      <img src="/logo/logo.png" alt="جهازي" class="h-10 w-auto object-contain" />
      <button id="mobile-menu-close" type="button" class="w-9 h-9 rounded-xl bg-slate-100 text-black hover:bg-black hover:text-white flex items-center justify-center font-bold text-xl transition-colors" aria-label="إغلاق القائمة">&times;</button>
    </div>

    <!-- Drawer Navigation Links -->
    <div class="p-4 space-y-1.5 font-semibold flex-1 overflow-y-auto">
      ${buildDrawerLinks()}
    </div>

    <!-- Drawer Footer -->
    <div class="p-5 border-t border-slate-200 bg-slate-50 space-y-4 text-xs">
      <div class="text-xs text-slate-600 font-medium leading-relaxed">
        الوكيل المعتمد لبيكو وسامسونج في السويس • يومياً من 10 ص حتى 11 م
      </div>
      <div class="grid grid-cols-2 gap-2.5">
        <a href="tel:+201003043640" class="bg-black hover:bg-slate-800 text-white font-bold py-3 px-3 rounded-xl text-center flex items-center justify-center gap-2 transition-colors text-xs">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>اتصال</span>
        </a>
        <a href="https://wa.me/201003043640" target="_blank" rel="noopener noreferrer" class="bg-white border border-slate-300 hover:bg-slate-100 text-black font-bold py-3 px-3 rounded-xl text-center flex items-center justify-center gap-2 transition-colors text-xs">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>واتساب</span>
        </a>
      </div>
    </div>
  </aside>`;
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function initNavbar() {
  const placeholder = document.getElementById('site-navbar');
  if (!placeholder) return;

  placeholder.innerHTML = buildHeader() + buildDrawer();
}