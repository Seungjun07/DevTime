import TimerCard from "./timer-card";

export default function StudyTimer({
  hour,
  minute,
  s,
}: {
  hour: string;
  minute: string;
  s: string;
}) {
  return (
    <div className="text-primary-blue flex justify-between gap-12">
      <TimerCard value={hour} label="HOURS" />
      <p>:</p>
      <TimerCard value={minute} label="MINUTES" />
      <p>:</p>
      <TimerCard value={s} label="SECONDS" />
    </div>
  );
}
