import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/content/blog";
import BlogNav from "@/components/BlogNav";
import { mdxComponents } from "@/components/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let meta;
  try {
    ({ meta } = getPost(slug));
  } catch {
    return {};
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let meta: ReturnType<typeof getPost>["meta"];
  let content: string;
  try {
    ({ meta, content } = getPost(slug));
  } catch {
    notFound();
  }

  return (
    <>
      <BlogNav />
      <article className="max-w-[720px] mx-auto pt-[72px] px-[28px] pb-[90px]">
        <header className="mb-[40px]">
          <div className="flex items-center gap-[12px] mb-[18px]">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent bg-sky px-[11px] py-[4px] rounded-full">
              {meta.category}
            </span>
            <span className="font-mono text-[13px] text-muted-3">
              {meta.date}
            </span>
          </div>
          <h1 className="text-[clamp(34px,5vw,48px)] leading-[1.08] font-bold tracking-[-0.025em] m-0 mb-[16px]">
            {meta.title}
          </h1>
          <div className="font-mono text-[13px] text-muted">
            by Celine Joie V. Buenaventura
          </div>
        </header>

        <div>
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        <footer className="mt-[56px] pt-[28px] border-t border-line flex justify-between items-center flex-wrap gap-[16px]">
          <Link
            href="/#blog"
            className="font-mono text-[13px] font-medium text-accent hover:text-ink transition-colors"
          >
            ← back to all posts
          </Link>
          <div className="font-mono text-[12px] text-muted-3">
            © 2026 Celine Joie V. Buenaventura
          </div>
        </footer>
      </article>
    </>
  );
}
