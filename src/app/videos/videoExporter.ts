export type ExportableSpeaker = {
  id: string;
  name: string;
  role: string;
  badgeLabel: string;
  sessionNumber: string;
  trackTitle: string;
  talkTitle: string;
  timeSlot: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  glowRgba: string;
  borderRgba: string;
  badgeBgRgba: string;
};

/**
 * Physically accurate damped harmonic oscillator spring (0 -> 1)
 */
function evalSpring(
  tSeconds: number,
  mass = 1,
  stiffness = 180,
  damping = 18
): number {
  if (tSeconds <= 0) return 0;
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const env = Math.exp(-zeta * omega0 * tSeconds);
    const val =
      1 -
      env *
        (Math.cos(omegaD * tSeconds) +
          ((zeta * omega0) / omegaD) * Math.sin(omegaD * tSeconds));
    return Math.max(0, Math.min(1.08, val));
  }
  const env = Math.exp(-omega0 * tSeconds);
  return Math.max(0, Math.min(1, 1 - env * (1 + omega0 * tSeconds)));
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  zoom = 1
) {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let drawW = w;
  let drawH = h;
  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = h * imgRatio;
  } else {
    drawW = w;
    drawH = w / imgRatio;
  }
  drawW *= zoom;
  drawH *= zoom;
  const drawX = x + (w - drawW) / 2;
  const drawY = y; // top-aligned portrait
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Renders a single frame of the Speaker Spotlight (either 16:9 1920x1080 or 9:16 1080x1920)
 */
export function renderSpeakerFrameToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tSec: number,
  speaker: ExportableSpeaker,
  portraitImg: HTMLImageElement,
  logoImg: HTMLImageElement | null
) {
  const is16x9 = width > height;

  // 1. Base Obsidian Canvas
  ctx.fillStyle = "#09090B";
  ctx.fillRect(0, 0, width, height);

  // 2. Track Radial Glow
  const glowGrad = ctx.createRadialGradient(
    is16x9 ? width * 0.3 : width * 0.5,
    is16x9 ? height * 0.5 : height * 0.34,
    20,
    is16x9 ? width * 0.3 : width * 0.5,
    is16x9 ? height * 0.5 : height * 0.34,
    is16x9 ? width * 0.65 : height * 0.55
  );
  glowGrad.addColorStop(0, speaker.glowRgba);
  glowGrad.addColorStop(1, "rgba(9, 9, 11, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Matrix Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
  ctx.lineWidth = 1;
  const gridStep = 64;
  for (let gx = 0; gx < width; gx += gridStep) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < height; gy += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }

  // 4. Giant Watermark
  ctx.save();
  ctx.font = `900 ${is16x9 ? 160 : 96}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
  ctx.fillText(
    "AI FOR EVERY SECTOR",
    is16x9 ? 120 - tSec * 12 : 60 - tSec * 8,
    height - (is16x9 ? 70 : 100)
  );
  ctx.restore();

  // Safe zone margins
  const padX = is16x9 ? 96 : 80;
  const padY = is16x9 ? 68 : 135;

  // Top Header Bar
  const headerS = clamp01(evalSpring(tSec - 0.05, 0.8, 220, 22));
  ctx.save();
  ctx.globalAlpha = headerS;

  if (logoImg) {
    const logoH = is16x9 ? 52 : 54;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.filter = "brightness(0) invert(1)";
    ctx.drawImage(logoImg, padX, padY, logoW, logoH);
    ctx.filter = "none";
  } else {
    ctx.font = "900 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#FAFAFA";
    ctx.fillText("JOS TECHFEST 2026", padX, padY + 38);
  }

  if (is16x9) {
    ctx.font = "800 21px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("AI FOR EVERY SECTOR · 26 NOV 2026", padX + 210, padY + 34);
  }

  // Top-Right Track Badge
  ctx.font = `800 ${is16x9 ? 20 : 21}px Inter, system-ui, sans-serif`;
  const badgeText = speaker.badgeLabel;
  const badgeTextW = ctx.measureText(badgeText).width;
  const badgeW = badgeTextW + 64;
  const badgeH = 48;
  const badgeX = width - padX - badgeW;
  const badgeY = padY + 2;

  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 24);
  ctx.fillStyle = speaker.badgeBgRgba;
  ctx.fill();
  ctx.strokeStyle = speaker.borderRgba;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(badgeX + 24, badgeY + badgeH / 2, 6, 0, Math.PI * 2);
  ctx.fillStyle = speaker.secondaryColor;
  ctx.fill();

  ctx.fillStyle = "#FAFAFA";
  ctx.fillText(badgeText, badgeX + 40, badgeY + 31);
  ctx.restore();

  // Portrait Card Entrance
  const portS = evalSpring(tSec - 0.12, 1.1, 150, 20);
  const portAlpha = clamp01(portS * 1.4);
  const portScale = lerp(0.86, 1, portS);
  const imgZoom = lerp(1.07, 1.0, clamp01(tSec / 8));

  const portX = padX;
  const portY = is16x9 ? padY + 92 : padY + 86;
  const portW = is16x9 ? 520 : width - padX * 2;
  const portH = is16x9 ? 690 : 660;

  ctx.save();
  ctx.globalAlpha = portAlpha;
  const cx = portX + portW / 2;
  const cy = portY + portH / 2;
  ctx.translate(cx, cy);
  ctx.scale(portScale, portScale);
  ctx.translate(-cx, -cy);

  // Outer Frame
  drawRoundedRect(ctx, portX, portY, portW, portH, 36);
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fill();
  ctx.strokeStyle = speaker.borderRgba;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Clipped Portrait Image
  const innerPad = 10;
  ctx.save();
  drawRoundedRect(
    ctx,
    portX + innerPad,
    portY + innerPad,
    portW - innerPad * 2,
    portH - innerPad * 2,
    28
  );
  ctx.clip();
  ctx.fillStyle = "#10211A";
  ctx.fillRect(portX, portY, portW, portH);
  drawCoverImage(
    ctx,
    portraitImg,
    portX + innerPad,
    portY + innerPad,
    portW - innerPad * 2,
    portH - innerPad * 2,
    imgZoom
  );

  // Bottom Vignette inside Portrait
  const vigGrad = ctx.createLinearGradient(
    0,
    portY + portH * 0.55,
    0,
    portY + portH
  );
  vigGrad.addColorStop(0, "rgba(9, 9, 11, 0)");
  vigGrad.addColorStop(1, "rgba(9, 9, 11, 0.92)");
  ctx.fillStyle = vigGrad;
  ctx.fillRect(portX, portY + portH * 0.55, portW, portH * 0.45);

  // Live Stage Bar + Animated EQ Bars inside Portrait
  const eqBoxX = portX + 28;
  const eqBoxY = portY + portH - 78;
  const eqBoxW = portW - 56;
  const eqBoxH = 52;
  drawRoundedRect(ctx, eqBoxX, eqBoxY, eqBoxW, eqBoxH, 16);
  ctx.fillStyle = "rgba(9, 9, 11, 0.82)";
  ctx.fill();
  ctx.strokeStyle = speaker.borderRgba;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = "800 18px Inter, system-ui, sans-serif";
  ctx.fillStyle = speaker.secondaryColor;
  const stageTag =
    speaker.sessionNumber === "HOST"
      ? "LIVE ON STAGE · HOST"
      : `TRACK ${speaker.sessionNumber} · SPEAKER`;
  ctx.fillText(stageTag, eqBoxX + 20, eqBoxY + 32);

  // 5 EQ bars
  for (let b = 0; b < 5; b++) {
    const wave = Math.sin(tSec * 10 + b * 1.3);
    const bh = lerp(8, 26, (wave + 1) / 2);
    const bx = eqBoxX + eqBoxW - 68 + b * 10;
    const by = eqBoxY + 38 - bh;
    drawRoundedRect(ctx, bx, by, 5, bh, 2.5);
    ctx.fillStyle = speaker.secondaryColor;
    ctx.fill();
  }

  ctx.restore();
  ctx.restore();

  // Typography & Session Talk Card Section
  const infoX = is16x9 ? portX + portW + 72 : padX;
  const infoW = is16x9 ? width - infoX - padX : width - padX * 2;
  let cursorY = is16x9 ? portY + 46 : portY + portH + 44;

  // Role Pill
  const roleS = clamp01(evalSpring(tSec - 0.25, 0.8, 220, 22));
  ctx.save();
  ctx.globalAlpha = roleS;
  ctx.font = "700 22px Inter, system-ui, sans-serif";
  const roleW = ctx.measureText(speaker.role).width + 44;
  drawRoundedRect(ctx, infoX, cursorY, roleW, 44, 22);
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = speaker.secondaryColor;
  ctx.fillText(speaker.role, infoX + 22, cursorY + 29);
  ctx.restore();

  cursorY += is16x9 ? 118 : 104;

  // Kinetic Word-by-Word Speaker Name
  const nameFontSize = is16x9 ? 82 : 70;
  ctx.font = `900 ${nameFontSize}px Inter, system-ui, sans-serif`;
  const words = speaker.name.split(" ");
  let wordX = infoX;
  const lineH = nameFontSize * 1.08;

  words.forEach((word, idx) => {
    const wMetrics = ctx.measureText(word + " ");
    if (wordX + wMetrics.width > infoX + infoW && wordX > infoX) {
      wordX = infoX;
      cursorY += lineH;
    }
    const wSpring = evalSpring(tSec - (0.34 + idx * 0.09), 1.0, 180, 16);
    const wAlpha = clamp01(wSpring * 1.4);
    const wOffsetY = lerp(42, 0, wSpring);
    const isLast = idx === words.length - 1;

    ctx.save();
    ctx.globalAlpha = wAlpha;
    ctx.fillStyle = isLast ? speaker.secondaryColor : "#FAFAFA";
    ctx.fillText(word, wordX, cursorY + wOffsetY);
    ctx.restore();

    wordX += wMetrics.width;
  });

  cursorY += is16x9 ? 54 : 44;

  // Session & Talk Glassmorphic Card
  const cardS = evalSpring(tSec - 0.65, 1.1, 150, 20);
  const cardAlpha = clamp01(cardS * 1.4);
  const cardOffsetY = lerp(36, 0, cardS);
  const cardY = cursorY + cardOffsetY;

  ctx.font = `800 ${is16x9 ? 36 : 31}px Inter, system-ui, sans-serif`;
  const talkLines = wrapTextLines(ctx, `“${speaker.talkTitle}”`, infoW - 72);
  const cardH = is16x9 ? 115 + talkLines.length * 46 : 105 + talkLines.length * 40;

  ctx.save();
  ctx.globalAlpha = cardAlpha;
  drawRoundedRect(ctx, infoX, cardY, infoW, cardH, 28);
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fill();
  ctx.strokeStyle = speaker.borderRgba;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Shimmer Sweep across Card
  const shimmerS = clamp01((tSec - 2.0) / 1.1);
  if (shimmerS > 0 && shimmerS < 1) {
    ctx.save();
    drawRoundedRect(ctx, infoX, cardY, infoW, cardH, 28);
    ctx.clip();
    const sx = lerp(infoX - 240, infoX + infoW + 240, shimmerS);
    const shimGrad = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0);
    shimGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    shimGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.18)");
    shimGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = shimGrad;
    ctx.fillRect(infoX, cardY, infoW, cardH);
    ctx.restore();
  }

  // Track Header & Time inside Card
  ctx.font = "800 21px Inter, system-ui, sans-serif";
  ctx.fillStyle = speaker.secondaryColor;
  ctx.fillText(speaker.trackTitle.toUpperCase(), infoX + 34, cardY + 46);

  ctx.font = "700 21px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#D4D4D8";
  const timeW = ctx.measureText(speaker.timeSlot).width;
  ctx.fillText(speaker.timeSlot, infoX + infoW - 34 - timeW, cardY + 46);

  // Talk Title Lines
  ctx.font = `800 ${is16x9 ? 35 : 30}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#FAFAFA";
  talkLines.forEach((line, lIdx) => {
    ctx.fillText(
      line,
      infoX + 34,
      cardY + 98 + lIdx * (is16x9 ? 44 : 38)
    );
  });
  ctx.restore();

  // Bottom Footer CTA Bar
  const footS = clamp01(evalSpring(tSec - 0.85, 0.8, 220, 22));
  ctx.save();
  ctx.globalAlpha = footS;
  if (is16x9) {
    const footY = cardY + cardH + 54;
    ctx.font = "700 24px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#A1A1AA";
    ctx.fillText("Sarau Event Center, Jos  •", infoX, footY);
    ctx.font = "800 24px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("register.techfest.com.ng", infoX + 315, footY);

    ctx.fillStyle = "#FAFAFA";
    const hashW = ctx.measureText("#JosTechFest").width;
    ctx.fillText("#JosTechFest", infoX + infoW - hashW, footY);
  } else {
    const pillY = height - padY - 88;
    drawRoundedRect(ctx, padX, pillY, infoW, 88, 44);
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(52, 211, 153, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "800 19px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("AI FOR EVERY SECTOR · 26 NOV 2026", padX + 34, pillY + 36);

    ctx.font = "900 26px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#FAFAFA";
    ctx.fillText("register.techfest.com.ng", padX + 34, pillY + 68);

    // JOS 2026 Badge
    drawRoundedRect(ctx, padX + infoW - 168, pillY + 20, 138, 48, 24);
    ctx.fillStyle = "#10B981";
    ctx.fill();
    ctx.font = "900 21px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#052E16";
    ctx.fillText("JOS 2026", padX + infoW - 146, pillY + 52);
  }
  ctx.restore();
}

/**
 * Exports an high-resolution PNG poster still (1920x1080 or 1080x1920)
 */
export async function downloadSpeakerPosterPng(
  speaker: ExportableSpeaker,
  aspect: "16:9" | "9:16"
): Promise<void> {
  const width = aspect === "16:9" ? 1920 : 1080;
  const height = aspect === "16:9" ? 1080 : 1920;

  const [portraitImg, logoImg] = await Promise.all([
    loadImage(speaker.image),
    loadImage("/logo.png").catch(() => null),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Render settled hero state at t = 3.5s
  renderSpeakerFrameToCanvas(
    ctx,
    width,
    height,
    3.5,
    speaker,
    portraitImg,
    logoImg
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 1)
  );
  if (!blob) return;

  const safeSlug = speaker.name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeSlug}-${aspect === "16:9" ? "LED-16x9" : "Social-9x16"}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Records and downloads an 8-second (or 6-second fast) animated video file (.mp4 or .webm)
 * directly in the browser using Canvas + MediaRecorder.
 */
export async function downloadSpeakerVideoFile(
  speaker: ExportableSpeaker,
  aspect: "16:9" | "9:16",
  onProgress?: (percent: number) => void
): Promise<void> {
  const width = aspect === "16:9" ? 1920 : 1080;
  const height = aspect === "16:9" ? 1080 : 1920;
  const durationSec = 6; // 6-second crisp walk-on & social bumper

  const [portraitImg, logoImg] = await Promise.all([
    loadImage(speaker.image),
    loadImage("/logo.png").catch(() => null),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Choose MP4 (H.264) when supported by browser, otherwise high-bitrate WebM
  const mimeCandidates = [
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  const selectedMime =
    mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";
  const ext = selectedMime.includes("mp4") ? "mp4" : "webm";

  const stream = canvas.captureStream(60);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 12_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const finishedPromise = new Promise<Blob>((resolve) => {
    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: selectedMime }));
    };
  });

  recorder.start(100);

  const startTime = performance.now();
  await new Promise<void>((resolve) => {
    function step(now: number) {
      const elapsedSec = (now - startTime) / 1000;
      const pct = Math.min(100, Math.round((elapsedSec / durationSec) * 100));
      onProgress?.(pct);

      renderSpeakerFrameToCanvas(
        ctx!,
        width,
        height,
        elapsedSec,
        speaker,
        portraitImg,
        logoImg
      );

      if (elapsedSec < durationSec) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });

  recorder.stop();
  const videoBlob = await finishedPromise;
  onProgress?.(100);

  const safeSlug = speaker.name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = URL.createObjectURL(videoBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeSlug}-${aspect === "16:9" ? "LED-16x9" : "Social-9x16"}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Records and downloads the 15-second "AI for every sector." Event Promo Video
 */
export async function downloadPromoVideoFile(
  speakers: ExportableSpeaker[],
  onProgress?: (percent: number) => void
): Promise<void> {
  const width = 1080;
  const height = 1920;
  const durationSec = 9; // 9-second punchy 3-scene promo (3s per scene)

  const [logoImg, ...portraitImgs] = await Promise.all([
    loadImage("/logo.png").catch(() => null),
    ...speakers.slice(0, 6).map((s) => loadImage(s.image)),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const mimeCandidates = [
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  const selectedMime =
    mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";
  const ext = selectedMime.includes("mp4") ? "mp4" : "webm";

  const stream = canvas.captureStream(60);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 12_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  const finishedPromise = new Promise<Blob>((resolve) => {
    recorder.onstop = () => resolve(new Blob(chunks, { type: selectedMime }));
  });

  recorder.start(100);
  const startTime = performance.now();

  const tracks = [
    { num: "01", title: "AI x Education", time: "09:30 – 11:00 WAT", color: "#60A5FA", border: "rgba(96, 165, 250, 0.5)" },
    { num: "02", title: "AI x Business", time: "11:15 – 12:45 WAT", color: "#34D399", border: "rgba(52, 211, 153, 0.5)" },
    { num: "03", title: "AI x Creatives", time: "13:45 – 15:15 WAT", color: "#818CF8", border: "rgba(129, 140, 248, 0.5)" },
    { num: "04", title: "Startup Ecosystem & Policy", time: "15:30 – 17:00 WAT", color: "#FBBF24", border: "rgba(251, 191, 36, 0.5)" },
  ];

  await new Promise<void>((resolve) => {
    function step(now: number) {
      const elapsed = (now - startTime) / 1000;
      onProgress?.(Math.min(100, Math.round((elapsed / durationSec) * 100)));

      ctx!.fillStyle = "#09090B";
      ctx!.fillRect(0, 0, width, height);

      const glow = ctx!.createRadialGradient(540, 480, 20, 540, 480, 900);
      glow.addColorStop(0, "rgba(16, 185, 129, 0.28)");
      glow.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      if (logoImg) {
        const lh = 56;
        const lw = (logoImg.width / logoImg.height) * lh;
        ctx!.filter = "brightness(0) invert(1)";
        ctx!.drawImage(logoImg, 80, 140, lw, lh);
        ctx!.filter = "none";
      }

      if (elapsed < 3) {
        // Scene 1: Hook ("AI for every sector.")
        const s1 = evalSpring(elapsed - 0.1, 1.0, 180, 16);
        ctx!.save();
        ctx!.globalAlpha = clamp01(s1 * 1.4);
        ctx!.font = "800 28px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#60A5FA";
        ctx!.fillText("JOS TECHFEST 2026 · 26 NOV 2026", 80, 580);

        ctx!.font = "900 104px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#FAFAFA";
        ctx!.fillText("AI for", 80, 710 + lerp(40, 0, s1));
        ctx!.fillStyle = "#34D399";
        ctx!.fillText("every sector.", 80, 825 + lerp(40, 0, s1));

        ctx!.font = "600 40px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#D4D4D8";
        ctx!.fillText("1 Full Day · 4 Sessions · 15 Speakers", 80, 930);
        ctx!.fillStyle = "#34D399";
        ctx!.fillText("Sarau Event Center, Jos", 80, 990);

        // 6 Portraits Row
        portraitImgs.forEach((pImg, idx) => {
          const px = 80 + idx * 154;
          const py = 1420;
          ctx!.save();
          drawRoundedRect(ctx!, px, py, 136, 136, 24);
          ctx!.clip();
          drawCoverImage(ctx!, pImg, px, py, 136, 136, 1);
          ctx!.restore();
          drawRoundedRect(ctx!, px, py, 136, 136, 24);
          ctx!.strokeStyle = "#34D399";
          ctx!.lineWidth = 3;
          ctx!.stroke();
        });
        ctx!.restore();
      } else if (elapsed < 6) {
        // Scene 2: 4 Signature Sessions
        const localT = elapsed - 3;
        ctx!.font = "900 68px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#FAFAFA";
        ctx!.fillText("One Day. Four Power Tracks.", 80, 320);

        tracks.forEach((tr, idx) => {
          const ts = evalSpring(localT - idx * 0.12, 1.1, 160, 20);
          const cy = 420 + idx * 290 + lerp(40, 0, ts);
          ctx!.save();
          ctx!.globalAlpha = clamp01(ts * 1.4);
          drawRoundedRect(ctx!, 80, cy, 920, 240, 32);
          ctx!.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx!.fill();
          ctx!.strokeStyle = tr.border;
          ctx!.lineWidth = 2.5;
          ctx!.stroke();

          ctx!.font = "800 26px Inter, system-ui, sans-serif";
          ctx!.fillStyle = tr.color;
          ctx!.fillText(`SESSION ${tr.num} · ${tr.time}`, 124, cy + 78);

          ctx!.font = "900 50px Inter, system-ui, sans-serif";
          ctx!.fillStyle = "#FAFAFA";
          ctx!.fillText(tr.title, 124, cy + 158);
          ctx!.restore();
        });
      } else {
        // Scene 3: Brand Lockup & CTA
        const localT = elapsed - 6;
        const s3 = evalSpring(localT, 1.0, 180, 18);
        ctx!.save();
        ctx!.globalAlpha = clamp01(s3 * 1.4);
        ctx!.font = "900 92px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#FAFAFA";
        ctx!.fillText("AI for", 80, 680);
        ctx!.fillStyle = "#34D399";
        ctx!.fillText("every sector.", 80, 790);

        ctx!.font = "700 36px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#D4D4D8";
        ctx!.fillText("26 November 2026 · 08:30 WAT", 80, 910);
        ctx!.fillStyle = "#34D399";
        ctx!.fillText("Sarau Event Center, Jos", 80, 968);

        // CTA Pill
        drawRoundedRect(ctx!, 80, 1380, 920, 170, 85);
        ctx!.fillStyle = "#10B981";
        ctx!.fill();

        ctx!.font = "800 28px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#052E16";
        ctx!.fillText("REGISTER NOW", 420, 1448);

        ctx!.font = "900 50px Inter, system-ui, sans-serif";
        ctx!.fillStyle = "#FAFAFA";
        ctx!.fillText("register.techfest.com.ng", 225, 1512);
        ctx!.restore();
      }

      if (elapsed < durationSec) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });

  recorder.stop();
  const videoBlob = await finishedPromise;
  onProgress?.(100);

  const url = URL.createObjectURL(videoBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Jos-TechFest-2026-Promo-9x16.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

