import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/signup";
import { useNavigate } from "react-router-dom";

export function useSignupMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data.success) navigate("/sign-in");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
