interface QuickAnswerProps {
  question: string;
  answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
  return (
    <div className="bg-green-50 border-l-4 border-green-600 rounded-r-lg p-5 my-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-1">Quick Answer</p>
      <p className="font-bold text-slate-900 text-lg mb-2">{question}</p>
      <p className="text-slate-700 leading-relaxed">{answer}</p>
    </div>
  );
}
