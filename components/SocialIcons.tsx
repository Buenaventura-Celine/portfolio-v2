import type { Social } from "@/content/site";

interface SocialIconsProps {
  items: Social[];
  variant: "hero" | "footer";
}

// Server component — no interactivity needed
export default function SocialIcons({ items, variant }: SocialIconsProps) {
  if (variant === "hero") {
    // mockup line 44: 36px round icon buttons, icon 18px
    // style: display flex, align/justify center, w/h 36px, color #6b6b66, border-radius 999px, transition 0.18s
    // style-hover: color #2b9fe0, background #e3f2fc, transform translateY(-2px)
    return (
      <div className="flex gap-[6px]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            aria-label={item.label}
            className="flex items-center justify-center w-9 h-9 text-muted rounded-full transition-all duration-[180ms] ease-linear hover:text-accent hover:bg-sky hover:-translate-y-0.5"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={item.path} />
            </svg>
          </a>
        ))}
      </div>
    );
  }

  // variant === "footer"
  // mockup line 198: text labels, font-size 14.5px, font-weight 500, color #b3b3ac
  // style-hover: color #fafafa
  return (
    <div className="flex gap-[22px]">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14.5px] font-medium text-[#b3b3ac] transition-colors duration-[180ms] ease-linear hover:text-[#fafafa]"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
