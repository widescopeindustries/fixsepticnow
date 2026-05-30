"use client";

export default function UnderwaterBackground() {
  return (
    <>
      <div className="dark-void" aria-hidden="true" />
      <div className="light-shafts" aria-hidden="true">
        <div className="shaft shaft-1" />
        <div className="shaft shaft-2" />
        <div className="shaft shaft-3" />
      </div>
      <div className="bubbles" aria-hidden="true">
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="bubble bubble-4" />
        <div className="bubble bubble-5" />
        <div className="bubble bubble-6" />
      </div>
      <div className="surface-shimmer" aria-hidden="true" />
    </>
  );
}
