import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Category = "Technical" | "Life";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  description: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const posts: PostMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      category: data.category as Category,
      description: data.description as string,
    };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
  const file = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title as string,
    date: data.date as string,
    category: data.category as Category,
    description: data.description as string,
  };
  return { meta, content };
}
