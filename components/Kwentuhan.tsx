"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/content/blog";

type Filter = "All" | "Technical" | "Life";

export default function Kwentuhan({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filters: Filter[] = ["All", "Technical", "Life"];

  const visible =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="border-t border-line bg-surface">
      <div className="max-w-[1060px] mx-auto px-[28px] py-[90px]">
        {/* Eyebrow */}
        <div className="font-mono text-[13px] text-accent mb-[10px]">
          03 — kwentuhan
        </div>

        {/* Header row */}
        <div className="flex items-baseline justify-between gap-[20px] flex-wrap mb-[36px]">
          <h2 className="text-[38px] font-bold tracking-[-0.02em] m-0">
            Kwentuhan
          </h2>

          {/* Filter buttons */}
          <div className="flex gap-[8px]">
            {filters.map((label) => {
              const active = filter === label;
              return (
                <button
                  key={label}
                  onClick={() => setFilter(label)}
                  className={[
                    "font-mono text-[13px] cursor-pointer px-[16px] py-[7px] rounded-full border-[1.5px] transition-all duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    active
                      ? "border-ink bg-ink text-[#fafafa]"
                      : "border-border-soft bg-transparent text-muted-2",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Post list */}
        <div className="flex flex-col">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="flex gap-[26px] items-center py-[22px] px-[10px] border-b border-line-2 rounded-[12px] transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-x-0 hover:bg-sky hover:pl-[28px] hover:translate-x-[2px] no-underline text-ink"
            >
              {/* Left content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[12px] mb-[4px]">
                  {/* Category chip */}
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent-deep bg-sky px-[9px] py-[3px] rounded-full">
                    {p.category}
                  </span>
                  {/* Date */}
                  <span className="font-mono text-[12px] text-muted-3">
                    {p.date}
                  </span>
                </div>
                {/* Title */}
                <div className="text-[19px] font-bold tracking-[-0.01em] mb-[3px]">
                  {p.title}
                </div>
                {/* Description */}
                <p className="text-[14px] text-muted m-0 text-pretty">
                  {p.description}
                </p>
              </div>

              {/* Arrow */}
              <span className="font-mono text-[18px] text-[#b3b3ac] flex-[0_0_auto]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
