import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-line">
      <div className="max-w-[1060px] mx-auto px-[28px] py-[90px]">
        {/* Eyebrow */}
        <p className="font-mono text-[13px] text-accent mb-[10px]">02 — projects</p>

        {/* Header row */}
        <div className="flex items-baseline justify-between gap-[20px] flex-wrap mb-[42px]">
          <h2 className="text-[38px] font-bold tracking-[-0.02em] m-0">
            Things I&apos;ve built
          </h2>
          <a
            href="https://github.com/Buenaventura-Celine"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-accent-deep border-b border-transparent hover:border-accent transition-colors duration-[220ms]"
          >
            want to see more? → github
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[26px]">
          {projects.map((pj) => (
            <a
              key={pj.name}
              href={pj.link}
              target="_blank"
              rel="noopener noreferrer"
              // Base transform classes are REQUIRED in Tailwind v4 so hover transforms compose correctly.
              // Without translate-y-0 rotate-0, the hover translateY/rotate silently fails.
              className={[
                "group",
                "bg-surface border-[1.5px] border-line rounded-[18px] overflow-hidden flex flex-col text-ink",
                "translate-y-0 rotate-0",
                "transition-all duration-[220ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                "hover:-translate-y-2 hover:rotate-[-0.6deg] hover:border-[#c9dbe8] hover:shadow-[0_14px_30px_rgba(26,26,26,0.13)]",
              ].join(" ")}
            >
              {/* Image */}
              <div className="h-[190px] overflow-hidden border-b border-line">
                <img
                  src={pj.img}
                  alt={pj.name}
                  className="w-full h-full object-cover object-top block transition-transform duration-300 group-hover:scale-[1.09]"
                />
              </div>

              {/* Body */}
              <div className="pt-[20px] px-[22px] pb-[22px] flex flex-col gap-[10px] flex-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-3">
                  {pj.kind}
                </span>
                <h3 className="text-[19px] font-bold tracking-[-0.01em] m-0">
                  {pj.name}
                </h3>
                <p className="text-[14.5px] text-muted-2 m-0 flex-1">{pj.desc}</p>
                <div className="flex flex-wrap gap-[6px]">
                  {pj.tags.map((tg) => (
                    <span
                      key={tg.name}
                      className="font-mono text-[11.5px] px-[10px] py-[4px] rounded-full bg-sky-chip text-accent-deep"
                    >
                      {tg.name}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
