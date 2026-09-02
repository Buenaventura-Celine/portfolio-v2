import Link from "next/link";

export default function BlogNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(250,250,250,0.88)] backdrop-blur-[10px] border-b border-line">
      <div className="max-w-[1060px] mx-auto px-[28px] h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-medium text-[15px] tracking-[0.04em] text-ink"
        >
          celine<span className="text-accent">.</span>
        </Link>
        <Link
          href="/#blog"
          className="font-mono text-[13px] text-muted-2 hover:text-accent transition-colors"
        >
          ← all posts
        </Link>
      </div>
    </nav>
  );
}
