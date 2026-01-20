import Select from "../../../../components/common/Select/Select";
import TextField from "../../../../components/common/TextField/TextField";
import { CAREER_OPTIONS } from "../../constants";
import type { Career } from "../../types/types";

interface Props {
  value: Career | "";
  onChange: (value: Career) => void;
  className?: string;
}

export default function CareerSelect({ value, onChange, className }: Props) {
  return (
    <TextField id="career" className={className}>
      <TextField.Label>개발 경력</TextField.Label>
      <Select
        id="career"
        value={value}
        placeholder="개발 경력을 선택해 주세요."
        options={CAREER_OPTIONS}
        onChange={onChange}
      />
    </TextField>
  );
}
