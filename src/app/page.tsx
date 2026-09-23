"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────
   TRANSLATIONS — every detail from chez-shibata.com
   ─────────────────────────────────────────── */
const dict = {
  ja: {
    nav: { home: "ホーム", products: "商品紹介", chef: "シェフ紹介", shops: "店舗案内", online: "オンラインショップ", company: "会社概要", contact: "お問い合わせ", recruit: "採用情報" },
    heroSub: "PÂTISSERIE · CHOCOLATIER · SALON DE THÉ",
    intro: "多治見、名古屋をはじめ、海外に店舗を展開しているシェ・シバタ。\n世界のグルメ達から日本の技術や味覚が求められている今、\nフランスのお菓子の伝統や技術をベースに独自のスイーツを発信し続けます。",
    freshTitle: "FRESH CAKES",
    freshDesc: "季節ごとに変わるフレッシュなケーキ、シェフのインスピレーションで刺激的に変化していきます。",
    butterTitle: "BUTTER CAKES",
    butterDesc: "こだわりの素材、製法で焼き上げた伝統菓子からオリジナルのお菓子の紹介。",
    lineup: "LINEUP",
    chefRole: "Founder Executive Chef",
    chefName: "柴田 武",
    chefNameEn: "TAKESHI SHIBATA",
    chefBio: "幼き頃、母親と一緒に料理やお菓子を作り、職人の夢を持った。\n1995年にシェ・シバタを開業。\n現在、月の半分を日本と海外でお菓子創りやスタッフ指導、また国内、海外での企業コンサルからデモンストレーション、TV番組の出演など幅広く活躍。\n日本のサムライ魂を持ち、グローバルな感覚を持ち合わせたパティシエ。",
    tajimiPageTitle: "TAJIMI BRANCH",
    tajimiPageSub: "シェ・シバタ 多治見",
    tajimiLead: "フランスのお菓子文化、製法をベースに伝統的なお菓子から革新的なお菓子までシバタオリジナルのスイーツをお客様にお届けします。",
    tajimiDescEn: "Chef SHIBATA was born in a famous ceramic city, Tajimi.\nChez Shibata was opened in 1995 in Tajimi where my birthplace is.\nChef Shibata is now a tourism ambassador of TAJIMI city, recognized worldwide.",
    tajimiDescJa: "シェフ柴田の生まれた街、陶磁器の有名な街、多治見市。\n1995年にオープンしたシェ・シバタ発祥の地。\n今では海外などグローバルな活躍が認められ多治見市の観光大使に就任。",
    infoTitle: "INFORMATION",
    infoSub: "店舗情報",
    accessTitle: "ACCESS MAP",
    accessSub: "アクセスマップ",
    labels: { tel: "TEL", email: "E-mail", hours: "営業時間", holiday: "定休日", access: "アクセス", parking: "駐車場" },
    tajimi: { tel: "0572-24-3030", email: "shop@chez-shibata.com", hours: "10時〜19時", holiday: "火曜日", address: "〒507-0041 岐阜県多治見市太平町5-10-3", directions: "中央本線多治見駅北口より徒歩20分\n多治見ICより車で5分", parking: "7台" },
    allShops: [
      { en: "TAJIMI", ja: "シェ・シバタ多治見店", info: "〒507-0041 岐阜県多治見市太平町5-10-3\nTEL. 0572-24-3030\n10時〜19時" },
      { en: "NAGOYA", ja: "シェ・シバタ名古屋店", info: "〒464-0064 愛知県名古屋市千種区山門町2-54\nTEL. 052-762-0007\n10時〜19時" },
      { en: "MITSUKOSHI", ja: "シェ・シバタ名古屋栄三越店", info: "〒460-8669 愛知県名古屋市中区栄3-5-1\n名古屋栄三越 B1F\nTEL. 052-252-1270\n10時〜20時" },
      { en: "SEIBU IKEBUKURO", ja: "シェ・シバタ西武池袋店", info: "〒171-8569 東京都豊島区南池袋1-28-1\n西武池袋本店 B1F\nTEL. 03-6907-1333\n10時〜20時" },
      { en: "OVERSEAS", ja: "シェ・シバタ海外事業", info: "" }
    ],
    onlineShop: "ONLINE SHOP",
    onlineShopSub: "オンラインショップ",
    footerNav: {
      products: "商品紹介",
      freshCakes: "生ケーキ",
      butterCakes: "焼菓子",
      specialty: "スペシャリテ",
      chocolat: "ショコラ",
      wholeCakes: "ホールケーキ",
      chef: "シェフ紹介",
      shops: "店舗案内",
      company: "会社概要",
      contact: "お問い合わせ",
      recruit: "採用情報",
    },
  },
  en: {
    nav: { home: "Home", products: "Products", chef: "Chef", shops: "Shops", online: "Online Shop", company: "Company", contact: "Contact", recruit: "Recruit" },
    heroSub: "PÂTISSERIE · CHOCOLATIER · SALON DE THÉ",
    intro: "Chez Shibata has opened more than 10 shops throughout Asia, including in Tajimi and Nagoya.\nJapanese craftsmanship and sense of taste are now sought after by gourmet lovers around the world.\nWe continue to provide original sweets based on the traditions and techniques of French confectioneries.",
    freshTitle: "FRESH CAKES",
    freshDesc: "Fresh cakes that excitedly change from season to season based on the chef's inspiration.",
    butterTitle: "BUTTER CAKES",
    butterDesc: "Introducing our original confectioneries derived from traditional sweets baked using specially-selected ingredients and recipes.",
    lineup: "LINEUP",
    chefRole: "Founder Executive Chef",
    chefName: "Takeshi Shibata",
    chefNameEn: "TAKESHI SHIBATA",
    chefBio: "\"I used to cook dishes and bake sweets with my mother, and I dreamed of becoming a professional chef ever since I was young.\"\nOpened Chez Shibata in 1995. Currently, he spends half of each month creating confectioneries and training staff members both in Japan and overseas. He is also broadly active both domestically and internationally as a business consultant as well as giving demonstrations and making television appearances.\nHe is a pâtissier who combines the Japanese samurai spirit with global sensibilities.",
    tajimiPageTitle: "TAJIMI BRANCH",
    tajimiPageSub: "Chez Shibata Tajimi",
    tajimiLead: "We provide customers with a range of Shibata original sweets based on French confectionery culture and production methods, from traditional confectioneries to innovative sweets.",
    tajimiDescEn: "Chef SHIBATA was born in a famous ceramic city, Tajimi.\nChez Shibata was opened in 1995 in Tajimi where my birthplace is.\nChef Shibata is now a tourism ambassador of TAJIMI city, recognized worldwide.",
    tajimiDescJa: "Tajimi City is the birthplace of Chef Shibata and famous for pottery.\nThis is the origin of the Chez Shibata brand, opened in 1995.\nNow, in recognition of his global activities, Chef Shibata has been appointed as Tajimi City's tourism ambassador.",
    infoTitle: "INFORMATION",
    infoSub: "Shop Details",
    accessTitle: "ACCESS MAP",
    accessSub: "Directions",
    labels: { tel: "TEL", email: "E-mail", hours: "Hours", holiday: "Holiday", access: "Access", parking: "Parking" },
    tajimi: { tel: "0572-24-3030", email: "shop@chez-shibata.com", hours: "10:00 - 19:00", holiday: "Tuesday", address: "5-10-3 Taihei-cho, Tajimi City, Gifu", directions: "20 min on foot from the North Exit at Tajimi Station on the Chuo Line\n5 min by car from Tajimi IC", parking: "7 spaces" },
    allShops: [
      { en: "TAJIMI", ja: "Tajimi Main Shop", info: "5-10-3 Taihei-cho, Tajimi City\nTEL. 0572-24-3030\n10:00 - 19:00" },
      { en: "NAGOYA", ja: "Nagoya Shop", info: "2-54 Sanmon-cho, Chikusa-ku, Nagoya\nTEL. 052-762-0007\n10:00 - 19:00" },
      { en: "MITSUKOSHI", ja: "Sakae Mitsukoshi Shop", info: "B1F 3-5-1 Sakae, Naka-ku, Nagoya\nNagoya Sakae Mitsukoshi\nTEL. 052-252-1270\n10:00 - 20:00" },
      { en: "SEIBU IKEBUKURO", ja: "Seibu Ikebukuro Shop", info: "B1F 1-28-1 Minami-Ikebukuro\nToshima-ku, Tokyo\nTEL. 03-6907-1333\n10:00 - 20:00" },
      { en: "OVERSEAS", ja: "Overseas Operations", info: "" }
    ],
    onlineShop: "ONLINE SHOP",
    onlineShopSub: "Shop Online",
    footerNav: {
      products: "Products",
      freshCakes: "Fresh Cakes",
      butterCakes: "Butter Cakes",
      specialty: "Specialty",
      chocolat: "Chocolate",
      wholeCakes: "Whole Cakes",
      chef: "About the Chef",
      shops: "Shops",
      company: "Company Profile",
      contact: "Contact Us",
      recruit: "Recruit",
    },
  }
};

/* ─── Cake data — Whole Cakes from en.chez-shibata.com ─── */
const cakes = [
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2020/03/wholeCake_chantillyFruits.jpg", name: "CHANTILLY FRUITS", ja: "シャンティフリュイ", desc: "Fresh decoration cake decorated with fruit" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_laChantilly.jpg", name: "LA CHANTILLY", ja: "ラ・シャンティ", desc: "Made using fresh cream, sponge cake, strawberries and other berries." },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_tarteAuxFruits.jpg", name: "TARTE AUX FRUITS", ja: "タルト オ フリュイ", desc: "Fruit tart luxuriously topped with seasonal fruit" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_demilune.jpg", name: "DEMILUNE", ja: "ドゥミリュンヌ", desc: "Gorgeously decorated halfmoon-shaped fresh decoration cake" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_gateauAuChocolat-1.jpg", name: "GÂTEAU AU CHOCOLAT", ja: "ガトーショコラ", desc: "Chocolate cake baked using two varieties of the highest-quality chocolate" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_fromageCru.jpg", name: "FROMAGE CRU", ja: "フロマージュクリュ", desc: "Unbaked cheesecake containing raspberry jam and milk chocolate cream" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_saintMarc.jpg", name: "SAINT MARC", ja: "サンマルク", desc: "Traditional French confectionery featuring vanilla and chocolate cream layered between caramelized almond sponge cake" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_tarteAuFromage.jpg", name: "TARTE AU FROMAGE", ja: "タルト オ フロマージュ", desc: "Cheese tart made using French cream cheese" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2019/11/wholeCake_tarteAuChocolat.jpg", name: "TARTE AU CHOCOLAT", ja: "タルト オ ショコラ", desc: "Chocolate tart that melts in your mouth" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2020/03/burnt-cheese-cake.jpg", name: "BURNT CHEESE CAKE", ja: "バスクチーズケーキ", desc: "Original cheesecake based on Basque cheesecakes from San Sebastian, Spain" },
  { img: "https://en.chez-shibata.com/wp/wp-content/uploads/2018/04/DSC_3247-400x280.jpg", name: "MI CUIT FROMAGE", ja: "ミキュイフロマージュ", desc: "Lavishly made using French cream cheese and accented with homemade raspberry jam" },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
    {children}
  </motion.div>
);

export default function Home() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const d = dict[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero slideshow
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(s => (s + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const heroImages = [
    "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-1.jpg",
    "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-2-pc.jpg",
    "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-3-pc.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#ede8df] text-[#1a1a1a] font-[family-name:var(--font-noto-serif-jp)] selection:bg-[#8b7355]/30">

      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-tight">
            <span className={`font-[family-name:var(--font-cormorant)] text-lg tracking-[0.25em] uppercase transition-colors ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>Chez Shibata</span>
            <span className={`text-[9px] tracking-[0.15em] transition-colors ${scrolled ? "text-[#999]" : "text-white/60"}`}>シェ・シバタ</span>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden xl:flex gap-7 text-[11px] tracking-[0.15em]">
              {Object.entries(d.nav).slice(1, 6).map(([key, val]) => (
                <a key={key} href={key === "online" ? "https://shop-shibata.com/" : `#${key}`} target={key === "online" ? "_blank" : undefined} className={`hover:text-[#8b7355] transition-colors ${scrolled ? "text-[#555]" : "text-white/90"}`}>{val}</a>
              ))}
            </nav>

            {/* Language Pill */}
            <div className={`relative flex rounded-full p-[3px] border transition-colors ${scrolled ? "border-[#ddd] bg-[#f5f5f3]" : "border-white/20 bg-white/10 backdrop-blur-md"}`}>
              <div className={`absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full transition-all duration-300 ${lang === "en" ? "translate-x-full" : "translate-x-0"} ${scrolled ? "bg-white shadow-sm" : "bg-white/30"}`} />
              <button onClick={() => setLang("ja")} className={`relative z-10 w-10 py-1 text-[9px] tracking-[0.15em] font-medium transition-colors ${lang === "ja" ? (scrolled ? "text-[#1a1a1a]" : "text-white") : (scrolled ? "text-[#aaa]" : "text-white/50")}`}>JA</button>
              <button onClick={() => setLang("en")} className={`relative z-10 w-10 py-1 text-[9px] tracking-[0.15em] font-medium transition-colors ${lang === "en" ? (scrolled ? "text-[#1a1a1a]" : "text-white") : (scrolled ? "text-[#aaa]" : "text-white/50")}`}>EN</button>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden flex flex-col gap-[5px] p-2">
              <span className={`block w-5 h-px transition-all ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-px transition-all ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#FAFAF7] flex flex-col items-center justify-center gap-8">
            {Object.entries(d.nav).map(([key, val]) => (
              <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className="text-xl tracking-widest hover:text-[#8b7355] transition-colors">{val}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO SLIDESHOW ─── */}
      <section className="relative h-screen min-h-[650px] overflow-hidden bg-black">
        {heroImages.map((src, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${i === activeSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={src} alt="Chez Shibata" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] uppercase mb-6">
            Chez Shibata
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="text-[11px] md:text-xs tracking-[0.4em] text-white/70 font-[family-name:var(--font-cormorant)]">
            {d.heroSub}
          </motion.p>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-28 px-6 max-w-3xl mx-auto text-center">
        <FadeIn>
          <div className="w-px h-14 bg-[#8b7355] mx-auto mb-10" />
          <p className="text-base md:text-lg leading-[2.4] tracking-wide text-[#555] whitespace-pre-line">{d.intro}</p>
        </FadeIn>
      </section>

      {/* ─── FRESH CAKES ─── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl tracking-[0.15em] mb-4">WHOLE CAKES</h2>
            <p className="text-sm tracking-wide text-[#888] max-w-lg mx-auto leading-relaxed">{d.freshDesc}</p>
          </FadeIn>

          {/* Cake cards with names + descriptions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {cakes.map((cake, i) => (
              <FadeIn key={i} delay={i * 0.08} className="group">
                <div className="aspect-square overflow-hidden bg-[#f5f5f0] mb-4">
                  <img src={cake.img} alt={cake.ja} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.1em] text-[#555] mb-1">{cake.name}</p>
                <p className="text-[10px] tracking-wide text-[#8b7355] mb-2">{cake.ja}</p>
                {lang === "ja" && <p className="text-[10px] leading-relaxed text-[#999] hidden md:block">{cake.desc}</p>}
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center">
            <a href="https://chez-shibata.com/cakes-cat/fresh-cakes/" className="inline-block text-xs tracking-[0.2em] border-b border-[#1a1a1a] pb-1 hover:text-[#8b7355] hover:border-[#8b7355] transition-colors">{d.lineup}</a>
          </FadeIn>
        </div>
      </section>

      {/* ─── BUTTER CAKES ─── */}
      <section className="relative">
        <FadeIn className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl tracking-[0.15em] mb-6">{d.butterTitle}</h2>
            <p className="text-sm tracking-wide text-[#888] leading-relaxed mb-8 max-w-md">{d.butterDesc}</p>
            <a href="https://chez-shibata.com/cakes-cat/butter-cakes/" className="inline-block text-xs tracking-[0.2em] border-b border-[#1a1a1a] pb-1 hover:text-[#8b7355] hover:border-[#8b7355] transition-colors">{d.lineup}</a>
          </div>
          <div className="md:w-1/2 overflow-hidden">
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg" alt="Butter Cakes" className="w-full object-cover hover:scale-105 transition-transform duration-[2s]" />
          </div>
        </FadeIn>
      </section>

      {/* ─── CHEF ─── */}
      <section id="chef" className="py-28 bg-[#e5ded3]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16 items-center">
          <FadeIn className="md:w-2/5">
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/chef-sp.jpg" alt={d.chefName} className="w-full max-w-[380px] mx-auto aspect-[3/4] object-cover" />
          </FadeIn>
          <FadeIn delay={0.15} className="md:w-3/5">
            <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.25em] text-[#8b7355] mb-4 uppercase">{d.chefRole}</p>
            <h2 className="text-3xl md:text-4xl tracking-widest mb-2 font-light">{d.chefName}</h2>
            <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[#aaa] mb-8 uppercase">{d.chefNameEn}</p>
            <p className="text-sm leading-[2.4] tracking-wide text-[#666] whitespace-pre-line mb-8">{d.chefBio}</p>
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/sign.png" alt="Signature" className="h-10 opacity-50 mix-blend-multiply" />
          </FadeIn>
        </div>
      </section>

      {/* ─── TAJIMI DETAIL PAGE (from reference URL) ─── */}
      <section id="tajimi" className="py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl tracking-[0.2em] mb-2">{d.tajimiPageTitle}</h2>
            <p className="text-sm tracking-[0.15em] text-[#8b7355]">{d.tajimiPageSub}</p>
          </FadeIn>

          {/* Hero image */}
          <FadeIn className="mb-12">
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg" alt="Tajimi Shop" className="w-full aspect-[16/7] object-cover" />
          </FadeIn>

          {/* Information table */}
          <FadeIn className="max-w-2xl mx-auto bg-white border border-[#e8e5de] p-8 md:p-12 mb-16">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.2em] text-center mb-2">{d.infoTitle}</h3>
            <p className="text-[10px] tracking-[0.15em] text-[#8b7355] text-center mb-8">{d.infoSub}</p>
            <table className="w-full text-sm">
              <tbody>
                {[
                  [d.labels.tel, d.tajimi.tel],
                  [d.labels.email, d.tajimi.email, true],
                  [d.labels.hours, d.tajimi.hours],
                  [d.labels.holiday, d.tajimi.holiday],
                  [d.labels.access, `${d.tajimi.address}\n${d.tajimi.directions}`],
                  [d.labels.parking, d.tajimi.parking],
                ].map(([label, value, isEmail], i) => (
                  <tr key={i} className="border-b border-dotted border-[#ddd]">
                    <th className="py-4 text-left font-normal text-[#999] w-28 align-top tracking-wider text-xs">{label}</th>
                    <td className="py-4 tracking-wide whitespace-pre-line leading-[2]">
                      {isEmail ? <a href={`mailto:${value}`} className="text-[#8b7355] hover:underline">{value}</a> : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>

          {/* Google Map */}
          <FadeIn>
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.2em] text-center mb-2">{d.accessTitle}</h3>
            <p className="text-[10px] tracking-[0.15em] text-[#8b7355] text-center mb-8">{d.accessSub}</p>
            <div className="w-full h-[350px] md:h-[450px] bg-[#eee]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.771560339927!2d137.1120541!3d35.3364938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60036af5e33116a3%3A0x58aabb7ff5046c30!2z44K344Kn44O744K344OQ44K_IOWkmuayu-imi-W6lw!5e0!3m2!1sja!2sjp!4v1759112634563!5m2!1sja!2sjp" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ONLINE SHOP BANNER ─── */}
      <a href="https://shop-shibata.com/" target="_blank" rel="noopener noreferrer" className="block bg-[#1a1a1a] text-white text-center py-6 hover:bg-[#8b7355] transition-colors duration-500">
        <span className="font-[family-name:var(--font-cormorant)] text-lg tracking-[0.3em] uppercase">{d.onlineShop}</span>
        <span className="block text-[10px] tracking-[0.15em] text-white/60 mt-1">{d.onlineShopSub}</span>
      </a>

      {/* ─── ALL SHOPS CARDS ─── */}
      <section id="shops" className="py-28 bg-[#e5ded3]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.2em] uppercase mb-2">{d.nav.shops}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {d.allShops.map((shop, i) => (
              <FadeIn key={i} delay={i * 0.08} className="bg-white p-6 hover:shadow-lg transition-shadow duration-500 border border-transparent hover:border-[#8b7355]/20">
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg tracking-[0.15em] mb-1">{shop.en}</h3>
                <p className="text-[10px] tracking-[0.1em] text-[#8b7355] mb-4">{shop.ja}</p>
                {shop.info && <p className="text-[11px] leading-[2] tracking-wide text-[#777] whitespace-pre-line">{shop.info}</p>}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-28 bg-white border-t border-[#f5f5f0]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16">
          <FadeIn className="md:w-1/2">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl tracking-[0.15em] mb-4">CONTACT</h2>
            <p className="text-[10px] tracking-[0.1em] text-[#8b7355] mb-8">{lang === "ja" ? "お問い合わせ" : "Contact Us"}</p>
            <p className="text-sm tracking-wide text-[#888] leading-relaxed mb-8">
              {lang === "ja" 
                ? "商品に関するご質問やご意見など、お気軽にお問い合わせください。" 
                : "Please feel free to contact us with any questions or feedback regarding our products."}
            </p>
            <div className="text-xs tracking-wider text-[#555] space-y-2">
              <p>E-mail: shop@chez-shibata.com</p>
              <p>TEL: +81 (0) 572-24-3030</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="md:w-1/2">
            <form className="space-y-6 flex flex-col" onSubmit={e => e.preventDefault()}>
              <input 
                type="text" 
                placeholder={lang === "ja" ? "お名前" : "Name"} 
                className="w-full border-b border-[#ddd] pb-3 bg-transparent outline-none text-sm placeholder:text-[#aaa] focus:border-[#8b7355] transition-colors"
              />
              <input 
                type="email" 
                placeholder={lang === "ja" ? "メールアドレス" : "Email"} 
                className="w-full border-b border-[#ddd] pb-3 bg-transparent outline-none text-sm placeholder:text-[#aaa] focus:border-[#8b7355] transition-colors"
              />
              <textarea 
                placeholder={lang === "ja" ? "メッセージ" : "Message"} 
                rows={4}
                className="w-full border-b border-[#ddd] pb-3 bg-transparent outline-none text-sm placeholder:text-[#aaa] focus:border-[#8b7355] transition-colors resize-none"
              ></textarea>
              <button 
                type="submit" 
                className="self-start mt-4 px-10 py-3 bg-[#1a1a1a] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#8b7355] transition-colors duration-300"
              >
                {lang === "ja" ? "送信する" : "Send Message"}
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a1a1a] text-white/80 pt-16 pb-10 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-16">
            <div className="md:w-1/4">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[0.2em] uppercase text-white mb-2">Chez Shibata</p>
              <p className="text-[10px] tracking-[0.1em] text-white/40">シェ・シバタ</p>
            </div>
            <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-8 text-[11px] tracking-[0.1em]">
              <div>
                <p className="text-white/40 mb-3 text-[10px] tracking-[0.15em]">{d.footerNav.products}</p>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.freshCakes}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.butterCakes}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.specialty}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.chocolat}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.wholeCakes}</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white/40 mb-3 text-[10px] tracking-[0.15em]">{d.footerNav.shops}</p>
                <ul className="space-y-2">
                  {d.allShops.map((s, i) => <li key={i}><a href="#" className="hover:text-[#8b7355] transition-colors">{s.ja}</a></li>)}
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.chef}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.company}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.contact}</a></li>
                  <li><a href="#" className="hover:text-[#8b7355] transition-colors">{d.footerNav.recruit}</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social + Copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a href="https://line.me/R/ti/p/%40wnh0533o" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#8b7355] transition-colors text-[11px] tracking-[0.15em]">LINE</a>
              <a href="https://www.instagram.com/chezshibata/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#8b7355] transition-colors text-[11px] tracking-[0.15em]">Instagram</a>
            </div>
            <p className="text-white/30 text-[10px] tracking-[0.15em]">&copy; {new Date().getFullYear()} Chez Shibata. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
