# MDX Typography QA Checklist

This checklist keeps blog and project MDX reading quality consistent after style changes.

## Target Rhythm

- Content measure: 70ch (`--mdx-content-measure`)
- Body size: clamp(1rem, 0.98rem + 0.12vw, 1.04rem)
- Body line-height: 1.8
- Heading scale:
  - h1: clamp(2rem, 1.72rem + 1.1vw, 2.25rem)
  - h2: clamp(1.58rem, 1.42rem + 0.86vw, 1.86rem)
  - h3: clamp(1.28rem, 1.18rem + 0.58vw, 1.5rem)
  - h4: clamp(1.12rem, 1.06rem + 0.35vw, 1.24rem)

## Route Checks

1. Open one blog post and one project detail page.
2. Confirm both use the same `.article-prose` treatment.
3. Confirm heading anchor offsets are correct when jumping from TOC.

## Visual Checks

1. H1 feels clearly dominant and sits close to the intro paragraph.
2. H2 and H3 have clear hierarchy and section spacing.
3. Paragraphs are readable in long blocks and do not feel cramped.
4. Bullets and ordered lists have clear indentation and marker contrast.
5. Links are distinguishable from body text in normal, hover, visited, and focus-visible states.
6. Inline code is readable and does not overpower body text.
7. Code blocks have clear boundaries and horizontal scroll behavior.
8. Blockquotes are visually separated but still integrated with article tone.
9. Tables render with visible borders and consistent cell spacing.

## Theme Checks

1. Verify readability in light mode.
2. Verify readability in dark mode.
3. Ensure link and code contrast remains acceptable in both themes.

## Breakpoint Checks

1. 320px: no horizontal page overflow from prose elements.
2. 375px: list indentation and code blocks remain usable.
3. 768px: heading rhythm feels balanced for tablet reading.
4. 1024px+: measure remains comfortable and not too wide.

## Content Fixtures

Use these files for consistent checks:

- `src/content/blog/building-modern-portfolio.mdx`
- `src/content/blog/competitive-programming-better-engineer.mdx`
- `src/content/projects/code-verse.mdx`
- `src/content/projects/scribble-verse.mdx`
