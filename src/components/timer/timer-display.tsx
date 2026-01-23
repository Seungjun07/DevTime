import { formatTimeMainPage } from "../../utils/time";
import TimerCard from "./timer-card";

export default function TimerDisplay({ time }: { time: number }) {
  const { hours, minutes, seconds } = formatTimeMainPage(time);

  return (
    <div className="text-primary-blue flex justify-between gap-12">
      <TimerCard value={hours} label="HOURS" />
      <span>:</span>
      <TimerCard value={minutes} label="MINUTES" />
      <span>:</span>
      <TimerCard value={seconds} label="SECONDS" />
    </div>
  );
}
