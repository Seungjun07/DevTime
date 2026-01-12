import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCheckNickname } from "../hooks/queries/use-check-nickname";
import { checkEmail, signUp } from "../api/sign-up";
import Button from "../components/common/Button";
import TextFieldInput from "../components/common/TextField/TextFieldInput";
import TextField from "../components/common/TextField/TextField";
import { TERMS } from "../constant";
import {
  validateConfirmPassword,
  validateEmail,
  validateNickname,
  validatePassword,
} from "../utils/validate";
import type { SignUpFormState } from "../types";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpFormState>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [isEmailChecked, setIsEmailChecked] = useState({
    available: false,
    message: "",
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  const errors = {
    email: touched.email ? validateEmail(form.email) : "",
    nickname: touched.nickname ? validateNickname(form.nickname) : "",
    password: touched.password ? validatePassword(form.password) : "",
    confirmPassword: touched.confirmPassword
      ? validateConfirmPassword(form.password, form.confirmPassword)
      : "",
  };

  const isFormValid =
    form.email &&
    form.nickname &&
    form.password &&
    form.confirmPassword &&
    !errors.email &&
    !errors.nickname &&
    !errors.password &&
    !errors.confirmPassword;

  async function handleSignUpClick() {
    if (!isFormValid) return;

    try {
      const data = await signUp(form);

      if (data) navigate("/sign-in", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckEmail() {
    try {
      const data = await checkEmail(form.email);

      setIsEmailChecked({ available: data.available, message: data.message });
    } catch (error) {
      console.log("에러", error);
    }
  }

  const {
    // data: nickNameChecked,
    isLoading,
    refetch,
  } = useCheckNickname(form.nickname);

  async function handleCheckNickname() {
    const { data } = await refetch();
    setIsNicknameChecked(data);
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, email: true }));
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
            disabled={!form.email}
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
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, nickname: true }));
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
            disabled={!form.nickname}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, password: true }));
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
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            onBlur={() => {
              setTouched((prev) => ({ ...prev, confirmPassword: true }));
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
        onClick={handleSignUpClick}
        variant={"primary"}
        size={"lg"}
        className="w-105"
        disabled={!isFormValid}
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
