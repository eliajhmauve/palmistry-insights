// Palm Reading Report Generator
// Generates a comprehensive 1000+ word analysis based on palm features

export interface PalmFeatures {
  gender: "male" | "female";
  handType: string;
  secondaryType?: string;
  palmThickness: "thick" | "medium" | "thin";
  wristLines: "single" | "double" | "triple";
  mounts: {
    venus: "full" | "medium" | "flat";
    jupiter: "full" | "medium" | "flat";
    saturn: "full" | "medium" | "flat";
    sun: "full" | "medium" | "flat";
    mercury: "full" | "medium" | "flat";
    moon: "full" | "medium" | "flat";
    mars1: "full" | "medium" | "flat";
    mars2: "full" | "medium" | "flat";
  };
  lines: {
    life: { depth: "deep" | "medium" | "shallow"; length: "long" | "medium" | "short"; shape: "curved" | "straight" };
    head: { depth: "deep" | "medium" | "shallow"; length: "long" | "medium" | "short"; shape: "curved" | "straight" };
    heart: { depth: "deep" | "medium" | "shallow"; length: "long" | "medium" | "short"; shape: "curved" | "straight" };
    fate: boolean;
    sun: boolean;
    wealth: boolean;
  };
  special: {
    heartShape: boolean;
    wellGrid: boolean;
    headLineFork: boolean;
    heartLineFork: boolean;
  };
  analysisMode: "photo" | "review";
}

const handTypeDescriptions: Record<string, string> = {
  "金形手": "金形手者，手指方正，指節明顯，掌心厚實飽滿。金主收斂、堅毅與精確，此類手型之人天生具有嚴謹的思維邏輯，處事一絲不苟，追求完美與秩序。金形手的人在職場中往往以紀律著稱，在財務管理、精密工程或法律行業中發揮所長。",
  "木形手": "木形手者，手指修長而富有彈性，掌心略窄但結實。木主生長、創造與生命力，此類手型之人想象力豐富，具有強烈的藝術感知與人文關懷。木形手的人天生適合創意產業，無論是文學、音樂、設計或教育，都能展現出不凡的才華與影響力。",
  "水形手": "水形手者，手指纖細柔軟，指尖圓潤，掌心略帶彈性。水主流動、感知與適應，此類手型之人情感細膩，直覺超群，能夠深刻感知他人的情緒與需求。水形手的人在心理療癒、藝術創作或靈性探索的領域中往往有獨特的天賦，如水般靈活應對人生的各種變化。",
  "火形手": "火形手者，手掌寬厚有力，指節飽滿，充滿生命的張力。火主激情、行動與影響力，此類手型之人充滿熱情與魄力，天生具有領導才能，在面對挑戰時不退縮，反而越戰越勇。火形手的人適合從事創業、管理、表演或社會運動，能點燃他人心中的火焰。",
  "土形手": "土形手者，手掌寬厚而穩固，手指粗短而有力，整體感覺踏實可靠。土主穩定、耐力與務實，此類手型之人腳踏實地，以行動見長，在農業、建築、製造或後勤管理等需要長期耐力的領域中展現出無可取代的價值。土形手的人如大地般承載萬物，是家庭與組織中最可靠的支柱。",
};

const mountDescriptions = {
  venus: {
    full: "金星丘高度飽滿，代表你擁有充沛的生命能量與旺盛的情感力量。你天生善於愛與被愛，在人際關係中充滿魅力，對美麗的事物有深刻的感知。此徵象亦代表身體素質強健，生命力旺盛，在感情路上易得異性緣。",
    medium: "金星丘適中，代表你的情感世界平衡而穩定，不會過於衝動，也不至於冷漠疏離。在愛情與友誼中，你懂得付出與接受，生命能量處於健康的流動狀態。",
    flat: "金星丘較為平坦，代表你在情感表達上較為含蓄，傾向於理性主導感性。雖然外表看似淡然，但內心深處仍有細膩的情感世界，只是不易向外顯露。",
  },
  jupiter: {
    full: "木星丘飽滿高聳，是強烈的野心與領導才能的象徵。你天生具有指揮他人的能力，對地位與名望有強烈渴望，在職場或社群中易站在領導位置，影響周圍的人。",
    medium: "木星丘適中，代表你擁有健康的自信心，既有追求卓越的動力，也能在適當時候虛心學習。你的領導風格溫和而有效，能贏得他人的尊重。",
    flat: "木星丘較平，顯示你對權位的欲望並不強烈，更傾向於在幕後默默耕耘。你的謙遜是一種智慧，但也需要在必要時勇於表達自己的想法。",
  },
  saturn: {
    full: "土星丘飽滿，代表你具有深刻的責任感與自律精神，做事嚴謹、謹慎，對人生有長遠的規劃。這種特質使你在需要耐心與毅力的領域中能夠持續精進，是成就大業的基礎。",
    medium: "土星丘適中，顯示你在責任感與生活樂趣之間保持良好的平衡。既能對自己的義務負責，也懂得享受當下的美好，是成熟人格的表現。",
    flat: "土星丘較平，代表你的生活風格較為自由奔放，對規則與束縛有一定的抵抗。這種特質若能善加引導，可轉化為創新突破的力量。",
  },
  sun: {
    full: "太陽丘飽滿高聳，是藝術才華與名望成就的強烈標誌。你天生具有吸引眼球的磁場，在公眾場合中自然散發光彩，在藝術、表演或任何需要展示自我的領域中都有傑出的潛能。",
    medium: "太陽丘適中，代表你具有一定的藝術品味與審美能力，能夠欣賞並創造美麗的事物。你在同儕中受到尊重，雖然不是萬眾矚目的明星，卻有著自己獨特的光芒。",
    flat: "太陽丘較平，顯示你更傾向於低調行事，重視內在深度多於外在光環。你的才華或許不在表演舞台上，而是在默默鑽研、獨立創作的過程中綻放。",
  },
  mercury: {
    full: "水星丘飽滿，代表你擁有敏銳的智識與出色的溝通能力。你思維活躍，善於言辭，在商業談判、教育傳授或媒體傳播等需要精準表達的領域中如魚得水，口才與文才均屬一流。",
    medium: "水星丘適中，代表你具有良好的溝通技巧，既能清晰表達自己，也善於傾聽他人。在日常交際中，你的表達自然流暢，給人可靠且聰明的印象。",
    flat: "水星丘較平，顯示你在溝通上傾向於謹慎而非口若懸河。你重視思考多於說話，每一句話都經過深思熟慮，因此雖然話不多，卻往往一語中的。",
  },
  moon: {
    full: "月丘飽滿，是豐富想象力與高度直覺的象徵。你的內心世界如汪洋般深邃，擁有詩人般的靈性感知，對看不見的力量有天生的感應能力。這種特質使你在創意寫作、靈性探索或心理療癒的路上擁有獨特的天賦。",
    medium: "月丘適中，代表你具有健康的想象力與直覺，能夠在理性判斷與靈感感知之間保持平衡。你偶爾會有深刻的預感，而這些直覺往往值得信任。",
    flat: "月丘較平，顯示你更傾向於務實與邏輯，對超自然或抽象事物持較為理性的態度。你的力量在於腳踏實地，以行動創造現實。",
  },
  mars1: {
    full: "第一火星丘（內側）飽滿，象徵你擁有強大的主動攻擊性與勇氣，面對困難時不逃避，能夠直面挑戰，是鬥士型的人格特質。",
    medium: "第一火星丘適中，代表你勇敢而不莽撞，在需要時能夠展現出強大的意志力，但也懂得選擇戰場，不做無謂的消耗。",
    flat: "第一火星丘較平，代表你更傾向於以和平與協商化解衝突，不喜對抗，這種特質在需要耐心與包容的環境中是一種優勢。",
  },
  mars2: {
    full: "第二火星丘（外側）飽滿，象徵堅韌的防守力量與心理抗壓性，面對逆境能夠持久耐戰，愈挫愈勇，是人生長跑中的強勁耐力。",
    medium: "第二火星丘適中，代表你具有良好的心理韌性，在壓力下能夠保持穩定，不容易崩潰或放棄。",
    flat: "第二火星丘較平，顯示你對持久的壓力較為敏感，需要定期為自己補充能量，避免長期消耗導致身心疲竭。",
  },
};

export function generatePalmReport(features: PalmFeatures): string {
  const genderStr = features.gender === "male" ? "男性" : "女性";
  const handTypeDesc = handTypeDescriptions[features.handType] || "此手型充滿獨特能量，每一道掌紋都訴說著不同的人生故事。";
  const dualTypeNote = features.secondaryType
    ? `\n\n值得關注的是，您的手掌同時兼具**${features.secondaryType}**的特徵，形成了**${features.handType}${features.secondaryType}雙元素手型**。這種複合能量型態意味著您並非單一模式的人，而是具備兩種五行力量交織融合的複合性格，既有${features.handType.replace("形手", "")}的核心特質，又融入了${features.secondaryType.replace("形手", "")}的靈活彈性，在不同情境下能展現出截然不同的面貌。`
    : "";

  const palmThicknessDesc =
    features.palmThickness === "thick"
      ? "您的手掌厚實飽滿，代表能量充沛、行動力強，在面對人生挑戰時往往能夠以行動力見長，是踏實執行者的象徵。"
      : features.palmThickness === "thin"
      ? "您的手掌較為輕薄，代表感知細膩、思維敏銳，擅長觀察與分析，是思想者與感應者的特質。"
      : "您的手掌厚薄適中，代表思想與行動之間保持良好的平衡，既能深入思考，也能積極執行。";

  const wristLinesDesc =
    features.wristLines === "triple"
      ? "您手腕處呈現清晰的三條手腕線，這是健康長壽與豐盛人生的吉祥象徵，代表生命能量源源不絕，人生福澤深厚。"
      : features.wristLines === "double"
      ? "您的手腕有兩條紋線，象徵生命能量穩定持久，人生路雖有起伏，但總體運勢平穩向上，具備良好的生命根基。"
      : "您的手腕呈現單條紋線，象徵生命能量集中而專注，雖然人生可能需要更加注重身心能量的維護，但專注的力量往往能帶來深度與突破。";

  const lifeLineDesc = `您的生命線${features.lines.life.depth === "deep" ? "深刻清晰" : features.lines.life.depth === "shallow" ? "較為淺淡" : "深度適中"}，${features.lines.life.length === "long" ? "延伸至手掌下方，代表生命力旺盛，人生歷程豐富" : features.lines.life.length === "short" ? "在掌中偏上段止住，代表生活方式可能有較大的轉變" : "長度適中，象徵人生節奏穩健"}，線條走向${features.lines.life.shape === "curved" ? "弧度優美，代表您的人生充滿活力與曲折的精彩" : "較為平直，代表您的人生走向理性而有規劃"}。`;

  const headLineDesc = `您的智慧線${features.lines.head.depth === "deep" ? "深刻有力" : features.lines.head.depth === "shallow" ? "較為細淡" : "深度適中"}，${features.lines.head.length === "long" ? "橫跨整個掌面，代表思維廣博、考慮周全" : features.lines.head.length === "short" ? "較短，代表思維直接而果決，不拘泥於細節" : "長度中等，代表思維均衡"}，${features.lines.head.shape === "curved" ? "向下彎曲，象徵豐富的想象力與藝術氣質" : "保持平直，象徵思維理性而邏輯清晰"}。`;

  const heartLineDesc = `您的感情線${features.lines.heart.depth === "deep" ? "深刻飽滿" : features.lines.heart.depth === "shallow" ? "較為淡薄" : "深度適中"}，${features.lines.heart.length === "long" ? "延伸至食指下方甚至更遠，代表情感豐富、重視愛與連結" : features.lines.heart.length === "short" ? "較短，代表在感情上較為現實，注重實質的情感表達" : "長度適中，代表情感世界平衡和諧"}，${features.lines.heart.shape === "curved" ? "線條曲度明顯，象徵感情熱烈、易動情" : "線條較直，象徵在感情中保持理智，不易被情緒牽著走"}。`;

  const auxiliaryLines = [
    features.lines.fate ? "**事業線**清晰可見，代表您的人生軌跡有明確的方向感，職業路途較為順暢，在三十歲前後可能迎來事業的重要轉捩點。" : "事業線不明顯，代表您的事業發展較為多元靈活，不拘泥於單一方向，人生可能擁有多種職業身份。",
    features.lines.sun ? "**太陽線**顯現，是名望與成就的象徵，代表您在某個人生階段將獲得公眾的認可，名聲與影響力都有顯著的上升空間。" : null,
    features.lines.wealth ? "**財運線**可見，象徵財富流入的管道通暢，透過自身的才能與努力，財富積累的速度將超越一般人。" : null,
  ].filter(Boolean).join("\n\n");

  const specialMarks = [
    features.special.heartShape ? "掌中出現**心形紋**，這是極為罕見的吉祥紋路，象徵您在感情上有著特殊的緣份與吸引力，命中注定將遇見深刻而美麗的愛。" : null,
    features.special.wellGrid ? "掌中發現**井字紋**，象徵您擁有突破困境的超凡能力，每當身陷絕境，反而能找到突破口，化危機為轉機。" : null,
    features.special.headLineFork ? "**智慧線末端出現分叉**，這是雙元思維的象徵，代表您的思維兼具邏輯性與創造性，能在理性分析與直覺感知之間自如切換，適合從事跨領域的工作。" : null,
    features.special.heartLineFork ? "**感情線出現分叉**，象徵您的感情世界豐富多彩，在愛情中可能經歷過複雜的情感歷程，但最終這些經歷都將成為您人生智慧的一部分。" : null,
  ].filter(Boolean);

  const personalityAnalysis = `
根據您整體的掌紋特徵，您是一位${genderStr === "男性" ? "具有深度的男性" : "具有靈性感知的女性"}，兼具直覺與理性的雙重特質。您在面對人生時，既能感受生命的細膩之處，又能以行動力將夢想付諸實現。您對人際關係的重視程度較高，但同時也保有一定的獨立性與個人邊界意識。

在挑戰面前，您通常不是第一個逃跑的人，而是會花時間理解局勢，再以適合自己的方式應對。這種既不衝動也不懦弱的特質，是您人生中最重要的資產之一。

您對「意義」的渴望超越對「成功」的追求。對您而言，一份有意義的工作遠比高薪卻空洞的職位更有吸引力。這種對深度與真實的追求，將引導您走向一條雖然不一定最輕鬆，但一定最適合您靈魂的人生道路。`;

  const lifeDirection = `
從掌紋的整體格局來看，您的人生發展方向有幾個值得特別關注的面向：

**事業與才能**
您的天賦並非一般意義上的「聰明」，而是一種對事物本質的洞察力。在職業選擇上，凡是需要深度思考、創造性解決問題或與人建立深刻連結的工作，都適合您的能量型態。避免長期從事機械重複、缺乏靈魂感的工作，否則可能導致內在能量的耗損。

**感情與關係**
您在感情中是一個重視靈魂交流的人，表面的吸引力對您的影響短暫，真正讓您留下的是那種難以言說的心靈共鳴。在尋找伴侶時，切忌妥協自己的核心價值，一段真正適合您的關係，應該讓您感到自由而非束縛。

**財富與物質**
財富對您而言是工具而非目的，但您同樣值得擁有豐盛的物質生活。透過發揮自身獨特的才能，建立屬於自己的價值體系，財富將自然而然地流入您的生命。

**健康與能量**
請特別注意身心能量的定期補充，避免過度消耗。定期的靜默時間、與大自然的連結，以及適度的身體活動，都是您保持最佳狀態的關鍵。`;

  const actionAdvice = `
根據掌中的生命訊息，以下是為您量身建議的行動方向：

1. **每日靜觀掌紋** — 每天花三分鐘靜靜觀察自己的雙手，讓身體的智慧傳遞訊息給意識。
2. **書寫生命日誌** — 定期記錄自己的感受、決策與成長，掌紋是靜態的，但生命是動態的，唯有書寫才能記錄軌跡。
3. **勇於展現天賦** — 不要因為謙遜而掩蓋自己的才華，您的獨特性是給這個世界最好的禮物。
4. **深化一段關係** — 選擇一段重要的關係，投入更多的時間與心力，讓它成為您生命中的滋養來源。
5. **設定三年目標** — 根據掌紋所顯示的能量方向，為自己設定一個三到五年的人生目標，並分解為可執行的小步驟。`;

  const inspirationalQuote = `
> *「命運不是寫在石頭上的判決，而是刻在你手中的可能性。每一道掌紋，都是你靈魂在時間長河中留下的印記。」*
>
> *— 福青施老師*`;

  const fableStory = `
## 🌿 掌紋的寓言故事

從前，在遙遠的東方山谷中，住著一位名叫明遠的年輕人。他聽說深山中有一位智者，能夠從掌紋中讀出人的命運，於是跋山涉水前往拜訪。

見到智者後，明遠將雙手伸出說：「大師，請告訴我，我的命運如何？」

智者細細端詳，良久後抬起頭說：「你的生命線清晰而有力，說明你有旺盛的生命力；你的智慧線往下彎曲，說明你有豐富的想象力；你的感情線深刻飽滿，說明你善於愛與被愛。」

明遠高興地問：「那我一定會成功、幸福對吧？」

智者微微搖頭：「掌紋只是地圖，而你才是旅人。地圖可以告訴你山在哪裡、河在哪裡，但能不能翻越那座山、能不能渡過那條河，取決於你每一天的選擇與行動。」

明遠沉默了許久，再次看向自己的雙手，忽然明白了一件事：手掌上的每一道紋路，其實都是他過去每一個選擇、每一次行動在皮膚上留下的印記。而未來的掌紋，正在由他今天的決定逐漸刻寫。

他低頭深深鞠躬，輕聲說：「謝謝大師。我明白了，命運在我手中。」

這個故事告訴我們：**手相是生命的地圖，但執筆繪製地圖的人，始終是你自己。**`;

  // Build the complete report
  return `# 🔮 手相解析完整報告

**解析日期：** ${new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" })}
**性別：** ${genderStr}
**分析模式：** ${features.analysisMode === "photo" ? "拍照分析" : "手相復盤"}
**署名：** 福星何大師

---

## 一、手型與五行能量解析

### ${features.handType}${features.secondaryType ? ` × ${features.secondaryType}` : ""} — 主命手型

${handTypeDesc}
${dualTypeNote}

### 手掌能量強度

${palmThicknessDesc}

### 手腕能量根基

${wristLinesDesc}

---

## 二、八大掌丘完整分析

掌丘是手掌上隆起的肉質區域，每一個掌丘對應不同的星體能量，象徵著人格的各個面向。

### 金星丘（感情與生命力）
${mountDescriptions.venus[features.mounts.venus]}

### 木星丘（雄心與領導力）
${mountDescriptions.jupiter[features.mounts.jupiter]}

### 土星丘（責任與紀律）
${mountDescriptions.saturn[features.mounts.saturn]}

### 太陽丘（才華與名望）
${mountDescriptions.sun[features.mounts.sun]}

### 水星丘（智識與溝通）
${mountDescriptions.mercury[features.mounts.mercury]}

### 月丘（想象力與直覺）
${mountDescriptions.moon[features.mounts.moon]}

### 第一火星丘（主動勇氣）
${mountDescriptions.mars1[features.mounts.mars1]}

### 第二火星丘（持久韌性）
${mountDescriptions.mars2[features.mounts.mars2]}

---

## 三、掌線特徵深度解讀

### 生命線 — 生命力與人生節奏
${lifeLineDesc}

### 智慧線 — 思考方式與判斷能力
${headLineDesc}

### 感情線 — 情感模式與人際關係
${heartLineDesc}

### 輔助線分析
${auxiliaryLines || "您的輔助線較不明顯，代表人生走向較為靈活自由，不受單一方向拘束。"}

---

## 四、特殊紋路象徵

${specialMarks.length > 0 ? specialMarks.join("\n\n") : "您的掌中未發現特殊紋路，但這並不代表命運平淡，有時候最清晰純粹的掌紋，反而是最強大的生命力量的體現。"}

---

## 五、性格傾向深度分析
${personalityAnalysis}

---

## 六、人生發展方向
${lifeDirection}

---

## 七、行動建議
${actionAdvice}

---

## 八、啟發金句
${inspirationalQuote}

---
${fableStory}

---

*本報告由 **福星何大師** 掌紋命運觀測站生成，僅供人生探索與自我認識之參考。命運之鑰，始終握在您自己手中。*
`;
}

export interface PalmRecord {
  id: string;
  date: string;
  mode: "photo" | "review";
  features: PalmFeatures;
  report: string;
  photos?: { palm?: string; back?: string; wrist?: string };
  title: string;
}

const STORAGE_KEY = "palm_records";

export function saveRecord(record: Omit<PalmRecord, "id" | "date">): PalmRecord {
  const records = getRecords();
  const newRecord: PalmRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  records.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
}

export function getRecords(): PalmRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getRecord(id: string): PalmRecord | undefined {
  return getRecords().find((r) => r.id === id);
}
