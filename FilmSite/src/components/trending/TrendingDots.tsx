type Props = {
  count: number;
  current: number;
  onChange: (index: number) => void;
};

export default function TrendingDots({ count, current, onChange }: Props) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onChange(i)}
          className={`rounded-full transition-all ${current === i ? "bg-red-600 w-3 h-3" : "bg-zinc-500 w-2.5 h-2.5"}`}
        />
      ))}
    </div>
  );
}
