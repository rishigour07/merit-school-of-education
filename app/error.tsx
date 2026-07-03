"use client";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4">
      <div className="max-w-xl rounded-lg bg-white p-8 text-center shadow-premium">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-royal-600">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-black text-ink">
          We could not load this page.
        </h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
          {error.message || "Please try again in a moment."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="focus-ring mt-6 rounded-full bg-royal-700 px-6 py-3 text-sm font-black text-white"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
