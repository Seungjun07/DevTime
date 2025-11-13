import { Outlet } from "react-router-dom";
import logo from "./../assets/logo-vertical.svg";

export default function UserInfoLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="bg-primary-blue flex flex-1 flex-col items-center justify-center gap-9">
        <img
          className="h-50 w-66 brightness-0 invert"
          src={logo}
          alt="devTime의 로고"
        />
        <p className="text-xl leading-6 font-semibold text-white">
          개발자를 위한 타이머
        </p>
      </div>

      <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
        <Outlet />
      </div>
    </div>
  );
}
