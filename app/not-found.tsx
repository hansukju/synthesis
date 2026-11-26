import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-10 lg:px-16 xl:px-20">
      <SiteHeader onHome={false} />
      <main id="main-content" className="flex-1 py-16 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted">We couldn’t find the page you requested.</p>
        <Link href="/" className="mt-6 inline-block font-semibold underline underline-offset-4">Back to Discover</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
