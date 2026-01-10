import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";
// import Button from "../components/button";
import { useEffect, useState } from "react";
import { useCheckNickname } from "../hooks/queries/use-check-nickname";
import { API_BASE_URL } from "../api/api";
import { checkEmail } from "../api/sign-up";
import Button from "../components/common/Button";
import TextFieldInput from "../components/common/TextField/TextFieldInput";
import TextField from "../components/common/TextField/TextField";

type FormErrors = {
  email?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
};

type FormState = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

const ERROR_MSG = {
  email: "이메일 형식으로 작성해 주세요.",
  nickname: "닉네임을 입력해 주세요.",
  password: "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
  confirmPassword: "비밀번호가 일치하지 않습니다.",
};

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  // const [touched, setTouched] = useState({
  //   email: false,
  //   nickname: false,
  //   password: false,
  //   confirmPassword: false,
  // });

  const [isEmailChecked, setIsEmailChecked] = useState({
    available: false,
    message: "",
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });

  function validate() {
    const newErrors: FormErrors = {};

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = ERROR_MSG.email;
    }

    if (!form.nickname) {
      newErrors.nickname = ERROR_MSG.nickname;
    }

    if (
      !form.password ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)
    ) {
      newErrors.password = ERROR_MSG.password;
    }

    if (!form.confirmPassword || form.password !== form.confirmPassword) {
      newErrors.confirmPassword = ERROR_MSG.confirmPassword;
    }

    return newErrors;
  }

  async function handleSignUpClick() {
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("회원가입 실패");

      const data = await response.json();

      if (data) navigate("/sign-in", { replace: true });
    } catch (error) {
      alert("서버 오류 발생");
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

  const isSignUpEnabled =
    form.email &&
    isEmailChecked.available &&
    form.nickname &&
    isNicknameChecked.available &&
    form.password &&
    form.confirmPassword === form.password &&
    Object.keys(errors).length === 0;

  return (
    <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
      <div className="text-primary-blue text-2xl leading-[30px] font-bold">
        회원가입
      </div>

      <TextField label="아이디" htmlFor="email">
        <div className="flex gap-2">
          <TextFieldInput
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="flex-1"
            type="email"
            id="email"
            placeholder="이메일 주소 형식으로 입력해 주세요."
            variant={"default"}
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
          <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
            {errors.email}
          </p>
        )}
        {
          <p
            className={`pt-2 text-[12px] leading-4 font-medium ${isEmailChecked.available ? "text-green-500" : "text-red-500"}`}
          >
            {isEmailChecked.message}
          </p>
        }
      </TextField>

      <TextField label="닉네임" htmlFor="nickname">
        <div className="flex gap-2">
          <TextFieldInput
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            className="flex-1"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해 주세요."
            variant={"default"}
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
          <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
            {errors.nickname}
          </p>
        )}
        {
          <p
            className={`pt-2 text-[12px] leading-4 font-medium ${isNicknameChecked.available ? "text-green-500" : "text-red-500"}`}
          >
            {isNicknameChecked.message}
          </p>
        }
      </TextField>

      <TextField label="비밀번호" htmlFor="password">
        <div className="flex gap-2">
          <TextFieldInput
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요."
            variant={"default"}
          />
        </div>
        {errors.password && (
          <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
            {errors.password}
          </p>
        )}
      </TextField>

      <TextField label="비밀번호 확인" htmlFor="confirmPassword">
        <div className="flex gap-2">
          <TextFieldInput
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력해 주세요."
            variant={"default"}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
            {errors.confirmPassword}
          </p>
        )}
      </TextField>

      <div className="h-34">
        <label className="text-[14px] leading-[18px] font-medium text-gray-600">
          이용 약관
        </label>
        <div className="line-clamp-3">
          제1조 (목적) 이 약관은 DevTime(이하 “서비스”)의 이용 조건 및 절차,
          사용자와 서비스 제공자(회사) 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다. 제2조 (정의) 서비스: 개발자들이 일상 업무 및 할 일을
          효과적으로 관리할 수 있도록 제공되는 DevTime(데브타임) TODO 앱 및 관련
          기능을 말합니다. 사용자: 이 약관에 따라 서비스를 이용하는 개인 및
          단체를 의미합니다. 계정: 사용자가 서비스를 이용하기 위해 등록하는 고유
          식별 정보를 의미합니다. 제3조 (약관의 효력 및 변경) 본 약관은 사용자가
          서비스에 최초 가입하거나 서비스를 이용하는 시점부터 효력을 발생합니다.
          회사는 필요에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 앱 내
          공지사항 또는 이메일 등으로 사전에 고지합니다. 제4조 (서비스 제공 및
          변경) 회사는 사용자가 할 일을 등록, 수정, 삭제하고 일정을 관리할 수
          있도록 서비스를 제공합니다. 서비스의 일부 기능 또는 전체 서비스를 사전
          예고 없이 변경하거나 중단할 수 있으며, 이로 인한 책임은 회사가
          부담하지 않습니다. 제5조 (사용자의 의무) 사용자는 서비스 이용 시 관련
          법령 및 본 약관을 준수해야 합니다. 사용자는 본인의 계정 및 비밀번호를
          안전하게 관리하며, 타인에게 양도하거나 공유할 수 없습니다. 사용자는
          서비스 이용 과정에서 다음과 같은 행위를 해서는 안 됩니다: 타인의
          권리를 침해하거나 불법적인 목적으로 서비스를 이용하는 행위 허위 정보를
          기재하거나 부정한 방법으로 서비스를 이용하는 행위 회사의 정상적인
          서비스 운영을 방해하는 행위 제6조 (개인정보 보호) 회사는 개인정보 보호
          관련 법령을 준수하며, 별도의 개인정보 처리방침에 따라 사용자의
          개인정보를 안전하게 관리합니다. 사용자는 서비스 이용을 위해 필요한
          최소한의 개인정보를 제공하며, 해당 정보는 서비스 제공 목적에 한해서만
          사용됩니다. 제7조 (서비스 이용 제한 및 중지) 회사는 사용자가 본 약관을
          위반한 경우 경고 후 서비스 이용을 제한하거나 중지할 수 있습니다.
          사용자는 본 약관 위반 시 발생하는 모든 결과에 대해 책임을 지며, 회사는
          이에 대해 어떠한 책임도 지지 않습니다. 제8조 (책임의 제한) 회사는
          천재지변, 불가항력적 사유, 또는 통신 장애 등으로 인한 서비스 제공
          중단에 대해 책임을 지지 않습니다. 회사는 사용자가 서비스를 이용하여
          발생한 데이터 손실, 업무상 손해 등에 대해 책임을 제한합니다. 제9조
          (준거법 및 관할법원) 본 약관은 대한민국 법률에 따라 해석 및
          적용됩니다. 서비스 이용과 관련하여 발생한 분쟁은 회사 본사 소재지를
          관할하는 법원을 제1심 관할법원으로 합니다. 제10조 (부칙) 본 약관은
          2024년 2월 1일부터 시행됩니다. 본 약관에 명시되지 않은 사항은 관련
          법령 및 회사의 내부 정책에 따릅니다.
        </div>
      </div>

      <Button onClick={handleSignUpClick} variant={"primary"} size={"lg"}>
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
