// import { useState } from "react";

// export default function TodosModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="relative flex h-screen w-screen items-center justify-center">
//       <button onClick={() => setIsOpen(true)}>모달열기</button>
//       {isOpen && (
//         <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           {/* 모달 박스 */}
//           <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
//             <h2 className="mb-4 text-xl font-bold">모달 제목</h2>
//             <p className="mb-4">여기에 내용이 들어갑니다.</p>
//             <button
//               className="rounded bg-red-500 px-4 py-2 text-white"
//               onClick={() => setIsOpen(false)}
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
