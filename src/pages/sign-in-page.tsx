import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";
import symbolLogo from "./../assets/Symbol-Logo.png";
import { useEffect, useRef, useState } from "react";
import DuplicatedModal from "../components/modal/duplicated-modal";
import { useSignIn } from "../hooks/mutations/auth/use-sign-in";
import { useAuthStore } from "../store/auth";
import { type LoginData } from "../types";
import Button from "../components/common/Button";
import TextFieldInput from "../components/common/TextField/TextFieldInput";
import TextField from "../components/common/TextField/TextField";
import { validateEmail, validatePassword } from "../utils/validate";

export default function SignInPage() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = {
    email: touched.email ? validateEmail(email) : "",
    password: touched.password ? validatePassword(password) : "",
  };

  const isFormValid = email && password && !errors.email && !errors.password;

  const setTokens = useAuthStore((state) => state.actions.setTokens);
  const [isDuplicateLogin, setIsDuplicateLogin] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      if (data.isDuplicateLogin) {
        setLoginData(data);
        setIsDuplicateLogin(true);
        return;
      }

      successLogin(data);
    },
  });

  function successLogin(data: LoginData) {
    setTokens(data);

    if (data.isFirstLogin) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  async function handleSignIn() {
    if (!isFormValid) return;

    signIn({ email, password });
  }

  function handleDuplicateConfirm() {
    if (!loginData) return;

    successLogin(loginData);
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
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <TextFieldInput
              // ref={emailRef}
              id="password"
              type="password"
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            disabled={!isFormValid}
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
      {isDuplicateLogin && (
        // <Dialog
        //   isOpen={showLoginModal}
        //   title="중복 로그인이 불가능합니다."
        //   description="다른 기기에 중복 로그인 한 상태입니다. [확인] 버튼을 누르면 다른
        //     기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
        //     삭제됩니다."
        //   onCancel={handleModalClose}
        //   onConfirm={handleMoveToSignIn}
        //   confirmText="로그인하기"
        // />
        <DuplicatedModal
          close={() => {
            handleDuplicateConfirm();
            setIsDuplicateLogin(false);
          }}
        />
      )}
    </div>
  );
}
