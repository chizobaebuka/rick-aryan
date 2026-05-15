const items = [
  'DPR REGISTERED',
  'NIPEX CERTIFIED',
  'SON REGISTERED',
  'REACH COMPLIANT',
  'ISO 9001:2015',
];

export function TrustBar() {
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-white/10 bg-surface py-2.5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="mx-6 font-label text-[10px] text-muted">
            {t}
            <span className="mx-4 text-secondary/50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
