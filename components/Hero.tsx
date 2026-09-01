import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import { socials } from "@/content/site";

// Server component — no interactivity required
export default function Hero() {
  return (
    <header
      id="top"
      className="max-w-[1060px] mx-auto px-[28px] pt-[96px] pb-[110px] flex items-center gap-16 flex-wrap"
    >
      {/* Left column */}
      <div
        className="flex-[1_1_480px]"
        style={{ animation: "fadeUp 0.6s ease both" }}
      >
        {/* Eyebrow — mockup line 36 */}
        <div className="font-mono text-[13px] text-muted mb-[22px]">
          {"// software engineer · san pedro, laguna 🇵🇭"}
        </div>

        {/* H1 — mockup line 37 */}
        <h1
          className="text-[clamp(44px,6vw,68px)] leading-[1.04] font-bold tracking-[-0.03em] m-0 mb-[26px]"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block">
            Celine
            <svg
              viewBox="0 0 200 14"
              style={{
                position: "absolute",
                left: 0,
                bottom: "-10px",
                width: "100%",
                height: "14px",
                overflow: "visible",
              }}
              aria-hidden="true"
            >
              <path
                d="M3 9 C 40 3, 80 12, 120 7 S 185 5, 197 8"
                fill="none"
                stroke="#2b9fe0"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .<br />
          I build things end to end.
        </h1>

        {/* Paragraph — mockup line 38 */}
        <p className="text-[18px] text-body-2 max-w-[52ch] m-0 mb-[34px]">
          Full-stack engineer at Wizy Software Labs — Flutter and React on the
          front, APIs and cloud on the back, four years of shipping in between.
        </p>

        {/* CTA row — mockup lines 39–47 */}
        <div className="flex items-center gap-[14px] flex-wrap">
          {/* "See my work" primary pill */}
          <a
            href="#projects"
            className="text-[15px] font-semibold text-[#fafafa] bg-accent px-[24px] py-[12px] rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(43,159,224,0.4)]"
          >
            See my work
          </a>

          {/* "Ito ang kwento ko" outlined pill */}
          <a
            href="#blog"
            className="text-[15px] font-semibold px-[24px] py-[12px] rounded-full border-[1.5px] border-border-soft transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-accent hover:bg-sky hover:text-accent-deep hover:-translate-y-0.5"
          >
            Ito ang kwento ko
          </a>

          {/* Social icons — mockup lines 42–46 */}
          <div className="ml-[6px]">
            <SocialIcons variant="hero" items={socials} />
          </div>
        </div>
      </div>

      {/* Right column — mockup lines 49–53 */}
      <div
        className="flex-[0_0_auto] relative"
        style={{ animation: "fadeUp 0.6s 0.15s ease both" }}
      >
        {/* Offset card behind photo */}
        <div
          className="absolute rounded-[28px] bg-sky-soft"
          style={{
            inset: "10px -10px -10px 10px",
            transform: "rotate(4deg)",
          }}
        />

        {/* Framed photo container */}
        <div
          className="relative w-[250px] h-[300px] rounded-[28px] border-[3px] border-ink overflow-hidden -rotate-2 transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:rotate-0 hover:scale-[1.04]"
        >
          <Image
            src="/images/hero.png"
            alt="Celine"
            width={250}
            height={300}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Sticker — mockup line 52 */}
        <div
          className="absolute font-mono text-[12px] bg-white border-[1.5px] border-ink rounded-full px-[12px] py-[5px] rotate-[6deg] shadow-[2px_2px_0_#1a1a1a] transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:rotate-[-4deg] hover:scale-[1.1]"
          style={{
            top: "-16px",
            right: "-22px",
          }}
        >
          give me a Coke and we&apos;re even ✳
        </div>
      </div>
    </header>
  );
}
