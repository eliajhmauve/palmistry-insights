import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecords, deleteRecord, type PalmRecord } from "@/lib/palmReading";

export default function RecordLibrary() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<PalmRecord[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleDelete = (id: string) => {
    deleteRecord(id);
    setRecords(getRecords());
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cosmos))" }}>
      {/* Header */}
      <header className="border-b-4 border-gold sticky top-0 z-20" style={{ background: "hsl(var(--cosmos))" }}>
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 border-3 border-gold/60 flex items-center justify-center hover:border-gold transition-colors"
            style={{ background: "hsl(var(--cosmos-mid))" }}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="hsl(43 96% 55%)" strokeWidth="2">
              <path d="M10 3L5 8L10 13" strokeLinecap="round" />
            </svg>
          </button>
          <div>
            <p className="text-gold font-black text-base tracking-wide">手相復盤紀錄庫</p>
            <p className="text-gold/50 text-[10px] tracking-widest">Palm Reading Archive</p>
          </div>
          <div className="ml-auto">
            <span className="border-2 border-gold/30 px-2 py-1 text-gold/60 text-xs font-bold">{records.length} 筆紀錄</span>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="border-b-3 border-gold/20 py-4" style={{ background: "hsl(230 55% 11%)" }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="hsl(43 96% 55%)" strokeWidth="2">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            <p className="text-gold/60 text-sm leading-relaxed">
              保存您每一次的手相觀察與命理學習記錄，回顧掌紋中的生命軌跡變化。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {records.length === 0 ? (
          <EmptyState onNavigate={navigate} />
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onView={() => navigate(`/report/${record.id}`)}
                onDelete={() => setConfirmDelete(record.id)}
                confirmingDelete={confirmDelete === record.id}
                onConfirmDelete={() => handleDelete(record.id)}
                onCancelDelete={() => setConfirmDelete(null)}
              />
            ))}
          </div>
        )}

        {/* New Analysis Buttons */}
        {records.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-8 mb-12">
            <button
              onClick={() => navigate("/photo-analysis")}
              className="py-4 border-4 border-gold font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
              style={{ background: "hsl(var(--cosmos-mid))", color: "hsl(var(--gold))", boxShadow: "4px 4px 0px hsl(43 96% 48%)" }}
            >
              新增拍照分析
            </button>
            <button
              onClick={() => navigate("/palm-review")}
              className="py-4 border-4 border-crimson font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
              style={{ background: "hsl(var(--cosmos-mid))", color: "hsl(0 85% 65%)", boxShadow: "4px 4px 0px hsl(var(--crimson))" }}
            >
              新增復盤紀錄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RecordCard({
  record,
  onView,
  onDelete,
  confirmingDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  record: PalmRecord;
  onView: () => void;
  onDelete: () => void;
  confirmingDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  const borderColor = record.mode === "photo" ? "hsl(43 96% 48%)" : "hsl(0 85% 50%)";
  const modeLabel = record.mode === "photo" ? "📷 拍照分析" : "✓ 手相復盤";
  const date = new Date(record.date).toLocaleDateString("zh-TW", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

  const preview = record.report.slice(0, 120).replace(/[#*>]/g, "").trim();

  return (
    <div
      className="border-4 transition-all"
      style={{
        borderColor,
        background: "hsl(var(--cosmos-mid))",
        boxShadow: `4px 4px 0px ${borderColor}`,
      }}
    >
      {/* Card Header */}
      <div className="border-b-3 px-4 py-3 flex items-center justify-between" style={{ borderColor, background: "hsl(var(--cosmos))" }}>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 border"
            style={{ borderColor, color: borderColor, background: `${borderColor}15` }}>
            {modeLabel}
          </span>
          <span className="text-gold text-sm font-black truncate max-w-[150px]">{record.title}</span>
        </div>
        <span className="text-gold/40 text-[10px]">{date}</span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Photos preview */}
        {record.photos && Object.values(record.photos).some(Boolean) && (
          <div className="flex gap-2 mb-3">
            {[record.photos.palm, record.photos.back, record.photos.wrist].filter(Boolean).map((src, i) => (
              <img key={i} src={src} alt="" className="w-14 h-14 object-cover border-2 border-gold/20" />
            ))}
          </div>
        )}

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Tag color="gold">{record.features.handType}</Tag>
          {record.features.secondaryType && <Tag color="blue">{record.features.secondaryType}</Tag>}
          <Tag color="muted">{record.features.gender === "male" ? "♂ 男" : "♀ 女"}</Tag>
          {record.features.lines.fate && <Tag color="jade">事業線</Tag>}
          {record.features.special.heartShape && <Tag color="crimson">心形紋</Tag>}
          {record.features.special.wellGrid && <Tag color="crimson">井字紋</Tag>}
        </div>

        <p className="text-gold/40 text-xs leading-relaxed mb-4 line-clamp-2">{preview}…</p>

        {/* Action Buttons */}
        {confirmingDelete ? (
          <div className="flex gap-2">
            <button
              onClick={onConfirmDelete}
              className="flex-1 py-2 border-3 text-xs font-bold tracking-widest"
              style={{ borderColor: "hsl(var(--crimson))", color: "hsl(0 85% 65%)", background: "hsl(var(--crimson) / 0.15)" }}
            >
              確認刪除
            </button>
            <button
              onClick={onCancelDelete}
              className="flex-1 py-2 border-3 text-xs font-bold tracking-widest border-gold/40 text-gold/60"
              style={{ background: "hsl(var(--cosmos))" }}
            >
              取消
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onView}
              className="flex-1 py-2 border-3 text-xs font-bold tracking-widest transition-all hover:-translate-y-0.5"
              style={{ borderColor, color: record.mode === "photo" ? "hsl(var(--gold))" : "hsl(0 85% 65%)", background: `${borderColor}15`, boxShadow: `2px 2px 0px ${borderColor}` }}
            >
              查看完整報告
            </button>
            <button
              onClick={onDelete}
              className="w-10 py-2 border-3 border-gold/20 flex items-center justify-center text-gold/40 hover:border-crimson hover:text-crimson transition-all"
              style={{ background: "hsl(var(--cosmos))" }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 4h12M5 4V3h6v1M6 7v5M10 7v5M3 4l1 9h8l1-9" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    gold: { border: "hsl(43 96% 48% / 0.6)", text: "hsl(43 96% 65%)", bg: "hsl(43 96% 48% / 0.1)" },
    blue: { border: "hsl(210 100% 52% / 0.6)", text: "hsl(210 100% 70%)", bg: "hsl(210 100% 52% / 0.1)" },
    crimson: { border: "hsl(0 85% 50% / 0.6)", text: "hsl(0 85% 70%)", bg: "hsl(0 85% 50% / 0.1)" },
    jade: { border: "hsl(155 60% 38% / 0.6)", text: "hsl(155 60% 55%)", bg: "hsl(155 60% 38% / 0.1)" },
    muted: { border: "hsl(var(--gold) / 0.3)", text: "hsl(var(--gold) / 0.7)", bg: "transparent" },
  };
  const c = colorMap[color] || colorMap.muted;
  return (
    <span className="text-[9px] font-bold px-1.5 py-0.5 border"
      style={{ borderColor: c.border, color: c.text, background: c.bg }}>
      {children}
    </span>
  );
}

function EmptyState({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 border-4 border-gold/30 flex items-center justify-center mx-auto mb-6"
        style={{ background: "hsl(var(--cosmos-mid))" }}>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="hsl(43 96% 48% / 0.4)" strokeWidth="2">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      </div>
      <p className="text-gold/60 font-black text-lg mb-2 tracking-wide">紀錄庫尚為空白</p>
      <p className="text-gold/30 text-sm mb-8 tracking-wider">每一次手相分析都會自動保存於此</p>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <button
          onClick={() => onNavigate("/photo-analysis")}
          className="py-4 border-4 border-gold font-black text-sm tracking-wide transition-all hover:-translate-y-0.5"
          style={{ background: "hsl(var(--gold))", color: "hsl(var(--cosmos))", boxShadow: "4px 4px 0px hsl(0 0% 4%)" }}
        >
          拍照分析
        </button>
        <button
          onClick={() => onNavigate("/palm-review")}
          className="py-4 border-4 border-crimson font-black text-sm tracking-wide transition-all hover:-translate-y-0.5"
          style={{ background: "hsl(var(--cosmos-mid))", color: "hsl(0 85% 65%)", boxShadow: "4px 4px 0px hsl(var(--crimson))" }}
        >
          手相復盤
        </button>
      </div>
    </div>
  );
}
