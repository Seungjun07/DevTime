import startIcon from "@/assets/Start.png";
import enabledStartIcon from "@/assets/Start-enabled.png";
import pauseIcon from "@/assets/Pause.png";
import enabledPauseIcon from "@/assets/Pause-enabled.png";
import finishIcon from "@/assets/Finish.png";
import enabledFinishIcon from "@/assets/Finish-enabled.png";
import resetIcon from "@/assets/Reset.png";
import todoIcon from "@/assets/TODO.png";
import { useTimerStore } from "@/store/timer";

interface TimerControlsProps {
  timerId: string;
  seconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onFinish: () => void;
  onReset: () => void;
  onOpenTask: () => void;
}

export default function TimerControls({
  timerId,
  seconds,
  isRunning,
  onStart,
  onPause,
  onFinish,
  onReset,
  onOpenTask,
}: TimerControlsProps) {
  return (
    <div className="relative flex items-center gap-[134px]">
      <div className="m-auto flex items-end justify-end gap-20">
        <button className="cursor-pointer" onClick={onStart}>
          <img
            src={isRunning ? enabledStartIcon : startIcon}
            alt="타이머 시작 버튼"
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={onPause}
          disabled={!timerId}
        >
          <img
            src={isRunning ? pauseIcon : enabledPauseIcon}
            alt="타이머 중지 버튼"
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={onFinish}
          disabled={!timerId}
        >
          <img
            src={seconds ? finishIcon : enabledFinishIcon}
            alt="타이머 종료 버튼"
          />
        </button>
      </div>

      {timerId && (
        <div className="absolute right-0 flex gap-6">
          <button
            onClick={onOpenTask}
            title="할 일 목록"
            className="h-16 w-16 cursor-pointer rounded-4xl bg-white p-2"
          >
            <img
              src={todoIcon}
              className="object-cover"
              alt="할 일 목록 아이콘"
            />
          </button>
          <button
            title="초기화"
            onClick={onReset}
            className="h-16 w-16 cursor-pointer rounded-4xl bg-white p-2"
          >
            <img src={resetIcon} className="object-cover" alt="초기화 아이콘" />
          </button>
        </div>
      )}
    </div>
  );
}
