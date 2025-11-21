export default function TimerCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br px-2">
      <div className="digit-time">{value}</div>
      <div className="py-9 text-center">{label}</div>
    </div>
  );
}
