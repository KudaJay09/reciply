import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
  title?: string;
  description?: string;
};

export default function LoadingScreen({
  className,
  title = "Preparing your table",
  description = "Setting up the experience and loading the latest details.",
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "app__bg flex min-h-screen items-center justify-center px-6 py-10",
        className,
      )}
    >
      <div className="relative w-full max-w-md overflow-hidden border border-[rgba(220,202,135,0.45)] bg-[rgba(12,12,12,0.94)] px-8 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,202,135,0.14),transparent_52%),radial-gradient(circle_at_bottom,rgba(245,239,219,0.06),transparent_45%)]" />

        <div className="relative mx-auto flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[rgba(220,202,135,0.22)]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[rgba(220,202,135,0.8)] animate-spin [animation-duration:3s]" />
          <div className="absolute inset-5 rounded-full bg-[radial-gradient(circle,rgba(220,202,135,0.95)_0%,rgba(245,239,219,0.35)_38%,rgba(12,12,12,0)_72%)] shadow-[0_0_30px_rgba(220,202,135,0.22)]" />
          <span className="sr-only">Loading</span>
        </div>

        <div className="relative mt-8 space-y-3">
          <p
            className="text-[2rem] leading-none tracking-[0.08em] text-[var(--color-golden)]"
            style={{ fontFamily: "var(--font-base)" }}
          >
            {title}
          </p>
          <p
            className="mx-auto max-w-sm text-sm leading-7 text-[var(--color-grey)]"
            style={{ fontFamily: "var(--font-alt)" }}
          >
            {description}
          </p>
        </div>

        <div className="relative mt-8 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-golden)] opacity-90 animate-bounce [animation-delay:-0.24s]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-crimson)] opacity-80 animate-bounce [animation-delay:-0.12s]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-grey)] opacity-70 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
