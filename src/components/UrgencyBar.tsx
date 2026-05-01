"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface UrgencyBarProps {
  cityName?: string;
}

function getNextSlot() {
  const now = new Date();
  const hour = now.getHours();
  let label: string;
  let slots: number;

  if (hour < 8) {
    label = "Today at 8:00 AM";
    slots = 3;
  } else if (hour < 12) {
    label = "Today at 12:00 PM";
    slots = 2;
  } else if (hour < 16) {
    label = "Today at 4:00 PM";
    slots = 2;
  } else if (hour < 20) {
    label = "Today at 8:00 PM";
    slots = 1;
  } else {
    label = "Tomorrow at 8:00 AM";
    slots = 3;
  }

  return { label, slots };
}

export function UrgencyBar({ cityName }: UrgencyBarProps) {
  const [slot, setSlot] = useState(getNextSlot());

  useEffect(() => {
    const interval = setInterval(() => {
      setSlot(getNextSlot());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-amber-50 border-y border-amber-200 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium text-amber-800">
        <Clock className="h-4 w-4 flex-shrink-0" />
        <span>
          Next available appointment{cityName ? ` in ${cityName}` : ""}: <strong>{slot.label}</strong> — <span className="text-red-600 font-bold">{slot.slots} slot{slot.slots > 1 ? "s" : ""} remaining</span>
        </span>
      </div>
    </div>
  );
}
