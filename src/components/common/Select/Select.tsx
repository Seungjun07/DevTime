interface Option<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  id: string;
  value: T | "";
  options: readonly Option<T>[];
  placeholder: string;
  onChange: (value: T) => void;
  className?: string;
}

export default function Select<T extends string>({
  id,
  value,
  options,
  placeholder,
  onChange,
  className,
}: SelectProps<T>) {
  return (
    <select
      id={id}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value as T)}
      className={`placeholder-custom ${className} rounded bg-gray-50 px-4 py-3`}
    >
      <option value={""} disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

{
  // onChange={(e) =>
  //   setProfileForm((prev) => ({ ...prev, career: e.target.value }))
  // }
  /* <option value={""}>개발 경력을 선택해 주세요.</option>
<option value={"경력 없음"}>경력 없음</option>
<option value={"0 - 3년"}>0-3년</option>
<option value={"4 - 7년"}>4-7년</option>
<option value={"8 - 10년"}>8-10년</option>
<option value={"11년 이상"}>11년 이상</option> */
}
