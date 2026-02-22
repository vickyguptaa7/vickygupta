export const AppLinks = {
  // Social links
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",

  // Navigation
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
} as const;

export type AppLinkKey = keyof typeof AppLinks;
