import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cosmos))" }}>
      {/* Cosmic background overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 25%, hsl(230 60% 18% / 0.8), transparent 45%), radial-gradient(ellipse at 85% 75%, hsl(280 50% 14% / 0.6), transparent 45%)",
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 border-b-4 border-gold" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-3 border-gold flex items-center justify-center bg-gold/10">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="hsl(43 96% 55%)" strokeWidth="2">
                <path d="M12 2C8 2 5 5 5 9v4l-2 3v2h18v-2l-2-3V9c0-4-3-7-7-7z" />
                <path d="M9 18v1a3 3 0 006 0v-1" />
              </svg>
            </div>
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase">掌紋命運觀測站</p>
              <p className="text-gold-light/60 text-[10px] tracking-widest">Palm Destiny Observatory</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gold/80 text-xs tracking-[0.2em]">福青施老師</p>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative z-10 container mx-auto px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Geometric decoration */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gold/30" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          <h1 className="text-shimmer text-4xl md:text-5xl font-black mb-4 leading-tight">
            掌中的<br />生命軌跡
          </h1>
          <p className="text-gold-light/70 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            每一道掌紋，都是命運刻寫在你手中的密碼。
            透過手相的智慧，看見生命能量的流動，
            解讀屬於你的人生藍圖。
          </p>

          {/* Decorative palm icon */}
          <div className="flex justify-center mb-10">
            <div className="relative animate-float">
              <svg viewBox="0 0 120 150" width="90" height="112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38 130 C26 130 18 120 18 110 L18 68 C18 62 23 58 29 58 C32 58 35 59 37 62 L37 42 C37 36 42 32 48 32 C51 32 54 34 56 37 L56 28 C56 22 61 18 67 18 C73 18 78 22 78 28 L78 37 C80 34 83 32 86 32 C92 32 97 36 97 42 L97 62 C99 59 102 58 105 58 C111 58 116 62 116 68 L116 110 C116 120 108 130 96 130 Z"
                  stroke="hsl(43 96% 55%)"
                  strokeWidth="2"
                  fill="hsl(43 96% 10% / 0.5)"
                />
                <path d="M42 95 Q36 82 38 65 Q40 52 48 44" stroke="hsl(43 96% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M40 85 Q60 80 82 85 Q90 87 96 92" stroke="hsl(210 100% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M42 74 Q60 68 82 71 Q92 73 96 79" stroke="hsl(0 85% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M67 126 Q66 110 67 92 Q68 78 69 64" stroke="hsl(155 60% 55%)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, hsl(43 96% 48% / 0.15) 0%, transparent 70%)", filter: "blur(10px)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Main Entry Points ── */}
      <section className="relative z-10 container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Analysis Card */}
          <button
            onClick={() => navigate("/photo-analysis")}
            className="group text-left relative overflow-hidden"
          >
            <div
              className="border-4 border-gold p-6 transition-all duration-150 group-hover:-translate-x-1 group-hover:-translate-y-1"
              style={{
                background: "hsl(var(--cosmos-mid))",
                boxShadow: "6px 6px 0px hsl(43 96% 48%)",
              }}
            >
              {/* Corner geo */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gold" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
              
              <div className="mb-4">
                <div className="w-14 h-14 border-3 border-gold flex items-center justify-center bg-gold/10 mb-4">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="hsl(43 96% 65%)" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1.5" fill="hsl(43 96% 65%)" />
                  </svg>
                </div>
                <div className="w-8 h-1 bg-gold mb-3" />
                <h2 className="text-gold text-xl font-black mb-2 leading-tight">
                  手相<br />拍照分析
                </h2>
                <p className="text-gold-light/60 text-sm leading-relaxed">
                  上傳三張手部照片，讓命運的紋路在光影中被解讀，揭示掌中的生命藍圖。
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-gold text-xs font-bold tracking-widest uppercase">開始解析</span>
                <div className="h-px flex-1 bg-gold/40" />
                <svg viewBox="0 0 16 16" width="16" height="16" fill="hsl(43 96% 55%)">
                  <path d="M6 3L11 8L6 13" stroke="hsl(43 96% 55%)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              {/* Bottom stripe */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-stripe" />
            </div>
          </button>

          {/* Palm Review Card */}
          <button
            onClick={() => navigate("/palm-review")}
            className="group text-left relative overflow-hidden"
          >
            <div
              className="border-4 border-crimson p-6 transition-all duration-150 group-hover:-translate-x-1 group-hover:-translate-y-1"
              style={{
                background: "hsl(var(--cosmos-mid))",
                boxShadow: "6px 6px 0px hsl(var(--crimson))",
              }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-crimson" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
              
              <div className="mb-4">
                <div className="w-14 h-14 border-3 border-crimson flex items-center justify-center bg-crimson/10 mb-4">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="hsl(0 85% 70%)" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </div>
                <div className="w-8 h-1 bg-crimson mb-3" />
                <h2 className="text-[hsl(0_85%_70%)] text-xl font-black mb-2 leading-tight">
                  手相<br />復盤功能
                </h2>
                <p className="text-gold-light/60 text-sm leading-relaxed">
                  手動勾選手相特徵，逐一驗證掌紋訊息，適合深入學習與命理復盤研究。
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-[hsl(0_85%_70%)] text-xs font-bold tracking-widest uppercase">開始復盤</span>
                <div className="h-px flex-1 bg-crimson/40" />
                <svg viewBox="0 0 16 16" width="16" height="16" fill="hsl(0 85% 65%)">
                  <path d="M6 3L11 8L6 13" stroke="hsl(0 85% 65%)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "repeating-linear-gradient(-45deg, hsl(0 85% 50%) 0px, hsl(0 85% 50%) 4px, transparent 4px, transparent 12px)" }} />
            </div>
          </button>
        </div>

        {/* Record Library link */}
        <div className="max-w-2xl mx-auto mt-6">
          <button
            onClick={() => navigate("/records")}
            className="w-full border-3 border-gold/40 py-4 flex items-center justify-center gap-3 transition-all hover:border-gold/80"
            style={{ background: "hsl(var(--cosmos-mid))" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="hsl(43 96% 48%)" strokeWidth="2">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            <span className="text-gold text-sm font-bold tracking-[0.2em]">手相復盤紀錄庫</span>
            <div className="h-px w-12 bg-gold/30" />
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="hsl(43 96% 48%)" strokeWidth="2">
              <path d="M6 3L11 8L6 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Info Strips ── */}
      <section className="relative z-10 border-t-4 border-gold/30" style={{ background: "hsl(230 55% 10%)" }}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4">
            {[
              { icon: "✦", title: "五行手型", desc: "金木水火土 雙元素判定" },
              { icon: "◈", title: "八大掌丘", desc: "能量強度 完整解析" },
              { icon: "⊕", title: "掌線紋路", desc: "生命智慧感情 特殊紋路" },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 border-2 border-gold/20" style={{ background: "hsl(var(--cosmos))" }}>
                <div className="text-gold text-xl mb-1">{item.icon}</div>
                <p className="text-gold text-xs font-bold mb-1">{item.title}</p>
                <p className="text-gold-light/50 text-[10px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t-4 border-gold" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gold/60 text-xs tracking-widest">命運紋路的訊息 · 生命能量的流動</p>
          <p className="text-gold/40 text-xs">© 福星何大師 · 掌紋命運觀測站</p>
        </div>
      </footer>
    </div>
  );
}
