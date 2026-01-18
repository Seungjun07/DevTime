import { Link } from "react-router-dom";
import { TERMS } from "../constant";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import TextField from "../components/common/TextField/TextField";
import { useSignupMutation } from "../hooks/mutations/signup/useSignUpMutation";
import {
  useCheckEmail,
  useCheckNickname,
} from "../hooks/queries/useSignUpQueries";
import { useSignUpForm } from "../features/signup/hooks/useSignUpForm";

export default function SignUpPage() {
  const { values, errors, isValid, handleChange, handleBlur } = useSignUpForm();

  const [isEmailChecked, setIsEmailChecked] = useState({
    available: false,
    message: "",
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });

  const { mutate: signUp, isPending: isSignUpPending } = useSignupMutation();
  const { refetch: refetchEmail } = useCheckEmail(values.email);
  const { refetch: refetchNickname } = useCheckNickname(values.nickname);

  // 이메일, 닉네임 체크 후 변경 시 초기화
  useEffect(() => {
    setIsEmailChecked({ available: false, message: "" });
  }, [values.email]);

  useEffect(() => {
    setIsNicknameChecked({ available: false, message: "" });
  }, [values.nickname]);

  async function handleCheckEmail() {
    const { data } = await refetchEmail();

    if (data)
      setIsEmailChecked({ available: data.available, message: data.message });
  }

  async function handleCheckNickname() {
    const { data } = await refetchNickname();

    if (data)
      setIsNicknameChecked({
        available: data.available,
        message: data.message,
      });
  }

  async function handleSignUp() {
    if (!isValid) return;

    signUp(values);
  }

  return (
    <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
      <div className="text-primary-blue text-2xl leading-[30px] font-bold">
        회원가입
      </div>

      <TextField id="email">
        <TextField.Label>아이디</TextField.Label>
        <div className="flex gap-2">
          <TextField.Input
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => {
              handleBlur("email");
            }}
            className="flex-1"
            type="email"
            placeholder="이메일 주소 형식으로 입력해 주세요."
            state={errors.email ? "error" : "default"}
          />
          <Button
            onClick={handleCheckEmail}
            variant={"secondary"}
            size={"sm"}
            disabled={!values.email}
          >
            중복 확인
          </Button>
        </div>

        {errors.email && (
          <TextField.HelperText status={"error"}>
            {errors.email}
          </TextField.HelperText>
        )}
        {!errors.email && isEmailChecked.message && (
          <TextField.HelperText
            status={isEmailChecked.available ? "success" : "error"}
          >
            {isEmailChecked.message}
          </TextField.HelperText>
        )}
      </TextField>

      <TextField id="nickname">
        <TextField.Label>닉네임</TextField.Label>

        <div className="flex gap-2">
          <TextField.Input
            value={values.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
            onBlur={() => {
              handleBlur("nickname");
            }}
            className="flex-1"
            type="text"
            placeholder="닉네임을 입력해 주세요."
            state={errors.nickname ? "error" : "default"}
          />
          <Button
            onClick={handleCheckNickname}
            variant={"secondary"}
            size={"sm"}
            disabled={!values.nickname}
          >
            중복 확인
          </Button>
        </div>
        {errors.nickname && (
          <TextField.HelperText status={"error"}>
            {errors.nickname}
          </TextField.HelperText>
        )}
        {!errors.nickname && isNicknameChecked.message && (
          <TextField.HelperText
            status={isNicknameChecked.available ? "success" : "error"}
          >
            {isNicknameChecked.message}
          </TextField.HelperText>
        )}
      </TextField>

      <TextField id="password">
        <TextField.Label>비밀번호</TextField.Label>

        <div className="flex gap-2">
          <TextField.Input
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => {
              handleBlur("password");
            }}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            state={errors.password ? "error" : "default"}
          />
        </div>
        {errors.password && (
          <TextField.HelperText status={"error"}>
            {errors.password}
          </TextField.HelperText>
        )}
      </TextField>

      <TextField id="confirmPassword">
        <TextField.Label>비밀번호 확인</TextField.Label>

        <div className="flex gap-2">
          <TextField.Input
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => {
              handleBlur("confirmPassword");
            }}
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
            state={errors.confirmPassword ? "error" : "default"}
          />
        </div>
        {errors.confirmPassword && (
          <TextField.HelperText status={"error"}>
            {errors.confirmPassword}
          </TextField.HelperText>
        )}
      </TextField>

      <div className="h-34">
        <label className="text-[14px] leading-[18px] font-medium text-gray-600">
          이용 약관
        </label>
        <div className="line-clamp-3">{TERMS}</div>
      </div>

      <Button
        onClick={handleSignUp}
        variant={"primary"}
        size={"lg"}
        className="w-105"
        disabled={!isValid || isSignUpPending}
      >
        회원가입
      </Button>

      <div>
        <Link
          className="text-primary-blue text-[16px] leading-5"
          to={"/sign-in"}
        >
          회원이신가요?
          <span className="ml-3 font-bold">로그인 바로가기</span>
        </Link>
      </div>
    </div>
  );
}
