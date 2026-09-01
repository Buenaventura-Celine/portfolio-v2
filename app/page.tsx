import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="about" />
        <section id="projects" />
        <section id="blog" />
      </main>
    </>
  );
}
