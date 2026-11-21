import { ACCENT_PALETTE, type ProgramSlide } from "./programSlides";

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

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
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
  const drawY = y;
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

export function renderProgramSlideToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tSec: number,
  slide: ProgramSlide,
  portraitImg: HTMLImageElement | null,
  logoImg: HTMLImageElement | null
) {
  const is16x9 = width > height;
  const theme = ACCENT_PALETTE[slide.accent] || ACCENT_PALETTE.emerald;

  // 1. Deep Obsidian Canvas
  ctx.fillStyle = "#09090B";
  ctx.fillRect(0, 0, width, height);

  // 2. Volumetric Track Radial Glow
  const glowGrad = ctx.createRadialGradient(
    is16x9 ? width * 0.32 : width * 0.5,
    is16x9 ? height * 0.48 : height * 0.34,
    24,
    is16x9 ? width * 0.32 : width * 0.5,
    is16x9 ? height * 0.48 : height * 0.34,
    is16x9 ? width * 0.68 : height * 0.58
  );
  glowGrad.addColorStop(0, theme.glowRgba);
  glowGrad.addColorStop(1, "rgba(9, 9, 11, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Matrix Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx < width; gx += 64) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < height; gy += 64) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }

  // 4. Watermark
  ctx.save();
  ctx.font = `900 ${is16x9 ? 150 : 92}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
  ctx.fillText(
    "AI FOR EVERY SECTOR",
    is16x9 ? 110 - tSec * 12 : 60 - tSec * 8,
    height - (is16x9 ? 65 : 95)
  );
  ctx.restore();

  const padX = is16x9 ? 96 : 80;
  const padY = is16x9 ? 68 : 135;

  // 5. Top Header Bar
  const headerS = clamp01(evalSpring(tSec - 0.04, 0.8, 220, 22));
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
    ctx.font = "800 20px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("AI FOR EVERY SECTOR · 26 NOV 2026", padX + 210, padY + 34);
  }

  ctx.font = `800 ${is16x9 ? 20 : 19}px Inter, system-ui, sans-serif`;
  const badgeText = slide.badgeLabel;
  const badgeW = ctx.measureText(badgeText).width + 62;
  const badgeH = 48;
  const badgeX = width - padX - badgeW;
  const badgeY = padY + 2;

  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 24);
  ctx.fillStyle = theme.badgeBgRgba;
  ctx.fill();
  ctx.strokeStyle = theme.borderRgba;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(badgeX + 24, badgeY + badgeH / 2, 6, 0, Math.PI * 2);
  ctx.fillStyle = theme.secondary;
  ctx.fill();

  ctx.fillStyle = "#FAFAFA";
  ctx.fillText(badgeText, badgeX + 40, badgeY + 31);
  ctx.restore();

  // 6. Main Body: Portrait or Monogram Card + Typography
  const portS = evalSpring(tSec - 0.12, 1.1, 150, 20);
  const portAlpha = clamp01(portS * 1.4);
  const portScale = lerp(0.86, 1, portS);
  const imgZoom = lerp(1.07, 1.0, clamp01(tSec / 6));

  const portX = padX;
  const portY = is16x9 ? padY + 92 : padY + 86;
  const portW = is16x9 ? 500 : width - padX * 2;
  const portH = is16x9 ? 690 : 640;

  ctx.save();
  ctx.globalAlpha = portAlpha;
  const cx = portX + portW / 2;
  const cy = portY + portH / 2;
  ctx.translate(cx, cy);
  ctx.scale(portScale, portScale);
  ctx.translate(-cx, -cy);

  drawRoundedRect(ctx, portX, portY, portW, portH, 36);
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fill();
  ctx.strokeStyle = theme.borderRgba;
  ctx.lineWidth = 3;
  ctx.stroke();

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

  if (portraitImg) {
    drawCoverImage(
      ctx,
      portraitImg,
      portX + innerPad,
      portY + innerPad,
      portW - innerPad * 2,
      portH - innerPad * 2,
      imgZoom
    );
  } else {
    // High-End Stage Monogram / Cue Visual
    const monoGrad = ctx.createRadialGradient(
      cx,
      cy - 30,
      10,
      cx,
      cy,
      portW * 0.65
    );
    monoGrad.addColorStop(0, theme.glowRgba);
    monoGrad.addColorStop(1, "#0B1512");
    ctx.fillStyle = monoGrad;
    ctx.fillRect(portX, portY, portW, portH);

    ctx.beginPath();
    ctx.arc(cx, cy - 20, 115, 0, Math.PI * 2);
    ctx.fillStyle = theme.badgeBgRgba;
    ctx.fill();
    ctx.strokeStyle = theme.borderRgba;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = "900 84px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#FAFAFA";
    const initStr = slide.initials || `CUE ${slide.cueNumber}`;
    const initW = ctx.measureText(initStr).width;
    ctx.fillText(initStr, cx - initW / 2, cy + 10);
  }

  const vigGrad = ctx.createLinearGradient(0, portY + portH * 0.55, 0, portY + portH);
  vigGrad.addColorStop(0, "rgba(9, 9, 11, 0)");
  vigGrad.addColorStop(1, "rgba(9, 9, 11, 0.92)");
  ctx.fillStyle = vigGrad;
  ctx.fillRect(portX, portY + portH * 0.55, portW, portH * 0.45);

  const eqBoxX = portX + 26;
  const eqBoxY = portY + portH - 76;
  const eqBoxW = portW - 52;
  const eqBoxH = 50;
  drawRoundedRect(ctx, eqBoxX, eqBoxY, eqBoxW, eqBoxH, 16);
  ctx.fillStyle = "rgba(9, 9, 11, 0.82)";
  ctx.fill();
  ctx.strokeStyle = theme.borderRgba;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = "800 17px Inter, system-ui, sans-serif";
  ctx.fillStyle = theme.secondary;
  ctx.fillText(`CUE #${slide.cueNumber} · ${slide.timeSlot}`, eqBoxX + 18, eqBoxY + 31);

  for (let b = 0; b < 5; b++) {
    const wave = Math.sin(tSec * 10 + b * 1.3);
    const bh = lerp(8, 25, (wave + 1) / 2);
    const bx = eqBoxX + eqBoxW - 66 + b * 10;
    const by = eqBoxY + 37 - bh;
    drawRoundedRect(ctx, bx, by, 5, bh, 2.5);
    ctx.fillStyle = theme.secondary;
    ctx.fill();
  }

  ctx.restore();
  ctx.restore();

  // 7. Right / Lower Typography & Card
  const infoX = is16x9 ? portX + portW + 68 : padX;
  const infoW = is16x9 ? width - infoX - padX : width - padX * 2;
  let cursorY = is16x9 ? portY + 44 : portY + portH + 42;

  const roleS = clamp01(evalSpring(tSec - 0.22, 0.8, 220, 22));
  ctx.save();
  ctx.globalAlpha = roleS;
  ctx.font = "700 22px Inter, system-ui, sans-serif";
  const subText = slide.subtitle.length > 58 ? slide.subtitle.slice(0, 58) + "…" : slide.subtitle;
  const roleW = Math.min(infoW, ctx.measureText(subText).width + 44);
  drawRoundedRect(ctx, infoX, cursorY, roleW, 44, 22);
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = theme.secondary;
  ctx.fillText(subText, infoX + 22, cursorY + 29);
  ctx.restore();

  cursorY += is16x9 ? 114 : 100;

  const nameFontSize = is16x9 ? 80 : 68;
  ctx.font = `900 ${nameFontSize}px Inter, system-ui, sans-serif`;
  const words = slide.title.split(" ");
  let wordX = infoX;
  const lineH = nameFontSize * 1.08;

  words.forEach((word, idx) => {
    const wMetrics = ctx.measureText(word + " ");
    if (wordX + wMetrics.width > infoX + infoW && wordX > infoX) {
      wordX = infoX;
      cursorY += lineH;
    }
    const wSpring = evalSpring(tSec - (0.3 + idx * 0.08), 1.0, 180, 16);
    const wAlpha = clamp01(wSpring * 1.4);
    const wOffsetY = lerp(40, 0, wSpring);
    const isLast = idx === words.length - 1;

    ctx.save();
    ctx.globalAlpha = wAlpha;
    ctx.fillStyle = isLast ? theme.secondary : "#FAFAFA";
    ctx.fillText(word, wordX, cursorY + wOffsetY);
    ctx.restore();

    wordX += wMetrics.width;
  });

  cursorY += is16x9 ? 52 : 42;

  const cardS = evalSpring(tSec - 0.6, 1.1, 150, 20);
  const cardAlpha = clamp01(cardS * 1.4);
  const cardY = cursorY + lerp(32, 0, cardS);
  const bodyCopy = slide.talkTitle || slide.subtitle;

  ctx.font = `800 ${is16x9 ? 34 : 30}px Inter, system-ui, sans-serif`;
  const talkLines = wrapTextLines(ctx, `“${bodyCopy}”`, infoW - 68);
  const cardH = is16x9 ? 110 + talkLines.length * 44 : 102 + talkLines.length * 38;

  ctx.save();
  ctx.globalAlpha = cardAlpha;
  drawRoundedRect(ctx, infoX, cardY, infoW, cardH, 28);
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fill();
  ctx.strokeStyle = theme.borderRgba;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "800 20px Inter, system-ui, sans-serif";
  ctx.fillStyle = theme.secondary;
  ctx.fillText(slide.actLabel.toUpperCase(), infoX + 32, cardY + 44);

  ctx.font = "700 20px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#D4D4D8";
  const timeW = ctx.measureText(slide.timeSlot).width;
  ctx.fillText(slide.timeSlot, infoX + infoW - 32 - timeW, cardY + 44);

  ctx.font = `800 ${is16x9 ? 33 : 29}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#FAFAFA";
  talkLines.forEach((line, lIdx) => {
    ctx.fillText(line, infoX + 32, cardY + 95 + lIdx * (is16x9 ? 42 : 36));
  });
  ctx.restore();

  // Footer
  const footS = clamp01(evalSpring(tSec - 0.8, 0.8, 220, 22));
  ctx.save();
  ctx.globalAlpha = footS;
  if (is16x9) {
    const footY = cardY + cardH + 52;
    ctx.font = "700 23px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#A1A1AA";
    ctx.fillText("Sarau Event Center, Jos  •", infoX, footY);
    ctx.font = "800 23px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("register.techfest.com.ng", infoX + 310, footY);
  } else {
    const pillY = height - padY - 86;
    drawRoundedRect(ctx, padX, pillY, infoW, 86, 43);
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(52, 211, 153, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "800 18px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#34D399";
    ctx.fillText("AI FOR EVERY SECTOR · 26 NOV 2026", padX + 32, pillY + 34);

    ctx.font = "900 25px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#FAFAFA";
    ctx.fillText("register.techfest.com.ng", padX + 32, pillY + 66);
  }
  ctx.restore();
}

export async function downloadSlidePosterPng(
  slide: ProgramSlide,
  aspect: "16:9" | "9:16"
): Promise<void> {
  const width = aspect === "16:9" ? 1920 : 1080;
  const height = aspect === "16:9" ? 1080 : 1920;

  const [portraitImg, logoImg] = await Promise.all([
    slide.mediaUrl ? loadImage(slide.mediaUrl) : Promise.resolve(null),
    loadImage("/logo.png"),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  renderProgramSlideToCanvas(ctx, width, height, 3.2, slide, portraitImg, logoImg);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 1)
  );
  if (!blob) return;

  const safeSlug = slide.title.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Cue-${slide.cueNumber}-${safeSlug}-${aspect === "16:9" ? "LED-16x9" : "Social-9x16"}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadSlideVideoFile(
  slide: ProgramSlide,
  aspect: "16:9" | "9:16",
  onProgress?: (percent: number) => void
): Promise<void> {
  const width = aspect === "16:9" ? 1920 : 1080;
  const height = aspect === "16:9" ? 1080 : 1920;
  const durationSec = 6;

  const [portraitImg, logoImg] = await Promise.all([
    slide.mediaUrl ? loadImage(slide.mediaUrl) : Promise.resolve(null),
    loadImage("/logo.png"),
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

  await new Promise<void>((resolve) => {
    function step(now: number) {
      const elapsedSec = (now - startTime) / 1000;
      onProgress?.(Math.min(100, Math.round((elapsedSec / durationSec) * 100)));

      renderProgramSlideToCanvas(
        ctx!,
        width,
        height,
        elapsedSec,
        slide,
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

  const safeSlug = slide.title.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = URL.createObjectURL(videoBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Cue-${slide.cueNumber}-${safeSlug}-${aspect === "16:9" ? "LED-16x9" : "Social-9x16"}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

