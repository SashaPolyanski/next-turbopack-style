export function SkeletonCard() {
  // const isClient = useIsClient();
  if (typeof window === 'undefined') return null;
  return (
    <div
      role="status"
      className="min-h-[340px] animate-pulse rounded-lg bg-black p-4 p-sm-4-vw opacity-75 sm:p-7 sm:pt-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2.5 h-4 w-24 rounded-full bg-gray-dark" />
          <div className="h-5 w-32 rounded-full bg-gray-dark" />
        </div>
        <div className="h-4 w-48 rounded-full bg-gray-dark" />
      </div>
      <div className="my-8 mb-2.5 h-4 rounded-full bg-gray-dark" />
      <div className="mb-2.5 h-4 rounded-full bg-gray-dark" />
      <div className="mb-10 h-4 rounded-full bg-gray-dark" />
      <div className="mt-4 flex items-center">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export function SkeletoThreeCard() {
  return (
    <div className="max-w-sm:gor-scroll sm:grid sm:grid-cols-1 sm:gap-3 md:grid md:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
