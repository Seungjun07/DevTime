import { useEffect, useRef, useState } from "react";
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
  //   const [seconds, setSeconds] = useState(0);
  //   const [isRunning, setIsRunning] = useState(false);
  //   const intervalRef = useRef<number | null>(null);

  //   const toggleTimer = () => {
  //     if (isRunning) {
  //       clearInterval(intervalRef.current!);
  //       setIsRunning(false);
  //     } else {
  //       setIsRunning(true);
  //       intervalRef.current = setInterval(
  //         () => setSeconds((prev) => prev + 1),
  //         1000,
  //       );
  //     }
  //   };

  //   const timerReset = () => {
  //     clearInterval(intervalRef.current!);
  //     setIsRunning(false);
  //     setSeconds(0);
  //   };

  //   const formatTime = (sec: number) => {
  //     const hour = Math.floor(sec / 3600)
  //       .toString()
  //       .padStart(2, "0");
  //     const minute = Math.floor((sec % 3600) / 60)
  //       .toString()
  //       .padStart(2, "0");
  //     const s = (sec % 60).toString().padStart(2, "0");

  //     return { hour, minute, s };
  //   };

  //   const { hour, minute, s } = formatTime(seconds);

  //   useEffect(() => {
  //     return () => {
  //       if (intervalRef.current) clearInterval(intervalRef.current);
  //     };
  //   }, []);

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
