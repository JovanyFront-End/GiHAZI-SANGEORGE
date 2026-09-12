/**
 * productData.js
 * Gihazi (جهازي) - Product Data Layer
 * 
 * Contains local product data and retrieval functions.
 * Designed to be easily replaced later by an API (e.g. GET /api/products)
 * without modifying UI components.
 */

export const products = [
  {
    id: 'beko-rcna406e40zx',
    name: 'ثلاجة بيكو كومبي نوفروست 406 لتر ستانلس ديجيتال',
    brand: 'BEKO',
    model: 'RCNA406E40ZX',
    category: 'refrigerators',
    categoryName: 'الثلاجات',
    price: 36900,
    oldPrice: 40500,
    image: '/products/beko-refrigerator.png',
    images: [
      '/products/beko-refrigerator.png',
      '/products/beko-refrigerator.png'
    ],
    shortDescription: 'تقنية NeoFrost بنظامي تبريد منفصلين مع إضاءة HarvestFresh للحفاظ على الفيتامينات.',
    description: 'ثلاجة بيكو كومبي توفر أقصى كفاءة تبريد بفضل نظام التبريد المزدوج NeoFrost، حيث تحافظ على الرطوبة المثالية في الثلاجة وتمنع انتقال الروائح بين الفريزر والثلاجة. مزودة بتكنولوجيا HarvestFresh الثورية التي تحاكي دورة ضوء الشمس الطبيعية للحفاظ على الفيتامينات في الخضراوات والفاكهة لفترة أطول.',
    specifications: {
      'السعة اللترية': '406 لتر',
      'تكنولوجيا التبريد': 'NeoFrost Dual Cooling (نوفروست)',
      'فئة كفاءة الطاقة': 'A++',
      'نوع الموتور': 'ProSmart Inverter (موفر للطاقة)',
      'اللون': 'ستانلس ستيل مقاوم للبصمات',
      'إضاءة داخلية': 'HarvestFresh LED ثلاثية الألوان',
      'التحكم': 'شاشة رقمية LED تعمل باللمس',
      'مستوى الضوضاء': '37 ديسيبل (فائق الهدوء)',
      'بلد المنشأ': 'تركيا',
      'الضمان': '10 سنوات على الموتور + 5 سنوات شامل من الوكيل'
    },
    features: [
      'تكنولوجيا HarvestFresh بـ 3 ألوان تحافظ على الفيتامينات لمدة 30 يوم',
      'محرك ProSmart Inverter يوفر حتى 40% من استهلاك الكهرباء',
      'خاصية التجميد السريع والتبريد الفائق',
      'أرفف من الزجاج المقوى شديد التحمل بسعة تصل لـ 25 كجم',
      'إنذار عند ترك الباب مفتوحاً'
    ],
    availability: 'in-stock',
    tags: ['الأكثر مبيعاً', 'وكيل معتمد', 'وفر 3,600 ج.م'],
    rating: 4.9,
    reviewsCount: 42,
    warrantyYears: 10
  },
  {
    id: 'samsung-bespoke-rf29bb8600',
    name: 'ثلاجة سامسونج بيسبوك 2 أبواب 650 لتر فرينش دور ديجيتال',
    brand: 'SAMSUNG',
    model: 'RF29BB8600',
    category: 'refrigerators',
    categoryName: 'الثلاجات',
    price: 88500,
    oldPrice: 95000,
    image: '/products/samsung-bespoke-refrigerator.avif',
    images: [
      '/products/samsung-bespoke-refrigerator.avif',
      '/products/bespoke-part.avif'
    ],
    shortDescription: 'تصميم Bespoke العصري مع مركز المشروبات Beverage Center وتقنية التبريد الثلاثي Triple Cooling.',
    description: 'تألق بأعلى درجات الرفاهية مع ثلاجة سامسونج بيسبوك 4 أبواب. تتميز بمساحة داخلية هائلة SpaceMax مع موزع مياه داخلي AutoFill Pitcher ونظام تبريد ذكي مدعوم بالذكاء الاصطناعي SmartThings AI Energy لتوفير حتى 15% من الكهرباء.',
    specifications: {
      'السعة اللترية': '650 لتر (29 قدم مكعب)',
      'تكنولوجيا التبريد': 'Triple Cooling + Metal Cooling',
      'التحكم الذكي': 'واي فاي مدمج وتطبيق SmartThings',
      'موزع المياه': 'Beverage Center داخلي مع إبريق تعبئة تلقائي',
      'صانع الثلج': 'Dual Auto Ice Maker (مكعبات ثلج وIce Bites)',
      'نوع الموتور': 'Digital Inverter بضمان 20 سنة',
      'اللون': 'زجاج أزرق كحلي مع أبيض جلام',
      'الأبعاد (سم)': '182.5 × 91.2 × 86.1',
      'الضمان': '20 سنة على المحرك + 10 سنوات شامل'
    },
    features: [
      'لوحات زجاجية قابلة للتخصيص بألوان متعددة Bespoke',
      'وضع توفير الطاقة بالذكاء الاصطناعي AI Energy Mode',
      'تبريد معدني Metal Cooling للحفاظ على البرودة السريعة',
      'أدراج FlexZone لدرجات حرارة مخصصة لكل نوع طعام'
    ],
    availability: 'in-stock',
    tags: ['فئة مميزة', 'Bespoke', 'وكيل معتمد'],
    rating: 5.0,
    reviewsCount: 29,
    warrantyYears: 20
  },
  {
    id: 'beko-b5wfu79415w',
    name: 'غسالة ملابس بيكو 9 كجم بخار 1400 لفة إنفرتر أبيض',
    brand: 'BEKO',
    model: 'B5WFU79415W',
    category: 'washing-machines',
    categoryName: 'الغسالات',
    price: 24500,
    oldPrice: 27000,
    image: '/products/beko-washing-machine.png',
    images: [
      '/products/beko-washing-machine.png'
    ],
    shortDescription: 'تقنية SteamCure بالبخار لإزالة التجاعيد بنسبة 50% وتعقيم 99.9% مع موتور إنفرتر.',
    description: 'غسالة ملابس بيكو سعة 9 كجم توفر عناية فائقة بالملابس من خلال قوة البخار الطبيعي SteamCure. يزيل البخار البقع الصعبة قبل الغسيل، ويمنع تجاعيد الأقمشة بعد الانتهاء، لتسهيل الكي وتوفير الوقت.',
    specifications: {
      'السعة': '9 كجم',
      'سرعة الدوران': '1400 لفة في الدقيقة',
      'موتور الغسالة': 'ProSmart Inverter بدون فرش',
      'تقنية البخار': 'SteamCure للتعقيم والتنعيم',
      'عدد البرامج': '15 برنامج ذكي',
      'البرنامج السريع': 'غسيل سريع 14 دقيقة لـ 2 كجم',
      'اللون': 'رمادي أنتراسيت مع باب كروم أسود',
      'بلد المنشأ': 'تركيا',
      'الضمان': '10 سنوات على الموتور + 5 سنوات شامل'
    },
    features: [
      'برنامج Hygiene+ المضاد للحساسية المعتمد من منظمة الحساسية البريطانية',
      'حلة AquaWave بحركة موجية رقيقة لحماية الأقمشة الحساسة',
      'إمكانية التحكم عبر البلوتوث وتطبيق HomeWhiz',
      'قفل أمان ضد عبث الأطفال'
    ],
    availability: 'in-stock',
    tags: ['الأكثر طلباً', 'وكيل معتمد'],
    rating: 4.8,
    reviewsCount: 56,
    warrantyYears: 10
  },
  {
    id: 'samsung-ww90t554dan',
    name: 'غسالة سامسونج 9 كجم إيكو بابل الذكية AI Control رمادي',
    brand: 'SAMSUNG',
    model: 'WW90T554DAN',
    category: 'washing-machines',
    categoryName: 'الغسالات',
    price: 28900,
    oldPrice: 32000,
    image: '/products/samsung-ecobubble-washer.avif',
    images: [
      '/products/samsung-ecobubble-washer.avif',
      '/products/sumsung-ecobubble-open.avif',
      '/products/samsung-ecobubble-side.avif'
    ],
    shortDescription: 'تقنية EcoBubble لتنظيف عميق بالماء البارد مع لوحة تحكم ذكية بالذكاء الاصطناعي AI Control.',
    description: 'تجمع غسالة سامسونج بين الذكاء الاصطناعي وتقنية إيكو بابل التي تحول المسحوق إلى فقاعات نشطة تخترق الأنسجة بسرعة لتنظيف أقوى بنسبة 24% في درجات حرارة منخفضة، مما يوفر الطاقة ويحمي ألوان ملابسك المفضلة.',
    specifications: {
      'السعة': '9 كجم',
      'سرعة الدوران': '1400 لفة في الدقيقة',
      'تكنولوجيا الغسيل': 'EcoBubble + Bubble Soak',
      'لوحة التحكم': 'ذكاء اصطناعي AI Control مع شاشة إلكترونية',
      'الاتصال': 'واي فاي عبر تطبيق SmartThings',
      'الموتور': 'Digital Inverter فائق الكفاءة والهدوء',
      'اللون': 'رمادي إينوكس غامق',
      'الضمان': '20 سنة على محرك الديجيتال إنفرتر'
    },
    features: [
      'نظام البخار الصحي Hygiene Steam للقضاء على 99.9% من البكتيريا',
      'تقنية الفحص الذكي Smart Check لاكتشاف الأعطال وحلها فوراً',
      'درج StayClean Drawer المصمم لتنظيف بقايا المسحوق تلقائياً',
      'برنامج Super Speed لغسيل حمولة كاملة خلال 59 دقيقة فقط'
    ],
    availability: 'in-stock',
    tags: ['عرض خاص', 'AI Control', 'وكيل معتمد'],
    rating: 4.9,
    reviewsCount: 38,
    warrantyYears: 20
  },
  {
    id: 'beko-bdfn36530xc',
    name: 'غسالة أطباق بيكو 15 فرد 6 برامج إنفرتر ستانلس كورنر إنتنس',
    brand: 'BEKO',
    model: 'BDFN36530XC',
    category: 'kitchen',
    categoryName: 'المطبخ',
    price: 26200,
    oldPrice: 28500,
    image: '/products/beko-dishwasher.png',
    images: [
      '/products/beko-dishwasher.png'
    ],
    shortDescription: 'ذراع رش CornerIntense ثلاثي الحركة للوصول لأدق زوايا الأواني مع تجفيف ذاتي SelfDry.',
    description: 'غسالة أطباق بيكو المتطورة مصممة لتتسع لـ 15 فرد براحة تامة. تضمن تقنية CornerIntense تغطية رش مثالية في كل ركن من أركان الغسالة، مع فتح الباب تلقائياً بعد انتهاء البرنامج SelfDry لضمان تجفيف مثالي ولمعان فائق.',
    specifications: {
      'عدد الأفراد': '15 فرد',
      'عدد البرامج': '6 برامج غسيل ذكية',
      'ذراع الرش': 'CornerIntense ثلاثي الفوهات',
      'الموتور': 'ProSmart Inverter موفر للكهرباء والماء',
      'خاصية التجفيف': 'SelfDry فتح تلقائي للباب',
      'استهلاك المياه': '9.5 لتر في الدورة',
      'مستوى الصوت': '44 ديسيبل',
      'اللون': 'ستانلس ستيل مقاوم للصدأ والبصمات',
      'الضمان': '10 سنوات على الموتور + 5 سنوات شامل'
    },
    features: [
      'وظيفة Fast+ لتسريع مدة دورة الغسيل حتى 3 مرات',
      'برنامج التعقيم المكثف HygieneIntense بالبخار الساخن',
      'رف علوي قابل لتعديل الارتفاع بـ 3 مستويات حتى وهو محمل بالأطباق',
      'درج علوي ثالث مخصص للشوك والملاعق والسكاكين'
    ],
    availability: 'in-stock',
    tags: ['أفضل تقييم', 'وكيل معتمد'],
    rating: 4.8,
    reviewsCount: 31,
    warrantyYears: 10
  },
  {
    id: 'beko-bbwht12300xs',
    name: 'فرن بيكو بلت إن 90 سم غاز ستانلس ديجيتال أمان كامل بالشواية',
    brand: 'BEKO',
    model: 'BBWHT12300XS',
    category: 'kitchen',
    categoryName: 'المطبخ',
    price: 24200,
    oldPrice: 26800,
    image: '/products/beko-built-in-oven.png',
    images: [
      '/products/beko-built-in-oven.png'
    ],
    shortDescription: 'سعة عملاقة 90 سم مع مروحة توزيع حراري وشواية دوارة وأمان كامل إيطالي.',
    description: 'فرن بلت إن بيكو مقاس 90 سم هو الاختيار المثالي لعشاق الطهي والولائم العائلية. مزود بمروحة تبريد وتوزيع للحرارة لضمان تسوية متجانسة لجميع المأكولات، مع زجاج عازل ثلاثي للحماية وأمان كامل يقطع الغاز تلقائياً في حال انطفاء الشعلة.',
    specifications: {
      'المقاس': '90 سم بلت إن',
      'نوع التشغيل': 'غاز طبيعي / أسطوانة مع شواية غاز',
      'نظام الأمان': 'أمان كامل إيطالي للفرن والشواية',
      'مروحة التوزيع': 'مروحة كونسيبت لتوزيع الحرارة المتساوي',
      'التحكم': 'مفاتيح متينة مع شاشة ديجيتال ومؤقت إلكتروني',
      'زجاج الباب': 'زجاج ثلاثي عازل سهل التنظيف',
      'الإضاءة': 'إضاءة هالوجين داخلية مزدوجة',
      'الضمان': '5 سنوات ضمان معتمد من الوكيل'
    },
    features: [
      'شواية دوارة لشواء الدجاج واللحوم بدرجة تحمير مثالية',
      'قضبان تلسكوبية لانزلاق الصواني الثقيلة بسلاسة وأمان',
      'طلاء داخلي انسيابي مانع لالتصاق الدهون وسهل المسح',
      'نظام تهوية أمامي للحفاظ على سلامة الخزائن المحيطة'
    ],
    availability: 'in-stock',
    tags: ['المطبخ العصري', 'وكيل معتمد'],
    rating: 4.9,
    reviewsCount: 22,
    warrantyYears: 5
  },
  {
    id: 'samsung-qa65q70c',
    name: 'شاشة سامسونج 65 بوصة QLED 4K سمارت 120Hz مع معالج كوانتوم',
    brand: 'SAMSUNG',
    model: 'QA65Q70CAUXEG',
    category: 'screens',
    categoryName: 'الشاشات',
    price: 43500,
    oldPrice: 48000,
    image: '/products/samsung-qled-tv.avif',
    images: [
      '/products/samsung-qled-tv.avif'
    ],
    shortDescription: 'دقة 4K بمعدل تحديث 120Hz مع تقنية كوانتوم دوت بنسبة ألوان 100% ومعالج Quantum 4K.',
    description: 'استمتع بتجربة بصرية سينمائية مذهلة مع تلفزيون سامسونج QLED مقاس 65 بوصة. بفضل معالج Quantum Processor 4K فائق الذكاء، يتم رفع جودة أي محتوى إلى دقة 4K بوضوح مذهل وتباين فائق، بالإضافة إلى تقنية Motion Xcelerator Turbo+ للألعاب بدون أي تقطيع بدقة 4K 120Hz.',
    specifications: {
      'حجم الشاشة': '65 بوصة',
      'نوع الشاشة': 'QLED 4K مع تكنولوجيا Quantum Dot',
      'معدل التحديث': '120Hz حقيقي للألعاب والأكشن',
      'المعالج': 'Quantum Processor 4K بتقنية الذكاء الاصطناعي',
      'المدى الديناميكي': 'Quantum HDR + HDR10+ Gaming',
      'نظام التشغيل': 'Tizen OS الذكي (يدعم كل التطبيقات العربية والعالمية)',
      'الصوت': 'Object Tracking Sound Lite (صوت يتتبع الحركة) + Q-Symphony',
      'المنافذ': '4 منافذ HDMI 2.1 + 2 منفذ USB + مخرج بصري Optical',
      'الضمان': 'سنتان شامل من توكيل سامسونج مصر'
    },
    features: [
      'حجم ألوان 100% معتمد من معهد VDE العالمي',
      'خاصية Game Bar 3.0 لتحكم احترافي في إعدادات ألعاب الفيديو',
      'تصميم AirSlim فائق النحافة بدون حواف تقريباً',
      'ريموت كن SolarCell الصديق للبيئة يشحن بالضوء الداخلي والخارجي'
    ],
    availability: 'in-stock',
    tags: ['الأكثر مبيعاً', 'سينما منزلية', '120Hz'],
    rating: 4.9,
    reviewsCount: 64,
    warrantyYears: 2
  },
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'موبايل سامسونج جالاكسي S25 الترا 512 جيجا 12 جيجا رام تيتانيوم',
    brand: 'SAMSUNG',
    model: 'SM-S938B',
    category: 'mobiles',
    categoryName: 'موبايلات وتابلت',
    price: 66500,
    oldPrice: 66500,
    image: '/products/samsung-galaxy-s25.webp',
    images: [
      '/products/samsung-galaxy-s25.webp'
    ],
    shortDescription: 'إطار تيتانيوم صلب، معالج Snapdragon 8 Elite، كاميرا 200 ميجابكسل مع Galaxy AI المتطور.',
    description: 'هاتف القمة من سامسونج جالاكسي S25 ألترا. يقدم تجربة استثنائية مع ذكاء اصطناعي ثوري Galaxy AI يساعدك في الترجمة الفورية والبحث بمجرد رسم دائرة وتحرير الصور باحترافية، مدعوماً بقلم S-Pen مدمج وشاشة مسطحة Dynamic AMOLED 2X فائقة السطوع.',
    specifications: {
      'الذاكرة والرام': '512 جيجابايت مساحة تخزين + 12 جيجابايت رام',
      'المعالج': 'Qualcomm Snapdragon 8 Elite بدقة 3 نانومتر',
      'الكاميرا الخلفية': 'رباعية: 200MP رئيسية + 50MP تقريب 5x + 10MP تقريب 3x + 50MP زاوية عريضة',
      'الشاشة': '6.8 بوصة Dynamic AMOLED 2X بتردد 120Hz وسطوع 2600 شمعة',
      'البطارية': '5000 مللي أمبير مع شحن سريع 45 واط وشحن لاسلكي',
      'الهيكل': 'إطار من التيتانيوم المقوى وزجاج Corning Gorilla Armor',
      'مقاومة الماء': 'معيار IP68 حتى عمق 1.5 متر',
      'الضمان': 'سنة ضمان محلي معتمد من سامسونج مصر'
    },
    features: [
      'قلم S-Pen مدمج لكتابة الملاحظات والرسم والتحكم عن بعد',
      'مزايا Galaxy AI للترجمة الفورية أثناء المكالمات وتلخيص النصوص',
      'تصوير ليلي فائق Nightography بأدق التفاصيل وأقل تشويش',
      'دعم تحديثات أندرويد وأمان حتى 7 سنوات قادمة'
    ],
    availability: 'in-stock',
    tags: ['أحدث إصدار', 'Galaxy AI', 'تيتانيوم'],
    rating: 5.0,
    reviewsCount: 88,
    warrantyYears: 1
  },
  {
    id: 'tornado-43es4601e',
    name: 'شاشة تورنيدو 43 بوصة سمارت FHD إل إي دي تدعم الرسيفر الداخلي',
    brand: 'TORNADO',
    model: '43ES4601E',
    category: 'screens',
    categoryName: 'الشاشات',
    price: 12000,
    oldPrice: 13500,
    image: '/products/tornado-smart-tv.jpg',
    images: [
      '/products/tornado-smart-tv.jpg',
      '/products/tornado-smart-tv-back.jpg',
    ],
    shortDescription: 'شاشة سمارت Full HD مع رسيفر داخلي ودعم يوتيوب وشاهد ونتفليكس بضمان العربي.',
    description: 'شاشة تورنيدو سمارت مقاس 43 بوصة بدقة Full HD تمنحك صورة نقية وألوان طبيعية حيوية. مجهزة بنظام تشغيل ذكي يتيح تصفح الإنترنت والاستمتاع بأحدث الأفلام والمسلسلات عبر أشهر التطبيقات العالمية والمحلية، مع رسيفر داخلي يغنيك عن الأجهزة الإضافية.',
    specifications: {
      'حجم الشاشة': '43 بوصة',
      'دقة العرض': '1920 × 1080 (Full HD)',
      'نوع الإضاءة': 'D-LED تباين عالي',
      'الاتصال': 'واي فاي مدمج + مدخل كابل إيثرنت LAN',
      'المنافذ': '2 HDMI + 2 USB + مدخل هوائي RF',
      'الرسيفر الداخلي': 'مدمج DVB-T2/S2',
      'الضمان': 'سنتان ضمان مجاني شامل من مجموعة العربي'
    },
    features: [
      'تطبيقات مثبتة مسبقاً: YouTube, Netflix, Shahid VIP',
      'خاصية مشاركة شاشة الهاتف المحمول على التلفزيون بسهولة',
      'نظام صوت ستيريو مجسم Dolby Audio',
      'قوائم تشغيل عربية سهلة وبسيطة'
    ],
    availability: 'in-stock',
    tags: ['سعر اقتصادي', 'ضمان العربي'],
    rating: 4.7,
    reviewsCount: 52,
    warrantyYears: 2
  },
  {
    id: 'bosch-tis65621rw',
    name: 'ماكينة قهوة بوش فيرو باريستا 600 ديجيتال أوتوماتيك مع تانك حليب',
    brand: 'BOSCH',
    model: 'TIS65621RW',
    category: 'small-appliances',
    categoryName: 'الأجهزة الصغيرة',
    price: 54000,
    oldPrice: 59000,
    image: '/products/bosch-coffee-machine.webp',
    images: [
      '/products/bosch-coffee-machine.webp'
    ],
    shortDescription: 'ماكينة إسبريسو أوتوماتيكية بالكامل بنظام SensoFlow ومطحنة سيراميك وتحضير لمسة واحدة.',
    description: 'عش تجربة المقهى الإيطالي الفاخر في منزلك مع ماكينة القهوة بوش VeroBarista 600. تتيح لك تحضير قهوتك المفضلة من الإسبريسو المركز إلى الكابتشينو واللاتيه برغوة حليب كريمية غنية بلمسة زر واحدة OneTouch DoubleCup.',
    specifications: {
      'نوع التشغيل': 'أوتوماتيك بالكامل من الحبوب حتى الفنجان',
      'ضغط المضخة': '19 بار احترافي',
      'المطحنة': 'سيراميك CeramDrive فائقة التحمل ولا تسخن الحبوب',
      'نظام التسخين': 'SensoFlow System لدرجة حرارة تحضير مثالية وثابتة',
      'خزان المياه': '1.7 لتر قابل للإزالة',
      'وعاء الحليب': 'معزول حرارياً مع نظام تنظيف البخار التلقائي AutoMilk Clean',
      'التحكم': 'شاشة ملونة تعمل باللمس CoffeeSelect Display',
      'الضمان': 'سنتان ضمان معتمد من بوش مصر'
    },
    features: [
      'وظيفة OneTouch DoubleCup لتحضير كوبين من أي مشروب في وقت واحد',
      'إمكانية تخصيص حجم الكوب وتركيز القهوة ودرجة حرارة الحليب وحفظ المفضلات',
      'ميزة AromaDouble Shot لقهوة قوية إضافية بدون مرارة',
      'وحدة تخمير قابلة للفك والغسل بسهولة بالماء'
    ],
    availability: 'in-stock',
    tags: ['فخامة القهوة', 'وكيل معتمد', '19 بار'],
    rating: 4.9,
    reviewsCount: 19,
    warrantyYears: 2
  },
  {
    id: 'beko-mcg20100s',
    name: 'ميكروويف بيكو 20 لتر ديجيتال بالشواية ستانلس مع 8 برامج تلقائية',
    brand: 'BEKO',
    model: 'MCG20100S',
    category: 'small-appliances',
    categoryName: 'الأجهزة الصغيرة',
    price: 6800,
    oldPrice: 7500,
    image: '/products/beko-microwave.png',
    images: [
      '/products/beko-microwave.png'
    ],
    shortDescription: 'سعة 20 لتر بقوة 800 واط مع شواية 1000 واط وإذابة سريعة بالوزن والوقت.',
    description: 'ميكروويف بيكو الديجيتال بالشواية يجمع بين سرعة تسخين الميكروويف وقرمشة الشواية الذهبية. مزود بـ 8 برامج طهي تلقائية للبيتزا واللحوم والمشروبات، مع تحكم رقمي دقيق وقفل أمان للأطفال.',
    specifications: {
      'السعة': '20 لتر',
      'قدرة الميكروويف': '800 واط (5 مستويات طاقة)',
      'قدرة الشواية': '1000 واط لتحمير مثالي',
      'التحكم': 'شاشة LED ديجيتال مع أزرار لمس ومؤقت 95 دقيقة',
      'قطر الطبق الدوار': '24.5 سم زجاج مقوى',
      'اللون': 'سيلفر ستانلس ستيل مع باب أسود',
      'الضمان': 'سنتان ضمان شامل من توكيل بيكو'
    },
    features: [
      'إذابة تجميد ذكية بحسب الوزن أو الوقت للحفاظ على جودة اللحوم',
      'خاصية الطهي متعدد المراحل (ميكروويف + شواية)',
      'إشارة صوتية عند انتهاء الطهي مع إضاءة داخلية واضحة',
      'قفل أمان للأطفال لمنع العبث بالإعدادات'
    ],
    availability: 'in-stock',
    tags: ['عملي وسريع', 'وكيل معتمد'],
    rating: 4.7,
    reviewsCount: 37,
    warrantyYears: 2
  }
];

// Helper functions designed for future API transition (e.g. replacing with fetch('/api/products'))

/**
 * Get all products with optional filters
 * @param {Object} filters - { category, brand, minPrice, maxPrice, inStockOnly, search }
 * @returns {Promise<Array>}
 */
export async function getProducts(filters = {}) {
  // Simulates asynchronous response for future API compatibility
  return new Promise((resolve) => {
    let result = [...products];

    if (filters.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.brand && filters.brand !== 'all') {
      result = result.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }

    if (filters.inStockOnly) {
      result = result.filter(p => p.availability === 'in-stock');
    }

    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          result.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
        default:
          break;
      }
    }

    resolve(result);
  });
}

/**
 * Get product by unique ID
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getProductById(id) {
  return new Promise((resolve) => {
    const product = products.find(p => p.id === id) || null;
    resolve(product);
  });
}

/**
 * Get related products within same category
 * @param {string} currentProductId 
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function getRelatedProducts(currentProductId, limit = 4) {
  return new Promise((resolve) => {
    const current = products.find(p => p.id === currentProductId);
    if (!current) {
      resolve(products.slice(0, limit));
      return;
    }
    const related = products
      .filter(p => p.id !== currentProductId && (p.category === current.category || p.brand === current.brand))
      .slice(0, limit);
    
    // If not enough related in same category, pad with others
    if (related.length < limit) {
      const remaining = products.filter(p => p.id !== currentProductId && !related.includes(p));
      related.push(...remaining.slice(0, limit - related.length));
    }

    resolve(related);
  });
}

/**
 * Get unique list of product categories
 * @returns {Array<{id: string, name: string, count: number}>}
 */
export function getCategories() {
  const map = new Map();
  products.forEach(p => {
    if (!map.has(p.category)) {
      map.set(p.category, { id: p.category, name: p.categoryName, count: 1 });
    } else {
      map.get(p.category).count++;
    }
  });
  return Array.from(map.values());
}

/**
 * Get unique list of brands
 * @returns {Array<{name: string, count: number}>}
 */
export function getBrands() {
  const map = new Map();
  products.forEach(p => {
    if (!map.has(p.brand)) {
      map.set(p.brand, { name: p.brand, count: 1 });
    } else {
      map.get(p.brand).count++;
    }
  });
  return Array.from(map.values());
}

/**
 * Format Egyptian Pounds with comma separation
 * @param {number} price 
 * @returns {string} e.g. "36,900 ج.م"
 */
export function formatPrice(price) {
  if (typeof price !== 'number') return '0 ج.م';
  return `${price.toLocaleString('ar-EG')} ج.م`;
}
