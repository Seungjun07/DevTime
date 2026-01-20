import TextField from "../../../../components/common/TextField/TextField";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}
export default function StudyGoalField({
  value,
  onChange,
  placeholder = "공부 목표를 입력해 주세요.",
}: Props) {
  return (
    <TextField id="studyGoal">
      <TextField.Label>공부 목표</TextField.Label>
      <TextField.Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </TextField>
  );
}
