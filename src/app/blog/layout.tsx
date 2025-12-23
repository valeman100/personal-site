import { ReactNode } from "react";
import { BlogExtras } from "../../components/layout/BlogExtras";
import { BlogFooterWrapper } from "@/components/layout/BlogFooterWrapper";

export default function BlogLayout({ children }: { children: ReactNode }) {
  // Add padding-top to account for fixed navbar (h-14 = 3.5rem) + extra spacing
  return (
    <div className="pt-20 min-h-screen">
      <BlogExtras />
      {children}
      <BlogFooterWrapper />
    </div>
  );
}


