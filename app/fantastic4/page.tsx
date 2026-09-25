import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For D' Fantastic 4",
  description: "A letter.",
  robots: { index: false, follow: false },
};

/* ---------- Letter content ---------- */

const intro = [
  "Hindi ko naman kayo ka-team, pero mas naging close pa ako sa inyo. Ewan ko rin ba kung bakit. Sino ang papansin sa atin? Syempre, ako.",
];

const anshun = [
  "Salamat dahil binuhay ka ng nanay mo. Hindi ko kaya nang walang kabardagulan, kaya maraming salamat at dumating ka. You may be the odd one, but take that as a compliment because you have what it takes to be extraordinary amongst all of us (ikaw lang ang may tendency na maging kriminal). Pag naging milyonaryo ako, papagamot ko tenga mo. Know that everything happening to you right now is happening at exactly the right time, no more, no less. Everything will make sense eventually, I promise.",
];

const vincentJimpaul = [
  "Southies represent! Ahoo, ahoo!! Thank you sa inyong dalawa dahil lagi akong may kasabay umuwi kapag nalalate na tayo dahil sa chismisan. To Sir Vincent, the number one tank in the whole world, thank you po sa pagbuhat sa akin sa ML. Sana palaging maluwag ang sched mo at tulungan mo na ako maging immortal. I admire how you stand firm on the things you believe in and know to be right. Please continue doing that. To Jimpaul, my president, salamat sa paglaglag kay Vincent kaya nagkakaroon kami ng chismis. Remember the camera orientation thing? Those were good times, pero huwag na sana natin ulitin pa. I'm always amazed by how much effort you put into the things you're passionate about. Tuloy mo lang, and dedma ka na sa bashers. Magmahalan pa sana kayong higit na dalawa.",
];

const julia = [
  "Di ko alam bakit sa section na 'to ka napasama, pero I think mabuti na rin 'to so I can keep things light, dahil kapag ikaw ang kausap ko, para akong may kausap na therapist. Thank you for helping me unravel things. Thank you for that little knock that made me realize that there's still so much left to explore in life, and maybe that's what makes it exciting. I promise not to be a stranger. You keep going, girl. I hope life takes you wherever you're meant to be. Sana magawa mo lahat ng gusto mo sa buhay.",
];

/* ---------- Small building blocks ---------- */

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17.5px] leading-[1.75] text-body-text m-0 mb-[16px]">
      {children}
    </p>
  );
}

function To({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[24px] md:text-[28px] leading-[1.2] font-bold tracking-[-0.02em] text-ink mb-[16px]">
      To {children},
    </div>
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

export default function Fantastic4Page() {
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
      <header className="mb-[48px] md:mb-[72px]">
        <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent mb-[16px]">
          A letter · for D' Fantastic 4
        </div>
        <h1 className="text-[clamp(36px,7vw,68px)] leading-[1.06] font-bold tracking-[-0.03em] m-0">
          To D' EMM Ninja Turtles,{" "}
          <span className="text-accent">D' Fantastic 4</span>
        </h1>
        <div className="mt-[32px] h-px bg-line" />
      </header>

      {/* Intro — text only, full width */}
      <section className="mb-[32px] md:mb-[40px]">
        {intro.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </section>

      {/* Anshun — photo left */}
      <Spread src="/images/fantastic4/photo-1.jpg" alt="Anshun">
        <To>Anshun</To>
        {anshun.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Vincent and Jim Paul — photo right */}
      <Spread src="/images/fantastic4/photo-2.jpg" alt="Vincent and Jim Paul" flip>
        <To>Vincent and Jim Paul</To>
        {vincentJimpaul.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Julia — photo left */}
      <Spread src="/images/fantastic4/photo-3.jpg" alt="Julia">
        <To>Julia</To>
        {julia.map((t, i) => (
          <P key={i}>{t}</P>
        ))}
      </Spread>

      {/* Closing — text only, full width */}
      <section>
        <p className="text-[17.5px] leading-[1.75] text-ink font-medium m-0">
          Ayun lang, guys. Magtrabaho na kayo ulit. See you around.
        </p>
      </section>
    </main>
  );
}
