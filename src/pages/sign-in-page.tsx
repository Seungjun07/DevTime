import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";
import symbolLogo from "./../assets/Symbol-Logo.png";

export default function SignInPage() {
  const navigate = useNavigate();
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
          <div className="flex h-12 w-82 flex-col gap-2">
            <label
              className="h-[18px] w-full text-[14px] leading-[18px] font-medium"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className="rounded-1 text-4 text-disabled-300 bg-gray-50 px-4 py-3 leading-5 font-medium"
              id="email"
              placeholder="이메일 주소를 입력해주세요."
              type="email"
            />
          </div>

          <div className="flex h-12 w-82 flex-col gap-2">
            <label
              className="h-[18px] w-full text-[14px] leading-[18px] font-medium"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="rounded-1 text-4 text-disabled-300 bg-gray-50 px-4 py-3 leading-5 font-medium"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              type="password"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          <button className="bg-disabled-400 text-disabled-300 h-12 w-82 rounded px-4 py-3">
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
    </div>
  );
}
