"use client";

import { useEffect, useRef, useState } from "react";

type Row = {
  id: number;
  time: string;
  kind: "scan" | "flag" | "block";
  ep: string;
  pct?: string;
};

const endpoints = [
  "api-gw-02",
  "edge-eu-1",
  "vault-03",
  "k8s-node-7",
  "auth-svc",
  "cdn-iad",
  "db-replica",
  "mail-relay",
];

const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
const stamp = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

type Blip = { a: number; r: number; st: number; life: number };

const DefenseConsole = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idRef = useRef(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const addRow = (kind: Row["kind"]) =>
      setRows((prev) => {
        const row: Row = {
          id: idRef.current++,
          time: stamp(),
          kind,
          ep: pick(endpoints),
          pct:
            kind === "flag"
              ? `${80 + Math.floor(Math.random() * 19)}.${Math.floor(
                  Math.random() * 9
                )}%`
              : undefined,
        };
        return [row, ...prev].slice(0, 6);
      });

    // seed so it never looks empty
    addRow("scan");
    addRow("flag");
    addRow("block");
    addRow("scan");

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const anyCtx = ctx as CanvasRenderingContext2D & {
      createConicGradient?: (a: number, x: number, y: number) => CanvasGradient;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 160;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2;
    const cy = size / 2;
    const R = size / 2 - 6;
    let angle = 0;
    let mit = 0;
    let raf = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const blips: Blip[] = [];
    for (let i = 0; i < 4; i++)
      blips.push({
        a: Math.random() * Math.PI * 2,
        r: 22 + Math.random() * (R - 30),
        st: 0,
        life: 1,
      });

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      [0.34, 0.64, 0.92].forEach((f) => {
        ctx.beginPath();
        ctx.arc(cx, cy, R * f, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.lineTo(cx + R, cy);
      ctx.moveTo(cx, cy - R);
      ctx.lineTo(cx, cy + R);
      ctx.stroke();

      if (!reduce && anyCtx.createConicGradient) {
        const g = anyCtx.createConicGradient(angle, cx, cy);
        g.addColorStop(0, "rgba(244,51,52,0.38)");
        g.addColorStop(0.08, "rgba(244,51,52,0.02)");
        g.addColorStop(1, "rgba(244,51,52,0)");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, angle, angle + Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = "rgba(244,51,52,0.75)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.stroke();
      }

      blips.forEach((b) => {
        const bx = cx + Math.cos(b.a) * b.r;
        const by = cy + Math.sin(b.a) * b.r;
        const col =
          b.st === 1 ? "244,51,52" : b.st === 2 ? "255,255,255" : "150,150,160";
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${b.life})`;
        ctx.fill();
        if (b.st === 1) {
          ctx.beginPath();
          ctx.arc(bx, by, 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(244,51,52,0.4)";
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(cx, cy, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fill();
    };

    if (reduce) {
      blips[0].st = 2;
      draw();
      setCount(12);
      return;
    }

    const tick = () => {
      angle += 0.045;
      if (angle > Math.PI * 2) angle -= Math.PI * 2;
      blips.forEach((b) => {
        const da = Math.abs(
          ((b.a - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
        );
        if (b.st === 0 && da < 0.06) {
          b.st = 1;
          addRow("flag");
        }
        if (b.st === 1 && da > 1.4) {
          b.st = 2;
          b.life = 1;
          mit++;
          setCount(mit);
          addRow("block");
        }
        if (b.st === 2) {
          b.life -= 0.012;
          if (b.life <= 0.15) {
            b.st = 0;
            b.life = 1;
            b.a = Math.random() * Math.PI * 2;
            b.r = 22 + Math.random() * (R - 30);
          }
        }
      });
      draw();
      raf = requestAnimationFrame(tick);
    };
    tick();
    interval = setInterval(() => {
      if (Math.random() > 0.4) addRow("scan");
    }, 2600);

    return () => {
      cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-helper shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/50">
        <span>Defense Console</span>
        <span className="flex items-center gap-2 text-white">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-primary-normal" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 py-5 max-[420px]:grid-cols-1 max-[420px]:justify-items-center">
        <div className="relative h-40 w-40">
          <canvas ref={canvasRef} width={160} height={160} className="h-40 w-40" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.18em] text-white/40">
            PERIMETER
          </span>
        </div>
        <div className="min-w-0 font-mono text-[0.73rem] leading-[1.95] text-white/85">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="text-white/40">{r.time}</span>
              {r.kind === "scan" && (
                <>
                  <span className="text-white/55">scan</span>
                  <span>{r.ep} · inbound</span>
                </>
              )}
              {r.kind === "flag" && (
                <>
                  <span className="text-primary-normal">flag</span>
                  <span>
                    {r.ep} · anomaly {r.pct}
                  </span>
                </>
              )}
              {r.kind === "block" && (
                <>
                  <span className="text-white">block</span>
                  <span>{r.ep} · quarantined</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
        <span className="flex items-center gap-2 text-white">
          <span className="h-[6px] w-[6px] rounded-full bg-white" />
          Status: Secure
        </span>
        <span className="text-white/40">{count} threats mitigated</span>
      </div>
    </div>
  );
};

export default DefenseConsole;
