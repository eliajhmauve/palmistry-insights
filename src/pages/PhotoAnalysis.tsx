import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generatePalmReport, saveRecord, type PalmFeatures } from "@/lib/palmReading";

type MountLevel = "full" | "medium" | "flat";
type LineDepth = "deep" | "medium" | "shallow";
type LineLength = "long" | "medium" | "short";
type LineShape = "curved" | "straight";

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
    fate: true, sun: false, wealth: false,
  },
  special: { heartShape: false, wellGrid: false, headLineFork: false, heartLineFork: false },
  analysisMode: "photo",
};

export default function PhotoAnalysis() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<"male" | "female">("female");
  const [photos, setPhotos] = useState<{ palm?: string; back?: string; wrist?: string }>({});
  const [features, setFeatures] = useState<PalmFeatures>({ ...defaultFeatures, gender: "female", analysisMode: "photo" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState<"upload" | "configure" | "analyzing">("upload");

  const palmRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const wristRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (key: "palm" | "back" | "wrist") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotos((p) => ({ ...p, [key]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setStep("analyzing");
    const updatedFeatures = { ...features, gender };
    setTimeout(() => {
      const report = generatePalmReport(updatedFeatures);
      const record = saveRecord({
        mode: "photo",
        features: updatedFeatures,
        report,
        photos,
        title: `${gender === "male" ? "男性" : "女性"} · ${updatedFeatures.handType} · 拍照分析`,
      });
      navigate(`/report/${record.id}`);
    }, 2500);
  };

  const photoReady = photos.palm && photos.back && photos.wrist;

  const mountLabels = [
    { key: "venus", label: "金星丘", color: "gold" },
    { key: "jupiter", label: "木星丘", color: "electric-blue" },
    { key: "saturn", label: "土星丘", color: "muted" },
    { key: "sun", label: "太陽丘", color: "gold" },
    { key: "mercury", label: "水星丘", color: "electric-blue" },
    { key: "moon", label: "月丘", color: "muted" },
    { key: "mars1", label: "第一火星丘", color: "crimson" },
    { key: "mars2", label: "第二火星丘", color: "crimson" },
  ] as const;

  if (step === "analyzing") {
    return <AnalyzingScreen />;
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cosmos))" }}>
      <PageHeader title="手相拍照分析" subtitle="上傳手部照片，解讀掌中的生命訊息" onBack={() => navigate("/")} />

      <div className="container mx-auto px-4 py-6 max-w-2xl">

        {/* ── Step 1: Photo Upload ── */}
        <SectionCard color="gold" title="一、上傳手部照片" icon="📷">
          <div className="grid grid-cols-3 gap-3">
            {([
              { key: "palm" as const, ref: palmRef, label: "手掌正面", icon: "✋" },
              { key: "back" as const, ref: backRef, label: "手背照片", icon: "🤚" },
              { key: "wrist" as const, ref: wristRef, label: "手腕照片", icon: "⌚" },
            ]).map(({ key, ref, label, icon }) => (
              <div key={key}>
                <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handlePhoto(key)} />
                <button
                  onClick={() => ref.current?.click()}
                  className="w-full aspect-square border-3 border-gold/60 flex flex-col items-center justify-center gap-2 transition-all hover:border-gold"
                  style={{ background: photos[key] ? "transparent" : "hsl(var(--cosmos-mid))", position: "relative", overflow: "hidden" }}
                >
                  {photos[key] ? (
                    <img src={photos[key]} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="text-2xl">{icon}</span>
                      <span className="text-gold/70 text-[10px] text-center font-bold tracking-wide">{label}</span>
                    </>
                  )}
                  {photos[key] && (
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-2">
                      <span className="text-gold text-[10px] font-bold">✓ {label}</span>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
          {!photoReady && (
            <p className="text-gold/50 text-xs text-center mt-3 tracking-wide">請上傳三張照片以進行完整分析</p>
          )}
        </SectionCard>

        {/* ── Step 2: Gender ── */}
        <SectionCard color="blue" title="二、性別選擇" icon="⚥">
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="py-4 border-3 font-black text-sm tracking-widest transition-all"
                style={{
                  borderColor: gender === g ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.3)",
                  background: gender === g ? "hsl(var(--gold) / 0.15)" : "hsl(var(--cosmos))",
                  color: gender === g ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.5)",
                  boxShadow: gender === g ? "4px 4px 0px hsl(43 96% 48%)" : "none",
                }}
              >
                {g === "male" ? "♂ 男性" : "♀ 女性"}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* ── Step 3: Hand Type ── */}
        <SectionCard color="crimson" title="三、五行手型判定" icon="✦">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {["金形手", "木形手", "水形手", "火形手", "土形手"].map((t) => (
              <button
                key={t}
                onClick={() => setFeatures((f) => ({ ...f, handType: t }))}
                className="py-3 border-3 font-bold text-sm tracking-widest transition-all"
                style={{
                  borderColor: features.handType === t ? "hsl(var(--crimson))" : "hsl(var(--gold) / 0.3)",
                  background: features.handType === t ? "hsl(var(--crimson) / 0.15)" : "hsl(var(--cosmos))",
                  color: features.handType === t ? "hsl(0 85% 70%)" : "hsl(var(--gold) / 0.6)",
                  boxShadow: features.handType === t ? "4px 4px 0px hsl(var(--crimson))" : "none",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="text-gold/60 text-xs block mb-2">雙元素手型（可選）：</label>
          <div className="grid grid-cols-2 gap-2">
            {["", "金形手", "木形手", "水形手", "火形手", "土形手"].map((t) => (
              <button
                key={t || "none"}
                onClick={() => setFeatures((f) => ({ ...f, secondaryType: t || undefined }))}
                className="py-2 border-2 text-xs tracking-wide transition-all"
                style={{
                  borderColor: features.secondaryType === (t || undefined) ? "hsl(var(--electric-blue))" : "hsl(var(--gold) / 0.2)",
                  background: features.secondaryType === (t || undefined) ? "hsl(210 100% 52% / 0.1)" : "hsl(var(--cosmos))",
                  color: features.secondaryType === (t || undefined) ? "hsl(210 100% 70%)" : "hsl(var(--gold) / 0.5)",
                }}
              >
                {t || "無雙元素"}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* ── Step 4: Palm details ── */}
        <SectionCard color="gold" title="四、手掌特徵" icon="◈">
          <div className="space-y-4">
            <div>
              <label className="text-gold/80 text-xs font-bold tracking-widest block mb-2">手掌厚薄</label>
              <div className="grid grid-cols-3 gap-2">
                {[["thick", "厚實"], ["medium", "適中"], ["thin", "輕薄"]].map(([v, l]) => (
                  <SelectBtn key={v} value={v} current={features.palmThickness} label={l} color="gold"
                    onClick={() => setFeatures((f) => ({ ...f, palmThickness: v as any }))} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-gold/80 text-xs font-bold tracking-widest block mb-2">手腕線條</label>
              <div className="grid grid-cols-3 gap-2">
                {[["single", "一條"], ["double", "兩條"], ["triple", "三條"]].map(([v, l]) => (
                  <SelectBtn key={v} value={v} current={features.wristLines} label={l} color="gold"
                    onClick={() => setFeatures((f) => ({ ...f, wristLines: v as any }))} />
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Step 5: Mounts ── */}
        <SectionCard color="blue" title="五、八大掌丘能量" icon="⊕">
          <div className="space-y-3">
            {mountLabels.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-gold/80 text-xs font-bold w-24 flex-shrink-0">{label}</span>
                <div className="grid grid-cols-3 gap-1 flex-1">
                  {[["full", "飽滿"], ["medium", "適中"], ["flat", "平坦"]].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => setFeatures((f) => ({ ...f, mounts: { ...f.mounts, [key]: v as MountLevel } }))}
                      className="py-1.5 border-2 text-[10px] font-bold tracking-wide transition-all"
                      style={{
                        borderColor: features.mounts[key] === v ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.2)",
                        background: features.mounts[key] === v ? "hsl(var(--gold) / 0.15)" : "hsl(var(--cosmos))",
                        color: features.mounts[key] === v ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.4)",
                      }}
                    >{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Step 6: Lines ── */}
        <SectionCard color="crimson" title="六、三大主線特徵" icon="〜">
          <div className="space-y-5">
            {[
              { key: "life" as const, label: "生命線", color: "gold" },
              { key: "head" as const, label: "智慧線", color: "electric-blue" },
              { key: "heart" as const, label: "感情線", color: "crimson" },
            ].map(({ key, label }) => (
              <div key={key} className="border-l-3 border-gold/30 pl-3">
                <p className="text-gold text-xs font-black tracking-widest mb-2">{label}</p>
                <div className="space-y-2">
                  <LineSelect label="深淺" values={[["deep","深"], ["medium","中"], ["shallow","淺"]]}
                    current={features.lines[key].depth}
                    onSelect={(v) => setFeatures((f) => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], depth: v as LineDepth } } }))} />
                  <LineSelect label="長短" values={[["long","長"], ["medium","中"], ["short","短"]]}
                    current={features.lines[key].length}
                    onSelect={(v) => setFeatures((f) => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], length: v as LineLength } } }))} />
                  <LineSelect label="走向" values={[["curved","彎曲"], ["straight","平直"]]}
                    current={features.lines[key].shape}
                    onSelect={(v) => setFeatures((f) => ({ ...f, lines: { ...f.lines, [key]: { ...f.lines[key], shape: v as LineShape } } }))} />
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-gold/80 text-xs font-bold tracking-widest mb-2">輔助線</p>
              <div className="grid grid-cols-3 gap-2">
                {[["fate","事業線"], ["sun","太陽線"], ["wealth","財運線"]].map(([k, l]) => (
                  <button key={k}
                    onClick={() => setFeatures((f) => ({ ...f, lines: { ...f.lines, [k]: !f.lines[k as "fate"|"sun"|"wealth"] } }))}
                    className="py-2 border-2 text-xs font-bold tracking-wide transition-all"
                    style={{
                      borderColor: features.lines[k as "fate"|"sun"|"wealth"] ? "hsl(var(--jade))" : "hsl(var(--gold) / 0.2)",
                      background: features.lines[k as "fate"|"sun"|"wealth"] ? "hsl(155 60% 38% / 0.15)" : "hsl(var(--cosmos))",
                      color: features.lines[k as "fate"|"sun"|"wealth"] ? "hsl(155 60% 60%)" : "hsl(var(--gold) / 0.4)",
                    }}
                  >{l}</button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Step 7: Special ── */}
        <SectionCard color="gold" title="七、特殊紋路" icon="★">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["heartShape", "心形紋"],
              ["wellGrid", "井字紋"],
              ["headLineFork", "智慧線分叉"],
              ["heartLineFork", "感情線分叉"],
            ].map(([k, l]) => (
              <button key={k}
                onClick={() => setFeatures((f) => ({ ...f, special: { ...f.special, [k]: !f.special[k as keyof typeof f.special] } }))}
                className="py-3 border-3 text-xs font-bold tracking-wide transition-all"
                style={{
                  borderColor: features.special[k as keyof typeof features.special] ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.2)",
                  background: features.special[k as keyof typeof features.special] ? "hsl(var(--gold) / 0.15)" : "hsl(var(--cosmos))",
                  color: features.special[k as keyof typeof features.special] ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.4)",
                  boxShadow: features.special[k as keyof typeof features.special] ? "3px 3px 0px hsl(43 96% 48%)" : "none",
                }}
              >{features.special[k as keyof typeof features.special] ? "✓ " : ""}{l}</button>
            ))}
          </div>
        </SectionCard>

        {/* ── Analyze Button ── */}
        <div className="mt-8 mb-12">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-5 border-4 border-gold font-black text-lg tracking-[0.2em] transition-all hover:-translate-y-1"
            style={{
              background: "hsl(var(--gold))",
              color: "hsl(var(--cosmos))",
              boxShadow: "6px 6px 0px hsl(0 0% 4%)",
            }}
          >
            ✦ 開始解析掌中命運 ✦
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyzingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "hsl(var(--cosmos))" }}>
      <div className="animate-float mb-8">
        <svg viewBox="0 0 120 150" width="100" height="125" fill="none">
          <path d="M38 130 C26 130 18 120 18 110 L18 68 C18 62 23 58 29 58 C32 58 35 59 37 62 L37 42 C37 36 42 32 48 32 C51 32 54 34 56 37 L56 28 C56 22 61 18 67 18 C73 18 78 22 78 28 L78 37 C80 34 83 32 86 32 C92 32 97 36 97 42 L97 62 C99 59 102 58 105 58 C111 58 116 62 116 68 L116 110 C116 120 108 130 96 130 Z"
            stroke="hsl(43 96% 55%)" strokeWidth="2" fill="hsl(43 96% 10% / 0.5)" />
          <path d="M42 95 Q36 82 38 65 Q40 52 48 44" stroke="hsl(43 96% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw" />
          <path d="M40 85 Q60 80 82 85 Q90 87 96 92" stroke="hsl(210 100% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw-delay" />
          <path d="M42 74 Q60 68 82 71 Q92 73 96 79" stroke="hsl(0 85% 65%)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-line-draw-delay2" />
        </svg>
      </div>
      <p className="text-shimmer text-xl font-black tracking-[0.3em] mb-3">解讀掌中訊息中…</p>
      <p className="text-gold/50 text-xs tracking-widest animate-pulse">正在感應您的生命軌跡</p>
      <div className="mt-8 flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

// Reusable components
function PageHeader({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <header className="border-b-4 border-gold sticky top-0 z-20" style={{ background: "hsl(var(--cosmos))" }}>
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 border-3 border-gold/60 flex items-center justify-center hover:border-gold transition-colors"
          style={{ background: "hsl(var(--cosmos-mid))" }}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="hsl(43 96% 55%)" strokeWidth="2">
            <path d="M10 3L5 8L10 13" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <p className="text-gold font-black text-base tracking-wide">{title}</p>
          <p className="text-gold/50 text-[10px] tracking-widest">{subtitle}</p>
        </div>
        <div className="ml-auto text-gold/40 text-xs">福青施老師</div>
      </div>
    </header>
  );
}

function SectionCard({ children, color, title, icon }: { children: React.ReactNode; color: string; title: string; icon: string }) {
  const colorMap: Record<string, string> = {
    gold: "hsl(43 96% 48%)",
    blue: "hsl(210 100% 52%)",
    crimson: "hsl(0 85% 50%)",
  };
  const c = colorMap[color] || colorMap.gold;
  return (
    <div className="mb-6 border-4" style={{ borderColor: c, background: "hsl(var(--cosmos-mid))", boxShadow: `4px 4px 0px ${c}` }}>
      <div className="border-b-3 px-4 py-3 flex items-center gap-2" style={{ borderColor: c, background: "hsl(var(--cosmos))" }}>
        <span className="text-base">{icon}</span>
        <span className="font-black text-sm tracking-widest" style={{ color: c }}>{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function SelectBtn({ value, current, label, color, onClick }: { value: string; current: string; label: string; color: string; onClick: () => void }) {
  const colorMap: Record<string, string> = { gold: "hsl(43 96% 48%)", crimson: "hsl(0 85% 50%)", blue: "hsl(210 100% 52%)" };
  const c = colorMap[color] || colorMap.gold;
  const active = value === current;
  return (
    <button onClick={onClick} className="py-2 border-2 text-xs font-bold tracking-wide transition-all"
      style={{
        borderColor: active ? c : "hsl(var(--gold) / 0.2)",
        background: active ? `${c}20` : "hsl(var(--cosmos))",
        color: active ? c : "hsl(var(--gold) / 0.4)",
        boxShadow: active ? `3px 3px 0px ${c}` : "none",
      }}
    >{label}</button>
  );
}

function LineSelect({ label, values, current, onSelect }: { label: string; values: [string, string][]; current: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gold/50 text-[10px] w-8 flex-shrink-0">{label}</span>
      <div className="flex gap-1 flex-1">
        {values.map(([v, l]) => (
          <button key={v} onClick={() => onSelect(v)}
            className="flex-1 py-1 border text-[10px] font-bold transition-all"
            style={{
              borderColor: current === v ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.2)",
              background: current === v ? "hsl(var(--gold) / 0.15)" : "hsl(var(--cosmos))",
              color: current === v ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.4)",
            }}
          >{l}</button>
        ))}
      </div>
    </div>
  );
}
