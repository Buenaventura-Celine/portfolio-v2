import SocialIcons from "@/components/SocialIcons";
import { socials } from "@/content/site";

// Server component — port of mockup lines 189–207
export default function Footer() {
  return (
    <footer className="border-t border-line bg-footer-bg text-[#fafafa]">
      <div className="max-w-[1060px] mx-auto pt-[70px] px-[28px] pb-[40px]">
        {/* Top row */}
        <div className="flex justify-between gap-[40px] flex-wrap items-start mb-[56px]">
          {/* Left: headline + mailto */}
          <div>
            <div className="text-[30px] font-bold tracking-[-0.02em] mb-[10px]">
              Let&apos;s talk.
            </div>
            <a
              href="mailto:cjvbuenaventura@gmail.com"
              className="font-mono text-[15px] text-footer-link border-b-[1.5px] border-transparent transition-colors duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#bde4fa] hover:border-[#bde4fa]"
            >
              cjvbuenaventura@gmail.com
            </a>
          </div>

          {/* Right: social links */}
          <div className="flex gap-[22px]">
            <SocialIcons variant="footer" items={socials} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between gap-[20px] flex-wrap border-t border-footer-border pt-[26px]">
          <div className="font-mono text-[12.5px] text-footer-muted italic">
            &quot;Give me a Coke and we&apos;re even&quot;
          </div>
          <div className="font-mono text-[12.5px] text-footer-muted">
            © 2026 Celine Joie V. Buenaventura
          </div>
        </div>
      </div>
    </footer>
  );
}
