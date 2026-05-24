export interface NavLink {
  label: string;
  href: string;
}

/** Top-level page navigation (shown in the top navbar) */
export const topNavLinks: NavLink[] = [
  // { label: "Portfolio", href: "/" },
  // { label: "Blog", href: "/blog" },
];

/** Section-level navigation (shown in the sticky bottom bar on the portfolio page) */
export const sectionNavLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
