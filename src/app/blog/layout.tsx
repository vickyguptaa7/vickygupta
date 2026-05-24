import { BlogFooter } from "@/components/blog/blog-footer";
import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-route min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main id="main-content" className="min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
