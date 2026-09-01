// mockup lines 23–33
// Server component — pure markup, no interactivity needed

export default function Nav() {
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

        {/* mockup line 26: right nav links — flex, items-center, gap-28px */}
        <div className="flex items-center gap-7">
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
            className="text-[14px] font-semibold text-[#fafafa] bg-ink px-[18px] py-[9px] rounded-full transition-all duration-200 ease-in-out hover:bg-accent hover:text-[#fafafa] hover:-translate-y-px"
          >
            Resume ↓
          </a>
        </div>
      </div>
    </nav>
  );
}
