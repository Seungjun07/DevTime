import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";
import symbolLogo from "./../assets/Symbol-Logo.png";
import Button from "../components/common/Button";
import { useAuthStore } from "../store/auth";
import { useModalStore } from "../store/modals";
import { useSignInForm } from "../features/auth/hooks/useSignInForm";
import { useSignIn } from "../features/auth/hooks/useSignIn";
import TextField from "../components/common/TextField/TextField";
import type { LoginResponse } from "@/features/auth/types/auth";

export default function SignInPage() {
  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, handleBlur } = useSignInForm();
  const { openConfirmModal, openAlertModal } = useModalStore();

  const emailRef = useRef<HTMLInputElement>(null);

  const setTokens = useAuthStore((state) => state.actions.setTokens);

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      if (data.isDuplicateLogin) {
        openConfirmModal({
          title: "중복 로그인이 불가능합니다.",
          description:
            "다른 기기에 중복 로그인 한 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다.",
          onConfirm: () => {
            successLogin(data);
          },
          confirmText: "확인",
        });

        return;
      }

      successLogin(data);
    },
    onError: (data) => {
      if (!data.success) {
        openAlertModal({
          title: "로그인 정보를 다시 확인해 주세요.",
          confirmText: "확인",
        });
      }
    },
  });

  function successLogin(data: LoginResponse) {
    setTokens(data);

    if (data.isFirstLogin) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  async function handleSignIn() {
    if (!isValid) return;

    signIn({ email: values.email, password: values.password });
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${symbolLogo})`,
        backgroundSize: "1090px 530px",
        backgroundPosition: "right 0px top 60px",
      }}
    >
      <div className="m-auto flex h-[598px] w-[500px] flex-col items-center justify-center rounded-xl bg-white/50 shadow-[0_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[50px]">
        <img className="mb-12 h-25 w-33" src={logo} alt="DevTime의 로고" />

        <div className="flex flex-col gap-9">
          <TextField id="email" className="w-82">
            <TextField.Label>이메일</TextField.Label>

            <TextField.Input
              ref={emailRef}
              type="email"
              onBlur={() => handleBlur("email")}
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={"이메일 주소를 입력해주세요."}
              state={errors.email ? "error" : "default"}
              inputSize={"md"}
              className="w-82"
            />
            {errors.email && (
              <TextField.HelperText status={"error"}>
                {errors.email}
              </TextField.HelperText>
            )}
          </TextField>

          <TextField id="password" className="w-82">
            <TextField.Label>비밀번호</TextField.Label>

            <TextField.Input
              // ref={emailRef}
              type="password"
              onBlur={() => handleBlur("password")}
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder={"비밀번호를 입력해주세요."}
              state={errors.password ? "error" : "default"}
              inputSize={"md"}
            />
            {errors.password && (
              <TextField.HelperText status={"error"}>
                {errors.password}
              </TextField.HelperText>
            )}
          </TextField>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          <Button
            onClick={handleSignIn}
            variant={"primary"}
            size={"login"}
            disabled={!isValid}
          >
            로그인
          </Button>
          <button
            onClick={() => navigate("/sign-up")}
            className="text-primary-blue pretendard cursor-pointer text-[14px] leading-[18px] font-medium"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
