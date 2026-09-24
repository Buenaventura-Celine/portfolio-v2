import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Francine",
  description: "A letter.",
  robots: { index: false, follow: false },
};

/* ---------- Letter content ---------- */

const body = [
  "Dimunyu ka. Bakit ngayon ka lang kasi dumating? This could've happened sooner. Sana mas marami tayong na-close through handshakes. I'm usually awkward around new people, but I don't know what it is about you that made me feel comfortable so easily. Thank you kasi dumagdag ka sa pahirap ng pag-alis ko.",
  "Thank you for the one-to-one driving lesson. Two things: don't put too much pressure sa manibela, and just switch lanes slowly. Which, now that I think about it, is also a pretty good mindset when traversing life. Don't put too much pressure on yourself. Let the steering wheel do its thing, and remember that you can always switch lanes when you want to. We can also slow down when needed. Thank you Yzabel for the +50exp in driving and living.",
  "This might sound like unsolicited advice, but don't ever let anyone dim your light. You're doing great, and I firmly believe that you'll go places. Tandaan mo na naging favorite ka ni Sun, so ibig sabihin magaling ka. Show them who you are, and I'll support you wherever I go. Salamat sa pagsama mo sa amin na mga immature shits.",
];

/* ---------- Small building blocks ---------- */

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17.5px] leading-[1.75] text-body-text m-0 mb-[16px]">
      {children}
    </p>
  );
}

/* ---------- Page ---------- */

export default function FrancinePage() {
  return (
    <main className="max-w-[1100px] mx-auto px-[24px] md:px-[40px] pt-[56px] md:pt-[80px] pb-[96px]">
      {/* Home */}
      <Link
        href="/"
        className="inline-block font-mono text-[13px] font-medium text-accent hover:text-ink transition-colors mb-[32px] md:mb-[40px]"
      >
        ← home
      </Link>

      {/* Masthead */}
      <header className="mb-[64px] md:mb-[96px]">
        <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent mb-[16px]">
          A letter · for Francine
        </div>
        <h1 className="text-[clamp(36px,7vw,68px)] leading-[1.06] font-bold tracking-[-0.03em] m-0">
          To my least favorite QA,{" "}
          <span className="line-through decoration-[2px] text-accent">
            Francine
          </span>{" "}
          Jonson
        </h1>
        <div className="mt-[32px] h-px bg-line" />
      </header>

      {/* The letter — photo on top, message below */}
      <section className="mb-[24px] md:mb-[32px]">
        <figure className="m-0 mb-[40px] md:mb-[56px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/francine/photo-1.jpeg"
            alt="Francine and me"
            className="w-full h-auto md:max-h-[600px] md:w-auto mx-auto rounded-[16px] border-[1.5px] border-line block"
          />
        </figure>
        <div className="max-w-[680px] mx-auto">
          {body.map((t, i) => (
            <P key={i}>{t}</P>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-[680px] mx-auto">
        <p className="text-[17.5px] leading-[1.75] text-ink font-medium m-0">
          Ayun lang, Francine. Di ako kakanan sa left. Salamat sa playlist and sa treats.{" "}
          <span className="text-accent">♥</span>
        </p>
      </section>
    </main>
  );
}
