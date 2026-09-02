import type { MDXComponents } from "mdx/types";

/* ---------- Custom MDX components ---------- */

interface FigureProps {
  src: string;
  alt: string;
}

export function Figure({ src, alt }: FigureProps) {
  return (
    <div className="my-[34px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-[14px] border-[1.5px] border-line block"
      />
    </div>
  );
}

interface GalleryProps {
  children: React.ReactNode;
  cols?: 2 | 3;
}

export function Gallery({ children, cols = 2 }: GalleryProps) {
  return (
    <div
      className={`grid gap-[14px] my-[34px]${cols === 3 ? " grid-cols-3" : " grid-cols-2"}`}
    >
      {children}
    </div>
  );
}

interface GImgProps {
  src: string;
  alt: string;
  span?: boolean;
  h?: string;
}

export function GImg({ src, alt, span, h = "220px" }: GImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ height: h }}
      className={`w-full object-cover rounded-[14px] border-[1.5px] border-line${span ? " col-span-2" : ""}`}
    />
  );
}

export function WIPBox() {
  return (
    <div className="border-[1.5px] border-dashed border-border-soft rounded-[16px] px-[32px] py-[40px] text-center mt-[20px] mb-[40px]">
      <span className="font-mono text-[13px] text-muted">
        // work in progress — this story is still being written
      </span>
    </div>
  );
}

export function PostTags({ items }: { items?: string[] }) {
  if (!items || !Array.isArray(items)) return null;
  return (
    <div className="flex flex-wrap gap-[8px]">
      {items.map((t) => (
        <span
          key={t}
          className="font-mono text-[11.5px] px-[10px] py-[4px] rounded-full bg-sky-chip text-accent-deep"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ---------- MDX component map ---------- */

export const mdxComponents: MDXComponents = {
  p: ({ children }) => (
    <p className="text-[17.5px] leading-[1.75] text-body-text m-0 mb-[20px]">
      {children}
    </p>
  ),
  h3: ({ children }) => (
    <h3 className="text-[26px] font-bold tracking-[-0.015em] mt-[44px] mb-[16px]">
      {children}
    </h3>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => {
    const isExternal =
      href?.startsWith("http://") || href?.startsWith("https://");
    return (
      <a
        href={href}
        className="text-accent underline"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  },
  // Custom components available in MDX bodies
  Figure,
  Gallery,
  GImg,
  WIPBox,
  PostTags,
};
