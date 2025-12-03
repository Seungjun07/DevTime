import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";
import symbolLogo from "./../assets/Symbol-Logo.png";
import { useEffect, useRef, useState } from "react";
import DuplicatedModal from "../components/modal/duplicated-modal";
import { useSignIn } from "../hooks/mutations/auth/use-sign-in";
import { useAuthStore } from "../store/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  function validateEmail(emailValue: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim() || !emailRegex.test(emailValue)) {
      return "이메일 형식으로 작성해 주세요.";
    }

    return "";
  }

  function validatePassword(passwordValue: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordValue.trim() || !passwordRegex.test(passwordValue)) {
      return "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.";
    }

    return "";
  }

  useEffect(() => {
    const emailError = emailTouched ? validateEmail(email) : "";
    const passwordError = passwordTouched ? validatePassword(password) : "";

    setErrors({ email: emailError, password: passwordError });
  }, [email, password, emailTouched, passwordTouched]);

  const isValid = !validateEmail(email) && !validatePassword(password);
  // function validate() {
  //   const newErrors: LoginError = {};

  //   if (email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     newErrors.email = ERROR.email;
  //   }

  //   if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
  //     newErrors.password = ERROR.password;
  //   }

  //   return newErrors;
  // }
  const [isDuplicateLogin, setIsDuplicateLogin] = useState(false);
  const setTokens = useAuthStore((state) => state.actions.setTokens);

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      if (data.isDuplicateLogin) {
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
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    signIn({ email, password });
  }

  function onClose() {
    setIsDuplicateLogin(false);
  }
  //   } catch (error) {
  //     alert("로그인 정보를 다시 확인해 주세요");
  //     emailRef.current?.focus();
  //     setPassword("");
  //   }

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
          <div className="flex h-[94px] w-82 flex-col gap-2">
            <label
              className="w-full text-[14px] leading-[18px] font-medium"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-1 text-4 text-disabled-300 border bg-gray-50 px-4 py-3 leading-5 font-medium ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
              id="email"
              placeholder="이메일 주소를 입력해주세요."
              type="email"
              onBlur={() => setEmailTouched(true)}
            />
            {errors.email && (
              <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex h-[94px] w-82 flex-col gap-2">
            <label
              className="w-full text-[14px] leading-[18px] font-medium"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              className={`rounded-1 text-4 text-disabled-300 border bg-gray-50 px-4 py-3 leading-5 font-medium ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
              id="password"
              placeholder="비밀번호를 입력해주세요."
              type="password"
            />
            {errors.password && (
              <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          <button
            disabled={!isValid}
            onClick={handleSignIn}
            className={` ${isValid ? "bg-primary-blue text-white hover:bg-blue-600" : "bg-disabled-400 text-disabled-300 cursor-not-allowed"} h-12 w-82 cursor-pointer rounded px-4 py-3`}
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="text-primary-blue pretendard cursor-pointer text-[14px] leading-[18px] font-medium"
          >
            회원가입
          </button>
        </div>
      </div>
      {isDuplicateLogin && <DuplicatedModal close={onClose} />}
    </div>
  );
}
