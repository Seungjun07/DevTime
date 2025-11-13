import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.svg";
export default function GlobalLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="m-auto flex h-10 w-full max-w-300 justify-between pt-4 font-semibold text-[var(--font-secondary)]">
        <div className="flex h-full items-center gap-12">
          <Link to={"/"}>
            <img src={logo} alt="devTime의 로고" />
          </Link>
          <div className="flex gap-9">
            <button>대시보드</button>
            <button onClick={() => navigate("/ranking")}>랭킹</button>
          </div>
        </div>

        <div className="flex gap-9">
          <button onClick={() => navigate("/sign-in")}>로그인</button>
          <button onClick={() => navigate("/sign-up")}>회원가입</button>
        </div>
      </header>

      <main className="m-auto mt-24 w-full max-w-[1200px] flex-1">
        <Outlet />
      </main>
    </div>
  );
}
