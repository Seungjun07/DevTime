import Select from "../../../../components/common/Select/Select";
import TextField from "../../../../components/common/TextField/TextField";
import { PURPOSE_OPTIONS } from "../../constants";
import type { PurposeOption } from "../../types/types";

interface Props {
  selectValue: PurposeOption | "";
  detailValue: string;
  onSelectChange: (value: PurposeOption) => void;
  onDetailChange: (value: string) => void;
  className?: string;
}

export default function StudyPurposeSelect({
  selectValue,
  detailValue,
  onSelectChange,
  onDetailChange,
  className,
}: Props) {
  const isEtc = selectValue === "기타";

  return (
    <div className="flex flex-col gap-2">
      <TextField id="purpose">
        <TextField.Label>공부 목적</TextField.Label>
        <Select
          id="purpose"
          options={PURPOSE_OPTIONS}
          value={selectValue}
          onChange={onSelectChange}
          placeholder="공부의 목적을 선택해 주세요."
        />
      </TextField>

      {isEtc && (
        <TextField id="purposeDetail">
          <TextField.Input
            placeholder="직접 입력"
            value={detailValue}
            onChange={(e) => onDetailChange(e.target.value)}
          />
        </TextField>
        //   className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
      )}
    </div>
  );
}
