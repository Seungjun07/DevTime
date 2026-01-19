import { useState } from "react";
import TextField from "../../../components/common/TextField/TextField";
import type { TechStack } from "../types";

interface TechStackInputProps {
  value: string;
  suggestions: TechStack[];
  onChange: (value: string) => void;
  onSelect: (stack: TechStack) => void;
  onCreate: () => void;
}

export default function TechStackInput({
  value,
  suggestions,
  onChange,
  onCreate,
  onSelect,
}: TechStackInputProps) {
  return (
    <TextField id="studyStack" className="relative">
      <TextField.Label>공부/사용 중인 기술 스택</TextField.Label>
      <TextField.Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="기술 스택을 검색해 등록해 주세요."
      />

      {value.trim() !== "" && (
        <ul className="scrollbar-hide border-disabled-300 absolute top-full mt-2 w-full space-y-4 overflow-y-auto rounded-[5px] border bg-white px-3 py-4 shadow-[0_8px_8px_0px_rgba(0,0,0,0.5)]">
          {suggestions?.length > 0 &&
            suggestions.map((tech) => (
              <li
                onClick={() => onSelect(tech)}
                className="cursor-pointer text-[16px] leading-5 font-bold hover:bg-gray-100"
                key={tech.id}
              >
                {tech.name}
              </li>
            ))}
          <li
            onClick={onCreate}
            className="text-secondary-indigo cursor-pointer text-[16px] leading-5 font-semibold"
          >
            + Add New Item
          </li>
        </ul>
      )}
    </TextField>
  );
}

// interface ProfileTechStackProps {
//   value: string;
//   onChange: (value: string) => void;
//   onAdd: (value: TechStack) => void;
//   onCreate: () => void;
//   suggestions: TechStack[];
//   className?: string;
// }

// export default function ProfileTechStack({
//   value,
//   onChange,
//   onAdd,
//   onCreate,
//   suggestions,
//   className,
// }: ProfileTechStackProps) {
//   return (
//     <div className="relative flex flex-col gap-2">
//       <label
//         htmlFor="studyStack"
//         className="text-[14px] leading-[18px] font-medium text-gray-600"
//       >
//         공부/사용 중인 기술 스택(선택)
//       </label>
//       <input
//         id="studyStack"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`placeholder-custom ${className} rounded bg-gray-50 px-4 py-3 outline-none`}
//         placeholder="기술 스택을 검색해 등록해 주세요."
//       />

//       {value.trim() !== "" && (
//         <ul className="scrollbar-hide border-disabled-300 absolute top-full mt-2 w-full space-y-4 overflow-y-auto rounded-[5px] border bg-white px-3 py-4 shadow-[0_8px_8px_0px_rgba(0,0,0,0.5)]">
//           {suggestions?.length > 0 &&
//             suggestions.map((tech) => (
//               <li
//                 onClick={() => onAdd(tech)}
//                 className="cursor-pointer text-[16px] leading-5 font-bold hover:bg-gray-100"
//                 key={tech.id}
//               >
//                 {tech.name}
//               </li>
//             ))}
//           <li
//             onClick={onCreate}
//             className="text-secondary-indigo cursor-pointer text-[16px] leading-5 font-semibold"
//           >
//             + Add New Item
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// }
