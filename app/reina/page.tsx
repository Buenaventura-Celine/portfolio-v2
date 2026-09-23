import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Reina",
  description: "A letter.",
  robots: { index: false, follow: false },
};

/* ---------- Letter content ---------- */

const part1 = [
  "This is one of my favorite pictures of us because it reminds me of how we somehow always ended up beside each other. I don't know if it was just coincidence, but I'm really glad it happened that way. That night felt so heavy for me dahil ayan yung time na break na kami ni August, pero hindi ko pa masabi sa inyo. I was trying to run away from the crowd, pero tabi ka kasi nang tabi sa akin. I remember that night because, for a while, everything felt light again. I never thought that would just be the beginning.",
];

const part2a = [
  "Here's to our time in LU, the retreat of a lifetime. Naalala ko, nag-umpisa ito dahil gusto kitang gayahin na magsolo travel, hanggang sa naging ganito na. Thank you kasi tama ka, ang laki ng mundo, and there's really a life ahead of all of us. You were one of the people who made me look at life in a different light and see things from a different perspective. Ikaw yung nagparealize sa akin kung paano maging understanding.",
];

const part2b = [
  "For me, the world was so cruel at that time, so I wanted to be cruel too. But you helped me not to, because you reminded me that kindness can still flow within us. Pinakita niyo sa akin na even how messy I am at that time, you would still choose not to leave me behind.",
  "Anyways, ulitin natin ito please. Sobrang dami kong tawa dito na hanggang ngayon naaalala ko pa rin. Seems like natagpuan ni Jose si Wally. I hope we can keep this humor going.",
];

const part3 = [
  "So for the last picture, which happened very recently. Once again, you were there to hug me. Naiyak din talaga ako nung gabing yan. Ito yung time na sobra yung doubt ko sa sarili ko because I felt like I was being left behind. Feeling ko wala nang magandang nangyayari sa buhay ko.",
  "Thank you for being the person I can borrow confidence from. Mabilis kasi talaga akong mag-doubt sa sarili ko, but thank you because I can openly talk about these things with you, and you never get tired of lifting me back up. Intern pa lang ako, ikaw na yung isa sa mga unang taong nakakita ng best in me. Know that you will always gonna be my OG mentor, and I think a part of who I am now started with you believing in me before I knew how to believe in myself.",
  "So I dedicate this win to you. I don't think I would have shown up the way I did if you hadn't been there to guide me and remind me that I am the best. Please always be there to watch me fail successfully. This is just one of many. I hope that I made you proud.",
];

const closing =
  "Sun, wag mo na ako iiwan, please, kasi parang hindi ko na kaya. Ang dull ng buhay if wala ka. But I know none of this is really within our control. What's important is that I found you, and I got to experience this life with you. Ang sarap-sarap tumawa.";

/* ---------- Small building blocks ---------- */

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17.5px] leading-[1.75] text-body-text m-0 mb-[16px]">
      {children}
    </p>
  );
}

interface SpreadProps {
  src: string;
  alt: string;
  flip?: boolean;
  children: React.ReactNode;
}

function Spread({ src, alt, flip, children }: SpreadProps) {
  return (
    <section className="grid md:grid-cols-2 gap-[32px] md:gap-[56px] items-start mb-[56px] md:mb-[80px]">
      <figure
        className={`m-0 self-start md:sticky md:top-[40px] ${flip ? "md:order-2" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto md:w-auto md:max-h-[520px] mx-auto rounded-[16px] border-[1.5px] border-line block"
        />
      </figure>
      <div className={flip ? "md:order-1" : ""}>{children}</div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function ReinaPage() {
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
          A letter · for Reina
        </div>
        <h1 className="text-[clamp(36px,7vw,68px)] leading-[1.06] font-bold tracking-[-0.03em] m-0">
          Sa pinakamabait kong ate, Reina
        </h1>
        <div className="mt-[32px] h-px bg-line" />
      </header>

      {/* Part 1 — photo left */}
      <Spread src="/images/reina/photo-1.jpg" alt="Reina and me, always beside each other">
        {part1.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Part 2 — photo right */}
      <Spread src="/images/reina/photo-2.jpg" alt="Our retreat in LU" flip>
        {part2a.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
        {part2b.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Part 3 — photo left */}
      <Spread src="/images/reina/photo-3.jpg" alt="You, there to hug me again">
        {part3.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Part 4 — closing, text only, full width */}
      <section>
        <P>{closing}</P>
        <p className="text-[17.5px] leading-[1.75] text-ink font-medium m-0">
          Thank you, Sun. Mahal kita palagi.{" "}
          <span className="italic text-accent">*Laplap*</span>
        </p>
      </section>
    </main>
  );
}
