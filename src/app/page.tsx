"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const t = {
  ja: {
    nav: { products: "商品一覧", chef: "シェフ", tajimi: "多治見本店", shops: "全店舗", contact: "お問い合わせ" },
    heroTitle: "CHEZ SHIBATA",
    heroSub: "Woven with carefully selected ingredients",
    intro: "シェ・シバタは、フランス菓子の伝統的な技法と日本の繊細な感性を融合させたパティスリーです。一切の妥協を許さない美学に基づき、職人技が光る極上のスイーツをお届けします。",
    freshCakes: "Fresh Cakes",
    freshCakesDesc: "シェフのインスピレーションから生まれた、季節ごとに華やかに変化する生菓子です。",
    butterCakes: "Baked Goods",
    butterCakesDesc: "厳選された素材とレシピで焼き上げた、伝統的なお菓子から生まれたオリジナル焼き菓子をご紹介します。",
    chefName: "Takeshi Shibata",
    chefRole: "Founder / Executive Chef",
    chefBio: "「子供の頃から母と一緒に料理やお菓子を作り、プロのシェフになることを夢見ていました。」\n1995年にシェ・シバタを開店。現在は毎月半分を国内外での菓子製作やスタッフの指導に費やしています。ビジネスコンサルタント、デモンストレーション、テレビ出演など、国内外で幅広く活躍。日本の侍精神とグローバルな感性を融合させたパティシエです。",
    tajimiTitle: "TAJIMI",
    tajimiLead: "フランス菓子の文化と製法をベースに、伝統的な菓子から革新的なスイーツまで、シバタオリジナルスイーツをお客様にご提供しています。",
    tajimiDesc: "多治見市はシェフ柴田の出身地であり、陶器で有名な街です。\nここはシェ・シバタブランドの発祥の地で、1995年に開店しました。\n現在、世界的な活動が認められ、柴田シェフは多治見市の観光大使に任命されています。",
    labels: { tel: "TEL", email: "MAIL", hours: "HOURS", holiday: "HOLIDAY", access: "ACCESS" },
    locations: [
      { 
        id: "tajimi", name: "TAJIMI", tel: "0572-24-3030", email: "shop@chez-shibata.com", hours: "10:00 - 19:00", holiday: "火曜日", access: "岐阜県多治見市太平町5-10-3\nJR中央線 多治見駅北口より徒歩20分", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg", span: "col-span-1 md:col-span-2 row-span-2"
      },
      { 
        id: "nagoya", name: "NAGOYA", tel: "052-762-0007", hours: "10:00 - 19:00", access: "名古屋市千種区山門町2-54", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-2-pc.jpg", span: "col-span-1 md:col-span-1 row-span-1"
      },
      { 
        id: "sakae", name: "MITSUKOSHI", tel: "052-252-1270", hours: "10:00 - 20:00", access: "名古屋市中区栄3-5-1 B1F", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg", span: "col-span-1 md:col-span-1 row-span-1"
      },
      { 
        id: "overseas", name: "OVERSEAS", access: "アジア各地に展開中", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-3-pc.jpg", span: "col-span-1 md:col-span-2 row-span-1"
      }
    ],
    contactTitle: "Get in touch",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send Message",
  },
  en: {
    nav: { products: "Products", chef: "Chef", tajimi: "Tajimi Main", shops: "All Shops", contact: "Contact" },
    heroTitle: "CHEZ SHIBATA",
    heroSub: "Woven with carefully selected ingredients",
    intro: "Chez Shibata is a pâtisserie that fuses the traditional techniques of French confectionery with delicate Japanese sensibilities. We deliver exquisite sweets crafted with uncompromising aesthetics.",
    freshCakes: "Fresh Cakes",
    freshCakesDesc: "Fresh cakes that excitedly change from season to season based on the chef's inspiration.",
    butterCakes: "Butter Cakes",
    butterCakesDesc: "Introducing our original confectioneries derived from traditional sweets baked using specially-selected ingredients and recipes.",
    chefName: "Takeshi Shibata",
    chefRole: "Founder / Executive Chef",
    chefBio: "“I used to cook dishes and bake sweets with my mother, and I dreamed of becoming a professional chef ever since I was young.”\nOpened Chez Shibata in 1995. Currently, he spends half of each month creating confectioneries and training staff members both in Japan and overseas. He is a pâtissier who combines the Japanese samurai spirit with global sensibilities.",
    tajimiTitle: "TAJIMI",
    tajimiLead: "We provide customers with a range of Shibata original sweets based on French confectionery culture and production methods, from traditional confectioneries to innovative sweets.",
    tajimiDesc: "Tajimi City is the birthplace of Chef Shibata and famous for pottery.\nThis is the origin of the Chez Shibata brand, opened in 1995.\nNow, in recognition of his global activities, Chef Shibata has been appointed as Tajimi City’s tourism ambassador.",
    labels: { tel: "TEL", email: "MAIL", hours: "HOURS", holiday: "HOLIDAY", access: "ACCESS" },
    locations: [
      { 
        id: "tajimi", name: "TAJIMI", tel: "0572-24-3030", email: "shop@chez-shibata.com", hours: "10:00 - 19:00", holiday: "Tuesday", access: "5-10-3 Taihei-cho, Tajimi city\n20 min from Tajimi Station", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg", span: "col-span-1 md:col-span-2 row-span-2"
      },
      { 
        id: "nagoya", name: "NAGOYA", tel: "052-762-0007", hours: "10:00 - 19:00", access: "2-54 Sanmon-cho, Chikusa-ku", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-2-pc.jpg", span: "col-span-1 md:col-span-1 row-span-1"
      },
      { 
        id: "sakae", name: "MITSUKOSHI", tel: "052-252-1270", hours: "10:00 - 20:00", access: "B1F 3-5-1 Sakae, Naka-ku", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg", span: "col-span-1 md:col-span-1 row-span-1"
      },
      { 
        id: "overseas", name: "OVERSEAS", access: "Expanding throughout Asia", img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-3-pc.jpg", span: "col-span-1 md:col-span-2 row-span-1"
      }
    ],
    contactTitle: "Get in touch",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send Message",
  }
};

// Reveal text word by word
const RevealText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] mb-2">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const currentT = t[lang];
  
  // Parallax setup
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#f2f0ec] text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-[#f2f0ec] font-serif">
      
      {/* Modern Navigation */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
        className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
      >
        <div className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[0.2em] pointer-events-auto">
          C.S
        </div>
        <div className="flex gap-8 items-center pointer-events-auto">
          <div className="hidden lg:flex gap-8 text-xs tracking-[0.2em] uppercase">
            <a href="#products" className="hover:opacity-50 transition-opacity">Products</a>
            <a href="#chef" className="hover:opacity-50 transition-opacity">Chef</a>
            <a href="#tajimi" className="hover:opacity-50 transition-opacity">Tajimi</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
          <button 
            onClick={() => setLang(lang === "ja" ? "en" : "ja")}
            className="text-xs tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-colors"
          >
            {lang === "ja" ? "EN" : "JA"}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section with Sticky Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-1.jpg" alt="Hero" className="w-full h-full object-cover object-[center_30%]" />
        </motion.div>
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-6xl md:text-[9vw] font-light tracking-widest text-white uppercase font-[family-name:var(--font-cormorant)] text-center leading-none"
            >
              {currentT.heroTitle}
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-white/80 tracking-[0.3em] text-xs md:text-sm uppercase font-sans"
          >
            {currentT.heroSub}
          </motion.div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#1a1a1a] text-[#f2f0ec] py-4 overflow-hidden border-y border-[#333]">
        <motion.div 
          animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl md:text-4xl tracking-widest uppercase flex gap-12"
        >
          <span>Artisanal Pâtisserie</span>
          <span>•</span>
          <span>Takeshi Shibata</span>
          <span>•</span>
          <span>Tajimi</span>
          <span>•</span>
          <span>Nagoya</span>
          <span>•</span>
          <span>Artisanal Pâtisserie</span>
          <span>•</span>
          <span>Takeshi Shibata</span>
          <span>•</span>
          <span>Tajimi</span>
          <span>•</span>
          <span>Nagoya</span>
        </motion.div>
      </div>

      {/* Intro Reveal */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-1/2">
          <RevealText text={currentT.intro} className="text-2xl md:text-4xl leading-[1.6] tracking-wide text-[#1a1a1a]" />
        </div>
        <motion.div 
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="md:w-1/2 aspect-[4/5] overflow-hidden"
        >
          <img src="https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-thumb-6.jpg" alt="Intro" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s] ease-out" />
        </motion.div>
      </section>

      {/* Products - Alternating Layout */}
      <section id="products" className="py-32 bg-[#e8e5de]">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          
          <div className="grid md:grid-cols-12 gap-12 items-center mb-40">
            <div className="md:col-span-5 md:col-start-1">
              <p className="font-sans text-xs tracking-[0.2em] mb-4 text-[#8b795c]">01. COLLECTION</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl mb-8">{currentT.freshCakes}</h2>
              <p className="text-lg leading-relaxed text-gray-700 font-light max-w-md">{currentT.freshCakesDesc}</p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="md:col-span-6 md:col-start-7 aspect-square bg-gray-200 overflow-hidden"
            >
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-bg.png" alt="Fresh Cakes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="md:col-span-6 md:col-start-1 order-2 md:order-1 aspect-square bg-gray-200 overflow-hidden"
            >
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg" alt="Butter Cakes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
            </motion.div>
            <div className="md:col-span-5 md:col-start-8 order-1 md:order-2">
              <p className="font-sans text-xs tracking-[0.2em] mb-4 text-[#8b795c]">02. COLLECTION</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl mb-8">{currentT.butterCakes}</h2>
              <p className="text-lg leading-relaxed text-gray-700 font-light max-w-md">{currentT.butterCakesDesc}</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Chef - Sticky Split Screen */}
      <section id="chef" className="relative hidden md:flex h-[150vh] bg-[#1a1a1a] text-[#f2f0ec]">
        <div className="w-1/2 h-screen sticky top-0 flex flex-col justify-center px-20">
          <p className="font-sans text-xs tracking-[0.3em] text-[#8b795c] mb-6 uppercase">{currentT.chefRole}</p>
          <RevealText text={currentT.chefName} className="font-[family-name:var(--font-cormorant)] text-7xl mb-10 text-[#f2f0ec]" />
          <p className="text-xl leading-[2.2] font-light max-w-xl whitespace-pre-line text-white/80">{currentT.chefBio}</p>
          <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/sign.png" alt="Signature" className="h-12 mt-12 opacity-50 invert brightness-0" />
        </div>
        <div className="w-1/2 h-[150vh] flex items-center justify-center p-20">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ margin: "-20%" }} transition={{ duration: 1 }}
            className="w-full aspect-[3/4] overflow-hidden sticky top-32"
          >
            <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/chef-sp.jpg" alt="Chef" className="w-full h-full object-cover grayscale" />
          </motion.div>
        </div>
      </section>

      {/* Chef - Mobile Fallback */}
      <section className="md:hidden bg-[#1a1a1a] text-[#f2f0ec] py-24 px-6">
        <p className="font-sans text-xs tracking-[0.3em] text-[#8b795c] mb-4 uppercase">{currentT.chefRole}</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-5xl mb-8">{currentT.chefName}</h2>
        <div className="w-full aspect-[3/4] overflow-hidden mb-12">
          <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/chef-sp.jpg" alt="Chef" className="w-full h-full object-cover grayscale" />
        </div>
        <p className="text-lg leading-[2] font-light whitespace-pre-line text-white/80">{currentT.chefBio}</p>
      </section>

      {/* Tajimi Focus & Bento Grid Shops */}
      <section id="tajimi" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="md:w-1/2">
            <h2 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl mb-6">{currentT.tajimiTitle}</h2>
            <p className="text-xl md:text-2xl leading-[1.8] font-light">{currentT.tajimiLead}</p>
          </div>
          <div className="md:w-1/3">
            <p className="text-sm leading-[2] text-gray-600 whitespace-pre-line">{currentT.tajimiDesc}</p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
          {currentT.locations.map((loc, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer bg-[#e8e5de] ${loc.span}`}
            >
              <img src={loc.img} alt={loc.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-widest mb-2">{loc.name}</h3>
                
                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <div className="space-y-2 text-xs tracking-widest font-sans font-light">
                    {loc.tel && <p className="flex justify-between"><span className="text-white/50 w-20">{currentT.labels.tel}</span> <span>{loc.tel}</span></p>}
                    {loc.hours && <p className="flex justify-between"><span className="text-white/50 w-20">{currentT.labels.hours}</span> <span>{loc.hours}</span></p>}
                    {loc.holiday && <p className="flex justify-between"><span className="text-white/50 w-20">{currentT.labels.holiday}</span> <span>{loc.holiday}</span></p>}
                    <div className="pt-2 mt-2 border-t border-white/20 whitespace-pre-line">{loc.access}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Elegant Contact */}
      <section id="contact" className="py-40 bg-[#1a1a1a] text-[#f2f0ec] px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2">
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl mb-8 leading-tight">{currentT.contactTitle}</h2>
            <p className="text-white/60 tracking-widest font-light mb-12 leading-relaxed">
              For any inquiries, please fill out the form below. We will get back to you shortly.
            </p>
            <div className="space-y-4 font-sans text-sm tracking-widest font-light text-white/80">
              <p>shop@chez-shibata.com</p>
              <p>+81 (0) 572-24-3030</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form className="space-y-12" onSubmit={e => e.preventDefault()}>
              <div className="relative group">
                <input type="text" placeholder={currentT.formName} className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-light placeholder:text-white/30 focus:border-[#c5a365] transition-colors peer" />
              </div>
              <div className="relative group">
                <input type="email" placeholder={currentT.formEmail} className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-light placeholder:text-white/30 focus:border-[#c5a365] transition-colors" />
              </div>
              <div className="relative group">
                <textarea placeholder={currentT.formMessage} rows={4} className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-light placeholder:text-white/30 focus:border-[#c5a365] transition-colors resize-none"></textarea>
              </div>
              <button className="w-full py-5 border border-white/20 hover:bg-white hover:text-black transition-colors duration-500 font-sans text-xs tracking-[0.2em] uppercase">
                {currentT.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center bg-[#111] text-white/50 text-xs tracking-widest font-sans font-light border-t border-white/10">
        <div className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.2em] text-white mb-6 md:mb-0">
          C.S
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Line</a>
        </div>
        <div className="mt-6 md:mt-0">
          &copy; {new Date().getFullYear()} Chez Shibata.
        </div>
      </footer>
    </div>
  );
}
