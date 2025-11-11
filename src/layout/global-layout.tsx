import { Link, Outlet } from "react-router-dom";
import logo from "./../assets/logo.svg";
export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="m-auto flex h-10 w-full max-w-300 justify-between pt-4 font-semibold text-[var(--font-secondary)]">
        <div className="flex h-full items-center gap-12">
          <Link to={"/"}>
            <img src={logo} alt="devTime의 로고" />
          </Link>
          <div className="flex gap-9">
            <div>대시보드</div>
            <div>랭킹</div>
          </div>
        </div>

        <div className="flex gap-9">
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </header>

      <main className="m-auto mt-24 w-full max-w-[1032px] flex-1">
        <Outlet />
      </main>
    </div>
  );
}
