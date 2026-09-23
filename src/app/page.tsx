"use client";

import { useState, useEffect, useRef } from "react";
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

/* ─── Cake data — Seasonal Cakes (scraped from chez-shibata.com/cakes-cat/fresh-cakes/) ─── */
const seasonalCakes = [
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2025/05/IMG_9751-400x280.jpg",
    name: "Thai Milk Tea Cake",
    ja: "タイミルクティーケーキ",
    desc: "《名古屋店限定》シバタのバンコク店でも人気なタイミルクティーをケーキにアレンジ。香り高いタイの紅茶とセモア社のショコラを合わせた甘さをおさえアロマを味わうお菓子。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2024/11/IMG_8029-400x280.jpg",
    name: "Infiniment Vanille",
    ja: "アンフィニモン　バニーユ",
    desc: "《名古屋店限定》マダガスカル産のバニラを惜しみなく使用。バニラムース、バニラガナッシュ、バニラのバスク生地にイチゴの香りがアクセント。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2024/10/IMG_7757-400x280.jpg",
    name: "Forêt Rouge",
    ja: "フォレルージュ",
    desc: "ドイツのお菓子、ブラックフォレストを赤いフルーツを使用しオリジナル仕立て。ショコラとグリオットチェリーにキルシュを加えました。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2023/05/IMG_3863-400x280.jpg",
    name: "Opéra",
    ja: "オペラ",
    desc: "《名古屋店限定》メキシコ産ホワイトカカオを使用したムースにクレームブリュレのカフェと自家製コーヒーのプラリネを合わせた進化系オペラ。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2023/05/IMG_3865-400x280.jpg",
    name: "Chocolat Banane",
    ja: "ショコラバナーヌ",
    desc: "シェフが修行時代から作り続けているお菓子。ショコラとバナナの抜群な相性を新たなフォルムで完成度を上げました。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2024/11/IMG_7916-400x280.jpg",
    name: "Le Champignon",
    ja: "ル　シャンピニオン",
    desc: "アールグレイとキャラメルにアクセントでパッションの酸味をつけたキノコ型のお菓子。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2022/07/cbabd95807257e7e5b6b2601863e522b-e1658022512598-400x280.jpg",
    name: "Flan Fromage",
    ja: "フランフロマージュ",
    desc: "《名古屋店限定》クリームチーズを使用したフラン風チーズタルト。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2020/11/5e94736b3270442c31fc52742fc02e24-400x280.jpeg",
    name: "Gourmandise",
    ja: "グルマンディーズ",
    desc: "《名古屋店限定》国産いちごとキルシュのカスタードクリーム、北海道産生クリームをパイ生地とシュー生地でサンドにしました。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2022/11/5e4c8ec0ae6cf00b5d5a5d19aa4a070f-400x280.png",
    name: "Caprice Poire Caramel",
    ja: "カプリス  ポワール  キャラメル",
    desc: "香り豊かな洋梨を最大限に活かし、キャラメルの香ばしさで大人のテイストに仕上げました。芳醇な香りをお楽しみください。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2016/11/casino_01-400x280.jpg",
    name: "Casino",
    ja: "カジノ",
    desc: "《多治見店限定》マカオのカジノでインスピレーションを受けたサイコロ型のスイーツ。センターにはベリーのコンポートで酸味をプラス。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2016/11/miranda_01-400x280.jpg",
    name: "Miranda",
    ja: "ミランダ",
    desc: "《多治見店限定》イチゴとコンデンスミルクをトップにセンガセンガナのジュレとチーズのタルト。",
  },
  {
    img: "https://chez-shibata.com/wp/wp-content/uploads/2019/06/2b99d76d972a8601d33a626063920e02-400x280.jpg",
    name: "Duo Fromage",
    ja: "デュオ フロマージュ",
    desc: "《多治見店限定》レアチーズとベイクドチーズの２種類を組み合わせ、自家製ブルーベリーのコンフィチュールでアクセントをつけました。",
  },
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
  const sliderRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f0eb] font-[family-name:var(--font-noto-serif-jp)] selection:bg-[#8b7355]/30">

      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-lg shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-tight">
            <span className={`font-[family-name:var(--font-cormorant)] text-lg tracking-[0.25em] uppercase transition-colors ${scrolled ? "text-white" : "text-white"}`}>Chez Shibata</span>
            <span className={`text-[9px] tracking-[0.15em] transition-colors ${scrolled ? "text-white/50" : "text-white/60"}`}>シェ・シバタ</span>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden xl:flex gap-7 text-[11px] tracking-[0.15em]">
              {Object.entries(d.nav).slice(1, 6).map(([key, val]) => (
                <a key={key} href={key === "online" ? "https://shop-shibata.com/" : `#${key}`} target={key === "online" ? "_blank" : undefined} className={`hover:text-[#8b7355] transition-colors ${scrolled ? "text-white/80" : "text-white/90"}`}>{val}</a>
              ))}
            </nav>

            {/* Language Pill */}
            <div className={`relative flex rounded-full p-[3px] border transition-colors ${scrolled ? "border-white/20 bg-white/10" : "border-white/20 bg-white/10 backdrop-blur-md"}`}>
              <div className={`absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full transition-all duration-300 ${lang === "en" ? "translate-x-full" : "translate-x-0"} ${scrolled ? "bg-white/20" : "bg-white/30"}`} />
              <button onClick={() => setLang("ja")} className={`relative z-10 w-10 py-1 text-[9px] tracking-[0.15em] font-medium transition-colors ${lang === "ja" ? "text-white" : "text-white/50"}`}>JA</button>
              <button onClick={() => setLang("en")} className={`relative z-10 w-10 py-1 text-[9px] tracking-[0.15em] font-medium transition-colors ${lang === "en" ? "text-white" : "text-white/50"}`}>EN</button>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden flex flex-col gap-[5px] p-2">
              <span className={`block w-5 h-px transition-all bg-white ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-px transition-all bg-white ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col items-center justify-center gap-8">
            {Object.entries(d.nav).map(([key, val]) => (
              <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className="text-xl tracking-widest hover:text-[#8b7355] transition-colors">{val}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO SLIDESHOW ─── */}
      <section className="relative h-screen min-h-[650px] overflow-hidden bg-black">
        {heroImages.map((src, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[2s] ease-in-out ${i === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <div className={`w-full h-full transform transition-transform duration-[10s] ease-out ${i === activeSlide ? "scale-105" : "scale-100"}`}>
              <img src={src} alt="Chez Shibata" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] uppercase mb-6">
            Chez Shibata
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="text-[11px] md:text-xs tracking-[0.4em] text-white/70 font-[family-name:var(--font-cormorant)] mb-20">
            {d.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[8px] tracking-[0.3em] text-white/50 uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <motion.div animate={{ y: [0, 48] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-full h-1/2 bg-white/80 absolute top-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="pt-28 pb-20 px-6 max-w-3xl mx-auto text-center">
        <FadeIn>
          <div className="w-px h-14 bg-[#8b7355] mx-auto mb-10" />
          <p className="text-base md:text-lg leading-[2.4] tracking-wide text-[#bbb] whitespace-pre-line">{d.intro}</p>
        </FadeIn>
      </section>

      {/* ─── INFINITE MARQUEE ─── */}
      <div className="w-full overflow-hidden whitespace-nowrap bg-[#1a1a1a] py-8 border-y border-[#333]/50 relative z-10 flex items-center">
        <motion.div 
          animate={{ x: [0, -1035] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl tracking-[0.2em] text-[#333] uppercase"
        >
          <span className="mr-8">PÂTISSERIE &bull; CHOCOLATIER &bull; SALON DE THÉ &bull;</span>
          <span className="mr-8">PÂTISSERIE &bull; CHOCOLATIER &bull; SALON DE THÉ &bull;</span>
          <span className="mr-8">PÂTISSERIE &bull; CHOCOLATIER &bull; SALON DE THÉ &bull;</span>
          <span className="mr-8">PÂTISSERIE &bull; CHOCOLATIER &bull; SALON DE THÉ &bull;</span>
        </motion.div>
      </div>

      {/* ─── FRESH CAKES ─── */}
      <section id="products" className="py-24 bg-[#111] relative overflow-hidden">
        {/* Decorative number */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[20rem] font-[family-name:var(--font-cormorant)] text-white/[0.02] font-bold pointer-events-none leading-none select-none">01</div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl tracking-[0.15em] mb-4 text-white">WHOLE CAKES</h2>
            <p className="text-sm tracking-wide text-[#888] max-w-lg mx-auto leading-relaxed">{d.freshDesc}</p>
          </FadeIn>

          {/* Cake cards with names + descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mb-20">
            {cakes.map((cake, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.1} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#1a1a1a] mb-8">
                  <img src={cake.img} alt={cake.ja} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100" loading="lazy" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.15em] text-[#eee] mb-2 uppercase">{cake.name}</h3>
                <p className="text-[11px] tracking-[0.2em] text-[#8b7355] mb-5">{cake.ja}</p>
                {lang === "ja" && <p className="text-xs leading-relaxed text-[#777] max-w-sm mx-auto">{cake.desc}</p>}
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center">
            <a href="https://chez-shibata.com/cakes-cat/fresh-cakes/" className="inline-block text-xs tracking-[0.2em] border-b border-[#f5f0eb] pb-1 hover:text-[#8b7355] hover:border-[#8b7355] transition-colors">{d.lineup}</a>
          </FadeIn>
        </div>
      </section>

      {/* ─── SEASONAL CAKES (Modern Framer Motion Showcase) ─── */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Massive Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] whitespace-nowrap font-[family-name:var(--font-cormorant)] text-white/[0.03] font-bold pointer-events-none select-none tracking-widest">
          SEASONAL
        </div>

        <FadeIn className="px-6 md:px-10 mb-16 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl tracking-[0.1em] mb-4 text-white uppercase">Seasonal Cakes</h2>
            <p className="text-sm tracking-widest text-[#888] max-w-lg leading-relaxed">{d.freshDesc}</p>
          </div>
          <a href="https://chez-shibata.com/cakes-cat/fresh-cakes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-xs tracking-[0.2em] text-[#f5f0eb] hover:text-[#8b7355] transition-colors shrink-0 group">
            <span className="uppercase">{d.lineup}</span>
            <div className="w-12 h-px bg-[#f5f0eb] group-hover:bg-[#8b7355] transition-colors relative after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-2 after:h-[1px] after:bg-inherit after:rotate-45 before:content-[''] before:absolute before:right-0 before:-bottom-[3px] before:w-2 before:h-[1px] before:bg-inherit before:-rotate-45"></div>
          </a>
        </FadeIn>

        {/* Framer Motion Draggable Carousel */}
        <div className="pl-6 md:pl-10 relative z-10 overflow-hidden" ref={sliderRef}>
          <motion.div 
            className="flex gap-8 md:gap-16 cursor-grab active:cursor-grabbing pb-12 w-max pr-10 touch-pan-y"
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
          >
            {seasonalCakes.map((cake, i) => (
              <motion.div
                key={i}
                className="shrink-0 flex flex-col justify-center relative group"
                style={{ width: "clamp(300px, 40vw, 500px)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Image blending into pitch black background */}
                <div className="w-full aspect-square relative mb-6 pointer-events-none flex items-center justify-center">
                  <img
                    src={cake.img}
                    alt={cake.ja}
                    className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-[1.5s] ease-out pointer-events-none"
                    draggable="false"
                  />
                  {/* Subtle gradient vignette to blend edges perfectly into black */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_100%)] pointer-events-none"></div>
                </div>
                
                {/* Typography underneath */}
                <div className="text-center px-4 pointer-events-none mt-auto">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl tracking-[0.1em] text-white mb-3">{cake.name}</h3>
                  <p className="text-[11px] tracking-[0.3em] text-[#8b7355] mb-5 uppercase">{cake.ja}</p>
                  <p className="text-xs leading-[2.2] text-[#777] max-w-xs mx-auto">{cake.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CHEF ─── */}
      <section id="chef" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 md:-left-10 text-[15rem] md:text-[25rem] font-[family-name:var(--font-cormorant)] text-white/[0.02] font-bold pointer-events-none leading-none select-none">03</div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16 items-center relative z-10">
          <FadeIn className="md:w-2/5">
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/chef-sp.jpg" alt={d.chefName} className="w-full max-w-[380px] mx-auto aspect-[3/4] object-cover" />
          </FadeIn>
          <FadeIn delay={0.15} className="md:w-3/5">
            <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.25em] text-[#8b7355] mb-4 uppercase">{d.chefRole}</p>
            <h2 className="text-3xl md:text-4xl tracking-widest mb-2 font-light">{d.chefName}</h2>
            <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[#888] mb-8 uppercase">{d.chefNameEn}</p>
            <p className="text-sm leading-[2.4] tracking-wide text-[#bbb] whitespace-pre-line mb-8">{d.chefBio}</p>
            <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/sign.png" alt="Signature" className="h-10 invert opacity-80" />
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
          <FadeIn className="max-w-2xl mx-auto bg-[#111] border border-[#333] p-8 md:p-12 mb-16">
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
                  <tr key={i} className="border-b border-dotted border-[#333]">
                    <th className="py-4 text-left font-normal text-[#888] w-28 align-top tracking-wider text-xs">{label}</th>
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
      <a href="https://shop-shibata.com/" target="_blank" rel="noopener noreferrer" className="block bg-[#8b7355] text-white text-center py-8 hover:bg-[#a68c6a] transition-colors duration-500">
        <span className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.3em] uppercase">{d.onlineShop}</span>
        <span className="block text-xs tracking-[0.15em] text-white/80 mt-2">{d.onlineShopSub}</span>
      </a>

      {/* ─── ALL SHOPS CARDS ─── */}
      <section id="shops" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.2em] uppercase mb-2">{d.nav.shops}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {d.allShops.map((shop, i) => (
              <FadeIn key={i} delay={i * 0.08} className="bg-[#111] p-6 hover:shadow-lg transition-shadow duration-500 border border-[#222] hover:border-[#8b7355]/50">
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg tracking-[0.15em] mb-1 text-[#f5f0eb]">{shop.en}</h3>
                <p className="text-[10px] tracking-[0.1em] text-[#8b7355] mb-4">{shop.ja}</p>
                {shop.info && <p className="text-[11px] leading-[2] tracking-wide text-[#aaa] whitespace-pre-line">{shop.info}</p>}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-28 bg-[#1a1a1a] border-t border-[#333]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16">
          <FadeIn className="md:w-1/2">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl tracking-[0.15em] mb-4">CONTACT</h2>
            <p className="text-[10px] tracking-[0.1em] text-[#8b7355] mb-8">{lang === "ja" ? "お問い合わせ" : "Contact Us"}</p>
            <p className="text-sm tracking-wide text-[#bbb] leading-relaxed mb-8">
              {lang === "ja" 
                ? "商品に関するご質問やご意見など、お気軽にお問い合わせください。" 
                : "Please feel free to contact us with any questions or feedback regarding our products."}
            </p>
            <div className="text-xs tracking-wider text-[#aaa] space-y-2">
              <p>E-mail: shop@chez-shibata.com</p>
              <p>TEL: +81 (0) 572-24-3030</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="md:w-1/2">
            <form className="space-y-6 flex flex-col" onSubmit={e => e.preventDefault()}>
              <input 
                type="text" 
                placeholder={lang === "ja" ? "お名前" : "Name"} 
                className="w-full border-b border-[#444] pb-3 bg-transparent outline-none text-[#eee] text-sm placeholder:text-[#888] focus:border-[#8b7355] transition-colors"
              />
              <input 
                type="email" 
                placeholder={lang === "ja" ? "メールアドレス" : "Email"} 
                className="w-full border-b border-[#444] pb-3 bg-transparent outline-none text-[#eee] text-sm placeholder:text-[#888] focus:border-[#8b7355] transition-colors"
              />
              <textarea 
                placeholder={lang === "ja" ? "メッセージ" : "Message"} 
                rows={4}
                className="w-full border-b border-[#444] pb-3 bg-transparent outline-none text-[#eee] text-sm placeholder:text-[#888] focus:border-[#8b7355] transition-colors resize-none"
              ></textarea>
              <button 
                type="submit" 
                className="self-start mt-4 px-10 py-3 bg-white text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase hover:bg-[#8b7355] hover:text-white transition-colors duration-300"
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
