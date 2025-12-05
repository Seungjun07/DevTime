interface StudyGoalProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function StudyGoalInput({
  value,
  onChange,
  className,
}: StudyGoalProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="studyGoal"
        className="text-[14px] leading-[18px] font-medium text-gray-600"
      >
        공부 목표
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="studyGoal"
        className={`placeholder-custom ${className} rounded bg-gray-50 px-4 py-3`}
        placeholder="공부 목표를 입력해 주세요."
      />
    </div>
  );
}
