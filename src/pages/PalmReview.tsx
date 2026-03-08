import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePalmReport, saveRecord, type PalmFeatures } from "@/lib/palmReading";

const defaultFeatures: PalmFeatures = {
  gender: "female",
  handType: "木形手",
  secondaryType: undefined,
  palmThickness: "medium",
  wristLines: "double",
  mounts: {
    venus: "medium", jupiter: "medium", saturn: "medium", sun: "medium",
    mercury: "medium", moon: "medium", mars1: "medium", mars2: "medium",
  },
  lines: {
    life: { depth: "deep", length: "long", shape: "curved" },
    head: { depth: "medium", length: "medium", shape: "curved" },
    heart: { depth: "deep", length: "long", shape: "curved" },
    fate: false, sun: false, wealth: false,
  },
  special: { heartShape: false, wellGrid: false, headLineFork: false, heartLineFork: false },
  analysisMode: "review",
};

export default function PalmReview() {
  const navigate = useNavigate();
  const [features, setFeatures] = useState<PalmFeatures>({ ...defaultFeatures });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [note, setNote] = useState("");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const report = generatePalmReport(features);
      const record = saveRecord({
        mode: "review",
        features,
        report,
        title: `${features.gender === "male" ? "男性" : "女性"} · ${features.handType} · 手相復盤`,
      });
      navigate(`/report/${record.id}`);
    }, 1800);
  };

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "hsl(var(--cosmos))" }}>
        <div className="animate-float mb-8">
          <svg viewBox="0 0 120 150" width="100" height="125" fill="none">
            <path d="M38 130 C26 130 18 120 18 110 L18 68 C18 62 23 58 29 58 C32 58 35 59 37 62 L37 42 C37 36 42 32 48 32 C51 32 54 34 56 37 L56 28 C56 22 61 18 67 18 C73 18 78 22 78 28 L78 37 C80 34 83 32 86 32 C92 32 97 36 97 42 L97 62 C99 59 102 58 105 58 C111 58 116 62 116 68 L116 110 C116 120 108 130 96 130 Z"
              stroke="hsl(0 85% 55%)" strokeWidth="2" fill="hsl(0 85% 10% / 0.4)" />
            <path d="M42 95 Q36 82 38 65 Q40 52 48 44" stroke="hsl(43 96% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw" />
            <path d="M40 85 Q60 80 82 85 Q90 87 96 92" stroke="hsl(210 100% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw-delay" />
            <path d="M42 74 Q60 68 82 71 Q92 73 96 79" stroke="hsl(0 85% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw-delay2" />
          </svg>
        </div>
        <p className="text-[hsl(0_85%_70%)] text-xl font-black tracking-[0.3em] mb-3">復盤解析中…</p>
        <p className="text-gold/50 text-xs tracking-widest animate-pulse">彙整掌紋特徵，生成命運報告</p>
        <div className="mt-8 flex gap-2">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 bg-crimson rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  const mountLabels = [
    { key: "venus" as const, label: "金星丘" },
    { key: "jupiter" as const, label: "木星丘" },
    { key: "saturn" as const, label: "土星丘" },
    { key: "sun" as const, label: "太陽丘" },
    { key: "mercury" as const, label: "水星丘" },
    { key: "moon" as const, label: "月丘" },
    { key: "mars1" as const, label: "第一火星丘" },
    { key: "mars2" as const, label: "第二火星丘" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cosmos))" }}>
      {/* Header */}
      <header className="border-b-4 border-crimson sticky top-0 z-20" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/")}
            className="w-9 h-9 border-3 flex items-center justify-center hover:border-crimson transition-colors"
            style={{ borderColor: "hsl(var(--crimson))", background: "hsl(var(--cosmos-mid))" }}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="hsl(0 85% 65%)" strokeWidth="2">
              <path d="M10 3L5 8L10 13" strokeLinecap="round" />
            </svg>
          </button>
          <div>
            <p className="font-black text-base tracking-wide" style={{ color: "hsl(0 85% 65%)" }}>手相復盤功能</p>
            <p className="text-gold/50 text-[10px] tracking-widest">勾選特徵・生成解析報告</p>
          </div>
          <div className="ml-auto text-gold/40 text-xs">福青施老師</div>
        </div>
      </header>

      {/* Intro Banner */}
      <div className="border-b-3 border-gold/30 py-4" style={{ background: "hsl(230 55% 11%)" }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-gold/70 text-sm text-center leading-relaxed">
            手相復盤模式適合命理學習者逐一觀察與驗證掌紋特徵<br />
            <span className="text-gold/50 text-xs">勾選您所觀察到的手相特徵，系統將生成對應的深度解析報告</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">

        {/* Gender */}
        <ReviewSection color="crimson" title="一、性別" icon="⚥">
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <CheckBtn key={g} active={features.gender === g}
                onClick={() => setFeatures(f => ({ ...f, gender: g }))}
                label={g === "male" ? "♂ 男性" : "♀ 女性"} color="crimson" />
            ))}
          </div>
        </ReviewSection>

        {/* Hand Type */}
        <ReviewSection color="crimson" title="二、五行手型" icon="✦">
          <p className="text-gold/50 text-xs mb-3 tracking-wide">主手型（必選）</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["金形手", "木形手", "水形手", "火形手", "土形手"].map((t) => (
              <CheckBtn key={t} active={features.handType === t}
                onClick={() => setFeatures(f => ({ ...f, handType: t }))}
                label={t} color="crimson" />
            ))}
          </div>
          <p className="text-gold/50 text-xs mb-3 tracking-wide">雙元素手型（可選）</p>
          <div className="grid grid-cols-3 gap-2">
            {["", "金形手", "木形手", "水形手", "火形手", "土形手"].map((t) => (
              <CheckBtn key={t || "none"} active={features.secondaryType === (t || undefined)}
                onClick={() => setFeatures(f => ({ ...f, secondaryType: t || undefined }))}
                label={t || "無"} color="blue" size="sm" />
            ))}
          </div>
        </ReviewSection>

        {/* Palm Thickness & Wrist */}
        <ReviewSection color="gold" title="三、手掌基本特徵" icon="◈">
          <div className="space-y-4">
            <div>
              <p className="text-gold/70 text-xs font-bold mb-2 tracking-widest">手掌厚薄</p>
              <div className="grid grid-cols-3 gap-2">
                {[["thick","厚實飽滿"],["medium","厚薄適中"],["thin","輕薄纖細"]].map(([v,l]) => (
                  <CheckBtn key={v} active={features.palmThickness === v}
                    onClick={() => setFeatures(f => ({ ...f, palmThickness: v as any }))}
                    label={l} color="gold" size="sm" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-gold/70 text-xs font-bold mb-2 tracking-widest">手腕線條數量</p>
              <div className="grid grid-cols-3 gap-2">
                {[["single","一條"],["double","兩條"],["triple","三條"]].map(([v,l]) => (
                  <CheckBtn key={v} active={features.wristLines === v}
                    onClick={() => setFeatures(f => ({ ...f, wristLines: v as any }))}
                    label={l} color="gold" size="sm" />
                ))}
              </div>
            </div>
          </div>
        </ReviewSection>

        {/* Mounts */}
        <ReviewSection color="gold" title="四、八大掌丘能量" icon="⊕">
          <div className="space-y-3">
            {mountLabels.map(({ key, label }) => (
              <div key={key}>
                <p className="text-gold/60 text-[10px] font-bold mb-1.5 tracking-widest uppercase">{label}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[["full","飽滿高起"],["medium","適中平衡"],["flat","平坦低陷"]].map(([v,l]) => (
                    <CheckBtn key={v} active={features.mounts[key] === v}
                      onClick={() => setFeatures(f => ({ ...f, mounts: { ...f.mounts, [key]: v as any } }))}
                      label={l} color="gold" size="xs" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ReviewSection>

        {/* Main Lines */}
        <ReviewSection color="blue" title="五、三大主線" icon="〜">
          {([
            { key: "life" as const, label: "生命線", colorName: "gold" },
            { key: "head" as const, label: "智慧線", colorName: "blue" },
            { key: "heart" as const, label: "感情線", colorName: "crimson" },
          ]).map(({ key, label, colorName }) => (
            <div key={key} className="mb-5 last:mb-0">
              <p className="font-black text-xs tracking-widest mb-3" style={{ color: colorName === "gold" ? "hsl(var(--gold))" : colorName === "blue" ? "hsl(var(--electric-blue))" : "hsl(var(--crimson))" }}>{label}</p>
              <div className="space-y-2 pl-2 border-l-2" style={{ borderColor: colorName === "gold" ? "hsl(var(--gold) / 0.3)" : colorName === "blue" ? "hsl(210 100% 52% / 0.3)" : "hsl(var(--crimson) / 0.3)" }}>
                <div>
                  <p className="text-gold/50 text-[10px] mb-1.5">深淺程度</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[["deep","深刻清晰"],["medium","深淺適中"],["shallow","細淡模糊"]].map(([v,l]) => (
                      <CheckBtn key={v} active={features.lines[key].depth === v}
                        onClick={() => setFeatures(f => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], depth: v as any } } }))}
                        label={l} color={colorName} size="xs" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gold/50 text-[10px] mb-1.5">長短</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[["long","延伸至長"],["medium","長度適中"],["short","偏短"]].map(([v,l]) => (
                      <CheckBtn key={v} active={features.lines[key].length === v}
                        onClick={() => setFeatures(f => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], length: v as any } } }))}
                        label={l} color={colorName} size="xs" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gold/50 text-[10px] mb-1.5">走向形態</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[["curved","弧線彎曲"],["straight","平直伸展"]].map(([v,l]) => (
                      <CheckBtn key={v} active={features.lines[key].shape === v}
                        onClick={() => setFeatures(f => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], shape: v as any } } }))}
                        label={l} color={colorName} size="xs" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReviewSection>

        {/* Auxiliary Lines */}
        <ReviewSection color="gold" title="六、輔助線（可複選）" icon="╌">
          <div className="grid grid-cols-3 gap-2">
            {[["fate","事業線"],["sun","太陽線"],["wealth","財運線"]].map(([k,l]) => (
              <CheckBtn key={k} active={features.lines[k as "fate"|"sun"|"wealth"]}
                onClick={() => setFeatures(f => ({ ...f, lines: { ...f.lines, [k]: !f.lines[k as "fate"|"sun"|"wealth"] } }))}
                label={l} color="jade" />
            ))}
          </div>
        </ReviewSection>

        {/* Special Marks */}
        <ReviewSection color="crimson" title="七、特殊紋路（可複選）" icon="★">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["heartShape","心形紋"],
              ["wellGrid","井字紋"],
              ["headLineFork","智慧線末端分叉"],
              ["heartLineFork","感情線分叉"],
            ].map(([k,l]) => (
              <CheckBtn key={k} active={features.special[k as keyof typeof features.special]}
                onClick={() => setFeatures(f => ({ ...f, special: { ...f.special, [k]: !f.special[k as keyof typeof f.special] } }))}
                label={l} color="crimson" />
            ))}
          </div>
        </ReviewSection>

        {/* Notes */}
        <ReviewSection color="gold" title="八、觀察筆記（可選）" icon="✏">
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="記錄您的觀察心得或特殊發現…"
            className="w-full h-24 border-3 border-gold/30 bg-cosmos p-3 text-gold/70 text-sm resize-none focus:outline-none focus:border-gold/60"
            style={{ background: "hsl(var(--cosmos))" }}
          />
        </ReviewSection>

        {/* Analyze Button */}
        <div className="mt-6 mb-12">
          <button
            onClick={handleAnalyze}
            className="w-full py-5 border-4 border-crimson font-black text-lg tracking-[0.2em] transition-all hover:-translate-y-1"
            style={{
              background: "hsl(var(--crimson))",
              color: "hsl(0 0% 100%)",
              boxShadow: "6px 6px 0px hsl(0 0% 4%)",
            }}
          >
            ✦ 生成手相復盤報告 ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// Review Section
function ReviewSection({ children, color, title, icon }: { children: React.ReactNode; color: string; title: string; icon: string }) {
  const colorMap: Record<string, string> = {
    gold: "hsl(43 96% 48%)",
    blue: "hsl(210 100% 52%)",
    crimson: "hsl(0 85% 50%)",
    jade: "hsl(155 60% 38%)",
  };
  const c = colorMap[color] || colorMap.gold;
  return (
    <div className="mb-5 border-4" style={{ borderColor: c, background: "hsl(var(--cosmos-mid))", boxShadow: `4px 4px 0px ${c}` }}>
      <div className="border-b-3 px-4 py-2.5 flex items-center gap-2" style={{ borderColor: c, background: "hsl(var(--cosmos))" }}>
        <span className="text-sm">{icon}</span>
        <span className="font-black text-xs tracking-widest" style={{ color: c }}>{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// Check Button
function CheckBtn({ active, onClick, label, color, size = "md" }: {
  active: boolean; onClick: () => void; label: string; color: string; size?: "xs" | "sm" | "md";
}) {
  const colorMap: Record<string, string> = {
    gold: "hsl(43 96% 48%)",
    blue: "hsl(210 100% 52%)",
    crimson: "hsl(0 85% 50%)",
    jade: "hsl(155 60% 38%)",
  };
  const c = colorMap[color] || colorMap.gold;
  const py = size === "xs" ? "py-1" : size === "sm" ? "py-1.5" : "py-2.5";
  const text = size === "xs" ? "text-[9px]" : size === "sm" ? "text-[10px]" : "text-xs";
  return (
    <button
      onClick={onClick}
      className={`${py} ${text} border-2 font-bold tracking-wide transition-all w-full`}
      style={{
        borderColor: active ? c : "hsl(var(--gold) / 0.2)",
        background: active ? `${c}22` : "hsl(var(--cosmos))",
        color: active ? c : "hsl(var(--gold) / 0.45)",
        boxShadow: active ? `2px 2px 0px ${c}` : "none",
      }}
    >
      {active ? "✓ " : ""}{label}
    </button>
  );
}
