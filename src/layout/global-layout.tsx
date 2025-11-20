import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.svg";
import { getAccessToken } from "../utils/token";
import Profile from "../components/profile";
export default function GlobalLayout() {
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-[rgba(246,247,249,1)] from-0% to-[rgba(233,236,245,1)] to-100%">
      <header className="text-font-secondary relative m-auto flex h-10 w-full max-w-300 justify-between pt-4 font-semibold">
        <div className="flex h-full items-center gap-12">
          <Link to={"/"}>
            <img src={logo} alt="devTime의 로고" />
          </Link>
          <div className="flex gap-9">
            <Link to={"/dashboard"}>대시보드</Link>
            <Link to={"/ranking"}>랭킹</Link>
            <Link to={"/profile"}>프로필</Link>
            <Link to={"/my-page"}>마이페이지 임시</Link>
          </div>
        </div>

        <div className="flex gap-9">
          {accessToken ? (
            <Profile />
          ) : (
            <>
              <Link to={"/sign-in"}>로그인</Link>
              <Link to={"/sign-up"}>회원가입</Link>
            </>
          )}
        </div>
      </header>

      <main className="m-auto mt-24 w-full max-w-[1200px] flex-1">
        <Outlet />
      </main>
    </div>
  );
}
