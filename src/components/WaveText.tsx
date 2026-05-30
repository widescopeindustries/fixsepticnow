"use client";

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = "" }: WaveTextProps) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={`wave-text ${className}`}>
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        const wordStart = charIndex;
        charIndex += chars.length;
        if (wordIdx < words.length - 1) charIndex += 1;

        return (
          <span key={wordIdx} style={{ whiteSpace: "nowrap", display: "inline-block" }}>
            {chars.map((char, i) => (
              <span
                key={i}
                style={{
                  animationDelay: `${(wordStart + i) * 0.03}s`,
                }}
              >
                {char}
              </span>
            ))}
            {wordIdx < words.length - 1 && (
              <span style={{ animationDelay: `${(wordStart + chars.length) * 0.03}s` }}>
                {" "}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
