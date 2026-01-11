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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const errors = {
    email: touched.email ? validateEmail(email) : "",
    password: touched.password ? validatePassword(password) : "",
  };

  const isFormValid = email && password && !errors.email && !errors.password;

  const [isDuplicateLogin, setIsDuplicateLogin] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const setTokens = useAuthStore((state) => state.actions.setTokens);

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      if (data.isDuplicateLogin) {
        setLoginData(data);
        setIsDuplicateLogin(true);
        return;
      }

      setTokens(data);

      if (data.isFirstLogin) {
        navigate("/profile", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
  });

  async function handleSignIn() {
    if (!isFormValid) return;

    signIn({ email, password });
  }

  function onConfirm(data: LoginData) {
    setTokens(data);
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
          <TextField label="이메일" htmlFor="email" className="w-82">
            <TextFieldInput
              ref={emailRef}
              id="email"
              type="email"
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"이메일 주소를 입력해주세요."}
              variant={"default"}
              inputSize={"md"}
              className="w-82"
            />
            {errors.email && (
              <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
                {errors.email}
              </p>
            )}
          </TextField>

          <TextField label="비밀번호" htmlFor="password" className="w-82">
            <TextFieldInput
              // ref={emailRef}
              id="password"
              type="password"
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"비밀번호를 입력해주세요."}
              variant={"default"}
              inputSize={"md"}
            />
            {errors.password && (
              <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
                {errors.password}
              </p>
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
        <DuplicatedModal
          close={() => {
            onConfirm(loginData!);
            setIsDuplicateLogin(false);
          }}
        />
      )}
    </div>
  );
}
