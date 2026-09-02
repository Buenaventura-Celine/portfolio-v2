import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Kwentuhan from "@/components/Kwentuhan";
import { getAllPosts } from "@/content/blog";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Kwentuhan posts={posts} />
      </main>
    </>
  );
}
