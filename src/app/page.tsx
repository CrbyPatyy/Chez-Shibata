"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const t = {
  ja: {
    nav: { products: "商品一覧", chef: "シェフ", tajimi: "多治見本店", shops: "全店舗", contact: "お問い合わせ" },
    heroTitle: "和と洋の美しき融合",
    heroSub: "厳選された素材が織りなす究極のスイーツ",
    intro: "シェ・シバタは、フランス菓子の伝統的な技法と日本の繊細な感性を融合させたパティスリーです。多治見、名古屋をはじめ、アジア各地に10店舗以上を展開しています。日本の職人技と感性は、今や世界中のグルメ愛好家に求められており、一切の妥協を許さない美学に基づき、オリジナルスイーツを提供し続けています。",
    
    // Products
    freshCakes: "Fresh Cakes",
    freshCakesSub: "生菓子",
    freshCakesDesc: "シェフのインスピレーションから生まれた、季節ごとに華やかに変化する生菓子です。",
    butterCakes: "Baked Goods",
    butterCakesSub: "焼き菓子",
    butterCakesDesc: "厳選された素材とレシピで焼き上げた、伝統的なお菓子から生まれたオリジナル焼き菓子をご紹介します。",
    
    // Chef
    chefName: "柴田 武",
    chefRole: "Founder / Executive Chef",
    chefBio: "「子供の頃から母と一緒に料理やお菓子を作り、プロのシェフになることを夢見ていました。」\n1995年にシェ・シバタを開店。現在は毎月半分を国内外での菓子製作やスタッフの指導に費やしています。ビジネスコンサルタント、デモンストレーション、テレビ出演など、国内外で幅広く活躍。日本の侍精神とグローバルな感性を融合させたパティシエです。",
    
    // Tajimi Focus (From the specific URL requested)
    tajimiTitle: "TAJIMI",
    tajimiSub: "多治見本店",
    tajimiLead: "フランス菓子の文化と製法をベースに、伝統的な菓子から革新的なスイーツまで、シバタオリジナルスイーツをお客様にご提供しています。",
    tajimiDesc: "多治見市はシェフ柴田の出身地であり、陶器で有名な街です。\nここはシェ・シバタブランドの発祥の地で、1995年に開店しました。\n現在、世界的な活動が認められ、柴田シェフは多治見市の観光大使に任命されています。",
    infoTitle: "INFORMATION",
    
    // Shop details mapping
    labels: { tel: "TEL / FAX", email: "メール", hours: "営業時間", holiday: "定休日", access: "アクセス" },
    
    locations: [
      { 
        id: "tajimi",
        name: "多治見店 (TAJIMI)", 
        tel: "0572-24-3030",
        email: "shop@chez-shibata.com",
        hours: "10:00 〜 19:00",
        holiday: "火曜日",
        access: "岐阜県多治見市太平町5-10-3\nJR中央線 多治見駅北口より徒歩20分\n多治見ICより車で5分",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg" 
      },
      { 
        id: "nagoya",
        name: "名古屋店 (NAGOYA)", 
        tel: "052-762-0007",
        hours: "10:00 〜 19:00",
        access: "名古屋市千種区山門町2-54",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-2-pc.jpg" 
      },
      { 
        id: "sakae",
        name: "栄三越店 (MITSUKOSHI)", 
        tel: "052-252-1270",
        hours: "10:00 〜 20:00",
        access: "名古屋市中区栄3-5-1 B1F",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg" 
      },
      { 
        id: "overseas",
        name: "海外店舗 (OVERSEAS)", 
        access: "アジア各地に展開中",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-3-pc.jpg" 
      }
    ],

    // Contact
    contactTitle: "CONTACT",
    contactSub: "お問い合わせ",
    formName: "お名前",
    formEmail: "メールアドレス",
    formMessage: "メッセージ",
    formSubmit: "送信する",
  },
  en: {
    nav: { products: "Products", chef: "Chef", tajimi: "Tajimi Main", shops: "All Shops", contact: "Contact" },
    heroTitle: "A Beautiful Fusion",
    heroSub: "The ultimate sweets woven with carefully selected ingredients",
    intro: "Chez Shibata has opened more than 10 shops throughout Asia, including in Tajimi and Nagoya. Japanese craftsmanship and sense of taste are now sought after by gourmet lovers around the world. We continue to provide original sweets based on the traditions and techniques of French confectioneries.",
    
    // Products
    freshCakes: "Fresh Cakes",
    freshCakesSub: "Artisanal Pastries",
    freshCakesDesc: "Fresh cakes that excitedly change from season to season based on the chef's inspiration.",
    butterCakes: "Butter Cakes",
    butterCakesSub: "Classic Confections",
    butterCakesDesc: "Introducing our original confectioneries derived from traditional sweets baked using specially-selected ingredients and recipes.",
    
    // Chef
    chefName: "Takeshi Shibata",
    chefRole: "Founder / Executive Chef",
    chefBio: "“I used to cook dishes and bake sweets with my mother, and I dreamed of becoming a professional chef ever since I was young.”\nOpened Chez Shibata in 1995. Currently, he spends half of each month creating confectioneries and training staff members both in Japan and overseas. He is also broadly active both domestically and internationally as a business consultant as well as giving demonstrations and making television appearances. He is a pâtissier who combines the Japanese samurai spirit with global sensibilities.",
    
    // Tajimi Focus
    tajimiTitle: "TAJIMI",
    tajimiSub: "Main Shop",
    tajimiLead: "We provide customers with a range of Shibata original sweets based on French confectionery culture and production methods, from traditional confectioneries to innovative sweets.",
    tajimiDesc: "Tajimi City is the birthplace of Chef Shibata and famous for pottery.\nThis is the origin of the Chez Shibata brand, opened in 1995.\nNow, in recognition of his global activities, Chef Shibata has been appointed as Tajimi City’s tourism ambassador.",
    infoTitle: "INFORMATION",
    
    // Shop details mapping
    labels: { tel: "TEL / FAX", email: "E-mail", hours: "Business hours", holiday: "Regular holiday", access: "Access" },
    
    locations: [
      { 
        id: "tajimi",
        name: "TAJIMI", 
        tel: "0572-24-3030",
        email: "shop@chez-shibata.com",
        hours: "10:00 to 19:00",
        holiday: "Tuesday",
        access: "5-10-3 Taihei-cho, Tajimi city\n20 min on foot from the North Exit at Tajimi Station on the Chuo Line\n5 min by car from Tajimi IC",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg" 
      },
      { 
        id: "nagoya",
        name: "NAGOYA", 
        tel: "052-762-0007",
        hours: "10:00 to 19:00",
        access: "2-54 Sanmon-cho, Chikusa-ku, Nagoya city",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-2-pc.jpg" 
      },
      { 
        id: "sakae",
        name: "MITSUKOSHI (Sakae)", 
        tel: "052-252-1270",
        hours: "10:00 to 20:00",
        access: "B1F 3-5-1 Sakae, Naka-ku, Nagoya city",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg" 
      },
      { 
        id: "overseas",
        name: "OVERSEAS", 
        access: "Expanding throughout Asia",
        img: "https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-3-pc.jpg" 
      }
    ],

    // Contact
    contactTitle: "CONTACT",
    contactSub: "Get in touch",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send Message",
  }
};

const cakes = [
  "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-thumb-6.jpg",
  "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-thumb-7.jpg",
  "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-thumb-8.jpg",
  "https://chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-thumb-1.jpg",
];

// Reusable fade-in component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const currentT = t[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222] font-serif selection:bg-[#c5a365] selection:text-white pb-20">
      
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-8 py-5 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent text-white'}`}>
        <div className={`font-[family-name:var(--font-cormorant)] text-xl tracking-[0.3em] uppercase ${scrolled ? 'text-[#222]' : 'text-white'}`}>
          Chez Shibata
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex gap-8 text-xs tracking-[0.2em] uppercase">
            <a href="#products" className="hover:text-[#c5a365] transition-colors">{currentT.nav.products}</a>
            <a href="#chef" className="hover:text-[#c5a365] transition-colors">{currentT.nav.chef}</a>
            <a href="#tajimi" className="hover:text-[#c5a365] transition-colors">{currentT.nav.tajimi}</a>
            <a href="#shops" className="hover:text-[#c5a365] transition-colors">{currentT.nav.shops}</a>
            <a href="#contact" className="hover:text-[#c5a365] transition-colors">{currentT.nav.contact}</a>
          </nav>
          
          <div className="relative flex items-center bg-black/10 rounded-full p-1 backdrop-blur-sm border border-white/20">
            <div className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full transition-transform duration-300 ease-out shadow-sm ${lang === 'en' ? 'translate-x-full' : 'translate-x-0'}`}></div>
            <button onClick={() => setLang('ja')} className={`relative z-10 w-12 py-1 text-[10px] tracking-widest transition-colors duration-300 ${lang === 'ja' ? 'text-black font-medium' : (scrolled ? 'text-gray-500' : 'text-white/80')}`}>JA</button>
            <button onClick={() => setLang('en')} className={`relative z-10 w-12 py-1 text-[10px] tracking-widest transition-colors duration-300 ${lang === 'en' ? 'text-black font-medium' : (scrolled ? 'text-gray-500' : 'text-white/80')}`}>EN</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FAFAFA] z-10"></div>
          <motion.img 
            initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/hero-1.jpg" alt="Hero" 
            className="w-full h-full object-cover object-[center_30%]" 
          />
        </div>
        <div className="relative z-10 text-center text-white mt-20 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.4em] uppercase text-[#c5a365] mb-6">
            Pâtisserie & Chocolatier
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-3xl md:text-5xl font-light tracking-widest mb-6 leading-tight">
            {currentT.heroTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-sm md:text-base tracking-[0.2em] font-light opacity-90">
            {currentT.heroSub}
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="w-px h-12 bg-[#c5a365] mx-auto mb-8"></div>
          <p className="text-base md:text-lg leading-[2.2] tracking-widest font-light text-gray-700">
            {currentT.intro}
          </p>
        </FadeIn>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          <FadeIn className="order-2 md:order-1">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.2em] mb-2">{currentT.freshCakes}</h2>
            <p className="text-[#c5a365] text-xs tracking-[0.2em] mb-6">{currentT.freshCakesSub}</p>
            <p className="text-gray-600 leading-[2] tracking-widest font-light mb-8 max-w-md text-sm md:text-base">
              {currentT.freshCakesDesc}
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {cakes.map((cake, i) => (
                <div key={i} className="min-w-[160px] md:min-w-[200px] aspect-[4/5] snap-start relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={cake} alt="Cake" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 md:order-2 h-full">
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/fresh-cakes-bg.png" alt="Fresh Cakes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn className="h-full">
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/butter-cakes-img-pc.jpg" alt="Butter Cakes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.2em] mb-2">{currentT.butterCakes}</h2>
            <p className="text-[#c5a365] text-xs tracking-[0.2em] mb-6">{currentT.butterCakesSub}</p>
            <p className="text-gray-600 leading-[2] tracking-widest font-light mb-8 max-w-md text-sm md:text-base">
              {currentT.butterCakesDesc}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Chef */}
      <section id="chef" className="bg-white py-24 px-6 md:px-12 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <FadeIn className="md:w-1/2 relative max-w-md mx-auto">
            <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/chef-sp.jpg" alt="Chef" className="w-full aspect-[3/4] object-cover" />
          </FadeIn>
          <FadeIn delay={0.2} className="md:w-1/2">
            <p className="font-[family-name:var(--font-cormorant)] text-[#c5a365] text-xs tracking-[0.2em] mb-4 uppercase">{currentT.chefRole}</p>
            <h2 className="text-3xl tracking-widest mb-8 font-light">{currentT.chefName}</h2>
            <div className="text-gray-600 leading-[2.2] tracking-widest font-light mb-8 text-sm whitespace-pre-line">
              {currentT.chefBio}
            </div>
            <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/img/sign.png" alt="Signature" className="h-8 opacity-60 mix-blend-multiply" />
          </FadeIn>
        </div>
      </section>

      {/* Tajimi Focus Section - Full Details as requested */}
      <section id="tajimi" className="py-24 px-6 max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-[#c5a365] text-xs tracking-[0.2em] mb-2">{currentT.tajimiSub}</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[0.2em] uppercase">{currentT.tajimiTitle}</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <FadeIn>
            <div className="aspect-[4/3] overflow-hidden mb-6">
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_hero.jpg" alt="Tajimi Shop" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_01.jpg" alt="Tajimi 1" className="w-full aspect-[4/3] object-cover" />
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_02.jpg" alt="Tajimi 2" className="w-full aspect-[4/3] object-cover" />
              <img src="https://en.chez-shibata.com/wp/wp-content/themes/chez-shibata-2021/images/shop/tajimi_03.jpg" alt="Tajimi 3" className="w-full aspect-[4/3] object-cover" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg font-medium leading-[2] tracking-widest mb-6">
              {currentT.tajimiLead}
            </p>
            <p className="text-sm leading-[2.2] tracking-widest text-gray-600 mb-10 whitespace-pre-line">
              {currentT.tajimiDesc}
            </p>
            
            <div className="bg-[#FAF8F5] p-6 md:p-8 border border-[#c5a365]/20">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.2em] mb-6 text-center">{currentT.infoTitle}</h3>
              <table className="w-full text-sm tracking-widest">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-normal text-gray-500 w-1/3">{currentT.labels.tel}</th>
                    <td className="py-3">0572-24-3030</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-normal text-gray-500">{currentT.labels.email}</th>
                    <td className="py-3"><a href="mailto:shop@chez-shibata.com" className="hover:text-[#c5a365]">shop@chez-shibata.com</a></td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-normal text-gray-500">{currentT.labels.hours}</th>
                    <td className="py-3">10:00 - 19:00</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-normal text-gray-500">{currentT.labels.holiday}</th>
                    <td className="py-3">{lang === 'ja' ? '火曜日' : 'Tuesday'}</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-left font-normal text-gray-500 align-top">{currentT.labels.access}</th>
                    <td className="py-3 whitespace-pre-line leading-[2]">
                      {lang === 'ja' ? '岐阜県多治見市太平町5-10-3\nJR中央線 多治見駅北口より徒歩20分\n多治見ICより車で5分' : '5-10-3 Taihei-cho, Tajimi city\n20 min on foot from the North Exit at Tajimi Station on the Chuo Line\n5 min by car from Tajimi IC'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 h-[250px] w-full bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.25!2d137.1120374!3d35.3365360!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6003a4f7c5c3e8d1%3A0x4b1e8f3f2a1b0c0d!2z44K344Kn44O744K344OQ44K_IOWkmuayu-imi-W6lw!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All Shops Detailed List */}
      <section id="shops" className="py-24 bg-[#FAF8F5] px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[0.2em] mb-2 uppercase">ALL SHOPS</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentT.locations.map((loc, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-white shadow-sm border border-black/5 hover:border-[#c5a365]/50 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={loc.img} alt={loc.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-base tracking-widest font-medium mb-4">{loc.name}</h3>
                  <div className="text-xs tracking-widest text-gray-600 space-y-3 leading-relaxed">
                    {loc.tel && (
                      <p><span className="text-gray-400 block mb-1 font-[family-name:var(--font-cormorant)]">TEL</span>{loc.tel}</p>
                    )}
                    {loc.hours && (
                      <p><span className="text-gray-400 block mb-1 font-[family-name:var(--font-cormorant)]">HOURS</span>{loc.hours}</p>
                    )}
                    <p><span className="text-gray-400 block mb-1 font-[family-name:var(--font-cormorant)]">ACCESS</span><span className="whitespace-pre-line">{loc.access}</span></p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="text-[#c5a365] text-xs tracking-[0.2em] mb-2">{currentT.contactSub}</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[0.2em] mb-12 uppercase">{currentT.contactTitle}</h2>
          
          <form className="space-y-8 text-left" onSubmit={e => e.preventDefault()}>
            <div className="border-b border-gray-300 pb-2">
              <input type="text" placeholder={currentT.formName} className="w-full bg-transparent outline-none font-light placeholder:text-gray-400 text-sm tracking-widest" />
            </div>
            <div className="border-b border-gray-300 pb-2">
              <input type="email" placeholder={currentT.formEmail} className="w-full bg-transparent outline-none font-light placeholder:text-gray-400 text-sm tracking-widest" />
            </div>
            <div className="border-b border-gray-300 pb-2">
              <textarea placeholder={currentT.formMessage} rows={4} className="w-full bg-transparent outline-none font-light placeholder:text-gray-400 text-sm tracking-widest resize-none"></textarea>
            </div>
            <div className="text-center pt-4">
              <button className="px-12 py-4 bg-[#222] text-white text-xs tracking-[0.2em] hover:bg-[#c5a365] transition-colors duration-300 uppercase">
                {currentT.formSubmit}
              </button>
            </div>
          </form>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 text-center bg-white flex flex-col items-center">
        <div className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[0.3em] uppercase mb-8">
          Chez Shibata
        </div>
        
        <div className="flex gap-6 mb-8 text-gray-400">
          <a href="https://www.instagram.com/chezshibata/" target="_blank" rel="noreferrer" className="hover:text-[#c5a365] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://line.me/R/ti/p/%40wnh0533o" target="_blank" rel="noreferrer" className="hover:text-[#c5a365] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.27 2.61 6.09 6.42 7.25-.09.82-.49 3.08-.52 3.27 0 0-.01.09.04.13.06.04.12.02.12.02.16-.02 1.87-1.23 2.72-1.8.71.1 1.44.16 2.22.16 5.52 0 10-3.82 10-8.53C22 5.82 17.52 2 12 2z"/></svg>
          </a>
        </div>
        
        <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">
          &copy; 2024 Chez Shibata. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
