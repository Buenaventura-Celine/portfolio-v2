import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Doc Bunyi",
  description: "A letter.",
  robots: { index: false, follow: false },
};

/* ---------- Letter content ---------- */

const body = [
  "Hello boss, this is just a simple appreciation for you, nothing grand (sorry kung nagsayang pa ako ng tubig, magtatanim na lang ako ng puno someday).",
  "I just want to say that you are that “spark in a dark room” on the management side. Thank you for being a person for the people. Sana makeep mo yung ganon, knowing na sobrang hirap ng situation mo currently. I know na makulit akong employee, marami akong gustong mangyari, marami akong reklamo, but with you, I feel heard and validated, which makes me more engaged with the company. Thank you din, Doc, for the free “diagnosis”. I know ayaw mo ’tong ginagawa, but don’t worry because I will just take what resonates with me and use it as a guiding light to untangle things on my own. I will not make it an identity. Thank you also for seeking out answers. Magaan siya sa akin knowing na at least one person already knows the real reason behind my leaving. You are doing a good job.",
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

export default function RenzPage() {
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
          A letter · for Doc Bunyi
        </div>
        <h1 className="text-[clamp(36px,7vw,68px)] leading-[1.06] font-bold tracking-[-0.03em] m-0">
          To Doc Bun<span className="text-[0.42em] align-baseline text-accent">y</span>i
        </h1>
        <div className="mt-[32px] h-px bg-line" />
      </header>

      {/* The letter — photo on top, message below */}
      <section className="mb-[24px] md:mb-[32px]">
        <figure className="m-0 mb-[40px] md:mb-[56px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/renz/photo-1.JPG"
            alt="Doc Buny and me"
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
          Thank you, Doc, for considering me one of your friends. Wag mo sana
          baguhin yung pincode sa office. Mabuhay ka, boss amo.{" "}
          <span className="text-accent">Matsala marami</span>
        </p>
      </section>
    </main>
  );
}
