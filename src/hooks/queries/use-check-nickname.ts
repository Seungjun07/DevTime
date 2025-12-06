import { useQuery } from "@tanstack/react-query";
import { checkNickname } from "../../api/sign-up";

export function useCheckNickname(nickname: string) {
  return useQuery({
    queryFn: () => checkNickname(nickname),
    queryKey: ["nickname", nickname],
    retry: 0,
    enabled: false,
  });
}
