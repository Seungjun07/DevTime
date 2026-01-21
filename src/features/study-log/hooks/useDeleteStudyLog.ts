import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudyLog } from "../api/studyLog";

export function useDeleteStudyLog() {
  return useMutation({
    mutationFn: deleteStudyLog,
    retry: 0,
  });
}

// export function useDeleteStudyLogs(page: number, limit: number) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteStudyLog,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["studyLogs", page, limit],
//       });
//     },
//   });
// }
