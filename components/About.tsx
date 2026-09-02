import { bio, experience, education, stack } from "@/content/site";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-line bg-surface"
    >
      <div className="max-w-[1060px] mx-auto px-[28px] py-[90px]">
        {/* Eyebrow */}
        <div className="font-mono text-[13px] text-accent mb-[10px]">
          01 — about
        </div>

        {/* Heading */}
        <h2 className="text-[38px] font-bold tracking-[-0.02em] mb-[42px]">
          About me
        </h2>

        {/* Two-column layout */}
        <div className="flex gap-[56px] flex-wrap">
          {/* LEFT column */}
          <div className="flex-[1_1_380px]">
            {/* Bio paragraphs */}
            <p className="text-[17px] text-body-text mb-[18px]">{bio[0]}</p>
            <p className="text-[17px] text-body-text mb-[28px]">{bio[1]}</p>
            <p className="text-[17px] text-body-text mb-[28px]">{bio[2]}</p>

            {/* Resume button */}
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-[8px]",
                "text-[15px] font-semibold",
                "border-[1.5px] border-ink rounded-full px-[22px] py-[11px]",
                "transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                "-translate-y-0",
                "hover:bg-ink hover:text-[#fafafa] hover:-translate-y-[2px] hover:shadow-[3px_3px_0_#2b9fe0]",
              ].join(" ")}
            >
              View resume{" "}
              <span className="font-mono">↗</span>
            </a>

            {/* Tech stack — Tiles variant (mockup lines 65–73) */}
            <div className="mt-[40px] flex flex-wrap gap-[10px]">
              {stack.map((sk) => (
                <div
                  key={sk.name}
                  title={sk.name}
                  className={[
                    "w-[46px] h-[46px] flex items-center justify-center",
                    "border-[1.5px] border-line rounded-[12px] bg-surface",
                    "transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    "-translate-y-0",
                    "hover:border-accent hover:bg-sky hover:-translate-y-[3px]",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sk.icon}
                    alt={sk.name}
                    className="w-[22px] h-[22px] block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex-[1_1_380px] flex flex-col gap-[36px]">
            {/* Experience block */}
            <div>
              <h3 className="font-mono text-[13px] font-medium text-muted uppercase tracking-[0.08em] mb-[18px]">
                Experience
              </h3>
              <div className="flex flex-col">
                {experience.map((ex) => (
                  <div
                    key={ex.date + ex.title}
                    className="flex gap-[18px] py-[14px] border-b border-dashed border-line-dash"
                  >
                    <div className="font-mono text-[12.5px] text-accent flex-[0_0_148px] pt-[3px]">
                      {ex.date}
                    </div>
                    <div>
                      <div className="font-semibold text-[15.5px]">{ex.title}</div>
                      <div className="text-[14px] text-muted">{ex.org}</div>
                      {ex.note && (
                        <div className="text-[13.5px] text-muted mt-[6px] text-pretty">
                          {ex.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education block */}
            <div>
              <h3 className="font-mono text-[13px] font-medium text-muted uppercase tracking-[0.08em] mb-[18px]">
                Education
              </h3>
              <div className="flex flex-col">
                {education.map((ed) => (
                  <div
                    key={ed.date + ed.title}
                    className="flex gap-[18px] py-[14px] border-b border-dashed border-line-dash"
                  >
                    <div className="font-mono text-[12.5px] text-accent flex-[0_0_148px] pt-[3px]">
                      {ed.date}
                    </div>
                    <div>
                      <div className="font-semibold text-[15.5px]">{ed.title}</div>
                      <div className="text-[14px] text-muted">{ed.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
