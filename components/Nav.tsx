"use client";

// mockup lines 23–33
// Client component — needs useState for mobile menu toggle

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    // mockup line 23: sticky top-0 z-50, background rgba(250,250,250,0.88), backdrop-blur(10px), border-bottom 1px solid #e5e5e2
    <nav className="sticky top-0 z-50 bg-[rgba(250,250,250,0.88)] backdrop-blur-[10px] border-b border-line">
      {/* mockup line 24: max-w-[1060px] mx-auto px-7 h-16 flex items-center justify-between */}
      <div className="max-w-[1060px] mx-auto px-7 h-16 flex items-center justify-between">
        {/* mockup line 25: logo — JetBrains Mono, weight 500, 15px, letter-spacing 0.04em */}
        {/* "celine" + "." in accent color */}
        <a
          href="#top"
          className="font-mono font-medium text-[15px] tracking-[0.04em] text-ink hover:text-ink"
        >
          celine<span className="text-accent">.</span>
        </a>

        {/* Desktop nav links — hidden below 640px, flex at 640px+ */}
        {/* mockup line 26: right nav links — flex, items-center, gap-28px */}
        <div className="hidden sm:flex items-center gap-7">
          {/* mockup line 27: About — font-size 15px, font-weight 500, style-hover: color #2b9fe0 */}
          <a
            href="#about"
            className="text-[15px] font-medium transition-colors duration-200 hover:text-accent"
          >
            About
          </a>

          {/* mockup line 28: Projects — font-size 15px, font-weight 500, style-hover: color #2b9fe0 */}
          <a
            href="#projects"
            className="text-[15px] font-medium transition-colors duration-200 hover:text-accent"
          >
            Projects
          </a>

          {/* mockup line 29: Kwentuhan → #blog — font-size 15px, font-weight 500, style-hover: color #2b9fe0 */}
          <a
            href="#blog"
            className="text-[15px] font-medium transition-colors duration-200 hover:text-accent"
          >
            Kwentuhan
          </a>

          {/* mockup line 30: Resume pill — font-size 14px, font-weight 600, color #fafafa, background #1a1a1a,
              padding 9px 18px, border-radius 999px, transition all 0.2s ease
              style-hover: background #2b9fe0, color #fafafa, transform translateY(-1px) */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold text-[#fafafa] bg-ink px-[18px] py-[9px] rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-accent hover:text-[#fafafa] hover:-translate-y-px"
          >
            Resume ↓
          </a>
        </div>

        {/* Hamburger button — only visible below 640px */}
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink hover:text-accent transition-colors duration-200"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            /* X icon when open */
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="3"
                y1="3"
                x2="17"
                y2="17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="17"
                y1="3"
                x2="3"
                y2="17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* Hamburger icon when closed */
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="3"
                y1="5"
                x2="17"
                y2="5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="3"
                y1="10"
                x2="17"
                y2="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="3"
                y1="15"
                x2="17"
                y2="15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel — only shown when open, hidden at 640px+ */}
      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden bg-[#fafafa] border-b border-line"
        >
          <div className="max-w-[1060px] mx-auto px-7 py-4 flex flex-col gap-1">
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="block py-3 text-[16px] font-medium text-ink hover:text-accent transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => setOpen(false)}
              className="block py-3 text-[16px] font-medium text-ink hover:text-accent transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#blog"
              onClick={() => setOpen(false)}
              className="block py-3 text-[16px] font-medium text-ink hover:text-accent transition-colors duration-200"
            >
              Kwentuhan
            </a>
            <div className="pt-2 pb-1">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-block text-[14px] font-semibold text-[#fafafa] bg-ink px-[18px] py-[9px] rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-accent hover:text-[#fafafa]"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
