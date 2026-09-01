export type Tag = { name: string; bg: string; fg: string };
export type Project = {
  name: string;
  kind: string;
  desc: string;
  img: string; // /images/... path in public (placeholder if none yet)
  tags: Tag[];
  link: string; // github or site or fallback
};

const FALLBACK_LINK = "https://github.com/Buenaventura-Celine";

// Tag styling per mockup lines 212–231:
// tagColor() always returns bg:"#e0f0fb" fg:"#1d7fbd"; name has leading # stripped.
const tag = (name: string): Tag => ({
  name, // no leading #
  bg: "#e0f0fb",
  fg: "#1d7fbd",
});

export const projects: Project[] = [
  {
    name: "San Pedro Website Revamp",
    kind: "gov website",
    desc: "A modern redesign of the City of San Pedro, Laguna government website — improving how residents find services and information online.",
    img: "/images/portfolio/placeholder.svg", // TODO: real screenshot
    tags: [tag("Web"), tag("UI/UX")],
    link: FALLBACK_LINK,
  },
  {
    name: "Mobile Playground",
    kind: "flutter sandbox",
    desc: "A personal learning playground for exploring Flutter concepts, tools, and best practices — a sandbox for experimenting with new packages and testing UI ideas.",
    img: "/images/portfolio/mobile-playground.png",
    tags: [tag("Flutter"), tag("Dart")],
    link: FALLBACK_LINK,
  },
  {
    name: "Flowers by Jan",
    kind: "shop website",
    desc: "A website for a flower shop — browsing arrangements and placing orders, wrapped in a look as fresh as the bouquets.",
    img: "/images/portfolio/placeholder.svg", // TODO: real screenshot
    tags: [tag("Web")],
    link: FALLBACK_LINK,
  },
  {
    name: "J A X | E-Commerce",
    kind: "web app · MERN",
    desc: "A MERN stack web application that is primarily used to sell and buy products. A personal project to broaden my knowledge in full stack web development.",
    img: "/images/portfolio/gallery_7.png",
    tags: [tag("React JS"), tag("Node JS"), tag("Mongo DB"), tag("Express JS")],
    link: "https://github.com/Buenaventura-Celine/E-Commerce-WebApplication",
  },
  {
    name: "Prelumens",
    kind: "thesis · LMS",
    desc: "A learning management system for preschool learning — my thesis project for my Bachelor's Degree in Computer Engineering.",
    img: "/images/portfolio/portfolio_4.png",
    tags: [tag("React Native"), tag("Express JS")],
    link: FALLBACK_LINK,
  },
  {
    name: "Document Request System",
    kind: "web app",
    desc: "Helps residents request documents from their barangay from the comfort of home, without putting their health at risk.",
    img: "/images/portfolio/portfolio_3.png",
    tags: [tag("React JS"), tag("Django"), tag("Material UI"), tag("Figma")],
    link: FALLBACK_LINK,
  },
];
