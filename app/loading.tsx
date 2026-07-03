export default function Loading() {
  return (
    <div className="min-h-screen bg-mist px-4 py-16">
      <div className="container-pad">
        <div className="h-24 animate-pulse rounded-lg bg-white shadow-soft" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-white shadow-soft" />
          <div className="h-96 animate-pulse rounded-lg bg-white shadow-soft" />
        </div>
      </div>
    </div>
  );
}
