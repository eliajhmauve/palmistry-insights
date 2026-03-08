import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecord, type PalmRecord } from "@/lib/palmReading";

// Simple markdown to HTML renderer
function renderMarkdown(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|b|u|o|l|h|p|e])(.+)$/gm, (line) => {
      if (line.trim() && !line.startsWith('<')) return `<p>${line}</p>`;
      return line;
    });
}

export default function AnalysisReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<PalmRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const r = getRecord(id);
      setRecord(r || null);
    }
  }, [id]);

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="text-center">
          <p className="text-gold text-xl font-black mb-4">找不到解析報告</p>
          <button onClick={() => navigate("/")} className="btn-brutal-gold px-6 py-3 text-sm font-bold">
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(record.report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cosmos))" }}>
      {/* Header */}
      <header className="border-b-4 border-gold sticky top-0 z-20" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(record.mode === "photo" ? "/photo-analysis" : "/palm-review")}
            className="w-9 h-9 border-3 border-gold/60 flex items-center justify-center hover:border-gold transition-colors"
            style={{ background: "hsl(var(--cosmos-mid))" }}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="hsl(43 96% 55%)" strokeWidth="2">
              <path d="M10 3L5 8L10 13" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-gold font-black text-sm tracking-wide truncate">{record.title}</p>
            <p className="text-gold/40 text-[10px]">{new Date(record.date).toLocaleDateString("zh-TW")}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="border-2 border-gold/40 px-3 py-1.5 text-xs font-bold text-gold/70 hover:border-gold hover:text-gold transition-all"
              style={{ background: "hsl(var(--cosmos-mid))" }}
            >
              {copied ? "✓ 已複製" : "複製報告"}
            </button>
            <button
              onClick={() => navigate("/records")}
              className="border-2 border-gold/40 px-3 py-1.5 text-xs font-bold text-gold/70 hover:border-gold hover:text-gold transition-all"
              style={{ background: "hsl(var(--cosmos-mid))" }}
            >
              紀錄庫
            </button>
          </div>
        </div>
      </header>

      {/* Report Banner */}
      <div
        className="border-b-4 border-gold py-6"
        style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(230 60% 18%), hsl(var(--cosmos)))" }}
      >
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px flex-1 bg-gold/30" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px flex-1 bg-gold/30" />
          </div>
          <p className="text-shimmer text-2xl font-black tracking-[0.15em] mb-2">手相解析報告</p>
          <p className="text-gold/50 text-xs tracking-widest">PALM DESTINY ANALYSIS · 福青施老師</p>

          {/* Mode Badge */}
          <div className="flex justify-center gap-2 mt-4">
            <span
              className="border-2 px-3 py-1 text-xs font-bold tracking-widest"
              style={{
                borderColor: record.mode === "photo" ? "hsl(var(--gold))" : "hsl(var(--crimson))",
                color: record.mode === "photo" ? "hsl(var(--gold))" : "hsl(0 85% 65%)",
                background: record.mode === "photo" ? "hsl(var(--gold) / 0.1)" : "hsl(var(--crimson) / 0.1)",
              }}
            >
              {record.mode === "photo" ? "📷 拍照分析" : "✓ 手相復盤"}
            </span>
            <span className="border-2 border-gold/30 px-3 py-1 text-xs text-gold/60">
              {record.features.gender === "male" ? "♂ 男性" : "♀ 女性"}
            </span>
            <span className="border-2 border-gold/30 px-3 py-1 text-xs text-gold/60">
              {record.features.handType}
            </span>
          </div>
        </div>
      </div>

      {/* Photos (if any) */}
      {record.photos && Object.values(record.photos).some(Boolean) && (
        <div className="border-b-3 border-gold/20" style={{ background: "hsl(var(--cosmos-mid))" }}>
          <div className="container mx-auto px-4 py-4 max-w-2xl">
            <p className="text-gold/60 text-xs font-bold tracking-widest mb-3">已上傳照片</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "palm" as const, label: "手掌正面" },
                { key: "back" as const, label: "手背照片" },
                { key: "wrist" as const, label: "手腕照片" },
              ].map(({ key, label }) =>
                record.photos?.[key] ? (
                  <div key={key} className="border-3 border-gold/30 overflow-hidden">
                    <img src={record.photos[key]} alt={label} className="w-full aspect-square object-cover" />
                    <p className="text-gold/50 text-[9px] text-center py-1">{label}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}

      {/* Markdown Report */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div
          className="border-4 border-gold p-6 report-content"
          style={{
            background: "hsl(var(--cosmos-mid))",
            boxShadow: "6px 6px 0px hsl(43 96% 48%)",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdown(record.report) }}
            className="report-content"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8 mb-12">
          <button
            onClick={() => navigate("/")}
            className="py-4 border-4 border-gold font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
            style={{ background: "hsl(var(--cosmos-mid))", color: "hsl(var(--gold))", boxShadow: "4px 4px 0px hsl(43 96% 48%)" }}
          >
            返回首頁
          </button>
          <button
            onClick={() => navigate("/records")}
            className="py-4 border-4 border-gold font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
            style={{ background: "hsl(var(--gold))", color: "hsl(var(--cosmos))", boxShadow: "4px 4px 0px hsl(0 0% 4%)" }}
          >
            查看紀錄庫
          </button>
        </div>
      </div>
    </div>
  );
}
