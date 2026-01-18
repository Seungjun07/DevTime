import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { checkEmail, checkNickname } from "../../features/signup/api/signup";

export function useCheckEmail(email: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SIGN_UP.emailCheck(email),
    queryFn: () => checkEmail(email),
    enabled: false,
    retry: 0,
  });
}

export function useCheckNickname(nickname: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SIGN_UP.nicknameCheck(nickname),
    queryFn: () => checkNickname(nickname),
    enabled: false,
    retry: 0,
  });
}
