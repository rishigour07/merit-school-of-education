import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4">
      <div className="max-w-xl rounded-lg bg-white p-8 text-center shadow-premium">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-royal-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-black text-ink">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page you are looking for is not available on the Merit School
          website.
        </p>
        <Link
          href="/"
          className="focus-ring mt-6 inline-flex rounded-full bg-royal-700 px-6 py-3 text-sm font-black text-white"
        >
          Back to Website
        </Link>
      </div>
    </main>
  );
}
