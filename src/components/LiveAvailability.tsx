"use client";

interface LiveAvailabilityProps {
  cityName?: string;
}

export function LiveAvailability({ cityName }: LiveAvailabilityProps) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-green-200 mt-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span>A technician is available NOW{cityName ? ` in ${cityName}` : ""}</span>
    </div>
  );
}
