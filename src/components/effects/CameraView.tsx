import { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, CameraOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS: { name: string; css: string }[] = [
  { name: "none", css: "" },
  { name: "amber", css: "sepia(1) saturate(3.2) hue-rotate(-12deg) brightness(0.95)" },
  { name: "grayscale", css: "grayscale(1)" },
  { name: "sepia", css: "sepia(0.85)" },
  { name: "invert", css: "invert(1)" },
  { name: "blur", css: "blur(4px)" },
  { name: "vivid", css: "saturate(2.6) contrast(1.15)" },
];

type Status = "loading" | "live" | "denied" | "error";

/**
 * A real camera: requests getUserMedia (triggering the browser permission
 * prompt), shows the live feed, applies selectable CSS filters in real time,
 * captures the filtered frame and downloads it, and degrades gracefully if
 * the user denies access.
 */
export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [filter, setFilter] = useState(FILTERS[0]);

  const start = async () => {
    setStatus("loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("error");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus("live");
    } catch (err) {
      const name = (err as DOMException)?.name;
      setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "error");
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const cx = c.getContext("2d");
    if (!cx) return;
    cx.filter = filter.css || "none";
    // Mirror to match the on-screen (selfie) preview.
    cx.translate(c.width, 0);
    cx.scale(-1, 1);
    cx.drawImage(v, 0, 0, c.width, c.height);
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cybercafe-capture-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  return (
    <div className="flex h-full flex-col bg-black">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          muted
          aria-label="camera feed"
          className="h-full w-full object-cover"
          style={{ filter: filter.css, transform: "scaleX(-1)" }}
        />
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-40" />

        {status === "live" && (
          <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            rec
          </div>
        )}

        {status !== "live" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/85 p-6 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="font-sans text-sm font-bold uppercase tracking-wide text-foreground">
                  requesting camera…
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  allow access in the browser prompt
                </p>
              </>
            )}
            {status === "denied" && (
              <>
                <CameraOff className="h-8 w-8 text-primary" />
                <p className="font-sans text-sm font-bold uppercase tracking-wide text-foreground">
                  camera access denied
                </p>
                <p className="max-w-xs font-mono text-xs text-muted-foreground">
                  enable camera permission for this site in your browser, then
                  retry.
                </p>
                <RetryButton onClick={start} />
              </>
            )}
            {status === "error" && (
              <>
                <CameraOff className="h-8 w-8 text-primary" />
                <p className="font-sans text-sm font-bold uppercase tracking-wide text-foreground">
                  no camera available
                </p>
                <RetryButton onClick={start} />
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 border-t-2 border-primary/40 bg-card/90 p-3">
        {FILTERS.map((f) => (
          <button
            key={f.name}
            data-cursor
            onClick={() => setFilter(f)}
            className={cn(
              "retro-label border-2 px-2.5 py-1.5 text-[11px] transition-colors",
              filter.name === f.name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {f.name}
          </button>
        ))}
        <button
          data-cursor
          onClick={capture}
          disabled={status !== "live"}
          className="ml-auto inline-flex items-center gap-2 border-2 border-primary bg-primary px-4 py-2 font-sans text-[12px] font-bold uppercase tracking-wide text-primary-foreground transition-opacity disabled:opacity-40"
        >
          <Download className="h-4 w-4" /> capture
        </button>
      </div>
    </div>
  );
}

function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      data-cursor
      onClick={onClick}
      className="mt-1 inline-flex items-center gap-2 border-2 border-primary bg-primary/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <RefreshCw className="h-4 w-4" /> allow / retry
    </button>
  );
}
