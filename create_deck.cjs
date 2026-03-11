const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "NovaDAO";
pres.title = "NovaDAO — Pitch to Stellar Development Foundation";

// ====== BRAND COLORS ======
const C = {
  bgDark: "050D1A",
  bgCard: "0E1D33",
  bgMedium: "0A1628",
  accent: "0F62FE",
  accentLight: "4589FF",
  accentBright: "78A9FF",
  border: "1A3050",
  white: "FFFFFF",
  textSecondary: "8BA3C7",
  textMuted: "5A7A9E",
  success: "42BE65",
  warning: "F1C21B",
  error: "FA4D56",
};

const cardShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.3 });

// Icon helper: colored circle with a letter
function addIconCircle(slide, x, y, letter, color, size = 0.5) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color, transparency: 75 }, line: { color, width: 1 },
  });
  slide.addText(letter, {
    x, y, w: size, h: size,
    fontSize: size * 20, fontFace: "Calibri", color, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

function addSlideNumber(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 8.8, y: 5.15, w: 1, h: 0.3,
    fontSize: 9, color: C.textMuted, align: "right", fontFace: "Calibri",
  });
}

function addSectionHeader(slide, label) {
  slide.addText(label.toUpperCase(), {
    x: 0.6, y: 0.3, w: 3, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.accentLight,
    charSpacing: 4, bold: true, margin: 0,
  });
}

const TOTAL = 14;

// ================================================
// SLIDE 1: TITLE
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  slide.addShape(pres.shapes.OVAL, {
    x: 3.5, y: 0.5, w: 3, h: 3,
    fill: { color: C.accent, transparency: 88 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 4, y: 1, w: 2, h: 2,
    fill: { color: C.accentLight, transparency: 85 },
  });

  // Starburst using safe unicode
  slide.addText("\u2726", {
    x: 4.2, y: 0.8, w: 1.6, h: 1.6,
    fontSize: 72, color: C.accentLight, align: "center", valign: "middle",
    fontFace: "Arial",
  });

  slide.addText("NovaDAO", {
    x: 1, y: 2.8, w: 8, h: 0.9,
    fontSize: 54, fontFace: "Georgia", color: C.white,
    align: "center", bold: true, margin: 0,
  });

  slide.addText("Market-Governed Organizations on Stellar", {
    x: 1, y: 3.65, w: 8, h: 0.5,
    fontSize: 20, fontFace: "Calibri", color: C.accentLight,
    align: "center", italic: true, margin: 0,
  });

  slide.addText("Pitch to Stellar Development Foundation \u2014 March 2026", {
    x: 1, y: 4.4, w: 8, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: C.textMuted,
    align: "center", margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 5.1, w: 3, h: 0.04,
    fill: { color: C.accent },
  });
}

// ================================================
// SLIDE 2: THE PROBLEM
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "The Problem");
  addSlideNumber(slide, 2, TOTAL);

  slide.addText("Crypto Fundraising\nis Broken", {
    x: 0.6, y: 0.7, w: 5, h: 1.2,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const problems = [
    { letter: "!", color: C.warning, title: "Insider Favoritism", desc: "VCs and insiders get preferential access, leaving retail investors behind" },
    { letter: "\u25BC", color: C.error, title: "Structural Price Pressure", desc: "Low float / high FDV launches create inevitable sell pressure from token unlocks" },
    { letter: "\u2716", color: C.error, title: "Rug Pulls & Fraud", desc: "No accountability mechanisms \u2014 teams can vanish with raised funds" },
    { letter: "Z", color: C.textMuted, title: "Voter Apathy", desc: "Traditional DAO governance sees <5% participation rates on critical proposals" },
  ];

  problems.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 4.5;
    const y = 2.2 + row * 1.55;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.2, h: 1.35,
      fill: { color: C.bgCard },
      line: { color: C.border, width: 1 },
      shadow: cardShadow(),
    });

    addIconCircle(slide, x + 0.15, y + 0.2, p.letter, p.color, 0.45);

    slide.addText(p.title, {
      x: x + 0.75, y: y + 0.15, w: 3.25, h: 0.35,
      fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });

    slide.addText(p.desc, {
      x: x + 0.75, y: y + 0.55, w: 3.25, h: 0.65,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, margin: 0,
    });
  });
}

// ================================================
// SLIDE 3: THE SOLUTION
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "The Solution");
  addSlideNumber(slide, 3, TOTAL);

  slide.addText("NovaDAO", {
    x: 0.6, y: 0.7, w: 5, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  slide.addText("A fundraising and governance platform that uses prediction markets (futarchy) to make better decisions \u2014 built on Stellar.", {
    x: 0.6, y: 1.4, w: 8.5, h: 0.6,
    fontSize: 15, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });

  const pillars = [
    { letter: "\u25C6", color: C.accentLight, title: "Fair Launch ICOs", desc: "Open participation, equal pricing, community-first distribution with rug protection" },
    { letter: "\u2302", color: C.accentLight, title: "Market Governance", desc: "Prediction markets replace voting \u2014 financial incentives ensure better decisions" },
    { letter: "\u2696", color: C.accentLight, title: "Legal Alignment", desc: "IP, treasury, and token minting governed by markets \u2014 teams can't extract value" },
  ];

  pillars.forEach((p, i) => {
    const x = 0.6 + i * 3.1;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.3, w: 2.8, h: 2.7,
      fill: { color: C.bgCard },
      line: { color: C.border, width: 1 },
      shadow: cardShadow(),
    });

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.3, w: 2.8, h: 0.06,
      fill: { color: C.accent },
    });

    addIconCircle(slide, x + 0.95, 2.6, p.letter, p.color, 0.7);

    slide.addText(p.title, {
      x: x + 0.2, y: 3.45, w: 2.4, h: 0.4,
      fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, align: "center", margin: 0,
    });

    slide.addText(p.desc, {
      x: x + 0.2, y: 3.85, w: 2.4, h: 0.9,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, align: "center", margin: 0,
    });
  });
}

// ================================================
// SLIDE 4: HOW IT WORKS — FUNDRAISING
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "How It Works");
  addSlideNumber(slide, 4, TOTAL);

  slide.addText("Fundraising Flow", {
    x: 0.6, y: 0.7, w: 6, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const steps = [
    { num: "01", title: "Raise XLM", desc: "Anyone can participate over 4 days at equal pricing. If the raise doesn't hit minimum, everyone gets refunded automatically.", color: C.accent },
    { num: "02", title: "Spend Responsibly", desc: "Teams receive monthly budgets. Larger expenditures and new token issuance require approval from decision markets.", color: C.accentLight },
    { num: "03", title: "Win Together", desc: "Legal structuring aligns tokenholders and teams. Market oversight over IP and revenue links the business to the token.", color: C.accentBright },
  ];

  steps.forEach((s, i) => {
    const y = 1.7 + i * 1.15;

    slide.addShape(pres.shapes.OVAL, {
      x: 0.8, y: y + 0.1, w: 0.7, h: 0.7,
      fill: { color: s.color },
    });
    slide.addText(s.num, {
      x: 0.8, y: y + 0.1, w: 0.7, h: 0.7,
      fontSize: 16, fontFace: "Calibri", color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    if (i < 2) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 1.13, y: y + 0.8, w: 0.04, h: 0.45,
        fill: { color: C.border },
      });
    }

    slide.addShape(pres.shapes.RECTANGLE, {
      x: 1.8, y, w: 7.6, h: 0.95,
      fill: { color: C.bgCard },
      line: { color: C.border, width: 1 },
    });

    slide.addText(s.title, {
      x: 2.05, y, w: 3, h: 0.4,
      fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });

    slide.addText(s.desc, {
      x: 2.05, y: y + 0.4, w: 7.1, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, margin: 0,
    });
  });
}

// ================================================
// SLIDE 5: HOW IT WORKS — FUTARCHY
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Governance Model");
  addSlideNumber(slide, 5, TOTAL);

  slide.addText("Futarchy: Bet on Beliefs", {
    x: 0.6, y: 0.7, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  slide.addText("For each proposal, two conditional markets are created. Traders put real money behind their predictions.", {
    x: 0.6, y: 1.35, w: 8.5, h: 0.45,
    fontSize: 14, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });

  // PASS market card — moved up
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.0, w: 4.2, h: 2.0,
    fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.0, w: 4.2, h: 0.06, fill: { color: C.success },
  });
  slide.addText("PASS Market", {
    x: 0.9, y: 2.2, w: 3.5, h: 0.35,
    fontSize: 18, fontFace: "Calibri", color: C.success, bold: true, margin: 0,
  });
  slide.addText([
    { text: "Traders buy PASS tokens if they believe the proposal will ", options: { breakLine: false } },
    { text: "increase", options: { bold: true, breakLine: false } },
    { text: " the project's token value.", options: {} },
  ], {
    x: 0.9, y: 2.6, w: 3.6, h: 0.6,
    fontSize: 12, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });
  slide.addText("$1.24", {
    x: 0.9, y: 3.25, w: 2, h: 0.45,
    fontSize: 32, fontFace: "Calibri", color: C.success, bold: true, margin: 0,
  });
  slide.addText("PASS price", {
    x: 0.9, y: 3.65, w: 2, h: 0.25,
    fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0,
  });

  // FAIL market card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.0, w: 4.2, h: 2.0,
    fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.0, w: 4.2, h: 0.06, fill: { color: C.error },
  });
  slide.addText("FAIL Market", {
    x: 5.5, y: 2.2, w: 3.5, h: 0.35,
    fontSize: 18, fontFace: "Calibri", color: C.error, bold: true, margin: 0,
  });
  slide.addText([
    { text: "Traders buy FAIL tokens if they believe the proposal will ", options: { breakLine: false } },
    { text: "decrease", options: { bold: true, breakLine: false } },
    { text: " the project's token value.", options: {} },
  ], {
    x: 5.5, y: 2.6, w: 3.6, h: 0.6,
    fontSize: 12, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });
  slide.addText("$1.08", {
    x: 5.5, y: 3.25, w: 2, h: 0.45,
    fontSize: 32, fontFace: "Calibri", color: C.error, bold: true, margin: 0,
  });
  slide.addText("FAIL price", {
    x: 5.5, y: 3.65, w: 2, h: 0.25,
    fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0,
  });

  // Resolution box — moved up to avoid slide number collision
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.25, w: 8.8, h: 0.65,
    fill: { color: C.accent, transparency: 85 }, line: { color: C.accent, width: 1 },
  });
  slide.addText("If PASS trades 3%+ higher than FAIL (TWAP), the proposal auto-executes. No voter apathy. Pure market signal.", {
    x: 0.9, y: 4.25, w: 8.2, h: 0.65,
    fontSize: 13, fontFace: "Calibri", color: C.accentBright, align: "center", valign: "middle", margin: 0,
  });
}

// ================================================
// SLIDE 6: WHY STELLAR?
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Why Stellar?");
  addSlideNumber(slide, 6, TOTAL);

  slide.addText("Built for Stellar", {
    x: 0.6, y: 0.7, w: 6, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const features = [
    { stat: "5s", label: "Finality", desc: "Transaction confirmation in seconds, not minutes" },
    { stat: "~$0", label: "Fees", desc: "Near-zero fees (~0.00001 XLM) enable frequent trading" },
    { stat: "DEX", label: "Built-in", desc: "Native order book DEX \u2014 perfect for prediction markets" },
    { stat: "SCP", label: "Consensus", desc: "Stellar Consensus Protocol \u2014 energy efficient & secure" },
  ];

  features.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 4.5;
    const y = 1.6 + row * 1.5;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.2, h: 1.3,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
    });

    slide.addText(f.stat, {
      x: x + 0.2, y: y + 0.1, w: 1.2, h: 0.7,
      fontSize: 32, fontFace: "Georgia", color: C.accentLight, bold: true, align: "center", valign: "middle", margin: 0,
    });

    slide.addText(f.label, {
      x: x + 1.5, y: y + 0.1, w: 2.5, h: 0.3,
      fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });

    slide.addText(f.desc, {
      x: x + 1.5, y: y + 0.45, w: 2.5, h: 0.65,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, margin: 0,
    });
  });

  // Soroban callout — moved up
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.5,
    fill: { color: C.accent, transparency: 88 }, line: { color: C.accent, width: 1 },
  });
  slide.addText("Powered by Soroban smart contracts \u2014 Stellar's Rust-based VM for complex on-chain logic", {
    x: 0.9, y: 4.45, w: 8.2, h: 0.5,
    fontSize: 12, fontFace: "Calibri", color: C.accentBright, align: "center", valign: "middle", margin: 0,
  });
}

// ================================================
// SLIDE 7: MARKET OPPORTUNITY
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Market Opportunity");
  addSlideNumber(slide, 7, TOTAL);

  slide.addText("Massive TAM", {
    x: 0.6, y: 0.7, w: 6, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const stats = [
    { value: "$24B+", label: "DAO Treasury\nAssets (2025)" },
    { value: "$55B+", label: "Prediction Market\nVolume (2025)" },
    { value: "300+", label: "DAOs on Stellar\nEcosystem" },
  ];

  stats.forEach((s, i) => {
    const x = 0.6 + i * 3.1;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.8, h: 1.4,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
    });
    slide.addText(s.value, {
      x, y: 1.7, w: 2.8, h: 0.65,
      fontSize: 34, fontFace: "Georgia", color: C.accentLight, bold: true, align: "center", margin: 0,
    });
    slide.addText(s.label, {
      x, y: 2.35, w: 2.8, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, align: "center", margin: 0,
    });
  });

  slide.addText("Solana vs Stellar Ecosystem", {
    x: 0.6, y: 3.25, w: 6, h: 0.35,
    fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
  });

  const compData = [
    [
      { text: "", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true } },
      { text: "Solana", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true, align: "center" } },
      { text: "Stellar", options: { fill: { color: C.bgMedium }, color: C.accentLight, bold: true, align: "center" } },
    ],
    [
      { text: "Futarchy Platform", options: { color: C.textSecondary } },
      { text: "MetaDAO ($33M+)", options: { color: C.textSecondary, align: "center" } },
      { text: "NovaDAO (First!)", options: { color: C.success, bold: true, align: "center" } },
    ],
    [
      { text: "Avg. Tx Fee", options: { color: C.textSecondary } },
      { text: "$0.02 - $0.05", options: { color: C.textSecondary, align: "center" } },
      { text: "$0.000001", options: { color: C.success, bold: true, align: "center" } },
    ],
    [
      { text: "Settlement Time", options: { color: C.textSecondary } },
      { text: "~400ms", options: { color: C.textSecondary, align: "center" } },
      { text: "~5 seconds", options: { color: C.textSecondary, align: "center" } },
    ],
  ];

  slide.addTable(compData, {
    x: 0.6, y: 3.7, w: 8.8, h: 1.3,
    fontSize: 11, fontFace: "Calibri",
    border: { pt: 1, color: C.border },
    fill: { color: C.bgCard },
    colW: [2.5, 3.15, 3.15],
    rowH: [0.32, 0.32, 0.32, 0.32],
  });
}

// ================================================
// SLIDE 8: TRACTION
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Traction");
  addSlideNumber(slide, 8, TOTAL);

  slide.addText("Validated by MetaDAO", {
    x: 0.6, y: 0.7, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  slide.addText("MetaDAO on Solana has proven futarchy governance works. We bring this model to Stellar.", {
    x: 0.6, y: 1.35, w: 8.5, h: 0.45,
    fontSize: 14, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });

  const metaStats = [
    { value: "$33M+", label: "Total Raised" },
    { value: "10", label: "Projects Launched" },
    { value: "100+", label: "Proposals Resolved" },
    { value: "2023", label: "Live Since" },
  ];

  metaStats.forEach((s, i) => {
    const x = 0.6 + i * 2.3;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.0, w: 2.05, h: 1.2,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 },
    });
    slide.addText(s.value, {
      x, y: 2.1, w: 2.05, h: 0.55,
      fontSize: 26, fontFace: "Georgia", color: C.accentLight, bold: true, align: "center", margin: 0,
    });
    slide.addText(s.label, {
      x, y: 2.65, w: 2.05, h: 0.35,
      fontSize: 11, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0,
    });
  });

  slide.addText("NovaDAO Status", {
    x: 0.6, y: 3.5, w: 4, h: 0.35,
    fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
  });

  const milestones = [
    { text: "Platform design & architecture complete", status: "Done" },
    { text: "Soroban smart contract development", status: "In Progress" },
    { text: "Community building \u2014 2,500+ early waitlist", status: "Active" },
    { text: "3 founding projects in pipeline", status: "Confirmed" },
  ];

  milestones.forEach((m, i) => {
    const y = 3.95 + i * 0.32;
    slide.addText("\u25CF", {
      x: 0.6, y, w: 0.3, h: 0.28,
      fontSize: 8, color: m.status === "Done" ? C.success : C.accentLight, align: "center", valign: "middle",
    });
    slide.addText(m.text, {
      x: 0.9, y, w: 5.8, h: 0.28,
      fontSize: 12, fontFace: "Calibri", color: C.textSecondary, valign: "middle", margin: 0,
    });
    slide.addText(m.status, {
      x: 6.8, y, w: 1.8, h: 0.28,
      fontSize: 11, fontFace: "Calibri", color: m.status === "Done" ? C.success : C.accentLight,
      bold: true, align: "right", valign: "middle", margin: 0,
    });
  });
}

// ================================================
// SLIDE 9: REVENUE MODEL
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Revenue Model");
  addSlideNumber(slide, 9, TOTAL);

  slide.addText("Sustainable Revenue", {
    x: 0.6, y: 0.7, w: 6, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const revenues = [
    { pct: "2-3%", title: "Platform Fee on Raises", desc: "Percentage of funds raised through NovaDAO ICOs goes to the platform treasury", letter: "$" },
    { pct: "0.5%", title: "Trading Fees", desc: "Small fee on every decision market trade \u2014 conditional PASS/FAIL token swaps", letter: "\u25B2" },
    { pct: "SaaS", title: "Futarchy-as-a-Service", desc: "White-label futarchy governance for other Stellar DAOs and protocols", letter: "\u2699" },
  ];

  revenues.forEach((r, i) => {
    const y = 1.6 + i * 1.1;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y, w: 8.8, h: 0.9,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
    });

    addIconCircle(slide, x = 0.8, y + 0.15, r.letter, C.accentLight, 0.6);

    slide.addText(r.pct, {
      x: 1.6, y: y + 0.05, w: 1.2, h: 0.45,
      fontSize: 24, fontFace: "Georgia", color: C.accentLight, bold: true, valign: "middle", margin: 0,
    });

    slide.addText(r.title, {
      x: 3, y: y + 0.05, w: 3, h: 0.3,
      fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });

    slide.addText(r.desc, {
      x: 3, y: y + 0.4, w: 6, h: 0.4,
      fontSize: 11, fontFace: "Calibri", color: C.textSecondary, margin: 0,
    });
  });

  // Projection — moved up to avoid collision
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.55, w: 8.8, h: 0.5,
    fill: { color: C.accent, transparency: 88 }, line: { color: C.accent, width: 1 },
  });
  slide.addText("Projected Year 1 Revenue: $800K\u2013$1.5M (based on $30M+ platform volume)", {
    x: 0.9, y: 4.55, w: 8.2, h: 0.5,
    fontSize: 13, fontFace: "Calibri", color: C.accentBright, align: "center", valign: "middle", bold: true, margin: 0,
  });
}

// ================================================
// SLIDE 10: COMPETITIVE LANDSCAPE
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Competitive Landscape");
  addSlideNumber(slide, 10, TOTAL);

  slide.addText("First Mover on Stellar", {
    x: 0.6, y: 0.7, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const tableData = [
    [
      { text: "Feature", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true, fontSize: 12 } },
      { text: "NovaDAO", options: { fill: { color: C.accent, transparency: 70 }, color: C.white, bold: true, fontSize: 12, align: "center" } },
      { text: "MetaDAO", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true, fontSize: 12, align: "center" } },
      { text: "Snapshot", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true, fontSize: 12, align: "center" } },
      { text: "Aragon", options: { fill: { color: C.bgMedium }, color: C.textMuted, bold: true, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Chain", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "Stellar", options: { color: C.accentLight, bold: true, fontSize: 12, align: "center" } },
      { text: "Solana", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "Multi-chain", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "Ethereum", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Futarchy", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "\u2713 Yes", options: { color: C.success, bold: true, fontSize: 12, align: "center" } },
      { text: "\u2713 Yes", options: { color: C.success, fontSize: 12, align: "center" } },
      { text: "\u2717 No", options: { color: C.error, fontSize: 12, align: "center" } },
      { text: "\u2717 No", options: { color: C.error, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Fundraising", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "\u2713 Yes", options: { color: C.success, bold: true, fontSize: 12, align: "center" } },
      { text: "\u2713 Yes", options: { color: C.success, fontSize: 12, align: "center" } },
      { text: "\u2717 No", options: { color: C.error, fontSize: 12, align: "center" } },
      { text: "\u2713 Yes", options: { color: C.success, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Tx Fees", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "~$0", options: { color: C.success, bold: true, fontSize: 12, align: "center" } },
      { text: "$0.02+", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "Free (off-chain)", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "$2-10+", options: { color: C.error, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Settlement", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "5 seconds", options: { color: C.success, bold: true, fontSize: 12, align: "center" } },
      { text: "400ms", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "Off-chain", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "12+ seconds", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
    ],
    [
      { text: "Native DEX", options: { color: C.textSecondary, fontSize: 12 } },
      { text: "\u2713 Yes", options: { color: C.success, bold: true, fontSize: 12, align: "center" } },
      { text: "No (Openbook)", options: { color: C.textSecondary, fontSize: 12, align: "center" } },
      { text: "N/A", options: { color: C.textMuted, fontSize: 12, align: "center" } },
      { text: "\u2717 No", options: { color: C.error, fontSize: 12, align: "center" } },
    ],
  ];

  slide.addTable(tableData, {
    x: 0.6, y: 1.6, w: 8.8, h: 3.5,
    border: { pt: 1, color: C.border },
    fill: { color: C.bgCard },
    colW: [1.6, 1.8, 1.8, 1.8, 1.8],
    rowH: [0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
    fontSize: 12, fontFace: "Calibri",
  });
}

// ================================================
// SLIDE 11: ROADMAP
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Roadmap");
  addSlideNumber(slide, 11, TOTAL);

  slide.addText("Execution Plan", {
    x: 0.6, y: 0.7, w: 6, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.55, w: 8.8, h: 0.04,
    fill: { color: C.accent },
  });

  const phases = [
    { period: "Q2 2026", title: "Foundation", items: ["Soroban contracts audit", "MVP launch", "First test raise"], color: C.accent },
    { period: "Q3 2026", title: "Growth", items: ["Public platform launch", "3 founding projects", "Decision market V2"], color: C.accentLight },
    { period: "Q4 2026", title: "Scale", items: ["FaaS rollout", "10+ projects live", "Institutional partners"], color: C.accentBright },
    { period: "2027", title: "Expand", items: ["Cross-chain bridges", "Mobile app", "Global anchors"], color: C.white },
  ];

  phases.forEach((p, i) => {
    const x = 0.6 + i * 2.3;

    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.8, y: 2.4, w: 0.3, h: 0.3,
      fill: { color: p.color },
    });

    slide.addText(p.period, {
      x, y: 1.85, w: 2.05, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: p.color, bold: true, align: "center", margin: 0,
    });

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.9, w: 2.05, h: 2.1,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 },
    });

    slide.addText(p.title, {
      x: x + 0.15, y: 3.0, w: 1.75, h: 0.35,
      fontSize: 15, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });

    const bulletText = p.items.map((item, idx) => ({
      text: item,
      options: { bullet: true, breakLine: idx < p.items.length - 1, fontSize: 11, color: C.textSecondary },
    }));

    slide.addText(bulletText, {
      x: x + 0.15, y: 3.4, w: 1.75, h: 1.4,
      fontFace: "Calibri", margin: 0, paraSpaceAfter: 4,
    });
  });
}

// ================================================
// SLIDE 12: TEAM
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "Team");
  addSlideNumber(slide, 12, TOTAL);

  slide.addText("The Team Behind NovaDAO", {
    x: 0.6, y: 0.7, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  const team = [
    { role: "CEO & Founder", name: "[Your Name]", bg: "Ex-DeFi Protocol Lead\n8+ years in blockchain", initials: "CEO" },
    { role: "CTO", name: "[CTO Name]", bg: "Soroban Core Contributor\nEx-Stellar Core Team", initials: "CTO" },
    { role: "Head of Research", name: "[Research Lead]", bg: "Futarchy & Governance Expert\nPhD Economics", initials: "R&D" },
    { role: "BD Lead", name: "[BD Name]", bg: "Stellar Ecosystem Partnerships\nEx-SDF Programs", initials: "BD" },
  ];

  team.forEach((t, i) => {
    const x = 0.6 + i * 2.3;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.7, w: 2.05, h: 3.0,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
    });

    // Avatar circle with initials
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.55, y: 1.95, w: 0.95, h: 0.95,
      fill: { color: C.accent, transparency: 60 }, line: { color: C.accentLight, width: 1 },
    });
    slide.addText(t.initials, {
      x: x + 0.55, y: 1.95, w: 0.95, h: 0.95,
      fontSize: 16, fontFace: "Calibri", color: C.accentLight, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    slide.addText(t.name, {
      x: x + 0.15, y: 3.1, w: 1.75, h: 0.3,
      fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, align: "center", margin: 0,
    });

    slide.addText(t.role, {
      x: x + 0.15, y: 3.4, w: 1.75, h: 0.25,
      fontSize: 11, fontFace: "Calibri", color: C.accentLight, align: "center", margin: 0,
    });

    slide.addText(t.bg, {
      x: x + 0.15, y: 3.7, w: 1.75, h: 0.8,
      fontSize: 10, fontFace: "Calibri", color: C.textSecondary, align: "center", margin: 0,
    });
  });
}

// ================================================
// SLIDE 13: THE ASK
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };
  addSectionHeader(slide, "The Ask");
  addSlideNumber(slide, 13, TOTAL);

  slide.addText("Partnership with SDF", {
    x: 0.6, y: 0.7, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  slide.addText("$500K", {
    x: 0.6, y: 1.6, w: 4, h: 1,
    fontSize: 64, fontFace: "Georgia", color: C.accentLight, bold: true, margin: 0,
  });
  slide.addText("Grant Request", {
    x: 0.6, y: 2.6, w: 4, h: 0.35,
    fontSize: 16, fontFace: "Calibri", color: C.textSecondary, margin: 0,
  });

  const asks = [
    { letter: "$", title: "Development Grant", desc: "$500K to fund 12 months of smart contract development, audits, and team expansion" },
    { letter: "\u25CF", title: "Ecosystem Support", desc: "Featured listing on Stellar ecosystem page and co-marketing with SDF channels" },
    { letter: "\u2194", title: "Technical Partnership", desc: "Direct access to Soroban team for integration support and protocol optimization" },
    { letter: "\u25B6", title: "Launch Support", desc: "Joint announcement, event sponsorship, and introductions to Stellar anchors" },
  ];

  asks.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 5 + col * 2.3;
    const y = 1.6 + row * 1.7;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.05, h: 1.5,
      fill: { color: C.bgCard }, line: { color: C.border, width: 1 }, shadow: cardShadow(),
    });

    addIconCircle(slide, x + 0.7, y + 0.1, a.letter, C.accentLight, 0.55);

    slide.addText(a.title, {
      x: x + 0.1, y: y + 0.65, w: 1.85, h: 0.25,
      fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, align: "center", margin: 0,
    });

    slide.addText(a.desc, {
      x: x + 0.1, y: y + 0.9, w: 1.85, h: 0.55,
      fontSize: 9, fontFace: "Calibri", color: C.textSecondary, align: "center", margin: 0,
    });
  });
}

// ================================================
// SLIDE 14: THANK YOU
// ================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  slide.addShape(pres.shapes.OVAL, {
    x: 3.5, y: 0.8, w: 3, h: 3,
    fill: { color: C.accent, transparency: 88 },
  });

  slide.addText("\u2726", {
    x: 4.2, y: 1.0, w: 1.6, h: 1.6,
    fontSize: 60, color: C.accentLight, align: "center", valign: "middle", fontFace: "Arial",
  });

  slide.addText("Thank You", {
    x: 1, y: 2.5, w: 8, h: 0.8,
    fontSize: 48, fontFace: "Georgia", color: C.white, bold: true, align: "center", margin: 0,
  });

  slide.addText("Let's build the future of decentralized governance on Stellar.", {
    x: 1, y: 3.3, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Calibri", color: C.textSecondary, italic: true, align: "center", margin: 0,
  });

  // Contact info — no emojis, use labels
  const contacts = [
    { label: "WEB", text: "novadao.xyz" },
    { label: "X", text: "@NovaDAO_xyz" },
    { label: "TG", text: "t.me/novadao" },
    { label: "EMAIL", text: "hello@novadao.xyz" },
  ];

  contacts.forEach((c, i) => {
    const x = 1.2 + i * 2;
    slide.addText(c.label, {
      x, y: 4.1, w: 1.8, h: 0.2,
      fontSize: 8, fontFace: "Calibri", color: C.textMuted, align: "center", charSpacing: 3, bold: true, margin: 0,
    });
    slide.addText(c.text, {
      x, y: 4.3, w: 1.8, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: C.accentLight, align: "center", valign: "middle", margin: 0,
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.9, w: 3, h: 0.04,
    fill: { color: C.accent },
  });

  slide.addText("NovaDAO \u2014 March 2026", {
    x: 1, y: 5.0, w: 8, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.textMuted, align: "center", margin: 0,
  });
}

// ================================================
// SAVE
// ================================================
pres.writeFile({ fileName: "/Users/hk/remotion/lustelldao/NovaDAO_Pitch_Deck.pptx" })
  .then(() => console.log("Deck saved successfully!"))
  .catch(err => console.error("Error:", err));
